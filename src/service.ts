import "dotenv/config";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { caseContext, meaningful, shortAddress, speakIds, spokenDeadline } from "../voice/context.js";
import { playFor } from "../voice/playbook.js";
import { spawn } from "node:child_process";
import { sendMessage, validTwilioSignature } from "./transports/whatsapp.js";

/**
 * Minimal HTTP service for the voice loop and inbound demo. No framework, runs anywhere, tunnel-friendly.
 *   GET  /api/cases/:id            handover pack (from the run output)
 *   POST /api/escalations          P0: WhatsApp alert + outbound call to the on-call manager; P1: WhatsApp only. { tier, case_id, to_number?, summary, decision_required, deadline, recipient_role?, property?, options?, ... } -> places the ElevenLabs outbound call
 *   POST /api/escalations/preview  same body -> the call brief the agent would get (no call placed)
 *   POST /api/webhooks/elevenlabs  post-call webhook (HMAC verified) -> writes <case>/callback.json; a decided call is acted on
 *   GET  /api/oncall/:id           on-call panel timeline: page, call decision, WhatsApp reply, follow-through steps
 *   GET  /                         live board (public/board.html)
 *   GET  /api/status               per-case status derived from trace files
 *   POST /api/inbound              Twilio SMS/WhatsApp webhook (form-encoded From/Body) or JSON -> writes a case into cases/live/,
 *                                  runs the pipeline on it and replies on the same channel with the tenant messages it executed
 *   GET  /health
 */
const OUT = path.resolve(process.env.OUT_DIR ?? "./ANSWERS");
const PORT = Number(process.env.PORT ?? 8787);
// Live inbound cases (WhatsApp/SMS) are written to LIVE_CASES and answered into LIVE_OUT by the normal runner.
const LIVE_CASES = path.resolve("cases", "live");
const LIVE_OUT = path.resolve(process.env.LIVE_OUT_DIR ?? "./out/live");
const CASES_DIRS = [process.env.CASES_DIR, LIVE_CASES].filter(Boolean) as string[];

/**
 * P0 WhatsApp alert to the on-call property manager, sent alongside the call. The manager can reply with an
 * option number; the reply is recorded in the case folder (whatsapp_reply.json). Pending alerts are kept per
 * number so a reply maps back to its case.
 */
const PENDING_ALERTS = path.join(LIVE_OUT, "pending-alerts.json");
function pendingAlerts(): Record<string, { case_id: string; dir: string; sent_at: string }> {
  try { return JSON.parse(fs.readFileSync(PENDING_ALERTS, "utf8")); } catch { return {}; }
}
function alertText(b: Record<string, string>, tier = "P0"): string {
  const options = b.options.split(/\s*(?=Option \d+:)/).map((o) => o.replace(/^Option (\d+):\s*/, "$1) ")).filter(Boolean).join("\n");
  return [
    tier === "P0" ? `🚨 URGENT (P0): ${b.property}` : `⚠️ Priority (P1): ${b.property}`,
    b.issue,
    `Why urgent: ${b.why_urgent}`,
    `Risk if delayed: ${b.risk_if_delayed}`,
    `Not yet confirmed: ${b.facts_uncertain}`,
    `Options:\n${options}`,
    `Recommended: ${b.recommended_option}, because ${b.recommendation_reason}.`,
    `${tier === "P0" ? "We are also calling you now. " : ""}Reply with the option number to decide, or "call me" for a colleague. Ref ${b.case_id}`,
  ].join("\n\n");
}
async function alertWhatsApp(body: any, dir: string) {
  const to = process.env.ONCALL_WHATSAPP_NUMBER ?? body.to_number ?? process.env.ONCALL_PHONE_NUMBER;
  if (!to || !process.env.TWILIO_WHATSAPP_FROM) return { sent: false, reason: "WhatsApp alert not configured" };
  const result = await sendMessage("whatsapp", to, alertText(callBrief(body), body.tier === "P1" ? "P1" : "P0"));
  if (result.ok) {
    fs.mkdirSync(LIVE_OUT, { recursive: true });
    fs.writeFileSync(PENDING_ALERTS, JSON.stringify({ ...pendingAlerts(), [to.replace(/\s/g, "")]: { case_id: String(body.case_id), dir, sent_at: new Date().toISOString() } }, null, 2));
  }
  return { sent: result.ok, to, ...result };
}
/** A manager's WhatsApp reply to an alert: "1".."4" picks an option, anything else is kept as free text. */
async function recordAlertReply(from: string, text: string): Promise<boolean> {
  const alert = pendingAlerts()[from.replace(/^whatsapp:/, "").replace(/\s/g, "")];
  if (!alert) return false;
  const option = text.trim().match(/^(?:option\s*)?([1-4])\b/i)?.[1] ?? null;
  const reply = { received_at: new Date().toISOString(), channel: "whatsapp", from, text, chosen_option: option ?? "none", callback_requested: /call me|ring me|call back/i.test(text) };
  fs.mkdirSync(alert.dir, { recursive: true });
  fs.writeFileSync(path.join(alert.dir, "whatsapp_reply.json"), JSON.stringify(reply, null, 2));
  console.log(`whatsapp reply for ${alert.case_id}: option=${reply.chosen_option}`);
  if (option) actOnDecision(alert.case_id, { chosen_option: option, decision: `Chosen by WhatsApp reply: "${text.slice(0, 200)}"`, source: "by WhatsApp" });
  await sendMessage("whatsapp", from, option ? `Recorded: Option ${option} for ${alert.case_id}. The team will action it and update you.` : `Noted for ${alert.case_id}: "${text.slice(0, 120)}". A colleague will follow up.`);
  return true;
}

