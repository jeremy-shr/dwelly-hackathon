import { useEffect, useState } from "react";
import { usePoll, clean } from "./api";
import type { CaseDetail, Row } from "./types";

const time = (ts?: string) => (ts ? new Date(ts).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "");

export function Calls({ q, rows, initial, onOpenCase }: { q: string; rows: Row[]; initial: string | null; onOpenCase: (f: string) => void }) {
  const rank = (r: Row) => (r.has_callback ? 0 : r.page === "call" ? 1 : (r.escalation ?? r.urgency) === "P0" ? 2 : 3);
  const esc = rows.filter((r) => r.page || r.has_callback || (r.escalation && r.escalation !== "none")).sort((a, b) => rank(a) - rank(b));
  const [sel, setSel] = useState<string | null>(initial);
  useEffect(() => {
    if (initial) setSel(initial);
  }, [initial]);
  const current = sel ?? esc[0]?.folder ?? null;

  return (
    <main className="page calls">
      <aside className="call-list">
        <div className="col-h">Escalations · {esc.length}</div>
        {esc.length === 0 && <p className="muted pad">No case in this run needed a human.</p>}
        {esc.map((r) => (
          <button key={r.folder} className="call-row" data-on={r.folder === current} onClick={() => setSel(r.folder)}>
            <span className={`urg u-${r.escalation ?? r.urgency}`}>{r.escalation ?? r.urgency}</span>
            <span className="mono">{r.case_id}</span>
            <span className="call-st">{r.has_callback ? clean(r.callback_status ?? "answered") : r.page ? clean(r.page) : "handover"}</span>
          </button>
        ))}
      </aside>
      {current ? <CallLog q={q} folder={current} onOpenCase={onOpenCase} /> : <section />}
    </main>
  );
}

function CallLog({ q, folder, onOpenCase }: { q: string; folder: string; onOpenCase: (f: string) => void }) {
  const d = usePoll<CaseDetail>(`/api/case/${encodeURIComponent(folder)}${q}`, 1500);
  if (!d) return <section className="call-log"><p className="muted">Loading</p></section>;
  const e = d.resolution?.escalation ?? {};
  const pages = d.events.filter((x) => x.event.startsWith("escalate."));
  const handover = d.events.find((x) => x.event === "tool.control" && x.tool === "submit_resolution");
  const cb = d.callback;
  const wa = d.whatsapp;

  const entries: { ts?: string; who: string; what: string; tone: string; body?: string }[] = [];
  if (handover) entries.push({ ts: handover.ts, who: "Agent", what: `Escalated ${e.tier ?? ""}: ${e.decisionRequired ?? "decision needed"}`, tone: "warn" });
  for (const p of pages) {
    const kind = p.event.replace("escalate.p0.", "");
    const what =
      kind === "call" ? `Placed on-call phone page${p.status ? ` (${clean(p.status)})` : ""}` :
      kind === "recorded" ? "Page recorded; no phone line configured on this run" :
      kind === "rate_limited" ? "Page held back by rate limit" :
      kind === "call_failed" ? `Call failed${p.error ? `: ${p.error}` : ""}` : clean(kind);
    entries.push({ ts: p.ts, who: "System", what, tone: kind === "call" ? "live" : kind === "recorded" ? "idle" : "bad" });
  }
  if (cb) {
    entries.push({
      ts: cb.received_at,
      who: "On-call manager",
      what: cb.status === "decided" ? `Decided on the call: option ${cb.chosen_option}` : cb.status === "no_answer" ? "Did not answer" : "Call ended without a decision",
      tone: cb.status === "decided" ? "ok" : "bad",
      body: [cb.decision, cb.spend_limit_gbp ? `Spend limit £${cb.spend_limit_gbp}` : "", cb.summary].filter(Boolean).join("\n\n"),
    });
  }
  if (wa) entries.push({ ts: wa.received_at, who: "On-call manager", what: `WhatsApp reply${wa.chosen_option && wa.chosen_option !== "none" ? `: option ${wa.chosen_option}` : ""}`, tone: "ok", body: wa.text });

  return (
    <section className="call-log">
      <div className="case-title">
        <span className="mono case-num">{d.summary.case_id}</span>
        <span className={`urg u-${e.tier ?? d.summary.urgency}`}>{e.tier ?? d.summary.urgency}</span>
        <button className="link" onClick={() => onOpenCase(folder)}>Open case →</button>
      </div>
      <div className="case-sub">{d.summary.property}</div>

      <h3>Handover brief</h3>
      <dl className="kv">
        <dt>Decision needed</dt><dd>{e.decisionRequired ?? "–"}</dd>
        <dt>Why</dt><dd>{e.reason ?? "–"}</dd>
        {e.deadline && <><dt>Deadline</dt><dd className="mono">{e.deadline}</dd></>}
        <dt>Summary</dt><dd>{d.resolution?.summaryForHuman ?? "–"}</dd>
      </dl>

      <h3>Call log</h3>
      <ol className="log">
        {entries.map((x, i) => (
          <li key={i} data-tone={x.tone}>
            <span className="mono muted">{time(x.ts)}</span>
            <span className="mark" />
            <span>
              <span className="who">{x.who}</span> {x.what}
              {x.body && <pre className="msg">{x.body}</pre>}
            </span>
          </li>
        ))}
        {!cb && pages.some((p) => p.event === "escalate.p0.call") && (
          <li data-tone="live"><span /><span className="mark" /><span className="muted">Waiting for the call outcome</span></li>
        )}
      </ol>
    </section>
  );
}
