import { apiRequest } from './client';
import type {
  Decision,
  DecisionList,
  DecisionStatus,
  GoalCommitmentState,
  GoalProfile,
  Memory,
  MemoryCategory,
  MemoryDetail,
  MemoryList,
  MemoryStatsPayload,
  MemoryStatus,
  Task,
  TaskBreakdownPayload,
  TaskList,
  TaskPriority,
  TaskStatus,
} from './types';

export const createTask = (data: {
  title: string;
  detail?: string;
  priority?: TaskPriority;
  due_date?: string;
  estimated_minutes?: number;
  memory_id?: number;
}) => apiRequest<{ task: Task }>('/tasks', { method: 'POST', json: data });

export const breakDownTask = (id: number, steps: { title: string; estimated_minutes: number }[]) =>
  apiRequest<TaskBreakdownPayload>(`/tasks/${id}/breakdown`, {
    method: 'POST',
    json: { steps },
  });

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

export const createMemory = (data: {
  category: MemoryCategory;
  content: string;
  detail?: string;
  source_item_id?: number;
  source_text?: string;
}) => apiRequest<{ memory: Memory }>('/memories', { method: 'POST', json: data });

export const createDecision = (data: {
  title: string;
  decision: string;
  context?: string;
  reasoning?: string;
  expected_outcome?: string;
}) => apiRequest<{ decision: Decision }>('/decisions', { method: 'POST', json: data });

export const listMemories = (params: {
  category?: MemoryCategory | '';
  status?: MemoryStatus | '';
  page?: number;
  page_size?: number;
} = {}) => apiRequest<MemoryList>('/memories', { query: params });

export const getTask = (id: number) =>
  apiRequest<{ task: Task }>(`/tasks/${id}`);

export const getMemory = (id: number) =>
  apiRequest<{ memory: MemoryDetail }>(
    `/memories/${id}`,
  );

export const getDecision = (id: number) =>
  apiRequest<{ decision: Decision }>(`/decisions/${id}`);

export const memoriesStats = () =>
  apiRequest<MemoryStatsPayload>('/memories/stats');

export const listDecisions = (params: {
  status?: DecisionStatus | '';
  page?: number;
  page_size?: number;
} = {}) =>
  apiRequest<DecisionList>('/decisions', { query: params });

export const markTaskDone = (id: number) =>
  apiRequest<{ task: Task }>(`/tasks/${id}/done`, { method: 'POST' });

export const markTaskTodo = (id: number) =>
  apiRequest<{ task: Task }>(`/tasks/${id}/todo`, { method: 'POST' });

export const cancelTask = (id: number) =>
  apiRequest<{ task: Task }>(`/tasks/${id}/cancel`, { method: 'POST' });

export const rescheduleTask = (id: number, due_date?: string) =>
  apiRequest<{ task: Task }>(`/tasks/${id}/reschedule`, {
    method: 'POST',
    json: { due_date },
  });

export const confirmMemory = (id: number) =>
  apiRequest<{ memory: Memory }>(`/memories/${id}/confirm`, { method: 'POST' });

export const archiveMemory = (id: number) =>
  apiRequest<{ memory: Memory }>(`/memories/${id}/archive`, { method: 'POST' });

export const updateGoalCommitment = (id: number, data: {
  success_criteria?: string | null;
  target_date?: string | null;
  review_cadence_days?: number;
  parent_goal_id?: number | null;
  state?: GoalCommitmentState;
}) => apiRequest<{ goal_profile: GoalProfile }>(`/api/goals/${id}/commitment`, {
  method: 'PUT',
  json: data,
});

export const reviewGoalCommitment = (id: number) =>
  apiRequest<{ goal_profile: GoalProfile }>(`/api/goals/${id}/review`, {
    method: 'POST',
  });

export const reviewDecision = (id: number, actual_outcome: string) =>
  apiRequest<{ decision: Decision }>(`/decisions/${id}/review`, {
    method: 'POST',
    json: { actual_outcome },
  });