/** An open live case from this sender in the last 30 minutes, so a follow-up message joins the same case. */
function openCaseFor(from: string): string | undefined {
  if (!fs.existsSync(LIVE_CASES)) return undefined;
  const cutoff = Date.now() - 30 * 60_000;
  return fs.readdirSync(LIVE_CASES).filter((d) => d.startsWith("live-") && !d.endsWith("-decision")).sort().reverse().find((d) => {
    try { const m = JSON.parse(fs.readFileSync(path.join(LIVE_CASES, d, "message.json"), "utf8")); return m.from === from && Date.parse(m.received_at) > cutoff; } catch { return false; }
  });
}

/** Writes the message as a live case (or adds it to the sender's open case) and (re)answers it. Returns the case id. */
function receiveMessage(channel: string, from: string, body: string): { id: string; threaded: boolean } {
  from = from.replace(/^whatsapp:/, "");
  const now = new Date().toISOString();
  const open = openCaseFor(from);
  if (open) {
    // reply-NN.json sorts after message.json, so the case reads in order.
    const n = fs.readdirSync(path.join(LIVE_CASES, open)).filter((f) => f.startsWith("reply-")).length + 1;
    fs.writeFileSync(path.join(LIVE_CASES, open, `reply-${String(n).padStart(2, "0")}.json`), JSON.stringify({ channel, received_at: now, from, message: `Follow-up message from the same sender: ${body}` }, null, 2));
    console.log(`inbound ${channel} from ${from}: added to case ${open}`);
    answerLiveCase(open, channel, from, true);
    return { id: open, threaded: true };
  }
  const id = `live-${now.replace(/[:.]/g, "-")}`;
  const dir = path.join(LIVE_CASES, id); fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "message.json"), JSON.stringify({ channel, received_at: now, from, message: body }, null, 2));
  console.log(`inbound ${channel} from ${from}: case ${id}`);
  answerLiveCase(id, channel, from);
  return { id, threaded: false };
}
const ackText = (id: string, threaded = false) => threaded
  ? `Thanks, we've added that to your report (ref ${id.slice(5, 24)}).`
  : `Thanks, Northbridge Lettings has received your message (ref ${id.slice(5, 24)}). We're looking at it now and will reply here shortly.`;

/**
 * WHATSAPP_POLL=1: instead of the sandbox's console-only webhook, poll Twilio for new inbound WhatsApps to
 * TWILIO_WHATSAPP_FROM every few seconds. No public URL needed. Only messages after service start are handled.
 */
