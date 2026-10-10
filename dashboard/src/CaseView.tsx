import { useEffect, useMemo, useState } from "react";
import { usePoll, clean } from "./api";
import type { CaseDetail } from "./types";
import { actions, describe, offset, oneLine, ruleIds, steps, type Step } from "./pipeline";
import { Md, messages, pick, sections } from "./md";
import { OnCall, hasOnCall } from "./OnCall";

export function CaseView({ caseKey, onBack, onEvent }: { caseKey: string; onBack: () => void; onEvent: (i: number) => void }) {
  const d = usePoll<CaseDetail>(`/api/case/${caseKey}`, 1500);
  const list = useMemo(() => (d ? steps(d.events) : []), [d]);
  const [open, setOpen] = useState<string | null | undefined>(undefined); // undefined = not chosen yet

  // Open the first failing step by default; the rest stay collapsed.
  useEffect(() => setOpen(undefined), [caseKey]);
  const bad = list.find((s) => s.tone === "bad" && !["routed", "escalated"].includes(s.key))?.key ?? null;
  const expanded = open === undefined ? bad : open;

  if (!d) return <main className="page"><p className="muted pad">Loading case</p></main>;
  const s = d.summary;
  const ans = sections(d.answer);
  const rea = sections(d.reasoning);
  const msgs = messages(ans);
  const t0 = d.events[0] ? Date.parse(d.events[0].ts) : 0;

  return (
    <main className="page">
      <header className="case-head">
        <button className="back" onClick={onBack}>← Queue</button>
        <div className="case-title">
          <span className="mono case-num">{s.case_id}</span>
          <span className={`urg u-${s.urgency ?? "none"}`}>{s.urgency}</span>
          <span className={`state s-${s.status}`}>{clean(s.status)}</span>
        </div>
        <div className="case-sub">{[s.property, clean(s.channel), s.agent && `${s.agent} agent`, s.dir && `out/${s.dir}/${s.folder}`].filter(Boolean).join(" · ")}</div>
        {ans["Summary"] && <p className="lead">{ans["Summary"]}</p>}
      </header>

      <div className="columns">
        <section>
          <div className="col-h">Pipeline</div>
          <ol className="steps">
            {list.map((x, i) => (
              <li key={x.key}>
                <button className="step" data-tone={x.tone} aria-expanded={expanded === x.key} onClick={() => setOpen(expanded === x.key ? null : x.key)}>
                  <span className="step-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mark" />
                  <span className="step-body">
                    <span className="step-label">{x.label}</span>
                    <span className="step-line">{x.line || (x.tone === "live" ? "…" : "")}</span>
                    {x.line2 && <span className="step-line wrap">{x.line2}</span>}
                  </span>
                  <span className="step-t">{offset(x.ms)}</span>
                </button>
                {expanded === x.key && (
                  <div className="expand">
                    <StepDetail step={x} d={d} />
                    {x.events.length > 0 && (
                      <div className="trace">
                        {x.events.map((e) => (
                          <button key={e.i} onClick={() => onEvent(e.i)} title="Open event">
                            <span className="muted">{offset(Date.parse(e.ts) - t0)}</span>
                            <span className="ev">{e.event}</span>
                            <span className="j">{oneLine(e)}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section>
          <div className="section">
            <div className="col-h">Decision</div>
            {s.next.type ? (
              <>
                <div className="next">{clean(s.next.type)} <span className="arrow">→</span> {s.next.recipient}</div>
                <div className="sub">{[s.next.stage, s.next.confidence && `${s.next.confidence} confidence`].filter(Boolean).join(" · ")}</div>
                {s.next.rules.length > 0 && <ul className="tags">{s.next.rules.map((r) => <li key={r} className="tag">{r}</li>)}</ul>}
              </>
            ) : (
              <p className="none">{s.status === "running" ? "The agent has not submitted yet." : "No next action written."}</p>
            )}
            <h4 className="sub-h">Rationale</h4>
            <Md text={ans["Rationale"] || ans["Decision"] || ""} empty={s.status === "running" ? "Not written yet." : "Nothing recorded."} />
            <h4 className="sub-h">Not done and why</h4>
            <Md text={ans["Not done and why"] ?? ""} empty="Nothing was deliberately left undone." />
          </div>

          <div className="section">
            <div className="col-h">Messages sent · {msgs.length}</div>
            {msgs.length === 0 ? <p className="none">No messages sent.</p> : <Messages list={msgs} />}
          </div>

          {hasOnCall(d) && <OnCall d={d} />}

          <div className="section">
            <div className="col-h">Automated checks</div>
            <Md text={rea["Automated checks"] ?? ""} empty={s.status === "running" ? "Not run yet." : "Nothing recorded."} />
          </div>
        </section>
      </div>
    </main>
  );
}

function Messages({ list }: { list: ReturnType<typeof messages> }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ul className="msgs">
      {list.map((m, i) => (
        <li key={i}>
          <button className="msg-head" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span className="msg-to">To {m.to}</span>
            <span className="msg-via">{m.via}</span>
            <span className="msg-first">{m.subject || m.body.split("\n")[0]}</span>
          </button>
          {open === i && <pre className="msg-body">{m.subject ? `${m.subject}\n\n${m.body}` : m.body}</pre>}
        </li>
      ))}
    </ul>
  );
}

// What each step's expansion says before the raw events.
function StepDetail({ step, d }: { step: Step; d: CaseDetail }) {
  const ev = d.events;
  switch (step.key) {
    case "received": {
      const s0 = ev.find((e) => e.event === "case.start");
      return (
        <>
          {s0?.flags?.length ? (
            <>
              <h5>Flags raised by code before any model ran</h5>
              <ul className="tags">{s0.flags.map((f: string) => <li key={f} className="tag warn">{clean(f)}</li>)}</ul>
            </>
          ) : (
            <p className="muted">No safety, money or identity flags on this case.</p>
          )}
          {d.message && (
            <>
              <h5>Inbound message</h5>
              <p>{d.message.from ? `${d.message.from}: ` : ""}{d.message.message}</p>
            </>
          )}
        </>
      );
    }
    case "routed": {
      const r = ev.find((e) => e.event === "route");
      const ag = ev.find((e) => e.event === "agent.start");
      return (
        <>
          {r?.reasons && (
            <>
              <h5>Router's reasons</h5>
              <p>{r.reasons}</p>
            </>
          )}
          {ag && <p className="muted small">{ag.agent} agent on {ag.model}{ag.attachments ? ` · ${ag.attachments} attachments` : ""}</p>}
        </>
      );
    }
    case "lookup": {
      const pf = ev.find((e) => e.event === "prefetch");
      const reads = ev.filter((e) => e.event === "tool.read");
      return (
        <>
          {reads.length > 0 && (
            <>
              <h5>Live reads</h5>
              <ul>{reads.map((e, i) => <li key={i}><b>{e.tool}</b> <span className="muted">{short(e.input)}</span></li>)}</ul>
            </>
          )}
          {pf && (
            <>
              <h5>Prefetched by code</h5>
              <ul>
                {(pf.found ?? []).map((f: any, i: number) => <li key={`f${i}`}>found {typeof f === "string" ? f : f.id ?? f.kind ?? JSON.stringify(f).slice(0, 80)}</li>)}
                {(pf.misses ?? []).map((m: string, i: number) => <li key={`m${i}`} className="muted">{m}</li>)}
              </ul>
            </>
          )}
        </>
      );
    }
    case "proposed": {
      const staged = ev.filter((e) => e.event === "tool.staged");
      return staged.length ? (
        <div>
          {staged.map((e) => {
            const { verb, detail } = describe(e.tool, e.input);
            return (
              <div className="detail" key={e.actionId} data-tone="idle">
                <span className="mark" />
                <span><b>{verb}</b><span className="r">{e.actionId}</span>{detail && <span className="d"> {detail}</span>}</span>
              </div>
            );
          })}
        </div>
      ) : null;
    }
    case "checked": {
      const passes = ev.filter((e) => e.event === "checks");
      const blocks = ev.filter((e) => e.event === "tool.blocked");
      return (
        <div>
          {passes.map((p, i) => (
            <div className="detail" key={`p${i}`} data-tone={p.problems?.length ? "warn" : "ok"}>
              <span className="mark" />
              <span>
                <b>Pass {p.pass}{p.stage ? ` (${p.stage})` : ""}: {p.problems?.length ? `${p.problems.length} problem${p.problems.length === 1 ? "" : "s"}, sent back to the agent` : "clean"}</b>
                {p.problems?.map((x: string, j: number) => <span className="d" key={j}><br />{x}</span>)}
              </span>
            </div>
          ))}
          {blocks.map((b, i) => (
            <div className="detail" key={`b${i}`} data-tone="bad">
              <span className="mark" />
              <span><b>Blocked {clean(b.tool)}</b> <span className="r">{ruleIds(b.reason ?? "").join(" ")}</span><span className="d"><br />{b.reason}</span></span>
            </div>
          ))}
        </div>
      );
    }
    case "executed": {
      const acts = actions(ev).filter((a) => a.result !== "not run");
      return (
        <div>
          {acts.map((a) => {
            const { verb, detail } = describe(a.tool, a.input);
            return (
              <div className="detail" key={a.id} data-tone={a.result === "success" ? "ok" : a.result === "withdrawn" ? "warn" : "bad"}>
                <span className="mark" />
                <span>
                  <b>{verb}</b><span className="r">{a.result}{a.attempts > 1 ? ` · ${a.attempts} attempts` : ""}</span>
                  {detail && <span className="d"> {detail}</span>}
                  {a.error && <span className="d bad-t"><br />{a.error}</span>}
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    case "reconciled": {
      const st = ev.find((e) => e.event === "reconcile.start");
      const un = ev.find((e) => e.event === "claims.unresolved");
      return (
        <>
          {st && (
            <>
              <h5>Why</h5>
              <ul>
                {(st.troubled ?? []).map((t: string) => <li key={t}>{t} failed</li>)}
                {(st.claims ?? []).map((c: string, i: number) => <li key={i}>{c}</li>)}
              </ul>
              {st.withdrawn?.length > 0 && <p>Withdrew {st.withdrawn.join(", ")} so nobody is told something that did not happen.</p>}
            </>
          )}
          {un && <p>{un.accepted ? "Accepted after reconciliation" : "Not accepted"}{un.unrecovered ? "; the failure was not recovered" : ""}{un.claims?.length ? `; unresolved: ${un.claims.join("; ")}` : ""}.</p>}
        </>
      );
    }
    case "escalated": {
      const e = d.resolution?.escalation;
      if (!e || !e.tier || e.tier === "none") return <p className="muted">No escalation. The agent could act within its authority.</p>;
      return (
        <dl className="kv">
          <dt>Decision needed</dt><dd>{e.decisionRequired ?? "–"}</dd>
          <dt>Reason</dt><dd>{e.reason ?? "–"}</dd>
          {e.deadline && <><dt>Deadline</dt><dd className="mono">{e.deadline}</dd></>}
          {e.handover && <><dt>Handover</dt><dd>{e.handover}</dd></>}
        </dl>
      );
    }
    case "written":
      return <Md text={pick(sections(d.answer), "Execution status")} empty="Not written yet." />;
  }
  return null;
}

function short(v: any): string {
  if (v == null) return "";
  if (typeof v !== "object") return String(v);
  return Object.entries(v).map(([k, x]) => `${k}=${typeof x === "object" ? JSON.stringify(x) : x}`).join(" ").slice(0, 160);
}
