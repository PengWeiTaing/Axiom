import { apiRequest } from './client';
import type {
  ArtifactsSummaryPayload,
  Item,
  ItemDetail,
  ItemType,
  LearningBoardListPayload,
  OverviewPayload,
  Paginated,
  ProcessingBacklogPayload,
  ProcessingMarkPayload,
  ProcessingNextPayload,
} from './types';

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