function pollWhatsApp() {
  const sid = process.env.TWILIO_ACCOUNT_SID, token = process.env.TWILIO_AUTH_TOKEN, to = process.env.TWILIO_WHATSAPP_FROM;
  if (!sid || !token || !to) { console.log("WHATSAPP_POLL set but Twilio WhatsApp env missing; not polling"); return; }
  const since = Date.now(), seen = new Set<string>();
  const auth = "Basic " + Buffer.from(`${sid}:${token}`).toString("base64");
  setInterval(async () => {
    try {
      const r = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json?To=${encodeURIComponent(to)}&PageSize=20`, { headers: { Authorization: auth }, signal: AbortSignal.timeout(8000) });
      const msgs: any[] = ((await r.json()) as any).messages ?? [];
      for (const m of msgs.reverse()) {
        if (seen.has(m.sid) || m.direction !== "inbound" || Date.parse(m.date_created) < since - 5000) continue;
        seen.add(m.sid);
        if (await recordAlertReply(m.from, m.body ?? "")) continue;
        const r = receiveMessage("whatsapp", m.from, m.body ?? "");
        void sendMessage("whatsapp", m.from, ackText(r.id, r.threaded));
      }
    } catch (e) { console.log("whatsapp poll error:", String(e).slice(0, 120)); }
  }, 4000);
  console.log(`polling WhatsApp inbound to ${to}`);
}

/**
 * Answers one live case with the normal runner (same pipeline, guards and checks as the judged run), then sends
 * the tenant whatever messages the pipeline actually executed for them, on the channel they wrote in on.
 * A P0 rings the on-call manager through ESCALATION_WEBHOOK_URL, pointed back at this service.
 */
function answerLiveCase(id: string, channel: string, from: string, rerun = false) {
  const args = ["src/run.ts", "--cases", LIVE_CASES, "--only", id, "--out", LIVE_OUT, "--deadline", "5"];
  if (rerun) args.push("--force");
  if (process.env.DATA_DIR) args.push("--data", process.env.DATA_DIR);
  if (!process.env.ANTHROPIC_API_KEY) args.push("--mock-model");
  const env = { ...process.env, ESCALATION_WEBHOOK_URL: process.env.ESCALATION_WEBHOOK_URL ?? `http://localhost:${PORT}/api/escalations` };
  const child = spawn(path.resolve("node_modules/.bin/tsx"), args, { env, stdio: ["ignore", "pipe", "pipe"] });
  let log = "";
  child.stdout.on("data", (d) => (log += d)); child.stderr.on("data", (d) => (log += d));
  child.on("close", async (code) => {
    const dir = path.join(LIVE_OUT, id);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "runner.log"), log);
    const events = fs.existsSync(path.join(dir, "trace.jsonl")) ? fs.readFileSync(path.join(dir, "trace.jsonl"), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)) : [];
    const staged = new Map(events.filter((e) => e.event === "tool.staged" && e.tool === "send_message").map((e) => [e.actionId, e.input]));
    const sent = events.filter((e) => e.event === "execute.success" && staged.has(e.actionId)).map((e) => staged.get(e.actionId))
      .filter((m: any) => /tenant|reporter|caller/i.test(String(m?.to_party ?? "")));
    for (const m of sent) {
      const result = await sendMessage(channel, from, String(m.body ?? ""));
      fs.appendFileSync(path.join(dir, "replies.jsonl"), JSON.stringify({ ts: new Date().toISOString(), channel, to: from, body: m.body, result }) + "\n");
      console.log(`reply to ${from} for ${id}: ${result.ok ? "sent" : result.error}`);
    }
    if (!sent.length) console.log(`no tenant message executed for ${id} (runner exit ${code}); nothing sent`);
  });
}

const HOLD_MS = Number(process.env.PAGE_HOLD_MS ?? 90_000);
const heldPages = new Map<string, ReturnType<typeof setTimeout>>();
/** P0: WhatsApp + call. P1: WhatsApp only. No tier (older callers) is treated as P0. */
async function firePage(body: any, dir: string) {
  const call = body.tier === "P1" ? Promise.resolve({ placed: false, reason: "P1: WhatsApp only" }) : placeCall(body);
  const [result, whatsapp] = await Promise.all([call, alertWhatsApp(body, dir).catch((e) => ({ sent: false, error: String(e) }))]);
  fs.appendFileSync(path.join(dir, "calls.jsonl"), JSON.stringify({ ts: new Date().toISOString(), request: body, result, whatsapp }) + "\n");
  console.log(`page for ${body.case_id}: call ${(result as any).placed ? "placed" : "not placed"}, whatsapp ${whatsapp.sent ? "sent" : "not sent"}${body.hold_expired ? " (hold expired)" : ""}`);
  return { ...result, whatsapp };
}

/** Folder for a case id in the batch or live output, if it exists. */
const caseDir = (id: string) => [OUT, LIVE_OUT].map((d) => path.join(d, id)).find((d) => fs.existsSync(d));

/** Tenant contact for follow-through: the live case's sender, else DEMO_TENANT_WHATSAPP (sample tenants are fictional). */
function tenantContact(caseId: string): { channel: string; to: string } | undefined {
  try {
    const m = JSON.parse(fs.readFileSync(path.join(LIVE_CASES, caseId, "message.json"), "utf8"));
    if (m.from) return { channel: m.channel === "sms" ? "sms" : "whatsapp", to: String(m.from) };
  } catch { /* not a live case */ }
  return process.env.DEMO_TENANT_WHATSAPP ? { channel: "whatsapp", to: process.env.DEMO_TENANT_WHATSAPP } : undefined;
}

