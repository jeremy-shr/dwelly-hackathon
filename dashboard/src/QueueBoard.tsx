import type { Row, Summary } from "./types";
import { clean } from "./api";

const tiles: { label: string; get: (s: Summary | null, rows: Row[]) => string | number }[] = [
  { label: "Processed", get: (s, r) => `${s?.completed ?? 0}/${s?.total ?? r.length}` },
  { label: "Scheduled", get: (s) => s?.by_status.scheduled ?? 0 },
  { label: "Awaiting approval", get: (s) => s?.by_status.awaiting_approval ?? 0 },
  { label: "On hold", get: (s) => s?.by_status.on_hold ?? 0 },
  { label: "Escalated", get: (s) => s?.by_status.escalated ?? 0 },
  { label: "Elapsed", get: (s) => (s?.elapsed != null ? `${s.elapsed}s` : "–") },
];

export function Urgency({ u }: { u: string | null }) {
  return <span className={`urg urg-${u ?? "none"}`}>{u ?? "··"}</span>;
}

export function Status({ s }: { s: string }) {
  return <span className={`status st-${s}`}>{clean(s)}</span>;
}

function live(r: Row) {
  const c = r.counts;
  return [c.reads && `${c.reads} reads`, c.staged && `${c.staged} staged`, c.executed && `${c.executed} executed`].filter(Boolean).join(" · ") || "working";
}

export function QueueBoard({ rows, summary, onOpen }: { rows: Row[]; summary: Summary | null; onOpen: (f: string) => void }) {
  return (
    <main className="board">
      <section className="tiles">
        {tiles.map((t) => (
          <div className="tile" key={t.label}>
            <div className="tile-value">{t.get(summary, rows)}</div>
            <div className="tile-label">{t.label}</div>
          </div>
        ))}
        {summary?.running && <div className="live-dot" title="run in progress">live</div>}
      </section>
      <section className="queue">
        <div className="qrow qhead">
          <span />
          <span>Case</span>
          <span>Property</span>
          <span>Family</span>
          <span>Stage</span>
          <span>Final state</span>
          <span>Next action</span>
        </div>
        {rows.length === 0 && <div className="empty">Cases will appear here as the runner writes them.</div>}
        {rows.map((r) => (
          <button key={r.folder} className="qrow" data-status={r.status} onClick={() => onOpen(r.folder)}>
            <Urgency u={r.urgency} />
            <span className="q-id">
              {r.case_id}
              {r.counts.failed + r.counts.blocked + r.counts.withdrawn > 0 && <span className="exc" title="execution exception handled">!</span>}
              {r.page && <span className="pager" title={`on-call ${r.page}`}>☎</span>}
            </span>
            <span className="q-prop">{r.property ?? r.channel ?? "–"}</span>
            <span className="q-fam">{clean(r.family) || "–"}</span>
            <span className="q-stage">{r.status === "running" ? <em className="working">{live(r)}</em> : r.next.stage ?? "–"}</span>
            <span><Status s={r.status} /></span>
            <span className="q-next">
              {r.next.type ? (
                <>
                  <b>{clean(r.next.type)}</b> → {r.next.recipient}
                </>
              ) : (
                "–"
              )}
            </span>
          </button>
        ))}
      </section>
    </main>
  );
}
