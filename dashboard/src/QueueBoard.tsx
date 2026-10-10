import type { Row, Summary } from "./types";
import { clean } from "./api";

function phase(r: Row) {
  const c = r.counts;
  if (c.executed) return `actioning · ${c.executed} done`;
  if (c.staged) return `proposed ${c.staged} actions`;
  if (c.reads) return `looking up · ${c.reads} reads`;
  return "routing";
}

export function QueueBoard({ rows, summary, onOpen }: { rows: Row[]; summary: Summary | null; onOpen: (f: string) => void }) {
  const by = summary?.by_status ?? {};
  const counts: [string, number | string, string?][] = [
    ["cases", summary?.total ?? rows.length],
    ["done", summary?.completed ?? 0],
    ["working", by.running ?? 0, "live"],
    ["scheduled", by.scheduled ?? 0],
    ["awaiting approval", by.awaiting_approval ?? 0],
    ["on hold", by.on_hold ?? 0],
    ["escalated", by.escalated ?? 0, "warn"],
  ];
  return (
    <main className="page queue">
      <div className="strip mono">
        {counts.map(([k, v, t]) => (
          <span key={k} data-t={t && Number(v) > 0 ? t : undefined}>
            <b>{v}</b> {k}
          </span>
        ))}
        <span className="strip-end">{summary?.elapsed != null ? `${summary.elapsed} s elapsed` : ""}</span>
      </div>
      <table className="ledger">
        <thead>
          <tr>
            <th className="c-u" />
            <th className="c-id">Case</th>
            <th>Property</th>
            <th className="c-f">Family</th>
            <th>Where it stands</th>
            <th className="c-s">State</th>
            <th>Next action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={7} className="muted pad">Waiting for the runner. Rows appear as each case folder is written.</td></tr>
          )}
          {rows.map((r) => (
            <tr key={r.folder} data-status={r.status} onClick={() => onOpen(r.folder)} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onOpen(r.folder)}>
              <td className="c-u"><span className={`urg u-${r.urgency ?? "none"}`}>{r.urgency ?? ""}</span></td>
              <td className="c-id mono">
                {r.case_id}
                {r.counts.failed + r.counts.withdrawn > 0 && <span className="flag bad" title="execution failure handled">exc</span>}
                {r.page && <span className="flag warn" title={`on-call ${r.page}`}>call</span>}
              </td>
              <td className="clip">{r.property ?? <span className="muted">{clean(r.channel)}</span>}</td>
              <td className="c-f">{clean(r.family)}</td>
              <td className="clip">{r.status === "running" ? <span className="live-t">{phase(r)}</span> : r.next.stage ?? ""}</td>
              <td className="c-s"><span className={`state s-${r.status}`}>{clean(r.status)}</span></td>
              <td className="clip mono small">{r.next.type ? `${clean(r.next.type)} → ${r.next.recipient}` : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
