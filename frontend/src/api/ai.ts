import { apiRequest } from './client';
import type { ParseResult } from './types';

export const aiParse = (text: string) =>
  apiRequest<ParseResult>('/parse', { method: 'POST', json: { text } });

export const aiParseFeedback = (text: string, aiType: string, userType: string) =>
  apiRequest('/parse/feedback', {
    method: 'POST',
    json: { text, ai_type: aiType, user_type: userType },
  });
