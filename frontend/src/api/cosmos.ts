import { apiRequest } from './client';
import type { AtlasGraphPayload } from '@/atlas/types';
import type { CosmosData, CosmosLifeline } from '@/cosmos/types';

export const getCosmos = () => apiRequest<CosmosData>('/cosmos');

export const getAtlasGraph = (params: { max_nodes?: number } = {}) =>
  apiRequest<AtlasGraphPayload>('/api/atlas/graph', { query: params });

export const createLifeline = (data: {
  id: string;
  name: string;
  parent_id?: string;
  order_index?: number;
}) => apiRequest<{ ok: boolean; lifeline: CosmosLifeline }>('/lifelines', {
  method: 'POST',
  json: data,
});

export const updateLifeline = (
  id: string,
  data: { name?: string; parent_id?: string; order_index?: number },
) => apiRequest<{ ok: boolean; lifeline: CosmosLifeline }>(
  `/lifelines/${encodeURIComponent(id)}`,
  { method: 'PUT', json: data },
);

export const deleteLifeline = (id: string) =>
  apiRequest<{
    ok: boolean;
    message: string;
    unmounted_entities: number;
    reparented_children: number;
  }>(`/lifelines/${encodeURIComponent(id)}`, { method: 'DELETE' });

export const mountEntity = (kind: string, id: number, lifeline_id: string | null) =>
  apiRequest<{
    ok: boolean;
    entity: { id: string; kind: string; title: string; lifeline_id: string | null };
  }>(`/cosmos/entities/${kind}/${id}/lifeline`, {
    method: 'PUT',
    json: { lifeline_id },
  });

export const reviewAssociation = (id: string, status: 'accepted' | 'rejected') =>
  apiRequest<{ association: import('@/cosmos/types').CosmosAssociation }>(
    `/cosmos/associations/${encodeURIComponent(id)}/review`,
    { method: 'POST', json: { status } },
  );

const KIND_PLURAL: Record<string, string> = {
  task: 'tasks',
  memory: 'memories',
  decision: 'decisions',
  item: 'item',
};

export const updateEntity = (kind: string, id: number, data: { title?: string }) => {
  const body: Record<string, string> = {};
  if (data.title !== undefined) {
    body[kind === 'memory' || kind === 'item' ? 'content' : 'title'] = data.title;
  }
  if (kind === 'item') {
    return apiRequest(`/item/${id}/update`, { method: 'POST', json: body });
  }
  return apiRequest(`/${KIND_PLURAL[kind]}/${id}`, { method: 'PUT', json: body });
};

export const deleteEntity = (kind: string, id: number) => {
  const path = kind === 'item' ? `/item/${id}` : `/${KIND_PLURAL[kind]}/${id}`;
  return apiRequest(path, { method: 'DELETE' });
};

export const updateEntityField = (kind: string, id: number, data: Record<string, string>) => {
  if (kind === 'item') {
    return apiRequest(`/item/${id}/update`, { method: 'POST', json: data });
  }
  return apiRequest(`/${KIND_PLURAL[kind]}/${id}`, { method: 'PUT', json: data });
};

export const createAssociation = (data: {
  from: string;
  to: string;
  relation_type: string;
  confidence: number;
  status?: string;
  evidence?: { type: string; excerpt: string; weight: number }[];
}) => apiRequest<{ association: import('@/cosmos/types').CosmosAssociation }>(
  '/cosmos/associations',
  { method: 'POST', json: data },
);

export const updateAssociation = (
  id: string,
  data: {
    relation_type?: string;
    confidence?: number;
    evidence?: { type: string; excerpt: string; weight: number }[];
  },
) => apiRequest<{ association: import('@/cosmos/types').CosmosAssociation }>(
  `/cosmos/associations/${encodeURIComponent(id)}`,
  { method: 'PUT', json: data },
);

export const deleteAssociation = (id: string) =>
  apiRequest<{ ok: boolean; message: string }>(
    `/cosmos/associations/${encodeURIComponent(id)}`,
    { method: 'DELETE' },
  );

export const importCosmos = (data: Record<string, unknown>) =>
  apiRequest<{
    imported: {
      lifelines: { created: number; updated: number };
      entities: { created: number };
      associations: { created: number; skipped: number };
    };
  }>('/cosmos/import', { method: 'POST', json: data });
