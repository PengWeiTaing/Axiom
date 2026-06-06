/*
 * 端点封装层 — 把 apiRequest 包成有类型的函数
 * 调用方只依赖这里，不直接拼 URL
 */

import { apiRequest } from './client';
import type {
  Item,
  ItemDetail,
  ItemType,
  Memory,
  MemoryDetail,
  Task,
  Decision,
  ParseResult,
  Paginated,
  ArtifactsSummaryPayload,
  AutomationJobsPayload,
  AutomationRunListPayload,
  AutomationRunPayload,
  MemoryCategory,
  MemoryList,
  MemoryStatsPayload,
  MemoryStatus,
  DecisionStatus,
  DecisionList,
  TaskList,
  TaskPriority,
  TaskStatus,
  OverviewPayload,
  ProcessingBacklogPayload,
  ProcessingMarkPayload,
  ProcessingNextPayload,
  LearningBoardListPayload,
  SystemInfoPayload,
  MetricsPayload,
  AuditLogPayload,
  AdminLogsPayload,
  TimelinePayload,
  TimelineKind,
} from './types';
import type { CosmosData, CosmosLifeline } from '@/cosmos/types';
import type { AtlasGraphPayload } from '@/atlas/types';

// ---------- 采集 ----------
export const addNote = (text: string, source = 'web_app') =>
  apiRequest<{ message: string; item: Item }>('/add', {
    method: 'POST',
    json: { text, source },
  }).then((payload) => ({ ...payload, id: payload.item.id }));

export const uploadFile = (file: File, content?: string, source = 'web_app') => {
  const fd = new FormData();
  fd.append('file', file);
  if (content) fd.append('content', content);
  fd.append('source', source);
  return apiRequest<{ id: number; item: Item }>('/upload', {
    method: 'POST',
    formData: fd,
  }).then((payload) => ({ ...payload, id: payload.item.id }));
};

export const fetchUrl = (url: string) =>
  apiRequest<{ id: number; item: Item }>('/fetch', {
    method: 'POST',
    json: { url },
  });

// ---------- 检索 ----------
export const getRecent = (params: { page?: number; type?: string } = {}) =>
  apiRequest<Paginated<Item>>('/recent', { query: params });

export const getOverview = (params: { recent_limit?: number; preview_chars?: number } = {}) =>
  apiRequest<OverviewPayload>('/overview', { query: params });

export const getProcessingBacklog = (params: { group_limit?: number } = {}) =>
  apiRequest<ProcessingBacklogPayload>('/processing/backlog', { query: params });

export const getProcessingNext = (params: { type?: ItemType; exclude_id?: number } = {}) =>
  apiRequest<ProcessingNextPayload>('/processing/next', { query: params });

export const listLearningBoards = () =>
  apiRequest<LearningBoardListPayload>('/api/learning/boards');

export const getArtifactsSummary = (params: { preview_chars?: number } = {}) =>
  apiRequest<ArtifactsSummaryPayload>('/artifacts/summary', { query: params });

export const getArtifactContent = async (fileUrl: string) => {
  const response = await apiRequest<Response>(fileUrl);
  return response.text();
};

export const markProcessingReady = (ids: number[]) =>
  apiRequest<ProcessingMarkPayload>('/processing/mark-ready', {
    method: 'POST',
    json: { ids },
  });

export const markProcessingPending = (ids: number[]) =>
  apiRequest<ProcessingMarkPayload>('/processing/mark-pending', {
    method: 'POST',
    json: { ids },
  });

export const getAutomationJobs = () =>
  apiRequest<AutomationJobsPayload>('/automation/jobs');

export const getAutomationRuns = (params: {
  page?: number;
  page_size?: number;
  job?: string;
  status?: string;
} = {}) => apiRequest<AutomationRunListPayload>('/automation/runs', { query: params });

export const runAutomationJob = (job: string, date?: string) =>
  apiRequest<AutomationRunPayload>('/automation/run', {
    method: 'POST',
    json: { job, date },
  });

export const getSystemInfo = () =>
  apiRequest<SystemInfoPayload>('/system');

export const getMetrics = () =>
  apiRequest<MetricsPayload>('/metrics');

export const getAuditLog = (params: {
  page?: number;
  page_size?: number;
  action?: string;
  target_type?: string;
} = {}) => apiRequest<AuditLogPayload>('/audit-log', { query: params });

export const getAdminLogs = (params: {
  lines?: number;
  level?: string;
} = {}) => apiRequest<AdminLogsPayload>('/admin/logs', { query: params });

