import { useState } from "react";
import { usePoll } from "./api";
import type { Row, Summary } from "./types";
import { QueueBoard } from "./QueueBoard";
import { CaseView } from "./CaseView";
import { Calls } from "./Calls";

type Tab = "queue" | "case" | "calls";

export function App() {
  const [tab, setTab] = useState<Tab>("queue");
  const [folder, setFolder] = useState<string | null>(null);
  const [callFolder, setCallFolder] = useState<string | null>(null);
  const [run, setRun] = useState<string>(() => new URLSearchParams(location.search).get("run") ?? "");
  const q = run ? `?run=${encodeURIComponent(run)}` : "";
  const rows = usePoll<Row[]>(`/api/cases${q}`) ?? [];
  const summary = usePoll<Summary>(`/api/summary${q}`);
  const runList = usePoll<{ default: string; runs: string[] }>("/api/runs", 10000);
  const pickRun = (r: string) => {
    setRun(r);
    setFolder(null);
    setCallFolder(null);
    setTab("queue");
    history.replaceState(null, "", r ? `?run=${encodeURIComponent(r)}` : location.pathname);
  };

  const open = (f: string) => {
    setFolder(f);
    setTab("case");
    window.scrollTo({ top: 0 });
  };
  const calls = (f: string | null) => {
    setCallFolder(f);
    setTab("calls");
  };
  const caseId = folder ? rows.find((r) => r.folder === folder)?.case_id ?? folder : null;

  return (
    <div className="shell">
      <header className="bar">
        <div className="brand">
          <span className="brand-name">Northbridge Lettings</span>
          <span className="brand-sub">operations agent</span>
        </div>
        <nav className="nav">
          <button data-on={tab === "queue"} onClick={() => setTab("queue")}>Queue</button>
          <button data-on={tab === "case"} disabled={!folder} onClick={() => setTab("case")}>
            Case{caseId ? <span className="mono"> {caseId}</span> : ""}
          </button>
          <button data-on={tab === "calls"} onClick={() => calls(null)}>Calls</button>
        </nav>
        <div className="bar-end mono">
          {summary?.running && <span className="live-t">● live</span>}
          <select className="run" value={run || runList?.default || ""} onChange={(e) => pickRun(e.target.value === runList?.default ? "" : e.target.value)} aria-label="Run folder">
            {(runList?.runs ?? [run || runList?.default || ""]).map((r) => <option key={r} value={r}>out/{r}</option>)}
          </select>
        </div>
      </header>
      {tab === "queue" && <QueueBoard rows={rows} summary={summary} onOpen={open} />}
      {tab === "case" && folder && <CaseView q={q} folder={folder} onBack={() => setTab("queue")} onCalls={calls} />}
      {tab === "calls" && <Calls q={q} rows={rows} initial={callFolder} onOpenCase={open} />}
    </div>
  );
}
