import { useState } from "react";
import type { Row, Summary } from "./types";
import { clean } from "./api";

// What a running case is doing right now, from its last trace event.
function phase(r: Row) {
  const e = r.last_event ?? "";
  if (e.startsWith("execute.") || e.startsWith("reconcile.")) return `executing · ${r.counts.executed} done`;
  if (e === "checks" || e === "agent.submit") return "checking";
  if (e === "tool.staged" || e === "agent.step" || e === "tool.control") return `proposing · ${r.counts.staged} staged`;
  if (e === "tool.read" || e === "prefetch") return "looking up";
  if (e === "route" || e === "agent.start") return "routing";
  if (e.startsWith("escalate.")) return "paging on-call";
  return "starting";
}

// Emergency banner text for a P0 case, at whatever stage the trace has reached.
function emergency(r: Row): { stage: number; text: string } {
  const head = r.handover ? `Emergency: ${r.handover.replace(/\.$/, "")}.` : `Emergency: case ${r.case_id}${r.property ? `, ${r.property}` : ""}. ${r.route_reasons ?? ""}`;
  if (r.callback && r.callback.chosen_option && r.callback.chosen_option !== "none") {
    return { stage: 3, text: `${head} Decision recorded: option ${r.callback.chosen_option}${r.callback.decision ? `, ${r.callback.decision}` : ""}` };
  }
  if (r.callback) return { stage: 3, text: `${head} Call ended with no decision (${clean(r.callback.status)}).` };
  if (r.paged) return { stage: 2, text: `${head} Paging the on-call manager. Paged.` };
  if (r.page === "recorded") return { stage: 2, text: `${head} Paging the on-call manager. Page recorded; no phone line on this run.` };
  if (r.page === "rate_limited") return { stage: 2, text: `${head} Paging the on-call manager. Page held back by the rate limit.` };
  if (r.page === "call_failed") return { stage: 2, text: `${head} Paging the on-call manager. Call failed.` };
  return { stage: r.handover ? 1 : 0, text: `${head} Paging the on-call manager.` };
}

export function Queue({ rows, summary, onOpen }: { rows: Row[]; summary: Summary | null; onOpen: (key: string) => void }) {
  const [dismissed, setDismissed] = useState<Set<string>>(() => new Set());
  const by = summary?.by_status ?? {};
  const alerts = rows
    .filter((r) => r.urgency === "P0")
    .map((r) => ({ r, ...emergency(r) }))
    .filter((a) => !dismissed.has(`${a.r.key}@${a.stage}`));

  return (
    <main className="page">
      <div className="strip mono">
        <span><b>{summary?.done ?? 0}</b>/{summary?.total ?? rows.length} done</span>
        <span><b>{summary?.elapsed ?? 0}</b> s</span>
        <span><b>{summary?.parallel ?? 0}</b> in parallel</span>
        {(summary?.running ?? 0) > 0 && <span className="live-t"><b>{summary!.running}</b> running</span>}
        <span className="gap" />
        <span><b>{by.scheduled ?? 0}</b> scheduled</span>
        <span><b>{by.awaiting_approval ?? 0}</b> awaiting approval</span>
        <span><b>{by.on_hold ?? 0}</b> on hold</span>
        <span><b>{by.escalated ?? 0}</b> escalated</span>
        <span data-t={(summary?.failed ?? 0) > 0 ? "bad" : undefined}><b>{summary?.failed ?? 0}</b> failed</span>
      </div>

      {alerts.map((a) => (
        <div key={`${a.r.key}@${a.stage}`} className="alarm" role="alert" onClick={() => setDismissed(new Set(dismissed).add(`${a.r.key}@${a.stage}`))} title="Click to dismiss">
          <span className="mono alarm-tag">P0</span>
          <span className="alarm-text">{a.text}</span>
          <button className="alarm-open mono" onClick={(e) => { e.stopPropagation(); onOpen(a.r.key); }}>case {a.r.case_id} →</button>
        </div>
      ))}

      <table className="ledger">
        <thead>
          <tr>
            <th className="c-u" />
            <th className="c-id">Case</th>
            <th className="c-ch">Channel</th>
            <th>Property</th>
            <th className="c-f">Family</th>
            <th>Stage</th>
            <th className="c-s">State</th>
            <th>Next action</th>
            <th className="c-t">s</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={9} className="muted pad">Waiting for the runner. Rows appear as each case folder is written.</td></tr>
          )}
          {rows.map((r) => (
            <tr key={r.key} data-status={r.status} onClick={() => onOpen(r.key)} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onOpen(r.key)}>
              <td className="c-u"><span className={`urg u-${r.urgency ?? "none"}`}>{r.urgency ?? ""}</span></td>
              <td className="c-id mono">
                {r.case_id}
                {r.counts.failed + r.counts.withdrawn > 0 && <span className="flag bad" title="execution failure handled">exc</span>}
                {r.counts.blocked > 0 && <span className="flag bad" title="a write was blocked by a guard">blk</span>}
                {(r.paged || r.page) && <span className="flag warn" title={`on-call page ${clean(r.page)}`}>page</span>}
              </td>
              <td className="c-ch">{clean(r.channel) || <span className="muted">·</span>}</td>
              <td className="clip">{r.property ?? <span className="muted">·</span>}</td>
              <td className="c-f">{clean(r.family)}</td>
              <td className="clip">{r.status === "running" ? <span className="live-t">{phase(r)}</span> : r.status === "queued" ? <span className="muted">queued</span> : r.next.stage ?? ""}</td>
              <td className="c-s"><span className={`state s-${r.status}`}>{clean(r.status)}</span></td>
              <td className="clip mono small">{r.next.type ? `${clean(r.next.type)} → ${r.next.recipient}` : ""}</td>
              <td className="c-t mono">{r.seconds ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
