export type Row = {
  folder: string;
  case_id: string;
  channel: string | null;
  received_at: string | null;
  status: string;
  family: string | null;
  families: string[];
  urgency: string | null;
  escalation: string | null;
  agent: string | null;
  seconds: number | null;
  started_at: string | null;
  ended_at: string | null;
  flags: string[];
  next_action: string | null;
  next: { type: string | null; recipient: string | null; stage: string | null; confidence: string | null; rules: string[] };
  final_state: string | null;
  property: string | null;
  summary: string | null;
  counts: { events: number; reads: number; staged: number; executed: number; failed: number; blocked: number; withdrawn: number };
  page: string | null;
  has_callback: boolean;
  judge: { outcome: number; judgement: number; critical: boolean; verdict: string | null } | null;
};

export type Summary = {
  out_dir: string;
  total: number;
  completed: number;
  by_status: Record<string, number>;
  elapsed: number | null;
  running: boolean;
  summary_line: string | null;
  judge: { n: number; outcome: number; judgement: number; critical: number } | null;
};

export type Ev = { ts: string; case: string; event: string; [k: string]: any };

export type CaseDetail = {
  summary: Row;
  answer: string | null;
  reasoning: string | null;
  events: Ev[];
  resolution: any;
  judge: any;
  callback: any;
};