function appendFollowup(dir: string, step: string, data: Record<string, unknown> = {}) {
  fs.appendFileSync(path.join(dir, "followup.jsonl"), JSON.stringify({ ts: new Date().toISOString(), step, ...data }) + "\n");
}

/**
 * Acting on the manager's decision (demo path only; never runs in the judged run because it needs the voice
 * service). The decision becomes a new event on a copy of the case, and the normal runner, with its guards and
 * checks, decides what happens next. The tenant then gets the message the pipeline actually executed.
 * The follow-up run never pages again (ESCALATION_WEBHOOK_URL is removed for it).
 */
const followedUp = new Set<string>();
function actOnDecision(caseId: string, decision: { chosen_option: string; decision: string | null; source: string }) {
  const dir = caseDir(caseId);
  if (!dir || followedUp.has(caseId)) return;
  followedUp.add(caseId);
  const src = CASES_DIRS.map((d) => path.join(path.resolve(d), caseId)).find((d) => fs.existsSync(d));
  if (!src) { appendFollowup(dir, "skipped", { reason: "original case files not found" }); return; }
  const id = `${caseId}-decision`;
  const dst = path.join(LIVE_CASES, id);
  fs.rmSync(dst, { recursive: true, force: true });
  fs.cpSync(src, dst, { recursive: true });
  const answer = fs.existsSync(path.join(dir, "ANSWER.md")) ? fs.readFileSync(path.join(dir, "ANSWER.md"), "utf8") : "";
  const done = answer.match(/## Actions taken\n([\s\S]*?)\n## /)?.[1]?.trim() ?? "(see the earlier case record)";
  fs.writeFileSync(path.join(dst, "zz-manager-decision.md"), [
    `# Update ${new Date().toISOString()}: on-call manager decision`,
    `The earlier P0 handling of this case already executed these actions. Do not repeat them:`, done,
    `The on-call property manager has now decided (${decision.source}): Option ${decision.chosen_option}. ${decision.decision ?? ""}`,
    `Act on this decision now: take the next steps it implies and update the tenant on what is happening.`,
  ].join("\n\n"));
  appendFollowup(dir, "decision_received", { ...decision });
  appendFollowup(dir, "acting", { followup_case: id });
  console.log(`acting on decision for ${caseId} (option ${decision.chosen_option}) as ${id}`);

  const followupOut = path.join(dir, "followup");
  const args = ["src/run.ts", "--cases", LIVE_CASES, "--only", id, "--out", followupOut, "--deadline", "5", "--force"];
  if (process.env.DATA_DIR) args.push("--data", process.env.DATA_DIR);
  if (!process.env.ANTHROPIC_API_KEY) args.push("--mock-model");
  const { ESCALATION_WEBHOOK_URL: _noPage, ...env } = process.env;
  const child = spawn(path.resolve("node_modules/.bin/tsx"), args, { env, stdio: ["ignore", "pipe", "pipe"] });
  let log = "";
  child.stdout.on("data", (d) => (log += d)); child.stderr.on("data", (d) => (log += d));
  child.on("close", async (code) => {
    const out = path.join(followupOut, id);
    fs.mkdirSync(out, { recursive: true });
    fs.writeFileSync(path.join(out, "runner.log"), log);
    const events = fs.existsSync(path.join(out, "trace.jsonl")) ? fs.readFileSync(path.join(out, "trace.jsonl"), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)) : [];
    const staged = new Map(events.filter((e) => e.event === "tool.staged").map((e) => [e.actionId, e]));
    const executed = events.filter((e) => e.event === "execute.success" && staged.has(e.actionId)).map((e) => staged.get(e.actionId));
    const tenantMsgs = executed.filter((e: any) => e.tool === "send_message" && /tenant|reporter|caller/i.test(String(e.input?.to_party ?? ""))).map((e: any) => String(e.input?.body ?? ""));
    const contact = tenantContact(caseId);
    const sent = [];
    for (const body of tenantMsgs) {
      const result = contact ? await sendMessage(contact.channel, contact.to, body) : { ok: false, error: "no tenant contact (set DEMO_TENANT_WHATSAPP)" };
      sent.push({ to: contact?.to ?? null, body, result });
    }
    appendFollowup(dir, "done", { runner_exit: code, followup_case: id, executed: executed.map((e: any) => e.tool), tenant_messages: sent });
    console.log(`decision follow-through for ${caseId}: ${executed.length} actions, ${sent.filter((m) => m.result.ok).length}/${sent.length} tenant messages sent`);
  });
}

