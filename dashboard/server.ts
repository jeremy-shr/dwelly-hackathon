// Read-only data API over one or more runner output directories. Never writes anything.
//   OUT_DIRS=../out/public-full-2,../out/live   (comma separated; OUT_DIR accepted as a single-dir alias)
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const DIRS = (process.env.OUT_DIRS ?? process.env.OUT_DIR ?? "../out/public-full-2,../out/demo-check")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)
  .map((p) => path.resolve(p));
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
    return null; // half-written file; try again next poll
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

// "## Title" section body from ANSWER.md / REASONING.md. Returns "" when absent.
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
const ADDRESS = new RegExp(`(?:(?:Flat|Apartment|Unit|Room)\\s+[\\w-]+,?\\s*)?\\d+[A-Za-z]?\\s+(?:[A-Z][\\w']*\\s+){1,3}${STREET}\\b(?:,\\s*[A-Z]\\w*(?: [A-Z]\\w*)*)*(?:,?\\s*${POSTCODE})?`);
// The property: from the prefetch query while the case runs, then from ANSWER.md once written.
const findProperty = (events: Ev[], md: string): string | null => {
  const q = events.find((e) => e.event === "prefetch")?.queries?.find?.((s: string) => typeof s === "string" && s.startsWith("property_address="));
  if (q) return q.slice("property_address=".length).trim();
  const a = md.match(/Address:\s*([^\n"\\]+)/)?.[1]?.trim();
  if (a) return a.split(/\s\(|\.\s/)[0].replace(/\.$/, "");
  return md.match(ADDRESS)?.[0]?.trim() ?? null;
};

const resolutionOf = (events: Ev[]) =>
  [...events].reverse().find((e) => e.event === "tool.control" && e.tool === "submit_resolution")?.input ?? null;

// Case folders are whatever directories exist under each output dir. index.json only maps folder → case id.
const foldersIn = (dir: string): string[] => {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith(".") && d.name !== "node_modules")
      .map((d) => d.name);
  } catch {
    return [];
  }
};
const idMap = (dir: string): Record<string, string> => {
  const idx = readJson(path.join(dir, "index.json"));
  const map: Record<string, string> = {};
  if (Array.isArray(idx)) for (const r of idx) if (r?.folder != null && r?.case_id != null) map[String(r.folder)] = String(r.case_id);
  return map;
};
// The voice service records each WhatsApp page it sent in <live dir>/pending-alerts.json, keyed by phone number.
const alertsIn = (dir: string): { case_id: string; dir: string; sent_at: string; to: string }[] => {
  const a = readJson(path.join(dir, "pending-alerts.json"));
  if (!a || typeof a !== "object") return [];
  return Object.entries(a).map(([to, v]: [string, any]) => ({ to, case_id: String(v?.case_id ?? ""), dir: String(v?.dir ?? ""), sent_at: String(v?.sent_at ?? "") }));
};

function row(i: number, folder: string, ids: Record<string, string>) {
  const base = DIRS[i];
  const dir = path.join(base, folder);
  const events = readTrace(dir);
  const answer = readText(path.join(dir, "ANSWER.md")) ?? "";
  const callback = readJson(path.join(dir, "callback.json"));
  const end = events.find((e) => e.event === "case.end");
  const start = events.find((e) => e.event === "case.start");
  const route = events.find((e) => e.event === "route");
  const agent = events.find((e) => e.event === "agent.start");
  const resolution = resolutionOf(events);
  const nextLine = section(answer, "Next action").split("\n")[0]?.trim() ?? "";
  const count = (name: string) => events.filter((e) => e.event === name).length;
  const p0 = events.filter((e) => e.event.startsWith("escalate.p0."));
  const last = events[events.length - 1];
  let mtime: number | null = null;
  try {
    mtime = fs.statSync(dir).mtimeMs;
  } catch {
    // folder vanished between readdir and stat
  }
  return {
    key: `${i}/${folder}`,
    dir: path.basename(base),
    folder,
    case_id: ids[folder] ?? start?.case ?? folder,
    channel: start?.channel ?? null,
    // Only the trace says what a case is. No case.end means it is still running.
    status: end ? String(end.status) : events.length ? "running" : "queued",
    last_event: last?.event ?? null,
    family: route?.families?.[0] ?? null,
    families: route?.families ?? [],
    urgency: route?.urgency ?? null,
    route_confidence: route?.confidence ?? null,
    route_reasons: route?.reasons ?? null,
    agent: agent?.agent ?? null,
    seconds: end?.ms != null ? Math.round(end.ms / 1000) : null,
    started_at: start?.ts ?? null,
    ended_at: end?.ts ?? null,
    folder_mtime: mtime,
    flags: start?.flags ?? [],
    next_action: nextLine || null,
    next: parseNext(nextLine),
    property: findProperty(events, answer),
    counts: {
      events: events.length,
      reads: count("tool.read"),
      staged: count("tool.staged"),
      executed: count("execute.success"),
      failed: count("execute.failure") + count("execute.unknown"),
      blocked: count("tool.blocked"),
      withdrawn: count("reconcile.withdrawn"),
      check_problems: events.filter((e) => e.event === "checks").reduce((n, e) => n + (e.problems?.length ?? 0), 0),
    },
    // After failed checks the orchestrator escalates in code; that tier is in ANSWER.md, not in the submit payload.
    escalation: section(answer, "Escalation").match(/^Tier (P\d|none)/)?.[1] ?? resolution?.escalation?.tier ?? null,
    handover: resolution?.escalation?.handover ?? null,
    page: p0.length ? p0[p0.length - 1].event.replace("escalate.p0.", "") : null,
    paged: p0.some((e) => e.event === "escalate.p0.call"),
    callback: callback ? { status: callback.status ?? null, chosen_option: callback.chosen_option ?? null, decision: callback.decision ?? null } : null,
  };
}
type Row = ReturnType<typeof row>;

// Ledger order: cases in flight first, then P0, P1, P2, then newest first.
const URG: Record<string, number> = { P0: 0, P1: 1, P2: 2 };
const order = (a: Row, b: Row) => {
  const inFlight = (r: Row) => (r.status === "running" || r.status === "queued" ? 0 : 1);
  if (inFlight(a) !== inFlight(b)) return inFlight(a) - inFlight(b);
  const ua = URG[a.urgency ?? ""] ?? 3;
  const ub = URG[b.urgency ?? ""] ?? 3;
  if (ua !== ub) return ua - ub;
  const ta = a.started_at ? Date.parse(a.started_at) : a.folder_mtime ?? 0;
  const tb = b.started_at ? Date.parse(b.started_at) : b.folder_mtime ?? 0;
  return tb - ta;
};

const allRows = (): Row[] =>
  DIRS.flatMap((d, i) => {
    const ids = idMap(d);
    return foldersIn(d).map((f) => row(i, f, ids));
  }).sort(order);

function summary() {
  const rows = allRows();
  const by: Record<string, number> = {};
  for (const r of rows) by[r.status] = (by[r.status] ?? 0) + 1;
  const running = rows.some((r) => r.status === "running");
  const now = Date.now();
  const spans = rows
    .filter((r) => r.started_at)
    .map((r) => ({ a: Date.parse(r.started_at!), b: r.ended_at ? Date.parse(r.ended_at) : now }))
    .filter((s) => !isNaN(s.a) && !isNaN(s.b))
    .sort((x, y) => x.a - y.a);
  // Elapsed: time the system spent with at least one case open (union of the case intervals, so two
  // runs an hour apart do not count the hour between them).
  let elapsed = 0;
  let cur: { a: number; b: number } | null = null;
  for (const s of spans) {
    if (cur && s.a <= cur.b) cur.b = Math.max(cur.b, s.b);
    else {
      if (cur) elapsed += cur.b - cur.a;
      cur = { ...s };
    }
  }
  if (cur) elapsed += cur.b - cur.a;
  // Parallelism as observed: the most cases that were between case.start and case.end at one moment.
  const marks = spans.flatMap((s) => [{ t: s.a, d: 1 }, { t: s.b, d: -1 }]).sort((x, y) => x.t - y.t || x.d - y.d);
  let open = 0;
  let parallel = 0;
  for (const m of marks) {
    open += m.d;
    parallel = Math.max(parallel, open);
  }
  return {
    dirs: DIRS.map((d) => path.basename(d)),
    total: rows.length,
    done: rows.filter((r) => r.ended_at).length,
    running: rows.filter((r) => r.status === "running").length,
    failed: (by.error ?? 0) + (by.blocked ?? 0),
    by_status: by,
    elapsed: spans.length ? Math.round(elapsed / 1000) : null,
    parallel,
    live: running,
  };
}

function caseDetail(i: number, folder: string) {
  if (!DIRS[i] || folder.includes("..") || folder.includes("/") || folder.includes("\\")) return null;
  const dir = path.join(DIRS[i], folder);
  if (!fs.existsSync(dir)) return null;
  const events = readTrace(dir);
  const r = row(i, folder, idMap(DIRS[i]));
  const alert = DIRS.flatMap(alertsIn).find((a) => a.case_id === r.case_id || a.case_id === folder || (a.dir && path.resolve(a.dir) === dir)) ?? null;
  return {
    summary: r,
    answer: readText(path.join(dir, "ANSWER.md")),
    reasoning: readText(path.join(dir, "REASONING.md")),
    events,
    resolution: resolutionOf(events),
    judge: readJson(path.join(dir, "JUDGE.json")),
    callback: readJson(path.join(dir, "callback.json")),
    whatsapp_reply: readJson(path.join(dir, "whatsapp_reply.json")),
    message: readJson(path.join(dir, "message.json")),
    alert,
  };
}

const send = (res: http.ServerResponse, code: number, body: unknown) => {
  res.writeHead(code, { "content-type": "application/json", "cache-control": "no-store" });
  res.end(JSON.stringify(body));
};

http
  .createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://x");
    try {
      if (url.pathname === "/api/cases") return send(res, 200, allRows());
      if (url.pathname === "/api/summary") return send(res, 200, summary());
      const m = url.pathname.match(/^\/api\/case\/(\d+)\/([^/]+)$/);
      if (m) {
        const d = caseDetail(Number(m[1]), decodeURIComponent(m[2]));
        return d ? send(res, 200, d) : send(res, 404, { error: "not found" });
      }
      send(res, 404, { error: "not found" });
    } catch (e) {
      send(res, 500, { error: String(e) });
    }
  })
  .listen(PORT, () => console.log(`dashboard api on :${PORT} reading ${DIRS.join(", ")}`));
