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
  file_sha256: string | null;
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

export interface Decision {
  id: number;
  title: string;
  context: string | null;
  decision: string;
  reasoning: string | null;
  expected_outcome: string | null;
  actual_outcome: string | null;
  status: 'pending' | 'reviewed';
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

// 列表端点用实体名复数作字段名（非统一的 "items"）
export interface MemoryList { page: number; page_size: number; total: number; total_pages: number; memories: Memory[] }
export interface DecisionList { page: number; page_size: number; total: number; total_pages: number; decisions: Decision[] }
export interface TaskList { page: number; page_size: number; total: number; total_pages: number; tasks: Task[] }

export interface ApiErrorPayload {
  code: string;
  message: string;
}
