// Turns a case trace into the pipeline steps shown on the case page. Reads only; never reinterprets ANSWER.md.
import type { Ev } from "./types";
import { clean } from "./api";

export type Tone = "ok" | "bad" | "warn" | "idle" | "live";

export type Step = {
  key: string;
  label: string;
  line: string; // one-line result shown in the list
  tone: Tone;
  ms: number | null; // time from case start
  events: Ev[];
};

export type Action = {
  id: string;
  tool: string;
  input: any;
  result: "done" | "failed" | "unknown" | "blocked" | "withdrawn" | "for human" | "pending";
  error?: string;
  attempts: number;
};

const has = (evs: Ev[], name: string) => evs.some((e) => e.event === name);
const of = (evs: Ev[], ...names: string[]) => evs.filter((e) => names.some((n) => (n.endsWith(".") ? e.event.startsWith(n) : e.event === n)));

export function actions(events: Ev[]): Action[] {
  const staged = of(events, "tool.staged");
  const out: Action[] = staged.map((s) => {
    const runs = events.filter((e) => e.actionId === s.actionId && e.event.startsWith("execute."));
    const last = runs[runs.length - 1];
    const withdrawn = events.some((e) => e.event === "reconcile.withdrawn" && (e.actionId === s.actionId || e.withdrawn?.includes?.(s.actionId)));
    let result: Action["result"] = "pending";
    if (withdrawn) result = "withdrawn";
    else if (last?.event === "execute.success") result = "done";
    else if (last?.event === "execute.failure") result = "failed";
    else if (last?.event === "execute.unknown") result = "unknown";
    else if (s.tool === "escalate" || s.tool === "propose_action" || s.tool === "report_blocker") result = "for human";
    else if (has(events, "case.end")) result = "pending";
    return { id: s.actionId, tool: s.tool, input: s.input ?? {}, result, error: last?.error, attempts: runs.length };
  });
  for (const b of of(events, "tool.blocked")) {
    out.push({ id: b.actionId ?? `${b.tool}#blocked`, tool: b.tool, input: b.input ?? {}, result: "blocked", error: b.reason, attempts: 0 });
  }
  return out;
}