/** Everything the on-call panel needs for one case, read from the files the service and runner wrote. */
function onCallTimeline(caseId: string) {
  const dir = caseDir(caseId);
  if (!dir) return undefined;
  const readJson = (f: string) => { try { return JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")); } catch { return undefined; } };
  const readLines = (f: string) => fs.existsSync(path.join(dir, f)) ? fs.readFileSync(path.join(dir, f), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)) : [];
  const page = readLines("calls.jsonl").at(-1);
  return {
    case_id: caseId,
    page: page ? { at: page.ts, call_placed: Boolean(page.result?.placed), whatsapp_sent: Boolean(page.whatsapp?.sent), brief: callBrief(page.request ?? { case_id: caseId }) } : null,
    call: readJson("callback.json") ?? null,
    whatsapp_reply: readJson("whatsapp_reply.json") ?? null,
    followup: readLines("followup.jsonl"),
  };
}

/**
 * Turns an escalation into the agent's dynamic variables. Precedence: explicit fields in the POST
 * (recipient_role, property, options, ...), then what the runner already wrote for this case (trace flags,
 * resolution, original report via CASES_DIR), then the per-flag playbook in voice/playbook.ts.
 */
function callBrief(body: any): Record<string, string> {
  const caseId = String(body.case_id ?? "unknown");
  const ctx = caseContext([OUT, LIVE_OUT], caseId, CASES_DIRS);
  const res = ctx.resolution ?? {};
  const play = playFor(ctx.flags);
  const pick = (...vals: unknown[]) => vals.find(meaningful) as string | undefined;
  const tenant = pick(body.tenant_name, ctx.tenant);
  // Spoken form: ids become names, "the tenant" becomes their name when known.
  const resText = [res.summaryForHuman, res.decision, res.escalation?.decisionRequired, body.summary, body.decision_required].filter(meaningful).join(" ");
  const say = (t: string) => { const s = speakIds(t, resText); return tenant ? s.replace(/\bthe tenant\b/gi, tenant) : s; };
  const property = pick(body.property, ctx.property);
  const assessed = pick(body.issue, body.summary, res.summaryForHuman);
  const unknowns = [...(res.missingInformation ?? []), ...(res.conflicts ?? []).map((c: any) => c.facts)].filter(meaningful);
  // P0: the call itself is the urgency, so no deadline is spoken. P1: the deadline in words.
  const tier = body.tier === "P1" ? "P1" : "P0";
  const deadline = tier === "P1" ? spokenDeadline(body.deadline) : undefined;

  // What the pipeline needs from a person comes first; the per-flag playbook is only a fallback.
  // Playbook options are dropped when the pipeline has already booked a contractor (they would offer to book one).
  const needed = pick(body.decision_required, res.escalation?.decisionRequired);
  const [askSentence, ...restAsk] = needed ? say(needed).split(/(?<=\.)\s+/) : [];
  // Option 1 is one short sentence: the first clause of what the pipeline asks a person to do.
  const firstAsk = askSentence ? askSentence.split(/;\s+|,\s+and\s+(?=arrange|confirm|check)/)[0].replace(/[.;,]*$/, ".") : undefined;
  const fromPipeline = firstAsk && !/^Review the proposed actions/i.test(firstAsk);
  const booked = ctx.executed.some((t) => /book_contractor|assign_provider/.test(t));
  const options = pick(body.options) ?? (fromPipeline
    ? `Option 1: you ${firstAsk.charAt(0).toLowerCase()}${firstAsk.slice(1)} Option 2: you attend the property yourself. Option 3: you can't take it, so we pass it straight to the next on-call manager.`
    : booked ? "Option 1: you phone the tenant now to check everyone is safe and confirm the contractor has accepted. Option 2: you attend yourself. Option 3: we pass it to the next on-call manager." : play.options);

  return {
    case_id: caseId,
    recipient_role: (pick(body.recipient_role) ?? "property manager").replace("_", " "),
    recipient_name: pick(body.recipient_name) ?? "there",
    property: property ?? "one of our managed properties (the address is in the case file)",
    property_short: property ? shortAddress(property) : "one of our properties",
    headline: play.headline,
    tenant_name: tenant ?? "the tenant",
    issue: say(assessed ?? (ctx.report ? `The tenant reported: "${ctx.report.slice(0, 250)}"` : "An urgent case needs a decision; the details are in the case file.")),
    tenant_words: ctx.report ? ctx.report.slice(0, 250) : "not available",
    already_done: ctx.done.length ? `Already done, say it is done and never offer it: ${ctx.done.join("; ")}.` : "Nothing has been actioned yet.",
    also_needed: restAsk.length ? restAsk.join(" ") : "nothing else",
    why_urgent: say(pick(body.why_urgent, res.escalation?.reason && !/^Automated checks failed/.test(res.escalation.reason) ? res.escalation.reason : undefined) ?? play.why_urgent) + (deadline ? ` A decision is needed ${deadline}.` : ""),
    risk_if_delayed: pick(body.risk_if_delayed) ?? play.risk_if_delayed,
    facts_uncertain: say(pick(body.facts_uncertain) ?? (unknowns.length ? unknowns.slice(0, 3).join(". ") : "Anything not in this summary is unconfirmed.")),
    options: say(options),
    recommended_option: pick(body.recommended_option) ?? (fromPipeline || booked ? "Option 1" : play.recommended_option),
    recommendation_reason: pick(body.recommendation_reason) ?? (fromPipeline ? "it is exactly what the case needs from a person right now" : booked ? "the contractor is already booked, so what's missing is a person checking everyone is safe" : play.recommendation_reason),
    authority_limit: pick(body.authority_limit) ?? "the agency's emergency spending limit",
  };
}

async function placeCall(body: any) {
  const key = process.env.ELEVENLABS_API_KEY, agent = process.env.ELEVENLABS_AGENT_ID, phone = process.env.ELEVENLABS_PHONE_NUMBER_ID;
  const byRole = body.recipient_role === "landlord" ? process.env.LANDLORD_PHONE_NUMBER : undefined;
  const to = body.to_number ?? byRole ?? process.env.ONCALL_PHONE_NUMBER;
  if (!key || !agent || !phone || !to) return { placed: false, reason: "voice not configured" };
  const r = await fetch("https://api.elevenlabs.io/v1/convai/twilio/outbound-call", {
    method: "POST", headers: { "xi-api-key": key, "content-type": "application/json" },
    body: JSON.stringify({
      agent_id: agent, agent_phone_number_id: phone, to_number: to,
      conversation_initiation_client_data: { dynamic_variables: callBrief(body) },
    }),
    signal: AbortSignal.timeout(8000),
  });
  const text = await r.text();
  return { placed: r.ok, status: r.status, body: text.slice(0, 500) };
}

/** ElevenLabs-Signature: "t=<unix>,v0=<hex hmac-sha256 of `${t}.${rawBody}`>". Unset secret => accept (local dev only). */
function verifySignature(raw: string, header: string | undefined): boolean {
  const secret = process.env.ELEVENLABS_WEBHOOK_SECRET;
  if (!secret) return true;
  if (!header) return false;
  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=") as [string, string]));
  if (!parts.t || !parts.v0 || Math.abs(Date.now() / 1000 - Number(parts.t)) > 30 * 60) return false;
  const expected = crypto.createHmac("sha256", secret).update(`${parts.t}.${raw}`).digest("hex");
  return expected.length === parts.v0.length && crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(parts.v0));
}

