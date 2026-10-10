import type { Row } from "./types";

export function CaseView({ folder, onBack }: { folder: string; rows: Row[]; onBack: () => void; onOpen: (f: string) => void }) {
  return (
    <main className="detail">
      <button className="crumb" onClick={onBack}>← Queue</button>
      <h2>Case {folder}</h2>
    </main>
  );
}
