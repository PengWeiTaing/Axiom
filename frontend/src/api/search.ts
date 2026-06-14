import { apiRequest } from './client';
import type { Decision, Item, ItemType, Memory, Task } from './types';

export const searchAll = (q: string, limit = 20, filters: {
  type?: ItemType | '';
  source?: string;
  processing_state?: 'ready' | 'pending' | '';
  processing_override?: 'ready' | '';
} = {}) =>
  apiRequest<{
    items?: Item[];
    memories?: Memory[];
    tasks?: Task[];
    decisions?: Decision[];
    results?: { items?: Item[]; memories?: Memory[]; tasks?: Task[]; decisions?: Decision[] };
  }>('/search/all', { query: { q, limit, ...filters } }).then((payload) => {
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