function filenameFromDisposition(disposition: string | null): string | null {
  if (!disposition) return null;
  const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) return decodeURIComponent(utf8Match[1].replace(/"/g, ''));
  const plainMatch = disposition.match(/filename="?([^";]+)"?/i);
  return plainMatch?.[1] || null;
}

export const exportData = async () => {
  const response = await apiRequest<Response>('/export', { method: 'POST' });
  const blob = await response.blob();
  const filename = filenameFromDisposition(response.headers.get('content-disposition'))
    || `axiom_export_${new Date().toISOString().slice(0, 10)}.zip`;
  return { blob, filename };
};

export const getTimeline = (params: {
  kinds?: TimelineKind[] | string;
  page?: number;
  page_size?: number;
} = {}) => {
  const query = {
    ...params,
    kinds: Array.isArray(params.kinds) ? params.kinds.join(',') : params.kinds,
  };
  return apiRequest<TimelinePayload>('/timeline', { query });
};

export const searchAll = (q: string, limit = 20) =>
  apiRequest<{
    items?: Item[];
    memories?: Memory[];
    tasks?: Task[];
    decisions?: Decision[];
    results?: { items?: Item[]; memories?: Memory[]; tasks?: Task[]; decisions?: Decision[] };
  }>('/search/all', { query: { q, limit } }).then((payload) => {
    const results = payload.results ?? payload;
    return {
      items: results.items ?? [],
      memories: results.memories ?? [],
      tasks: results.tasks ?? [],
      decisions: results.decisions ?? [],
    };
  });

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
  detail?: string;
  priority?: TaskPriority;
  due_date?: string;
  estimated_minutes?: number;
  memory_id?: number;
}) => apiRequest<{ task: Task }>('/tasks', { method: 'POST', json: data });

export const listTasks = (params: {
  status?: TaskStatus | '';
  priority?: TaskPriority | '';
  due_date?: string;
  page?: number;
  page_size?: number;
} = {}) => apiRequest<TaskList>('/tasks', { query: params });

export const tasksToday = () =>
  apiRequest<{ today: Task[]; overdue: Task[] }>('/tasks/today');

export const completeTask = (id: number) =>
  apiRequest<{ task: Task }>(`/tasks/${id}/done`, { method: 'POST' });

// ---------- 记忆 ----------
export const createMemory = (data: {
  category: MemoryCategory;
  content: string;
  detail?: string;
  source_item_id?: number;
  source_text?: string;
}) => apiRequest<{ memory: Memory }>('/memories', { method: 'POST', json: data });

// ---------- 决策 ----------
export const createDecision = (data: {
  title: string;
  decision: string;
  context?: string;
  reasoning?: string;
  expected_outcome?: string;
}) => apiRequest<{ decision: Decision }>('/decisions', { method: 'POST', json: data });

// ---------- 记忆扩展（Atlas 用） ----------
export const listMemories = (params: {
  category?: MemoryCategory | '';
  status?: MemoryStatus | '';
  page?: number;
  page_size?: number;
} = {}) => apiRequest<MemoryList>('/memories', { query: params });

export const getTask = (id: number) =>
  apiRequest<{ task: Task }>(`/tasks/${id}`)

export const getMemory = (id: number) =>
  apiRequest<{ memory: MemoryDetail }>(
    `/memories/${id}`,
  );

export const getDecision = (id: number) =>
  apiRequest<{ decision: Decision }>(`/decisions/${id}`)

export const memoriesStats = () =>
  apiRequest<MemoryStatsPayload>('/memories/stats');

// ---------- 决策扩展 ----------
export const listDecisions = (params: {
  status?: DecisionStatus | '';
  page?: number;
  page_size?: number;
} = {}) =>
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
  apiRequest<{ item: ItemDetail }>(`/item/${id}`);

export const getItemFile = async (fileUrl: string) => {
  const response = await apiRequest<Response>(fileUrl);
  return response.blob();
};

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

export const getAtlasGraph = (params: { max_nodes?: number } = {}) =>
  apiRequest<AtlasGraphPayload>('/api/atlas/graph', { query: params });

// ---------- Lifeline ----------
export const createLifeline = (data: { id: string; name: string; parent_id?: string; order_index?: number }) =>
  apiRequest<{ ok: boolean; lifeline: CosmosLifeline }>('/lifelines', { method: 'POST', json: data });

export const updateLifeline = (id: string, data: { name?: string; parent_id?: string; order_index?: number }) =>
  apiRequest<{ ok: boolean; lifeline: CosmosLifeline }>(`/lifelines/${encodeURIComponent(id)}`, { method: 'PUT', json: data });

