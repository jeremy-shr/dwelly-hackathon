// Minimal renderer for the runner's ANSWER.md / REASONING.md sections. Shows the text as written.
import type { ReactNode } from "react";

export function sections(md: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (!md) return out;
  const parts = md.split(/\n(?=## )/);
  for (const p of parts) {
    const m = p.match(/^## (.+)\n?([\s\S]*)$/);
    if (m) out[m[1].trim()] = m[2].trim();
  }
  return out;
}

// Finds a section whose title starts with the given prefix (e.g. "Execution status (generated …)").
export const pick = (s: Record<string, string>, prefix: string) =>
  Object.entries(s).find(([k]) => k.startsWith(prefix))?.[1] ?? "";

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|PM-[A-Z]+-\d+)/g).map((t, i) => {
    if (/^\*\*.+\*\*$/.test(t)) return <b key={i}>{t.slice(2, -2)}</b>;
    if (/^`.+`$/.test(t)) return <code key={i}>{t.slice(1, -1)}</code>;
    if (/^PM-[A-Z]+-\d+$/.test(t)) return <span key={i} className="rule">{t}</span>;
    return t;
  });
}

export function Md({ text }: { text: string }) {
  if (!text.trim()) return <p className="none">Nothing recorded.</p>;
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  let para: string[] = [];
  const flush = () => {
    if (list.length) blocks.push(<ul key={blocks.length}>{list.map((l, i) => <li key={i}>{inline(l)}</li>)}</ul>);
    if (para.length) blocks.push(<p key={blocks.length}>{inline(para.join(" "))}</p>);
    list = [];
    para = [];
  };
  for (const line of text.split("\n")) {
    if (/^###\s/.test(line)) {
      flush();
      blocks.push(<h4 key={blocks.length}>{inline(line.replace(/^###\s+/, ""))}</h4>);
    } else if (/^\s*[-*]\s/.test(line)) {
      if (para.length) flush();
      list.push(line.replace(/^\s*[-*]\s+/, ""));
    } else if (!line.trim()) {
      flush();
    } else if (list.length && /^\s+/.test(line)) {
      list[list.length - 1] += " " + line.trim();
    } else {
      if (list.length) flush();
      para.push(line.trim());
    }
  }
  flush();
  return <div className="md">{blocks}</div>;
}
