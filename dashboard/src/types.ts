export type Row = {
  key: string;
  dir: string;
  folder: string;
  case_id: string;
  channel: string | null;
  status: string;
  last_event: string | null;
  family: string | null;
  families: string[];
  urgency: string | null;
  route_confidence: number | null;
  route_reasons: string | null;
  agent: string | null;
  seconds: number | null;
  started_at: string | null;
  ended_at: string | null;
  folder_mtime: number | null;
  flags: string[];
  next_action: string | null;
  next: { type: string | null; recipient: string | null; stage: string | null; confidence: string | null; rules: string[] };
  property: string | null;
  counts: { events: number; reads: number; staged: number; executed: number; failed: number; blocked: number; withdrawn: number; check_problems: number };
  escalation: string | null;
  handover: string | null;
  page: string | null;
  paged: boolean;
  callback: { status: string | null; chosen_option: string | null; decision: string | null } | null;
};

export type Summary = {
  dirs: string[];
  total: number;
  done: number;
  running: number;
  failed: number;
  by_status: Record<string, number>;
  elapsed: number | null;
  parallel: number;
  live: boolean;
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
  whatsapp_reply: any;
  message: any;
  alert: { case_id: string; dir: string; sent_at: string; to: string } | null;
};
