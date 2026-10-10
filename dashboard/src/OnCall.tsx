// The on-call story for a case that paged: handover, page status, WhatsApp page and reply, and the call outcome
// from callback.json. Everything here is polled with the case, so the decision appears when the file lands.
import type { CaseDetail } from "./types";
import { clean } from "./api";

const time = (ts?: string | null) => (ts ? new Date(ts).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "");

type Entry = { ts?: string | null; who: string; what: string; tone: "ok" | "bad" | "warn" | "live" | "idle"; body?: string };

export function hasOnCall(d: CaseDetail) {
  return d.events.some((e) => e.event.startsWith("escalate.p0.")) || !!d.callback || !!d.alert || !!d.whatsapp_reply;
}

export function OnCall({ d }: { d: CaseDetail }) {
  const e = d.resolution?.escalation ?? {};
  const pages = d.events.filter((x) => x.event.startsWith("escalate.p0."));
  const submit = d.events.find((x) => x.event === "tool.control" && x.tool === "submit_resolution");
  const cb = d.callback;
  const wa = d.whatsapp_reply;

  const log: Entry[] = [];
  if (submit) log.push({ ts: submit.ts, who: "Agent", what: `Escalated ${e.tier ?? ""}: ${e.decisionRequired ?? "decision needed"}`, tone: "warn" });
  for (const p of pages) {
    const kind = p.event.replace("escalate.p0.", "");
    log.push({
      ts: p.ts,
      who: "System",
      what:
        kind === "call" ? `Placed the on-call phone page${p.status ? ` (${clean(String(p.status))})` : ""}` :
        kind === "recorded" ? "Page recorded; no phone line configured on this run" :
        kind === "rate_limited" ? "Page held back: another page went out in the last two minutes" :
        kind === "call_failed" ? `Call failed${p.error ? `: ${p.error}` : ""}` : clean(kind),
      tone: kind === "call" ? "ok" : kind === "recorded" ? "idle" : "bad",
    });
  }
  if (d.alert) log.push({ ts: d.alert.sent_at, who: "System", what: `WhatsApp page sent to ${d.alert.to}`, tone: "ok" });
  if (wa) log.push({ ts: wa.received_at, who: "On-call manager", what: `Replied on WhatsApp${wa.chosen_option && wa.chosen_option !== "none" ? `: option ${wa.chosen_option}` : ""}${wa.callback_requested ? " · asked for a call back" : ""}`, tone: "ok", body: wa.text });
  if (cb) {
    log.push({
      ts: cb.received_at,
      who: "On-call manager",
      what:
        cb.status === "decided" ? `Decided on the call: option ${cb.chosen_option}` :
        cb.status === "no_answer" ? `Did not answer${cb.failure_reason ? ` (${cb.failure_reason})` : ""}` :
        "Call ended without a decision",
      tone: cb.status === "decided" ? "ok" : "bad",
      body: [cb.decision, cb.spend_limit_gbp != null ? `Spend limit £${cb.spend_limit_gbp}` : "", cb.callback_requested ? "Asked for a call back" : "", cb.summary].filter(Boolean).join("\n\n"),
    });
  }
  const waiting = pages.some((p) => p.event === "escalate.p0.call") && !cb;

  return (
    <div className="section">
      <div className="col-h">On-call</div>
      <dl className="kv">
        <dt>Handover</dt><dd>{e.handover ?? d.resolution?.summaryForHuman ?? "–"}</dd>
        <dt>Decision needed</dt><dd>{e.decisionRequired ?? "–"}</dd>
        {e.deadline && <><dt>Deadline</dt><dd className="mono">{e.deadline}</dd></>}
        <dt>Page</dt>
        <dd>{pages.length ? pages.map((p) => clean(p.event.replace("escalate.p0.", ""))).join(", ") : e.tier === "P0" ? "pending" : "not paged"}{cb ? ` · decision recorded` : waiting ? " · waiting for the call outcome" : ""}</dd>
      </dl>
      <ol className="log">
        {log.map((x, i) => (
          <li key={i} data-tone={x.tone}>
            <span className="t">{time(x.ts)}</span>
            <span className="mark" />
            <span>
              <span className="who">{x.who}</span> {x.what}
              {x.body && <pre className="msg-body">{x.body}</pre>}
            </span>
          </li>
        ))}
        {waiting && (
          <li data-tone="live"><span className="t" /><span className="mark" /><span className="live-t">Waiting for the call outcome</span></li>
        )}
      </ol>
    </div>
  );
}
