// Static: the evidence line and one picture of the pipeline.
const nodes: { title: string; lines: string[]; model?: boolean }[] = [
  { title: "case file", lines: ["emails, calls,", "tickets, records"] },
  { title: "flags", lines: ["deterministic:", "gas, money,", "identity"] },
  { title: "router", lines: ["Sonnet 5.5", "family, urgency"], model: true },
  { title: "agent", lines: ["Opus 5.5", "policies + tools", "reads live,", "writes staged"], model: true },
  { title: "checks", lines: ["rules with ids", "one revision"] },
  { title: "execute 1", lines: ["state changes:", "holds, bookings,", "tickets"] },
  { title: "reconcile", lines: ["truthfulness,", "claim check,", "withdraw"] },
  { title: "execute 2", lines: ["messages:", "email, SMS,", "WhatsApp"] },
  { title: "escalate", lines: ["P0 voice page,", "fire and forget"] },
  { title: "write", lines: ["ANSWER.md", "REASONING.md", "trace.jsonl"] },
];

export function System() {
  const w = 118;
  const gap = 12;
  const h = 96;
  const y = 30;
  return (
    <main className="page">
      <p className="evidence">
        Fifty public cases, cut at their decision points and self-evaluated against the hidden endings: outcome <b>8.2 of 10</b>, <b>zero</b> critical failures,
        <b> 50 of 50</b> folders written, <b>174 seconds</b> at ten in parallel. The scoreboard is <span className="mono">docs/evidence/public-cases-judge-all-fifty-run2.md</span>; nothing in it was hand-edited.
      </p>

      <svg className="arch" viewBox={`0 0 ${nodes.length * (w + gap) - gap} ${h + y + 40}`} role="img" aria-label="Pipeline: case file, flags, router, agent, checks, execute state changes, reconcile, execute messages, escalate, write">
        <defs>
          <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0.5 L7 4 L0 7.5" fill="none" stroke="currentColor" strokeWidth="1" />
          </marker>
        </defs>
        {nodes.map((n, i) => {
          const x = i * (w + gap);
          return (
            <g key={n.title} style={{ color: "oklch(21% .01 70)" }}>
              <rect x={x + 0.5} y={y + 0.5} width={w - 1} height={h - 1} fill={n.model ? "oklch(95.2% .008 85)" : "oklch(97.6% .006 85)"} stroke="currentColor" strokeWidth="1" strokeDasharray={n.model ? "3 3" : undefined} />
              <text x={x + 10} y={y + 20} fontSize="12" fontWeight="600">{n.title}</text>
              {n.lines.map((l, j) => (
                <text key={j} x={x + 10} y={y + 38 + j * 14} fontSize="10" fill="oklch(40% .01 70)">{l}</text>
              ))}
              {i < nodes.length - 1 && <line x1={x + w} y1={y + h / 2} x2={x + w + gap - 1} y2={y + h / 2} stroke="currentColor" strokeWidth="1" markerEnd="url(#arrow)" />}
            </g>
          );
        })}
        <text x={0} y={16} fontSize="10.5" fill="oklch(56% .01 70)">solid: code · dashed: model</text>
        <text x={0} y={y + h + 26} fontSize="10.5" fill="oklch(56% .01 70)">writes are staged by the agent and run only after the checks pass; the model never executes anything itself</text>
      </svg>
      <p className="caption">Code decides what runs, the model proposes.</p>
    </main>
  );
}
