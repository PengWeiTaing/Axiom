// 后端数据模型 — 对应 SQLite schema。只列前端真正用到的字段。

export type ItemType = 'text' | 'image' | 'document' | 'audio';

export interface Item {
  id: number;
  type: ItemType;
  content: string;
  file_path: string | null;
  source: string;
  created_at: string;
  original_name: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  derived_text: string | null;
  transcript_text: string | null;
  processing_override: string | null;
  processing_state?: 'ready' | 'pending';
  processing_label?: string;
  processing_note?: string;
  processing_override_label?: string | null;
  processing_is_overridden?: boolean;
  file_sha256: string | null;
}

export interface ItemDetail extends Item {
  derived_text_preview?: string;
  storage?: string;
  file_url?: string;
}

export type MemoryCategory = 'fact' | 'preference' | 'goal' | 'relationship' | 'event';
export type MemoryStatus = 'candidate' | 'confirmed' | 'archived';

export interface Memory {
  id: number;
  category: MemoryCategory;
  content: string;
  detail: string | null;
  status: MemoryStatus;
  source_item_id: number | null;
  source_text: string | null;
  created_at: string;
  updated_at: string;
}

export type ObjectKind = 'task' | 'memory' | 'decision';

export interface ObjectTarget {
  kind: ObjectKind;
  id: number;
}

export interface MemoryLinkedTask {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export interface MemorySourceItem {
  id: number;
  type: ItemType;
  type_label: string;
  snippet: string;
  created_at: string;
}

export interface MemoryDetail extends Memory {
  linked_tasks: MemoryLinkedTask[];
  task_progress: { total: number; done: number; todo?: number } | null;
  source_item: MemorySourceItem | null;
}

export interface MemoryStatsCategory {
  label: string;
  total: number;
  confirmed: number;
  candidate: number;
  archived: number;
}

export interface MemoryStatsPayload {
  total: number;
  by_category: Record<string, MemoryStatsCategory>;
}

export type TaskStatus = 'todo' | 'done' | 'cancelled';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: number;
  title: string;
  detail: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  memory_id: number | null;
  due_date: string | null;
  estimated_minutes: number | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  overdue_days?: number;
}

export type DecisionStatus = 'pending' | 'reviewed';

export interface Decision {
  id: number;
  title: string;
  context: string | null;
  decision: string;
  reasoning: string | null;
  expected_outcome: string | null;
  actual_outcome: string | null;
  status: DecisionStatus;
  status_label?: string;
  created_at: string;
  updated_at: string;
}

// /parse 返回 — 智能路由的核心
export type ParseType = 'task' | 'memory' | 'decision' | 'note' | 'health' | 'url';

export interface ParseResult {
  type: ParseType;
  title?: string;
  content?: string;
  priority?: TaskPriority;
  due_date?: string;
  estimated_minutes?: number;
  category?: MemoryCategory;
  url?: string;
  reasoning?: string;
  suggested_lifeline_id?: string;
  suggested_lifeline_name?: string;
}

export interface Paginated<T> {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
  items: T[];
}

export interface StatsPayload {
  total: number;
  first_created_at: string | null;
  latest_created_at: string | null;
  by_type: Record<string, number>;
  by_source: Record<string, number>;
  by_text_source: Record<string, number>;
  by_processing_state: Record<string, number>;
  by_processing_override: Record<string, number>;
  by_storage: Record<string, number>;
  memory_total: number;
  memory_candidate: number;
  memory_confirmed: number;
  memory_by_category: Record<string, number>;
  streak: number;
  task_total: number;
  task_todo: number;
  task_done: number;
  daily_counts: number[];
}

export interface ProcessingBacklogGroup {
  type: ItemType;
  type_label: string;
  title: string;
  description: string;
  processing_note: string;
  count: number;
  items: Item[];
  next_item: Item | null;
  filters: {
    type: ItemType;
    processing_state: 'pending';
  };
}

export interface ProcessingBacklogPayload {
  generated_at: string;
  total: number;
  group_limit: number;
  by_type: Record<string, number>;
  next_overall: Item | null;
  groups: ProcessingBacklogGroup[];
}

export interface ProcessingMarkPayload {
  message: string;
  processing_override: 'ready' | null;
  count: number;
  ids: number[];
  by_type: Record<string, number>;
  items: Item[];
}

export interface ProcessingNextPayload {
  type: ItemType | null;
  processing_state: 'pending';
  exclude_id: number | null;
  item: Item | null;
}

export interface LearningBoardSummary {
  id: string;
  title: string;
  source_type: string;
  status: string;
  created_at: string;
  widget_count: number;
}

export interface LearningBoardListPayload {
  boards: LearningBoardSummary[];
}

export type AutomationRunStatus = 'success' | 'failed' | 'skipped' | 'running' | 'timeout';

