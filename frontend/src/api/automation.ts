import { apiRequest } from './client';
import type {
  AutomationJobsPayload,
  AutomationRunListPayload,
  AutomationRunPayload,
} from './types';

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
