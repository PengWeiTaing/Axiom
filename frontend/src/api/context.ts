import { apiRequest } from './client';
import type {
  ContextCompletionPayload,
  ContextFeedbackPayload,
  ContextFitFeedback,
  NowContextPayload,
} from './types';

export const getNowContext = (limit = 5) =>
  apiRequest<NowContextPayload>('/api/context/now', { query: { limit } });

export const completeContextAction = (taskId: number) =>
  apiRequest<ContextCompletionPayload>(`/api/context/actions/${taskId}/complete`, {
    method: 'POST',
  });

export const submitContextFeedback = (outcomeId: number, fitFeedback: ContextFitFeedback) =>
  apiRequest<ContextFeedbackPayload>(`/api/context/outcomes/${outcomeId}/feedback`, {
    method: 'POST',
    json: { fit_feedback: fitFeedback },
  });
