import fs from "node:fs";
import path from "node:path";

/**
 * What the service can learn about a case from disk at escalation time, without importing the pipeline:
 * the trace the runner is writing (<out>/<case>/trace.jsonl) and the original report in the cases directory.
 */
export type CaseContext = { flags: string[]; report?: string; property?: string; tenant?: string; resolution?: any; executed: string[] };

const PLACEHOLDER = /^mock\b/i;

function readTrace(file: string): any[] {
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, "utf8").split("\n").filter(Boolean).flatMap((l) => { try { return [JSON.parse(l)]; } catch { return []; } });
}

/** Address for a property id from DATA_DIR/properties.json (the dataset the runner was seeded with). */
function lookupProperty(id: unknown): string | undefined {
  const dataDir = process.env.DATA_DIR;
  if (!id || !dataDir) return undefined;
  try {
    const rows = JSON.parse(fs.readFileSync(path.join(dataDir, "properties.json"), "utf8"));
    const p = rows.find((r: any) => r.id === id);
    return p ? [p.address, p.postcode].filter(Boolean).join(", ") : undefined;
  } catch { return undefined; }
}

/** Text of the original case: Dwelly index.md (initial request) or any text-like files in the case folder. */
function readReport(casesDir: string, caseId: string): { text?: string; property?: string } {
  const dir = path.join(casesDir, caseId);
  const files = fs.existsSync(dir) && fs.statSync(dir).isDirectory()
    ? fs.readdirSync(dir).map((f) => path.join(dir, f))
    : fs.existsSync(casesDir) ? fs.readdirSync(casesDir).filter((f) => f.startsWith(caseId + ".")).map((f) => path.join(casesDir, f)) : [];
  let property: string | undefined;
  const parts: string[] = [];
  for (const f of files) {
    if (!/\.(md|txt|eml|json)$/i.test(f) || !fs.statSync(f).isFile()) continue;
    let t = fs.readFileSync(f, "utf8");
    if (f.endsWith(".json")) {
      try { const j = JSON.parse(t); property ??= lookupProperty(j.property_id); t = String(j.transcript ?? j.message ?? j.body ?? t); } catch { /* keep raw */ }
    }
    property ??= t.match(/\*\*Property:\*\*\s*(.+)/)?.[1]?.trim();
    const initial = t.match(/## Initial request\s+([\s\S]*?)\n## /)?.[1];
    parts.push((initial ?? t).trim());
  }
  const text = parts.join("\n").replace(/^(From|To|Subject|Date):.*$/gim, "").replace(/\s+/g, " ").trim();
  property ??= text.match(/\b(Flat \d+[A-Z]?,?\s+\d+\s+[A-Z][a-z]+(?:\s[A-Z][a-z]+)*(?:\s(?:Street|Road|Row|Lane|Avenue|Close|Court|View|Way|Place|Gardens|Drive|Terrace))?)/)?.[1];
  return { text: text ? text.slice(0, 500) : undefined, property };
}

function readData(file: string): any[] {
  const dataDir = process.env.DATA_DIR;
  if (!dataDir) return [];
  try { return JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8")); } catch { return []; }
}

/** Replaces internal ids (CON-02, LL-2, TEN-2001) with names from the dataset so the call never reads out codes. */
export function speakIds(text: string): string {
  const names = new Map<string, string>();
  for (const r of readData("contractors.json")) if (r.id && r.name) names.set(r.id, r.name);
  for (const r of readData("landlords.json")) if (r.id && r.name) names.set(r.id, r.name);
  return text.replace(/\b[A-Z]{2,4}-\d{1,5}\b/g, (id) => names.get(id) ?? id);
}

/** "44 Albion Road, London, N16 9PD" -> "44 Albion Road": the spoken form drops city and postcode. */
export function shortAddress(address: string): string {
  return address.split(/,\s*/).filter((p) => !/^(London|[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2})$/i.test(p.trim())).join(", ");
}

/** ISO deadline -> "by 10:30" (UK time); anything else passes through. */
export function spokenDeadline(deadline: unknown): string | undefined {
  if (typeof deadline !== "string" || !deadline.trim()) return undefined;
  const t = Date.parse(deadline);
  if (Number.isNaN(t)) return deadline;
  return "by " + new Date(t).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" });
}

export function caseContext(outDirs: string[], caseId: string, casesDirs: string[]): CaseContext {
  const traceFile = outDirs.map((d) => path.join(d, caseId, "trace.jsonl")).find((f) => fs.existsSync(f));
  const events = traceFile ? readTrace(traceFile) : [];
  const start = events.find((e) => e.event === "case.start");
  const submits = events.filter((e) => e.event === "tool.control" && e.tool === "submit_resolution");
  const resolution = submits.at(-1)?.input;
  const report = casesDirs.map((d) => readReport(path.resolve(d), caseId)).find((r) => r.text) ?? {};
  // Tools the pipeline actually executed, so the call never offers to do something already done.
  const staged = new Map(events.filter((e) => e.event === "tool.staged").map((e) => [e.actionId, e]));
  const executed = events.filter((e) => e.event === "execute.success").map((e) => String(e.tool ?? staged.get(e.actionId)?.tool ?? "")).filter((t) => t && t !== "escalate");
  const propertyId = [...staged.values()].map((e) => e.input?.property_id).find(Boolean);
  const tenancy = propertyId ? readData("tenancies.json").find((t) => t.property_id === propertyId) : undefined;
  const tenant: string | undefined = tenancy?.tenants?.[0]?.name || undefined; // lead tenant, so "the tenant" stays singular
  const property = report.property ?? (propertyId ? lookupProperty(propertyId) : undefined);
  return { flags: start?.flags ?? [], report: report.text, property, tenant, resolution, executed };
}

export const meaningful = (v: unknown): v is string => typeof v === "string" && v.trim() !== "" && !PLACEHOLDER.test(v.trim());