export const deleteLifeline = (id: string) =>
  apiRequest<{ ok: boolean; message: string; unmounted_entities: number; reparented_children: number }>(`/lifelines/${encodeURIComponent(id)}`, { method: 'DELETE' });

export const mountEntity = (kind: string, id: number, lifeline_id: string | null) =>
  apiRequest<{ ok: boolean; entity: { id: string; kind: string; title: string; lifeline_id: string | null } }>(`/cosmos/entities/${kind}/${id}/lifeline`, { method: 'PUT', json: { lifeline_id } });

export const reviewAssociation = (id: string, status: 'accepted' | 'rejected') =>
  apiRequest<{ association: import('@/cosmos/types').CosmosAssociation }>(
    `/cosmos/associations/${encodeURIComponent(id)}/review`,
    { method: 'POST', json: { status } },
  );

// ---------- Entity CRUD（Atlas 编辑用） ----------
const KIND_PLURAL: Record<string, string> = { task: 'tasks', memory: 'memories', decision: 'decisions', item: 'item' }

export const updateEntity = (kind: string, id: number, data: { title?: string }) => {
  const body: Record<string, string> = {}
  if (data.title !== undefined) {
    body[kind === 'memory' || kind === 'item' ? 'content' : 'title'] = data.title
  }
  if (kind === 'item') {
    return apiRequest(`/item/${id}/update`, { method: 'POST', json: body })
  }
  return apiRequest(`/${KIND_PLURAL[kind]}/${id}`, { method: 'PUT', json: body })
}

export const deleteEntity = (kind: string, id: number) => {
  const path = kind === 'item' ? `/item/${id}` : `/${KIND_PLURAL[kind]}/${id}`
  return apiRequest(path, { method: 'DELETE' })
}

export const updateEntityField = (kind: string, id: number, data: Record<string, string>) => {
  if (kind === 'item') {
    return apiRequest(`/item/${id}/update`, { method: 'POST', json: data })
  }
  return apiRequest(`/${KIND_PLURAL[kind]}/${id}`, { method: 'PUT', json: data })
}

// Quick actions
export const markTaskDone = (id: number) => apiRequest<{ task: Task }>(`/tasks/${id}/done`, { method: 'POST' })
export const markTaskTodo = (id: number) => apiRequest<{ task: Task }>(`/tasks/${id}/todo`, { method: 'POST' })
export const cancelTask = (id: number) => apiRequest<{ task: Task }>(`/tasks/${id}/cancel`, { method: 'POST' })
export const rescheduleTask = (id: number, due_date?: string) =>
  apiRequest<{ task: Task }>(`/tasks/${id}/reschedule`, { method: 'POST', json: { due_date } })
export const confirmMemory = (id: number) =>
  apiRequest<{ memory: Memory }>(`/memories/${id}/confirm`, { method: 'POST' })
export const archiveMemory = (id: number) =>
  apiRequest<{ memory: Memory }>(`/memories/${id}/archive`, { method: 'POST' })
export const reviewDecision = (id: number, actual_outcome: string) =>
  apiRequest<{ decision: Decision }>(`/decisions/${id}/review`, {
    method: 'POST',
    json: { actual_outcome },
  })

// ---------- Association CRUD ----------
export const createAssociation = (data: {
  from: string; to: string; relation_type: string; confidence: number;
  status?: string; evidence?: { type: string; excerpt: string; weight: number }[]
}) => apiRequest<{ association: import('@/cosmos/types').CosmosAssociation }>('/cosmos/associations', { method: 'POST', json: data })

export const updateAssociation = (id: string, data: {
  relation_type?: string; confidence?: number; evidence?: { type: string; excerpt: string; weight: number }[]
}) => apiRequest<{ association: import('@/cosmos/types').CosmosAssociation }>(`/cosmos/associations/${encodeURIComponent(id)}`, { method: 'PUT', json: data })

export const deleteAssociation = (id: string) =>
  apiRequest<{ ok: boolean; message: string }>(`/cosmos/associations/${encodeURIComponent(id)}`, { method: 'DELETE' })

export const importCosmos = (data: Record<string, unknown>) =>
  apiRequest<{ imported: { lifelines: { created: number; updated: number }; entities: { created: number }; associations: { created: number; skipped: number } } }>('/cosmos/import', { method: 'POST', json: data })

// ---------- 系统 ----------
export const health = () => apiRequest<{ service: string; db: string }>('/health', { skipAuth: true });
// 注：后端没有 /ping 路由（receiver.py 里的 ai_ping 缺装饰器）；
// 探活统一用 /stats（轻量 + 带 key 鉴权）
export const probe = () => apiRequest<Record<string, unknown>>('/stats');
