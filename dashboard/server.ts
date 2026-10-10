// Read-only data API over a runner output folder. Never writes anything.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const DEFAULT_OUT = path.resolve(process.env.OUT_DIR ?? "../out/public-full-2");
const OUT_ROOT = path.dirname(DEFAULT_OUT);
// The run being read for the current request; switchable with ?run=<folder under OUT_ROOT>.
let OUT = DEFAULT_OUT;
const isRun = (dir: string) =>
  fs.existsSync(path.join(dir, "index.json")) ||
  fs.existsSync(path.join(dir, "summary.md")) ||
  fs.readdirSync(dir).some((n) => fs.existsSync(path.join(dir, n, "trace.jsonl")));
const runs = () => {
  try {
    return fs
      .readdirSync(OUT_ROOT, { withFileTypes: true })
      .filter((d) => d.isDirectory() && isRun(path.join(OUT_ROOT, d.name)))
      .map((d) => d.name)
      .sort();
  } catch {
    return [];
  }
};
const PORT = Number(process.env.API_PORT ?? 8788);

type Ev = Record<string, any> & { ts: string; event: string };

const readText = (p: string): string | null => {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return null;
  }
};
const readJson = (p: string): any => {
  const t = readText(p);
  if (t == null) return null;
  try {
    return JSON.parse(t);
  } catch {
    return null;
  }
};
const readTrace = (dir: string): Ev[] => {
  const t = readText(path.join(dir, "trace.jsonl"));
  if (!t) return [];
  const out: Ev[] = [];
  for (const line of t.split("\n")) {
    if (!line.trim()) continue;
    try {
      out.push(JSON.parse(line));
    } catch {
      // a line still being written; skip it this tick
    }
  }
  return out;
};

