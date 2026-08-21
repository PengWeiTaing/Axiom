import { apiRequest } from './client';
import type { NowContextPayload } from './types';

export const getNowContext = (limit = 5) =>
  apiRequest<NowContextPayload>('/api/context/now', { query: { limit } });
