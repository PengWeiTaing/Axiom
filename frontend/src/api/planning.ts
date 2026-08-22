import { apiRequest } from './client';
import type {
  WeeklyDecompositionFit,
  WeeklyPlanMutationPayload,
  WeeklyPlanPayload,
} from './types';

export const getWeeklyPlan = (date?: string) =>
  apiRequest<WeeklyPlanPayload>('/api/planning/week', {
    query: date ? { date } : undefined,
  });

export const addWeeklyPlanTask = (taskId: number, date?: string) =>
  apiRequest<WeeklyPlanMutationPayload>(`/api/planning/week/tasks/${taskId}`, {
    method: 'POST',
    json: date ? { date } : {},
  });

export const removeWeeklyPlanSelection = (selectionId: number, date?: string) =>
  apiRequest<WeeklyPlanMutationPayload>(`/api/planning/week/selections/${selectionId}`, {
    method: 'DELETE',
    json: date ? { date } : {},
  });

export const saveWeeklyReview = (
  decomposition_fit: WeeklyDecompositionFit,
  reflection: string,
  date?: string,
) => apiRequest<WeeklyPlanPayload>('/api/planning/week/review', {
  method: 'PUT',
  json: {
    decomposition_fit,
    reflection,
    ...(date ? { date } : {}),
  },
});