const party = (p?: string) => clean(p === "contractor" ? "contractor" : p ?? "someone");
const dateWord = (d?: string) => {
  if (!d) return "";
  const t = new Date(d);
  return isNaN(t.getTime()) ? d : t.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

// Plain words for what happened in the real world.
export function describe(a: Action): { verb: string; detail: string } {
  const i = a.input ?? {};
  switch (a.tool) {
    case "send_message": {
      const via = i.channel === "sms" ? "Texted" : i.channel === "whatsapp" ? "WhatsApped" : i.channel === "phone" ? "Called" : "Emailed";
      return { verb: `${via} ${party(i.to_party)}`, detail: i.subject ?? i.to_ref ?? "" };
    }
    case "set_hold":
      return { verb: `On hold for ${party(i.waiting_for)}${i.until ? ` until ${dateWord(i.until)}` : ""}`, detail: String(i.reason ?? "").replace(/^Reason:\s*/, "") };
    case "assign_provider":
      return { verb: `Assigned ${i.provider ?? "a"} ${i.trade ?? "contractor"}`.replace("a a", "an a"), detail: i.scope ?? "" };
    case "book_contractor":
      return { verb: `Booked ${i.contractor ?? i.provider ?? "contractor"}${i.slot ? ` for ${i.slot}` : ""}`, detail: i.scope ?? i.reason ?? "" };
    case "book_inspection":
      return { verb: "Booked an inspection", detail: i.reason ?? i.scope ?? "" };
    case "record_landlord_decision":
      return { verb: "Recorded the landlord's decision", detail: i.decision ?? "" };
    case "create_ticket":
      return { verb: "Opened a ticket", detail: i.title ?? i.summary ?? i.description ?? "" };
    case "update_ticket":
      return { verb: "Noted on the ticket", detail: i.note ?? "" };
    case "create_work_order":
      return { verb: "Raised a work order", detail: i.scope ?? i.description ?? "" };
    case "request_quote":
      return { verb: "Asked for a quote", detail: i.scope ?? "" };
    case "close_case":
      return { verb: "Closed the case", detail: i.reason ?? "" };
    case "escalate":
      return { verb: `Handed to a manager (${i.tier ?? "human"})`, detail: i.decision_required ?? i.summary ?? "" };
    case "propose_action":
      return { verb: "Proposed for approval", detail: i.action ?? i.summary ?? i.description ?? "" };
    case "report_blocker":
      return { verb: "Reported a blocker", detail: i.reason ?? i.summary ?? "" };
    default:
      return { verb: clean(a.tool), detail: typeof i === "object" ? Object.values(i).filter((v) => typeof v === "string").join(" · ") : String(i) };
  }
}

export function steps(events: Ev[]): Step[] {
  const t0 = events[0] ? Date.parse(events[0].ts) : 0;
  const at = (evs: Ev[]) => (evs.length ? Date.parse(evs[evs.length - 1].ts) - t0 : null);
  const ended = has(events, "case.end");
  const pend = (started: boolean): Tone => (started ? "ok" : ended ? "idle" : "live");

  const start = of(events, "case.start");
  const route = of(events, "route", "route.error");
  const look = of(events, "prefetch", "prefetch.error", "tool.read");
  const think = of(events, "agent.start", "agent.step", "agent.submit", "agent.reroute", "agent.fallback_model", "agent.error", "tool.control");
  const check = of(events, "checks", "revision.failed", "tool.blocked");
  const exec = of(events, "tool.staged", "execute.", "reconcile.", "claims.unresolved");
  const esc = of(events, "escalate.");
  const end = of(events, "case.end");

  const r = route.find((e) => e.event === "route");
  const ag = think.find((e) => e.event === "agent.start");
  const reroutes = think.filter((e) => e.event === "agent.reroute" || e.event === "agent.fallback_model").length;
  const s0 = start[0];
  const pf = look.find((e) => e.event === "prefetch");
  const reads = look.filter((e) => e.event === "tool.read").length;
  const found = Array.isArray(pf?.found) ? pf!.found.length : 0;
  const lastCheck = [...check].reverse().find((e) => e.event === "checks");
  const problems = check.filter((e) => e.event === "checks").flatMap((e) => e.problems ?? []);
  const blocked = check.filter((e) => e.event === "tool.blocked").length;
  const acts = actions(events);
  const done = acts.filter((a) => a.result === "done").length;
  const failed = acts.filter((a) => a.result === "failed" || a.result === "unknown").length;
  const withdrawn = acts.filter((a) => a.result === "withdrawn").length;
  const realActs = acts.filter((a) => a.result !== "blocked" && a.result !== "for human");
  const page = esc[esc.length - 1];
  const submitted = think.find((e) => e.event === "agent.submit");
  const modelSteps = think.filter((e) => e.event === "agent.step").length;

  return [
    {
      key: "received",
      label: "Received",
      line: s0 ? [clean(s0.channel), s0.flags?.length ? `${s0.flags.length} flag${s0.flags.length > 1 ? "s" : ""}` : "no flags"].join(" · ") : "waiting",
      tone: s0 ? (s0.flags?.length ? "warn" : "ok") : "live",
      ms: start.length ? 0 : null,
      events: start,
    },
    {
      key: "routed",
      label: "Routed",
      line: r ? `${r.urgency} · ${(r.families ?? []).map(clean).join(", ")} → ${ag?.agent ?? "agent"}${reroutes ? " · rerouted" : ""}` : "",
      tone: route.some((e) => e.event === "route.error") ? "bad" : r ? (r.urgency === "P0" ? "bad" : r.urgency === "P1" ? "warn" : "ok") : pend(false),
      ms: at(route),
      events: [...route, ...think.filter((e) => e.event === "agent.start" || e.event === "agent.reroute")],
    },
    {
      key: "lookup",
      label: "Looked up",
      line: pf || reads ? `${found} record${found === 1 ? "" : "s"} prefetched · ${reads} live read${reads === 1 ? "" : "s"}` : "",
      tone: look.some((e) => e.event === "prefetch.error") ? "warn" : pf || reads ? "ok" : pend(false),
      ms: at(look),
      events: look,
    },
    {
      key: "decided",
      label: "Decided",
      line: submitted ? `${modelSteps} model step${modelSteps === 1 ? "" : "s"} · ${submitted.staged ?? acts.length} actions proposed` : ag ? "thinking" : "",
      tone: think.some((e) => e.event === "agent.error") ? "warn" : submitted ? "ok" : ag && !ended ? "live" : pend(false),
      ms: at(think),
      events: think,
    },
    {
      key: "checked",
      label: "Checked",
      line: lastCheck ? (problems.length ? `${problems.length} rule problem${problems.length > 1 ? "s" : ""} caught${blocked ? ` · ${blocked} blocked` : ""}` : `all rules pass${blocked ? ` · ${blocked} blocked` : ""}`) : "",
      tone: lastCheck ? (lastCheck.pass ? (problems.length || blocked ? "warn" : "ok") : "bad") : pend(false),
      ms: at(check),
      events: check,
    },
    {
      key: "executed",
      label: "Actioned",
      line: realActs.length || exec.some((e) => e.event.startsWith("execute.")) ? [`${done} done`, failed && `${failed} failed`, withdrawn && `${withdrawn} withdrawn`].filter(Boolean).join(" · ") : "",
      tone: failed || withdrawn ? "bad" : done ? "ok" : pend(false),
      ms: at(exec.filter((e) => e.event !== "tool.staged")),
      events: exec,
    },
    {
      key: "escalated",
      label: "Escalated",
      line: page ? clean(page.event.replace("escalate.p0.", "on-call ")) + (page.status ? ` · ${clean(page.status)}` : "") : acts.some((a) => a.tool === "escalate") ? "manager handover recorded" : ended ? "not needed" : "",
      tone: page ? (/failed|rate/.test(page.event) ? "bad" : "warn") : acts.some((a) => a.tool === "escalate") ? "warn" : ended ? "idle" : "idle",
      ms: at(esc),
      events: esc,
    },
    {
      key: "written",
      label: "Written",
      line: end[0] ? `${clean(end[0].status)} · ${(end[0].ms / 1000).toFixed(0)} s` : "",
      tone: end[0] ? (end[0].status === "error" || end[0].status === "blocked" ? "bad" : "ok") : pend(false),
      ms: at(end),
      events: end,
    },
  ];
}