export interface AutomationJob {
  id: string;
  label: string;
  description: string;
  artifact_group: string;
  artifact_window: string | null;
  artifact_mode: string | null;
  manual_enabled: boolean;
  destructive: boolean;
  default_date: string;
  ready: boolean;
  runtime_mode: 'local' | 'mock' | 'openai' | 'missing_key' | string;
  availability_note: string;
}

export interface AutomationRun {
  id: number;
  job_id: string;
  job_label: string;
  manual_enabled: boolean;
  run_date: string;
  status: AutomationRunStatus | string;
  return_code: number | null;
  message: string;
  started_at: string;
  finished_at: string | null;
  duration_ms: number | null;
  stdout_tail: string[];
  stderr_tail: string[];
  artifact: ArtifactSummary | null;
}

export interface AutomationJobsPayload {
  jobs: AutomationJob[];
  history_jobs: AutomationJob[];
}

export interface AutomationRunListPayload {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
  items: AutomationRun[];
}

export interface AutomationRunPayload {
  success?: boolean;
  job?: AutomationJob;
  date?: string;
  run?: AutomationRun | null;
  artifact?: ArtifactSummary | null;
  error?: ApiErrorPayload;
  [key: string]: unknown;
}

export interface ArtifactSummary {
  group: string;
  relative_path: string;
  file_url?: string;
  report_date?: string;
  generated_name?: string;
  window?: string;
  mode?: string;
  mtime?: number;
  preview?: string;
}

export interface SystemMigration {
  version: number;
  name: string;
  applied_at: string;
}

export interface SystemInfoPayload {
  db_size_bytes: number;
  db_size_mb: number;
  inbox_files: number;
  archive_files: number;
  fts_index_entries: number;
  last_backup: string | null;
  backup_age_hours: number | null;
  backup_ok: boolean;
  tables: Record<string, number>;
  migrations: SystemMigration[];
  log_size_bytes: number;
  log_size_mb: number;
  integrity: {
    ok: boolean;
    orphan_memories: number;
    orphan_tasks: number;
    empty_content_items: number;
  };
  health_score: number;
  growth: {
    items_per_day: number;
    db_mb_per_100_items: number;
  };
}

export interface MetricsPayload {
  uptime: number | string;
  requests: number;
  errors: number;
  error_rate: number;
  slow_requests: number;
  rate_limited_ips: number;
  latency_ms: {
    p50: number;
    p95: number;
    p99: number;
  };
  top_endpoints: Array<{ path: string; count: number }>;
}

export interface AuditLogEntry {
  id: number;
  action: string;
  target_type: string;
  target_id: number | null;
  detail: string | null;
  created_at: string;
}

export interface AuditLogPayload {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
  entries: AuditLogEntry[];
}

export interface AdminLogsPayload {
  lines: number;
  log: string[];
}

export type TimelineKind = 'item' | 'task' | 'memory' | 'decision';

export interface TimelineEntry {
  kind: TimelineKind;
  id: number | null;
  event: string;
  occurred_at: string;
  title: string | null;
  summary: string | null;
  meta: Record<string, string | number | boolean>;
}

export interface TimelinePayload {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
  entries: TimelineEntry[];
}

export interface ArtifactLatestPayload {
  review: {
    daily: ArtifactSummary | null;
    weekly: ArtifactSummary | null;
  };
  inbox: ArtifactSummary | null;
  'inbox-actions': {
    'dry-run': ArtifactSummary | null;
    apply: ArtifactSummary | null;
  };
  'inbox-action-history': {
    daily: ArtifactSummary | null;
    weekly: ArtifactSummary | null;
  };
  'audio-transcripts': ArtifactSummary | null;
  'image-descriptions': ArtifactSummary | null;
  'system-status': ArtifactSummary | null;
}

export interface ArtifactsSummaryPayload {
  group: string | null;
  window: string | null;
  mode: string | null;
  date_from: string | null;
  date_to: string | null;
  preview_chars: number;
  total: number;
  counts: Record<string, unknown>;
  latest_overall: ArtifactSummary | null;
  latest: ArtifactLatestPayload;
}

export interface OverviewPayload {
  service: string;
  generated_at: string;
  recent: {
    limit: number;
    items: Item[];
  };
  stats: StatsPayload;
  processing_backlog: ProcessingBacklogPayload;
  artifacts: {
    preview_chars: number;
    total: number;
    counts: Record<string, unknown>;
    latest_overall: ArtifactSummary | null;
    latest: ArtifactLatestPayload;
  };
}

// 列表端点用实体名复数作字段名（非统一的 "items"）
export interface MemoryList { page: number; page_size: number; total: number; total_pages: number; memories: Memory[] }
export interface DecisionList { page: number; page_size: number; total: number; total_pages: number; decisions: Decision[] }
export interface TaskList { page: number; page_size: number; total: number; total_pages: number; tasks: Task[] }

export interface ApiErrorPayload {
  code: string;
  message: string;
}