function json(res: http.ServerResponse, code: number, data: unknown) {
  res.writeHead(code, { "content-type": "application/json" }); res.end(JSON.stringify(data));
}
function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve) => { let b = ""; req.on("data", (c) => (b += c)); req.on("end", () => resolve(b)); });
}

type CaseCost = {
  amountGbp?: number;
  vat: "inc" | "plus" | "unknown";
  status: "estimated" | "quoted" | "invoiced" | "approved" | "none" | "unknown";
  source?: string;
  note?: string;
};
const COST_KEY = /(?:^|_)(?:estimated_)?(?:cost|amount|quote|invoice)(?:_gbp|gbp|_amount)?$/i;
function moneyNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return undefined;
  const match = value.match(/£?\s*([0-9][0-9,]*(?:\.\d{1,2})?)/);
  return match ? Number(match[1].replace(/,/g, "")) : undefined;
}
function costStatus(key: string, source: string): CaseCost["status"] {
  const text = `${key} ${source}`.toLowerCase();
  if (text.includes("invoice")) return "invoiced";
  if (text.includes("quote")) return "quoted";
  if (text.includes("approved")) return "approved";
  if (text.includes("estimate") || text.includes("cost")) return "estimated";
  return "unknown";
}
function costFromRecord(record: unknown, source: string, depth = 0): CaseCost | undefined {
  if (!record || typeof record !== "object" || depth > 3) return undefined;
  for (const [key, value] of Object.entries(record as Record<string, unknown>)) {
    if (COST_KEY.test(key)) {
      const amountGbp = moneyNumber(value);
      if (amountGbp !== undefined) return { amountGbp, vat: "unknown", status: costStatus(key, source), source };
    }
    if (typeof value === "string" && /£\s*[0-9]/.test(value) && /(cost|quote|invoice|estimate|amount|price|charge)/i.test(value)) {
      const amountGbp = moneyNumber(value);
      if (amountGbp !== undefined) return { amountGbp, vat: /\+\s*VAT/i.test(value) ? "plus" : /inc(?:luding)?\.?\s*VAT/i.test(value) ? "inc" : "unknown", status: costStatus(key, source), source, note: value.slice(0, 180) };
    }
    const nested = costFromRecord(value, source, depth + 1);
    if (nested) return nested;
  }
  return undefined;
}
function caseCost(events: any[], resolution: any): CaseCost {
  const direct = costFromRecord(resolution?.cost, "resolution");
  if (direct) return direct;
  const fromResolution = costFromRecord(resolution, "resolution");
  if (fromResolution) return fromResolution;
  for (const event of [...events].reverse()) {
    const source = event.name ?? event.tool ?? event.event ?? "trace";
    const found = costFromRecord(event.input ?? event, String(source));
    if (found) return found;
  }
  return { vat: "unknown", status: "unknown", note: "Not estimated yet" };
}

