import { useState } from "react";
import { usePoll } from "./api";
import type { Row, Summary } from "./types";
import { Queue } from "./Queue";
import { CaseView } from "./CaseView";
import { EventPage } from "./EventPage";

type Tab = "queue" | "case" | "event" | "system";

export function App() {
  const [tab, setTab] = useState<Tab>("queue");
  const [caseKey, setCaseKey] = useState<string | null>(null);
  const [eventIndex, setEventIndex] = useState<number>(0);
  const rows = usePoll<Row[]>("/api/cases", 2000) ?? [];
  const summary = usePoll<Summary>("/api/summary", 2000);
  const current = caseKey ? rows.find((r) => r.key === caseKey) ?? null : null;

  const openCase = (key: string) => {
    setCaseKey(key);
    setTab("case");
    window.scrollTo({ top: 0 });
  };
  const openEvent = (index: number) => {
    setEventIndex(index);
    setTab("event");
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="shell">
      <header className="bar">
        <div className="brand">
          <span className="brand-name">Northbridge Lettings</span>
          <span className="brand-sub">operations agent</span>
        </div>
        <nav className="nav">
          <button data-on={tab === "queue"} onClick={() => setTab("queue")}>Queue</button>
          <button data-on={tab === "case" || tab === "event"} disabled={!caseKey} onClick={() => setTab("case")}>
            Case{current ? <span className="mono"> {current.case_id}</span> : ""}
          </button>
          <button data-on={tab === "system"} onClick={() => setTab("system")}>System</button>
        </nav>
        <div className="bar-end mono">
          {summary?.live && <span className="live-t">● live</span>}
          <span className="muted">{summary?.dirs.map((d) => `out/${d}`).join(" + ")}</span>
        </div>
      </header>
      {tab === "queue" && <Queue rows={rows} summary={summary} onOpen={openCase} />}
      {tab === "case" && caseKey && <CaseView caseKey={caseKey} onBack={() => setTab("queue")} onEvent={openEvent} />}
      {tab === "event" && caseKey && <EventPage caseKey={caseKey} index={eventIndex} onIndex={setEventIndex} onBack={() => setTab("case")} />}
      {tab === "system" && <p className="page muted">System</p>}
    </div>
  );
}