const section = (md: string, title: string): string => {
  const i = md.indexOf(`\n## ${title}`);
  if (i < 0) return "";
  const rest = md.slice(md.indexOf("\n", i + 1) + 1);
  const end = rest.search(/\n## /);
  return (end < 0 ? rest : rest.slice(0, end)).trim();
};

// "type → recipient (stage: …; confidence …; rules PM-…)"
const parseNext = (line: string) => {
  const m = line.match(/^(\S+)\s*→\s*([^(]+?)\s*(?:\((.*)\))?$/);
  if (!m) return { type: line || null, recipient: null, stage: null, confidence: null, rules: [] as string[] };
  const inner = m[3] ?? "";
  const stage = inner.match(/stage:\s*(.*?)(?:;\s*confidence|;\s*rules|$)/)?.[1]?.trim() ?? null;
  const confidence = inner.match(/confidence\s+(\w+)/)?.[1] ?? null;
  const rules = inner.match(/PM-[A-Z]+-\d+/g) ?? [];
  return { type: m[1], recipient: m[2].trim(), stage, confidence, rules };
};

const STREET = "(?:Road|Street|Lane|Avenue|Close|Walk|Mews|Row|Quay|Way|Drive|Place|Court|Gardens|Square|Terrace|Crescent|Hill|Park|Grove|View)";
const POSTCODE = "[A-Z]{1,2}\\d[A-Z\\d]?\\s?\\d[A-Z]{2}";
const findProperty = (md: string): string | null => {
  const a = md.match(/Address:\s*([^\n"\\]+)/)?.[1]?.trim();
  if (a) return a.split(/\s\(|\.\s/)[0].replace(/\.$/, "");
  const re = new RegExp(`(?:(?:Flat|Apartment|Unit|Room)\\s+[\\w-]+,?\\s*)?\\d+[A-Za-z]?\\s+(?:[A-Z][\\w']*\\s+){1,3}${STREET}\\b(?:,\\s*[A-Z]\\w*(?: [A-Z]\\w*)*)*(?:,?\\s*${POSTCODE})?`);
  return md.match(re)?.[0]?.trim() ?? null;
};

const resolutionOf = (events: Ev[]) =>
  [...events].reverse().find((e) => e.event === "tool.control" && e.tool === "submit_resolution")?.input ?? null;

const loadIndex = (): any[] => readJson(path.join(OUT, "index.json")) ?? [];

const caseFolders = (): string[] => {
  let names: string[] = [];
  try {
    names = fs
      .readdirSync(OUT, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith("."))
      .map((d) => d.name);
  } catch {
    return [];
  }
  for (const r of loadIndex()) if (r?.folder && !names.includes(String(r.folder))) names.push(String(r.folder));
  const num = (s: string) => (/^\d+$/.test(s) ? Number(s) : NaN);
  return names.sort((a, b) => (isNaN(num(a)) || isNaN(num(b)) ? a.localeCompare(b) : num(a) - num(b)));
};

function row(folder: string, index: any[]) {
  const dir = path.join(OUT, folder);
  const events = readTrace(dir);
  const idx = index.find((r) => String(r.folder) === folder);
  const answer = readText(path.join(dir, "ANSWER.md")) ?? "";
  const judge = readJson(path.join(dir, "JUDGE.json"));
  const callback = readJson(path.join(dir, "callback.json"));
  const end = events.find((e) => e.event === "case.end");
  const start = events.find((e) => e.event === "case.start");
  const route = events.find((e) => e.event === "route");
  const agent = events.find((e) => e.event === "agent.start");
  const resolution = resolutionOf(events);
  const nextLine = section(answer, "Next action").split("\n")[0]?.trim() ?? "";
  const finalState = section(answer, "Final state").split("\n")[0]?.trim() ?? "";
  const fsMatch = finalState.match(/^(\S+)\s*\(family:\s*([^,]+),\s*urgency:\s*(\w+)\)/);
  const tierFromAnswer = section(answer, "Escalation").match(/Tier\s+(P\d)/)?.[1];
  const count = (name: string) => events.filter((e) => e.event === name).length;
  const p0 = events.filter((e) => e.event.startsWith("escalate.p0"));
  return {
    folder,
    case_id: idx?.case_id ?? start?.case ?? end?.case ?? folder,
    channel: idx?.channel ?? start?.channel ?? null,
    received_at: idx?.received_at ?? null,
    status: end ? end.status : events.length ? "running" : "queued",
    family: route?.families?.[0] ?? fsMatch?.[2]?.trim() ?? null,
    families: route?.families ?? [],
    urgency: route?.urgency ?? fsMatch?.[3] ?? null,
    escalation: resolution?.escalation?.tier ?? tierFromAnswer ?? null,
    agent: agent?.agent ?? null,
    seconds: end?.ms != null ? Math.round(end.ms / 1000) : null,
    started_at: start?.ts ?? null,
    ended_at: end?.ts ?? null,
    flags: start?.flags ?? [],
    next_action: nextLine || null,
    next: parseNext(nextLine),
    final_state: finalState || null,
    property: findProperty(answer),
    summary: section(answer, "Summary") || null,
    counts: {
      events: events.length,
      reads: count("tool.read"),
      staged: count("tool.staged"),
      executed: count("execute.success"),
      failed: count("execute.failure") + count("execute.unknown"),
      blocked: count("tool.blocked"),
      withdrawn: count("reconcile.withdrawn"),
    },
    page: p0.length ? p0[p0.length - 1].event.replace("escalate.p0.", "") : null,
    has_callback: !!callback,
    callback_status: callback?.status ?? null,
    judge: judge
      ? {
          outcome: judge.outcome_score,
          judgement: judge.judgement_score,
          critical: !!judge.critical_failure,
          verdict: judge.verdict ?? null,
        }
      : null,
  };
}

function summary() {
  const index = loadIndex();
  const rows = caseFolders().map((f) => row(f, index));
  const by: Record<string, number> = {};
  for (const r of rows) by[r.status] = (by[r.status] ?? 0) + 1;
  const starts = rows.map((r) => r.started_at).filter(Boolean).map((t) => Date.parse(t!));
  const ends = rows.map((r) => r.ended_at).filter(Boolean).map((t) => Date.parse(t!));
  const running = rows.some((r) => r.status === "running" || r.status === "queued");
  const first = starts.length ? Math.min(...starts) : null;
  const last = running ? Date.now() : ends.length ? Math.max(...ends) : null;
  const md = readText(path.join(OUT, "summary.md"));
  const line = md?.match(/Cases: \d+\. Completed: \d+\.[^\n]*/)?.[0] ?? null;
  const judged = rows.filter((r) => r.judge);
  const mean = (k: "outcome" | "judgement") =>
    judged.length ? Math.round((judged.reduce((s, r) => s + (r.judge![k] ?? 0), 0) / judged.length) * 10) / 10 : null;
  return {
    out_dir: OUT,
    total: Math.max(rows.length, index.length),
    completed: rows.filter((r) => r.status !== "running" && r.status !== "queued").length,
    by_status: by,
    elapsed: first && last ? Math.round((last - first) / 1000) : null,
    running,
    summary_line: line,
    judge: judged.length ? { n: judged.length, outcome: mean("outcome"), judgement: mean("judgement"), critical: judged.filter((r) => r.judge!.critical).length } : null,
  };
}

function caseDetail(folder: string) {
  if (folder.includes("..") || folder.includes("/")) return null;
  const dir = path.join(OUT, folder);
  if (!fs.existsSync(dir)) return null;
  const events = readTrace(dir);
  return {
    summary: row(folder, loadIndex()),
    answer: readText(path.join(dir, "ANSWER.md")),
    reasoning: readText(path.join(dir, "REASONING.md")),
    events,
    resolution: resolutionOf(events),
    judge: readJson(path.join(dir, "JUDGE.json")),
    callback: readJson(path.join(dir, "callback.json")),
    whatsapp: readJson(path.join(dir, "whatsapp_reply.json")),
  };
}

const send = (res: http.ServerResponse, code: number, body: unknown) => {
  res.writeHead(code, { "content-type": "application/json", "cache-control": "no-store" });
  res.end(JSON.stringify(body));
};

http
  .createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://x");
    const run = url.searchParams.get("run");
    OUT = run && /^[\w.-]+$/.test(run) && fs.existsSync(path.join(OUT_ROOT, run)) ? path.join(OUT_ROOT, run) : DEFAULT_OUT;
    try {
      if (url.pathname === "/api/runs") return send(res, 200, { default: path.basename(DEFAULT_OUT), runs: runs() });
      if (url.pathname === "/api/cases") {
        const index = loadIndex();
        return send(res, 200, caseFolders().map((f) => row(f, index)));
      }
      if (url.pathname === "/api/summary") return send(res, 200, summary());
      const m = url.pathname.match(/^\/api\/case\/([^/]+)$/);
      if (m) {
        const d = caseDetail(decodeURIComponent(m[1]));
        return d ? send(res, 200, d) : send(res, 404, { error: "not found" });
      }
      send(res, 404, { error: "not found" });
    } catch (e) {
      send(res, 500, { error: String(e) });
    }
  })
  .listen(PORT, () => console.log(`dashboard api on :${PORT} reading ${OUT}`));