http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://x");
  try {
    if (req.method === "GET" && url.pathname === "/health") return json(res, 200, { ok: true });
    if (req.method === "GET" && url.pathname === "/") { res.writeHead(200, { "content-type": "text/html" }); return res.end(fs.readFileSync(path.join(process.cwd(), "public", "board.html"))); }
    if (req.method === "GET" && url.pathname === "/api/status") {
      const cases = fs.existsSync(OUT) ? fs.readdirSync(OUT, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => {
        const tf = path.join(OUT, e.name, "trace.jsonl");
        const events = fs.existsSync(tf) ? fs.readFileSync(tf, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)) : [];
        const end = events.find((x) => x.event === "case.end"); const route = events.find((x) => x.event === "route"); const submit = [...events].reverse().find((x) => x.event === "agent.submit");
        const start = events.find((x) => x.event === "agent.start");
        const answer = fs.existsSync(path.join(OUT, e.name, "ANSWER.md")) ? fs.readFileSync(path.join(OUT, e.name, "ANSWER.md"), "utf8") : "";
        const summary = answer.match(/## Summary\n([\s\S]*?)$/)?.[1]?.trim() ?? "";
        const resolution = [...events].reverse().find((x) => x.event === "tool.control" && x.tool === "submit_resolution")?.input;
        return {
          id: e.name,
          status: end ? end.status : events.length ? "running" : "queued",
          urgency: submit?.urgency ?? route?.urgency,
          family: submit?.family ?? route?.families?.[0],
          agent: start?.agent,
          summary,
          rationale: resolution?.decision,
          summaryForHuman: resolution?.summaryForHuman,
          nextAction: resolution?.nextAction,
          escalation: resolution?.escalation,
          cost: caseCost(events, resolution),
          rulesApplied: resolution?.rulesApplied,
          notDone: resolution?.notDone,
          conflicts: resolution?.conflicts,
          missingInformation: resolution?.missingInformation,
          events: events.map((x) => ({
            ts: x.ts,
            event: x.event,
            name: x.name ?? x.Name ?? x.input?.name ?? x.input?.Name,
            actionId: x.actionId,
            tool: x.tool,
            status: x.status,
            phase: x.phase,
            finish: x.finish,
            problems: x.problems,
            input: x.input,
            reason: x.reason,
            error: x.error,
          })),
        };
      }) : [];
      return json(res, 200, { cases });
    }
    const oc = url.pathname.match(/^\/api\/oncall\/([^/]+)$/);
    if (req.method === "GET" && oc) { const t = onCallTimeline(decodeURIComponent(oc[1])); return t ? json(res, 200, t) : json(res, 404, { error: "no such case" }); }
    const m = url.pathname.match(/^\/api\/cases\/([^/]+)$/);
    if (req.method === "GET" && m) {
      const dir = path.join(OUT, decodeURIComponent(m[1]));
      if (!fs.existsSync(dir)) return json(res, 404, { error: "no such case" });
      const answer = fs.existsSync(path.join(dir, "ANSWER.md")) ? fs.readFileSync(path.join(dir, "ANSWER.md"), "utf8") : "";
      return json(res, 200, { case_id: m[1], answer });
    }
    if (req.method === "POST" && url.pathname === "/api/escalations/preview") {
      const brief = callBrief(JSON.parse((await readBody(req)) || "{}"));
      return json(res, 200, { ...brief, whatsapp_text: alertText(brief) });
    }
    if (req.method === "POST" && url.pathname === "/api/escalations") {
      const body = JSON.parse((await readBody(req)) || "{}");
      const held = heldPages.get(String(body.case_id));
      if (held) { clearTimeout(held); heldPages.delete(String(body.case_id)); }
      // A live tenant report without an identified property: hold the call while the pipeline's reply asks for
      // the address; the re-run with the tenant's answer pages again with full details. Never held twice, never
      // longer than HOLD_MS, so a safety case cannot stall.
      if (!held && fs.existsSync(path.join(LIVE_CASES, String(body.case_id))) && !meaningful(callBrief(body).property_short.replace(/^one of our properties$/, ""))) {
        const caseId = String(body.case_id);
        const dir = caseDir(caseId) ?? path.join(LIVE_OUT, caseId); fs.mkdirSync(dir, { recursive: true });
        heldPages.set(caseId, setTimeout(() => { heldPages.delete(caseId); void firePage({ ...body, hold_expired: true }, dir); }, HOLD_MS));
        fs.appendFileSync(path.join(dir, "calls.jsonl"), JSON.stringify({ ts: new Date().toISOString(), request: body, result: { placed: false, held_ms: HOLD_MS, reason: "property not identified yet; waiting for the tenant's details" } }) + "\n");
        console.log(`page held for ${caseId}: property not identified, waiting up to ${HOLD_MS / 1000}s`);
        return json(res, 200, { placed: false, held: true });
      }
      const dir = [OUT, LIVE_OUT].map((d) => path.join(d, String(body.case_id ?? "unknown"))).find((d) => fs.existsSync(d)) ?? path.join(OUT, String(body.case_id ?? "unknown"));
      fs.mkdirSync(dir, { recursive: true });
      return json(res, 200, await firePage(body, dir));
    }
    if (req.method === "POST" && url.pathname === "/api/inbound") {
      const raw = await readBody(req);
      let from = "", body = "", channel = "sms";
      if ((req.headers["content-type"] ?? "").includes("application/json")) { const j = JSON.parse(raw || "{}"); from = String(j.from ?? j.From ?? ""); body = String(j.body ?? j.Body ?? ""); channel = String(j.channel ?? "sms"); }
      else {
        const p = new URLSearchParams(raw);
        if (process.env.PUBLIC_URL && !validTwilioSignature(`${process.env.PUBLIC_URL}/api/inbound`, p, req.headers["x-twilio-signature"] as string | undefined)) return json(res, 403, { error: "bad Twilio signature" });
        from = p.get("From") ?? ""; body = p.get("Body") ?? ""; channel = from.startsWith("whatsapp:") ? "whatsapp" : "sms";
      }
      const r = receiveMessage(channel, from, body);
      // Immediate acknowledgement only; the substantive reply is whatever the pipeline decides to send.
      res.writeHead(200, { "content-type": "text/xml" });
      return res.end(`<Response><Message>${ackText(r.id, r.threaded)}</Message></Response>`);
    }
    if (req.method === "POST" && url.pathname === "/api/webhooks/elevenlabs") {
      const raw = await readBody(req);
      if (!verifySignature(raw, req.headers["elevenlabs-signature"] as string | undefined)) return json(res, 401, { error: "bad signature" });
      const payload = JSON.parse(raw || "{}");
      const data = payload.data ?? {};
      const caseId = data.conversation_initiation_client_data?.dynamic_variables?.case_id ?? "unknown";
      const r = data.analysis?.data_collection_results ?? {};
      const chosen = r.chosen_option?.value ?? null;
      const status = payload.type === "call_initiation_failure" ? "no_answer" : chosen && chosen !== "none" ? "decided" : "undecided";
      const callback = {
        received_at: new Date().toISOString(), type: payload.type, status,
        chosen_option: chosen, decision: r.decision_summary?.value ?? null, spend_limit_gbp: r.spend_limit_gbp?.value ?? null,
        callback_requested: r.callback_requested?.value ?? null, failure_reason: data.failure_reason ?? null,
        summary: data.analysis?.transcript_summary ?? null, conversation_id: data.conversation_id ?? null,
      };
      const dir = caseDir(String(caseId)) ?? path.join(OUT, String(caseId)); fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "callback.json"), JSON.stringify(callback, null, 2));
      console.log(`callback for ${caseId}: ${status} option=${chosen}`);
      if (status === "decided") actOnDecision(String(caseId), { chosen_option: String(chosen), decision: callback.decision, source: "by phone" });
      return json(res, 200, { ok: true });
    }
    json(res, 404, { error: "not found" });
  } catch (e) {
    json(res, 500, { error: String(e) });
  }
}).listen(PORT, () => {
  console.log(`service on :${PORT}, output dir ${OUT}`);
  if (process.env.WHATSAPP_POLL === "1") pollWhatsApp();
});
