import { apiRequest } from './client';
import type {
  AdminLogsPayload,
  AuditLogPayload,
  MetricsPayload,
  SystemInfoPayload,
  TimelineKind,
  TimelinePayload,
} from './types';
import { todayIsoDate } from '@/utils/date';

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
    || `axiom_export_${todayIsoDate()}.zip`;
  return { blob, filename };
};

export const getTimeline = (params: {
  kinds?: TimelineKind[] | string;
  date_from?: string;
  date_to?: string;
  page?: number;
  page_size?: number;
} = {}) => {
  const query = {
    ...params,
    kinds: Array.isArray(params.kinds) ? params.kinds.join(',') : params.kinds,
  };
  return apiRequest<TimelinePayload>('/timeline', { query });
};

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

export const health = () =>
  apiRequest<{ service: string; db: string }>('/health', { skipAuth: true });

// 注：后端没有 /ping 路由（receiver.py 里的 ai_ping 缺装饰器）；
// 探活统一用 /stats（轻量 + 带 key 鉴权）
export const probe = () =>
  apiRequest<Record<string, unknown>>('/stats');
