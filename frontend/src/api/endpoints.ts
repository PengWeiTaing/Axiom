/*
 * 端点封装层 — 把 apiRequest 包成有类型的函数
 * 调用方只依赖这里，不直接拼 URL
 */

import { apiRequest } from './client';
import type {
  Item,
  Memory,
  Task,
  Decision,
  ParseResult,
  Paginated,
  MemoryList,
  DecisionList,
} from './types';
import type { CosmosData } from '@/cosmos/types';

// ---------- 采集 ----------
export const addNote = (text: string, source = 'web_app') =>
  apiRequest<{ id: number; item: Item }>('/add', {
    method: 'POST',
    json: { text, source },
  });

export const uploadFile = (file: File, content?: string, source = 'web_app') => {
  const fd = new FormData();
  fd.append('file', file);
  if (content) fd.append('content', content);
  fd.append('source', source);
  return apiRequest<{ id: number; item: Item }>('/upload', {
    method: 'POST',
    formData: fd,
  });
};

export const fetchUrl = (url: string) =>
  apiRequest<{ id: number; item: Item }>('/fetch', {
    method: 'POST',
    json: { url },
  });

// ---------- 检索 ----------
export const getRecent = (params: { page?: number; type?: string } = {}) =>
  apiRequest<Paginated<Item>>('/recent', { query: params });

export const searchAll = (q: string, limit = 20) =>
  apiRequest<{ items: Item[]; memories: Memory[]; tasks: Task[]; decisions: Decision[] }>(
    '/search/all',
    { query: { q, limit } },
  );

export const searchVector = (q: string, limit = 20) =>
  apiRequest<{ items: Array<Item & { relevance: number }> }>('/search/vector', {
    query: { q, limit },
  });

// ---------- AI ----------
export const aiParse = (text: string) =>
  apiRequest<ParseResult>('/parse', { method: 'POST', json: { text } });

export const aiParseFeedback = (text: string, aiType: string, userType: string) =>
  apiRequest('/parse/feedback', {
    method: 'POST',
    json: { text, ai_type: aiType, user_type: userType },
  });

// ---------- 任务 ----------
export const createTask = (data: {
  title: string;
  priority?: 'high' | 'medium' | 'low';
  due_date?: string;
  estimated_minutes?: number;
  memory_id?: number;
}) => apiRequest<{ id: number; task: Task }>('/tasks', { method: 'POST', json: data });

export const tasksToday = () =>
  apiRequest<{ today: Task[]; overdue: Task[] }>('/tasks/today');

export const completeTask = (id: number) =>
  apiRequest(`/tasks/${id}/done`, { method: 'POST' });

// ---------- 记忆 ----------
export const createMemory = (data: {
  category: 'fact' | 'preference' | 'goal' | 'relationship' | 'event';
  content: string;
  detail?: string;
}) => apiRequest<{ id: number; memory: Memory }>('/memories', { method: 'POST', json: data });

// ---------- 决策 ----------
export const createDecision = (data: {
  title: string;
  decision: string;
  context?: string;
  reasoning?: string;
  expected_outcome?: string;
}) => apiRequest<{ id: number; decision: Decision }>('/decisions', { method: 'POST', json: data });

// ---------- 记忆扩展（Atlas 用） ----------
export const listMemories = (params: {
  category?: 'fact' | 'preference' | 'goal' | 'relationship' | 'event';
  status?: 'candidate' | 'confirmed' | 'archived';
  page?: number;
  page_size?: number;
} = {}) => apiRequest<MemoryList>('/memories', { query: params });

export const getMemory = (id: number) =>
  apiRequest<{ memory: Memory; linked_tasks: Task[]; task_progress: { total: number; done: number; todo: number } }>(
    `/memories/${id}`,
  );

export const memoriesStats = () =>
  apiRequest<{ total: number; by_category: Record<string, number>; by_status: Record<string, number> }>(
    '/memories/stats',
  );

// ---------- 决策扩展 ----------
export const listDecisions = (params: { status?: 'pending' | 'reviewed'; page?: number } = {}) =>
  apiRequest<DecisionList>('/decisions', { query: params });

// ---------- 报告 ----------
export const weeklyReport = () =>
  apiRequest<{
    summary?: string;
    completed_this_week?: number;
    completed_last_week?: number;
    completion_rate?: number;
    trend?: string;
    [key: string]: unknown;
  }>('/report/weekly');

export const dailyStats = (days = 30) =>
  apiRequest<{ days: Array<{ date: string; items: number; tasks_done: number }> }>(
    '/admin/stats/daily',
    { query: { days } },
  );

// ---------- Item 详情与操作 ----------
export const getItem = (id: number) =>
  apiRequest<{ item: Item & { derived_text_preview?: string; storage?: string; file_url?: string } }>(`/item/${id}`);

export const updateItem = (id: number, data: {
  content?: string
  source?: string
  derived_text?: string
  transcript_text?: string
}) => apiRequest<{ item: Item }>(`/item/${id}/update`, { method: 'POST', json: data });

export const archiveItem = (id: number) =>
  apiRequest<{ item: Item; message: string }>(`/archive/${id}`, { method: 'POST' });

export const restoreItem = (id: number) =>
  apiRequest<{ item: Item; message: string }>(`/restore/${id}`, { method: 'POST' });

export const deleteItem = (id: number) =>
  apiRequest<{ message: string }>(`/item/${id}`, { method: 'DELETE' });

// ---------- Cosmos ----------
export const getCosmos = () => apiRequest<CosmosData>('/cosmos');

// ---------- 系统 ----------
export const health = () => apiRequest<{ service: string; db: string }>('/health', { skipAuth: true });
// 注：后端没有 /ping 路由（receiver.py 里的 ai_ping 缺装饰器）；
// 探活统一用 /stats（轻量 + 带 key 鉴权）
export const probe = () => apiRequest<Record<string, unknown>>('/stats');
