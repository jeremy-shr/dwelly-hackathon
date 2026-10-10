// Turns a case trace into the pipeline steps shown on the case page. Reads the trace only; never reinterprets ANSWER.md.
import type { Ev } from "./types";
import { clean } from "./api";

export type Tone = "ok" | "bad" | "warn" | "idle" | "live";
export type IEv = Ev & { i: number }; // event with its index in the trace, for the event page

export type Step = {
  key: string;
  label: string;
  line: string; // one line in the list
  line2?: string; // e.g. a reroute
  tone: Tone;
  ms: number | null; // offset from case.start to the step's last event
  events: IEv[];
};

export type Action = {
  id: string;
  tool: string;
  input: any;
  result: "success" | "failure" | "unknown" | "blocked" | "withdrawn" | "not run";
  error?: string;
  attempts: number;
  phase?: string;
};

const party = (p?: string) => clean(p ?? "someone");
const dateWord = (d?: string) => {
  if (!d) return "";
  const t = new Date(d);
  return isNaN(t.getTime()) ? d : t.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

// Plain words for a staged or executed action, built from the tool and its input.
export function describe(tool: string, i: any): { verb: string; detail: string } {
  i = i ?? {};
  switch (tool) {
    case "send_message": {
      const via = i.channel === "sms" ? "Texted" : i.channel === "whatsapp" ? "WhatsApped" : i.channel === "phone" ? "Called" : "Emailed";
      return { verb: `${via} ${party(i.to_party)}`, detail: i.subject ?? i.to_ref ?? "" };
    }
    case "set_hold":
      return { verb: `Set hold${i.until ? ` until ${dateWord(i.until)}` : ""}`, detail: `waiting for ${party(i.waiting_for)}: ${String(i.reason ?? "").replace(/^Reason:\s*/, "")}` };
    case "assign_provider":
      return { verb: `Assigned ${i.provider ? `${i.provider} as ` : ""}${i.trade ?? "contractor"}`, detail: i.scope ?? "" };
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
      return { verb: `Handed to a human (${i.tier ?? "tier unknown"})`, detail: i.decision_required ?? i.summary ?? "" };
    case "propose_action":
      return { verb: `Proposed: ${clean(i.action_type ?? i.action ?? "action")}`, detail: i.target ? `${i.target}${i.summary ? ` · ${i.summary}` : ""}` : i.summary ?? i.description ?? "" };
    case "report_blocker":
      return { verb: "Reported a blocker", detail: i.reason ?? i.summary ?? "" };
    default:
      return { verb: clean(tool), detail: typeof i === "object" ? Object.values(i).filter((v) => typeof v === "string").join(" · ") : String(i) };
  }
}

// Every staged action with what execution did to it.
export function actions(events: Ev[]): Action[] {
  const withdrawn = new Set<string>(events.filter((e) => e.event === "reconcile.withdrawn").flatMap((e) => e.withdrawn ?? []));
  return events
    .filter((e) => e.event === "tool.staged")
    .map((s) => {
      const runs = events.filter((e) => e.actionId === s.actionId && e.event.startsWith("execute."));
      const last = runs[runs.length - 1];
      let result: Action["result"] = "not run";
      if (withdrawn.has(s.actionId)) result = "withdrawn";
      else if (last?.event === "execute.success") result = "success";
      else if (last?.event === "execute.failure") result = "failure";
      else if (last?.event === "execute.unknown") result = "unknown";
      return { id: s.actionId, tool: s.tool, input: s.input ?? {}, result, error: last?.error, attempts: runs.length, phase: last?.phase };
    });
}

export const ruleIds = (text: string) => text.match(/PM-[A-Z]+-\d+/g) ?? [];

export function steps(raw: Ev[]): Step[] {
  const events: IEv[] = raw.map((e, i) => ({ ...e, i }));
  const t0 = events[0] ? Date.parse(events[0].ts) : 0;
  const of = (...names: string[]) => events.filter((e) => names.some((n) => (n.endsWith(".") ? e.event.startsWith(n) : e.event === n)));
  const at = (evs: IEv[]) => (evs.length ? Date.parse(evs[evs.length - 1].ts) - t0 : null);
  const ended = events.some((e) => e.event === "case.end");
  const pending = (): Tone => (ended ? "idle" : "live");

  const start = of("case.start");
  const routeEv = of("route", "route.error", "agent.start", "agent.reroute", "agent.fallback_model");
  const look = of("prefetch", "prefetch.error", "tool.read");
  const propose = of("tool.staged", "agent.step", "tool.control", "agent.submit", "agent.error");
  const check = of("checks", "revision.failed", "tool.blocked");
  const exec = of("execute.");
  const recon = of("reconcile.", "claims.unresolved");
  const esc = of("escalate.");
  const end = of("case.end");

  const s0 = start[0];
  const r = routeEv.find((e) => e.event === "route");
  const ag = routeEv.find((e) => e.event === "agent.start");
  const re = routeEv.filter((e) => e.event === "agent.reroute" || e.event === "agent.fallback_model");
  const pf = look.find((e) => e.event === "prefetch");
  const reads = look.filter((e) => e.event === "tool.read");
  const found = Array.isArray(pf?.found) ? pf!.found.length : 0;
  const staged = propose.filter((e) => e.event === "tool.staged");
  const submitted = propose.some((e) => e.event === "agent.submit");
  const passes = check.filter((e) => e.event === "checks");
  const blocks = check.filter((e) => e.event === "tool.blocked");
  const problems = passes.flatMap((p) => p.problems ?? []);
  const acts = actions(events);
  const done = acts.filter((a) => a.result === "success").length;
  const failed = acts.filter((a) => a.result === "failure").length;
  const unknown = acts.filter((a) => a.result === "unknown").length;
  const withdrawn = recon.filter((e) => e.event === "reconcile.withdrawn").flatMap((e) => e.withdrawn ?? []);
  const retried = acts.filter((a) => a.attempts > 1);
  const resolution = [...events].reverse().find((e) => e.event === "tool.control" && e.tool === "submit_resolution")?.input;
  const tier: string | undefined = resolution?.escalation?.tier;
  const page = esc[esc.length - 1];
  const pageWord = page
    ? page.event === "escalate.p0.call"
      ? `paged${page.status ? ` (${page.status})` : ""}`
      : page.event === "escalate.p0.recorded"
        ? "page recorded, no line on this run"
        : page.event === "escalate.p0.rate_limited"
          ? "page rate-limited"
          : page.event === "escalate.p0.call_failed"
            ? "call failed"
            : clean(page.event.replace("escalate.p0.", ""))
    : null;
  const e0 = end[0];

  const list: Step[] = [
    {
      key: "received",
      label: "Received",
      line: s0 ? `${clean(s0.channel) || "unknown channel"} · ${s0.flags?.length ? `flags: ${s0.flags.map(clean).join(", ")}` : "no flags"}` : "waiting",
      tone: s0 ? (s0.flags?.length ? "warn" : "ok") : "live",
      ms: start.length ? 0 : null,
      events: start,
    },
    {
      key: "routed",
      label: "Routed",
      line: r ? `${r.urgency} · ${(r.families ?? []).map(clean).join(", ")} · ${Math.round((r.confidence ?? 0) * 100)}% · to ${ag?.agent ?? "agent"}` : routeEv.some((e) => e.event === "route.error") ? "router error" : "",
      line2: re.length ? re.map((e) => (e.event === "agent.reroute" ? `rerouted to ${e.to ?? e.agent ?? "?"}${e.reason ? `: ${e.reason}` : ""}` : `fell back to ${e.model ?? e.to ?? "another model"}`)).join(" · ") : undefined,
      tone: routeEv.some((e) => e.event === "route.error") ? "bad" : r ? (r.urgency === "P0" ? "bad" : r.urgency === "P1" ? "warn" : "ok") : pending(),
      ms: at(routeEv),
      events: routeEv,
    },
    {
      key: "lookup",
      label: "Looked up",
      line: pf || reads.length ? `${reads.length} live read${reads.length === 1 ? "" : "s"} · ${found} record${found === 1 ? "" : "s"} prefetched` : "",
      tone: look.some((e) => e.event === "prefetch.error") ? "warn" : pf || reads.length ? "ok" : pending(),
      ms: at(look),
      events: look,
    },
    {
      key: "proposed",
      label: "Proposed",
      line: staged.length ? `${staged.length} action${staged.length === 1 ? "" : "s"}: ${staged.map((e) => describe(e.tool, e.input).verb).join(", ")}` : propose.length ? "thinking" : "",
      tone: propose.some((e) => e.event === "agent.error") ? "warn" : submitted ? "ok" : staged.length || propose.length ? "live" : pending(),
      ms: at(propose),
      events: propose,
    },
    {
      key: "checked",
      label: "Checked",
      line: passes.length || blocks.length
        ? [
            ...passes.map((p) => `pass ${p.pass}${p.stage ? ` (${p.stage})` : ""}: ${p.problems?.length ? `fail ${[...new Set(p.problems.flatMap((x: string) => ruleIds(x)))].join(" ")}` : "clean"}`),
            ...(blocks.length ? [`blocked ${[...new Set(blocks.flatMap((b) => ruleIds(b.reason ?? "")))].join(" ")}`] : []),
          ].join(" · ")
        : "",
      tone: blocks.length ? "bad" : problems.length ? "warn" : passes.length ? "ok" : pending(),
      ms: at(check),
      events: check,
    },
    {
      key: "executed",
      label: "Executed",
      line: exec.length ? [`${done} done`, failed && `${failed} failed`, unknown && `${unknown} unknown`].filter(Boolean).join(" · ") : "",
      tone: failed || unknown ? "bad" : exec.length ? "ok" : pending(),
      ms: at(exec),
      events: exec,
    },
  ];
  if (recon.length) {
    list.push({
      key: "reconciled",
      label: "Reconciled",
      line: [withdrawn.length && `${withdrawn.length} message${withdrawn.length === 1 ? "" : "s"} withdrawn`, retried.length && `retried ${retried.map((a) => clean(a.tool)).join(", ")}`, recon.some((e) => e.event === "claims.unresolved" && e.unrecovered) && "not recovered"].filter(Boolean).join(" · ") || "reconciled",
      tone: "bad",
      ms: at(recon),
      events: recon,
    });
  }
  list.push(
    {
      key: "escalated",
      label: "Escalated",
      line: tier && tier !== "none" ? `${tier} · ${pageWord ?? (tier === "P0" ? (ended ? "no page event" : "paging") : "handover recorded for the duty manager")}` : esc.length ? pageWord ?? "" : ended ? "none" : "",
      tone: tier === "P0" || esc.some((e) => /failed|rate/.test(e.event)) ? "bad" : tier === "P1" ? "warn" : ended ? "idle" : esc.length ? "warn" : pending(),
      ms: at(esc),
      events: esc,
    },
    {
      key: "written",
      label: "Written",
      line: e0 ? `${clean(e0.status)} · ${(e0.ms / 1000).toFixed(1)} s` : "",
      tone: e0 ? (e0.status === "error" || e0.status === "blocked" ? "bad" : "ok") : pending(),
      ms: at(end),
      events: end,
    },
  );
  return list;
}

// One line of an event's payload for the trace list.
export function oneLine(e: Ev): string {
  const { ts: _t, case: _c, event: _e, usage: _u, i: _i, ...rest } = e as any;
  return JSON.stringify(rest);
}

export const offset = (ms: number | null) => (ms == null ? "" : ms < 1000 ? `+${ms} ms` : `+${(ms / 1000).toFixed(1)} s`);
