import { useEffect, useMemo, useState } from "react";
import { usePoll, clean } from "./api";
import type { CaseDetail, Ev } from "./types";
import { actions, describe, steps, type Action, type Step } from "./pipeline";
import { Md, pick, sections } from "./md";

const secs = (ms: number | null) => (ms == null ? "" : ms < 1000 ? `+${ms}ms` : `+${(ms / 1000).toFixed(1)}s`);

export function CaseView({ caseKey, onBack }: { caseKey: string; onBack: () => void; onEvent: (i: number) => void }) {
  const folder = caseKey;
  const onCalls = (_f: string) => {};
  const d = usePoll<CaseDetail>(`/api/case/${caseKey}`, 1500);
  const list = useMemo(() => (d ? steps(d.events) : []), [d]);
  const [sel, setSel] = useState<string | null>(null);

  // Default to the first step that went wrong, otherwise the decision.
  useEffect(() => setSel(null), [folder]);
  const current = sel ?? (list.find((s) => s.tone === "bad" && s.key !== "routed")?.key || "decided");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      const i = list.findIndex((s) => s.key === current);
      const n = list[Math.max(0, Math.min(list.length - 1, i + (e.key === "ArrowDown" ? 1 : -1)))];
      if (n) setSel(n.key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [list, current]);

  if (!d) return <main className="page"><p className="muted">Loading case {folder}</p></main>;
  const s = d.summary;
  const ans = sections(d.answer);
  const step = list.find((x) => x.key === current)!;

  return (
    <main className="page case">
      <header className="case-head">
        <button className="back" onClick={onBack}>← Queue</button>
        <div className="case-title">
          <span className="mono case-num">{s.case_id}</span>
          <span className={`urg u-${s.urgency ?? "none"}`}>{s.urgency}</span>
          <span className={`state s-${s.status}`}>{clean(s.status)}</span>
        </div>
        <div className="case-sub">{[s.property, clean(s.channel)].filter(Boolean).join(" · ")}</div>
        {ans["Summary"] && <p className="lead">{ans["Summary"]}</p>}
      </header>

      <div className="journey">
        <ol className="steps" aria-label="Pipeline">
          {list.map((x, i) => (
            <li key={x.key}>
              <button className="step" data-tone={x.tone} data-on={x.key === current} onClick={() => setSel(x.key)}>
                <span className="mono step-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="mark" />
                <span className="step-body">
                  <span className="step-label">{x.label}</span>
                  <span className="step-line">{x.line || (x.tone === "live" ? "…" : "")}</span>
                </span>
                <span className="mono step-t">{secs(x.ms)}</span>
              </button>
            </li>
          ))}
        </ol>

        <section className="pane" key={current}>
          <StepDetail step={step} d={d} ans={ans} onCalls={() => onCalls(folder)} />
          <Raw events={step.events} t0={d.events[0]?.ts} />
        </section>
      </div>
    </main>
  );
}

