import { useState } from "react";
import { usePoll } from "./api";
import type { Row, Summary } from "./types";
import { QueueBoard } from "./QueueBoard";
import { CaseView } from "./CaseView";

type Tab = "board" | "case";

export function App() {
  const [tab, setTab] = useState<Tab>("board");
  const [folder, setFolder] = useState<string | null>(null);
  const rows = usePoll<Row[]>("/api/cases") ?? [];
  const summary = usePoll<Summary>("/api/summary");

  const open = (f: string) => {
    setFolder(f);
    setTab("case");
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand">
          <div className="mark" aria-hidden="true" />
          <div>
            <h1>Property operations agent</h1>
            <div className="meta">{summary?.out_dir?.split("/").slice(-2).join("/") ?? "waiting for run"}</div>
          </div>
        </div>
        <nav className="tabs">
          <button data-active={tab === "board"} onClick={() => setTab("board")}>Queue</button>
          <button data-active={tab === "case"} disabled={!folder} onClick={() => setTab("case")}>
            Case {folder ? rows.find((r) => r.folder === folder)?.case_id ?? folder : ""}
          </button>
        </nav>
      </header>
      {tab === "board" && <QueueBoard rows={rows} summary={summary} onOpen={open} />}
      {tab === "case" && folder && <CaseView folder={folder} rows={rows} onBack={() => setTab("board")} onOpen={open} />}
    </div>
  );
}
