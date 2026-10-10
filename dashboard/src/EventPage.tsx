// One raw trace event, as written, with links to the events either side of it.
import { useEffect, type ReactNode } from "react";
import { usePoll } from "./api";
import type { CaseDetail } from "./types";
import { offset } from "./pipeline";

export function EventPage({ caseKey, index, onIndex, onBack }: { caseKey: string; index: number; onIndex: (i: number) => void; onBack: () => void }) {
  const d = usePoll<CaseDetail>(`/api/case/${caseKey}`, 2000);
  const n = d?.events.length ?? 0;
  const e = d?.events[index];

  useEffect(() => {
    const onKey = (k: KeyboardEvent) => {
      if (k.key === "ArrowLeft" && index > 0) onIndex(index - 1);
      if (k.key === "ArrowRight" && index < n - 1) onIndex(index + 1);
      if (k.key === "Escape") onBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, n, onIndex, onBack]);

  if (!d) return <main className="page"><p className="muted pad">Loading</p></main>;
  if (!e) return <main className="page"><p className="muted pad">No event {index + 1} in this trace.</p></main>;
  const t0 = Date.parse(d.events[0].ts);

  return (
    <main className="page">
      <nav className="event-nav">
        <button className="back" onClick={onBack}>← Case {d.summary.case_id}</button>
        <span className="mono muted">event {index + 1} of {n}</span>
        <span className="spacer" />
        <button disabled={index === 0} onClick={() => onIndex(index - 1)}>← {index > 0 ? d.events[index - 1].event : "start"}</button>
        <button disabled={index >= n - 1} onClick={() => onIndex(index + 1)}>{index < n - 1 ? d.events[index + 1].event : "end"} →</button>
      </nav>
      <h2 className="event-name">{e.event}</h2>
      <div className="mono sub">{e.ts} · {offset(Date.parse(e.ts) - t0)} after case.start · trace.jsonl line {index + 1}</div>
      <pre className="json">{colour(JSON.stringify(e, null, 2))}</pre>
    </main>
  );
}

// Light colouring of the pretty-printed JSON: keys, strings, numbers.
function colour(text: string): ReactNode[] {
  return text.split(/("(?:[^"\\]|\\.)*"\s*:|"(?:[^"\\]|\\.)*"|-?\b\d+(?:\.\d+)?\b)/g).map((t, i) => {
    if (/^".*"\s*:$/.test(t)) return <span key={i} className="k">{t}</span>;
    if (/^".*"$/.test(t)) return <span key={i} className="s">{t}</span>;
    if (/^-?\d/.test(t)) return <span key={i} className="n">{t}</span>;
    return t;
  });
}