function StepDetail({ step, d, ans, onCalls }: { step: Step; d: CaseDetail; ans: Record<string, string>; onCalls: () => void }) {
  const ev = d.events;
  const res = d.resolution;
  switch (step.key) {
    case "received": {
      const s0 = ev.find((e) => e.event === "case.start");
      return (
        <>
          <h3>What came in</h3>
          <dl className="kv">
            <dt>Channel</dt><dd>{clean(s0?.channel) || "–"}</dd>
            <dt>Received</dt><dd className="mono">{d.summary.started_at ?? "–"}</dd>
            <dt>Files</dt><dd className="mono">{(s0?.files ?? []).join(", ") || "–"}</dd>
          </dl>
          <h4>Flags raised by code before any model ran</h4>
          {s0?.flags?.length ? (
            <ul className="tags">{s0.flags.map((f: string) => <li key={f} className="tag warn">{clean(f)}</li>)}</ul>
          ) : (
            <p className="muted">No safety, money or identity flags on this case.</p>
          )}
        </>
      );
    }
    case "routed": {
      const r = ev.find((e) => e.event === "route");
      const ag = ev.find((e) => e.event === "agent.start");
      const re = ev.filter((e) => e.event === "agent.reroute" || e.event === "agent.fallback_model");
      return (
        <>
          <h3>Why it went where it went</h3>
          {r ? (
            <>
              <div className="route">
                <div><span className="k">Urgency</span><span className={`big u-${r.urgency}`}>{r.urgency}</span></div>
                <div><span className="k">Families</span><span className="big">{(r.families ?? []).map(clean).join(", ")}</span></div>
                <div><span className="k">Router confidence</span><span className="big mono">{Math.round((r.confidence ?? 0) * 100)}%</span></div>
                <div><span className="k">Handed to</span><span className="big">{ag?.agent ?? "–"} agent</span><span className="mono muted small">{ag?.model}</span></div>
              </div>
              <h4>Router's reasoning</h4>
              <p className="prose">{r.reasons}</p>
              {re.length > 0 && (
                <>
                  <h4>Rerouted</h4>
                  <ul className="plain">{re.map((e, i) => <li key={i}>{clean(e.event)}: {e.to ?? e.agent ?? e.model ?? ""} {e.reason ?? ""}</li>)}</ul>
                </>
              )}
            </>
          ) : (
            <p className="muted">Not routed yet.</p>
          )}
        </>
      );
    }
    case "lookup": {
      const pf = ev.find((e) => e.event === "prefetch");
      const reads = ev.filter((e) => e.event === "tool.read");
      return (
        <>
          <h3>What it checked against the records</h3>
          {pf && (
            <>
              <h4>Prefetched by code</h4>
              <ul className="plain mono small">
                {(pf.found ?? []).map((f: any, i: number) => <li key={`f${i}`} className="ok-t">found {typeof f === "string" ? f : f.id ?? f.kind ?? JSON.stringify(f).slice(0, 80)}</li>)}
                {(pf.misses ?? []).map((m: string, i: number) => <li key={`m${i}`} className="muted">{m}</li>)}
              </ul>
            </>
          )}
          <h4>Live reads by the agent</h4>
          {reads.length ? (
            <ul className="plain mono small">{reads.map((e, i) => <li key={i}>{e.tool} {short(e.input)}</li>)}</ul>
          ) : (
            <p className="muted">None. The case file and prefetch were enough.</p>
          )}
        </>
      );
    }
    case "decided": {
      const n = d.summary.next;
      return (
        <>
          <h3>The decision</h3>
          {n.type ? (
            <div className="decision">
              <div className="mono next">{clean(n.type)} <span className="muted">→</span> {n.recipient}</div>
              <div className="muted">{n.stage}{n.confidence ? ` · ${n.confidence} confidence` : ""}</div>
              <ul className="tags">{(res?.rulesApplied ?? n.rules).map((r: string) => <li key={r} className="tag mono">{r}</li>)}</ul>
            </div>
          ) : (
            <p className="muted">The agent has not submitted yet.</p>
          )}
          <h4>Why</h4>
          <Md text={ans["Rationale"] ?? ans["Decision"] ?? ""} />
          {ans["Not done and why"] && (
            <>
              <h4>Deliberately not done</h4>
              <Md text={ans["Not done and why"]} />
            </>
          )}
          {ans["Conflicts and missing information"] && (
            <>
              <h4>Conflicts and missing information</h4>
              <Md text={ans["Conflicts and missing information"]} />
            </>
          )}
        </>
      );
    }
    case "checked": {
      const cs = ev.filter((e) => e.event === "checks");
      const blocked = ev.filter((e) => e.event === "tool.blocked");
      const rev = ev.filter((e) => e.event === "revision.failed");
      return (
        <>
          <h3>Rules checked in code before anything ran</h3>
          {cs.length === 0 && <p className="muted">Not checked yet.</p>}
          {cs.map((c, i) => (
            <div key={i} className="check">
              <div className={c.pass ? "ok-t" : "bad-t"}>
                {cs.length > 1 ? (i === 0 ? "First pass: " : "After revision: ") : ""}
                {c.pass ? "passed" : "failed, sent back to the agent to revise"}
              </div>
              {c.problems?.length > 0 && <ul className="plain">{c.problems.map((p: any, j: number) => <li key={j}>{typeof p === "string" ? <RuleText t={p} /> : <RuleText t={`${p.rule ?? ""} ${p.message ?? JSON.stringify(p)}`} />}</li>)}</ul>}
            </div>
          ))}
          {rev.length > 0 && <p className="bad-t">Revision failed: {rev.map((e) => e.reason ?? e.error ?? "").join("; ")}</p>}
          {blocked.length > 0 && (
            <>
              <h4>Writes refused by guards</h4>
              <ul className="acts">{blocked.map((b, i) => <li key={i} className="act" data-r="blocked"><span className="mark" /><span><b>{clean(b.tool)}</b><span className="act-d"><RuleText t={b.reason ?? ""} /></span></span></li>)}</ul>
            </>
          )}
        </>
      );
    }
    case "executed": {
      const acts = actions(ev).filter((a) => a.result !== "blocked");
      const rec = ev.filter((e) => e.event.startsWith("reconcile.") || e.event === "claims.unresolved");
      return (
        <>
          <h3>What happened in the real world</h3>
          {acts.length === 0 && <p className="muted">Nothing executed yet.</p>}
          <ul className="acts">{acts.map((a) => <ActionRow key={a.id} a={a} />)}</ul>
          {rec.length > 0 && (
            <>
              <h4>Recovery after a failure</h4>
              <ul className="plain">
                {rec.map((e, i) => (
                  <li key={i}>
                    {e.event === "reconcile.start" && "Execution failed, so the system reconciled what had and had not happened."}
                    {e.event === "reconcile.withdrawn" && `Withdrew ${(e.withdrawn ?? []).join(", ")} so nobody is told something that did not happen.`}
                    {e.event === "claims.unresolved" && `Claims left unresolved: ${short(e.claims ?? e)}`}
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      );
    }
    case "escalated": {
      const esc = res?.escalation;
      const page = ev.filter((e) => e.event.startsWith("escalate."));
      return (
        <>
          <h3>Human handover</h3>
          {esc && esc.tier && esc.tier !== "none" ? (
            <>
              <dl className="kv">
                <dt>Tier</dt><dd><span className={`urg u-${esc.tier}`}>{esc.tier}</span></dd>
                <dt>Decision needed</dt><dd>{esc.decisionRequired ?? "–"}</dd>
                <dt>Reason</dt><dd>{esc.reason ?? "–"}</dd>
                {esc.deadline && <><dt>Deadline</dt><dd className="mono">{esc.deadline}</dd></>}
                <dt>On-call page</dt><dd>{page.length ? page.map((e) => clean(e.event.replace("escalate.p0.", "")) + (e.status ? ` (${e.status})` : "")).join(", ") : esc.tier === "P0" ? "pending" : "not paged, handover recorded for the duty manager"}</dd>
              </dl>
              <button className="link" onClick={onCalls}>Open call log →</button>
            </>
          ) : (
            <p className="muted">No escalation. The agent could act within its authority.</p>
          )}
        </>
      );
    }
    case "written": {
      return (
        <>
          <h3>Outcome written to disk</h3>
          <dl className="kv">
            <dt>Final state</dt><dd>{d.summary.status}</dd>
            <dt>Time</dt><dd className="mono">{d.summary.seconds != null ? `${d.summary.seconds} s` : "running"}</dd>
            <dt>Files</dt><dd className="mono">ANSWER.md · REASONING.md · trace.jsonl</dd>
          </dl>
          <h4>Execution status, generated from results</h4>
          <Md text={pick(ans, "Execution status")} />
        </>
      );
    }
  }
  return null;
}

function ActionRow({ a }: { a: Action }) {
  const [open, setOpen] = useState(false);
  const { verb, detail } = describe(a);
  const body = a.tool === "send_message" ? a.input.body : null;
  return (
    <li className="act" data-r={a.result}>
      <span className="mark" />
      <button className="act-main" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="act-v">{verb}</span>
        <span className="act-r mono">{a.result}{a.attempts > 1 ? ` · ${a.attempts} tries` : ""}</span>
        <span className={open ? "act-d" : "act-d clip"}>{detail}</span>
        {a.error && <span className="act-e mono">{a.error}</span>}
        {open && body && <pre className="msg">{body}</pre>}
      </button>
    </li>
  );
}

function RuleText({ t }: { t: string }) {
  return <>{t.split(/(PM-[A-Z]+-\d+)/g).map((p, i) => (/^PM-/.test(p) ? <span key={i} className="tag mono">{p}</span> : p))}</>;
}

function short(v: any): string {
  if (v == null) return "";
  if (typeof v !== "object") return String(v);
  return Object.entries(v).map(([k, x]) => `${k}=${typeof x === "object" ? JSON.stringify(x) : x}`).join(" ").slice(0, 140);
}

function Raw({ events, t0 }: { events: Ev[]; t0?: string }) {
  const [open, setOpen] = useState(false);
  if (!events.length) return null;
  const base = t0 ? Date.parse(t0) : 0;
  return (
    <div className="raw">
      <button className="link" onClick={() => setOpen(!open)}>{open ? "Hide" : "Show"} trace events ({events.length})</button>
      {open && (
        <div className="raw-list mono">
          {events.map((e, i) => {
            const { ts, case: _c, event, usage: _u, ...rest } = e;
            return (
              <div key={i} className="raw-row">
                <span className="muted">{secs(Date.parse(ts) - base)}</span>
                <span>{event}</span>
                <span className="raw-j">{JSON.stringify(rest)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
