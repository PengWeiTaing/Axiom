import { tokenStore } from './auth';
import { enqueue } from './uploadQueue';
import { buildQueryString, type QueryValue } from '@/utils/query';
import { executeRequest } from '@/utils/request';

export class ApiClientError extends Error {
  code: string;
  status: number;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
    this.name = 'ApiClientError';
  }
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  query?: Record<string, QueryValue>;
  json?: unknown;
  formData?: FormData;
  signal?: AbortSignal;
  skipAuth?: boolean;
}

let baseUrl = '';

export function setBaseUrl(url: string): void {
  baseUrl = url.replace(/\/+$/, '');
}

export function getBaseUrl(): string {
  return baseUrl;
}

function buildUrl(path: string, query?: RequestOptions['query']): string {
  const full = baseUrl + path;
  const qs = buildQueryString(query);
  return qs ? `${full}?${qs}` : full;
}

export async function apiRequest<T = unknown>(
  path: string,
  opts: RequestOptions = {},
): Promise<T> {
  const { method = 'GET', query, json, skipAuth = false, ...requestOpts } = opts;

  const url = buildUrl(path, query);
  const headers: Record<string, string> = {};

  if (!skipAuth) {
    const key = tokenStore.getToken();
    if (!key) {
      throw new ApiClientError('no_key', '未配置 Axiom key', 401);
    }
    headers['X-Axiom-Key'] = key;
  }

  const isWriteMethod = method === 'POST' || method === 'PUT' || method === 'PATCH';

  return executeRequest<T, ApiClientError>({
    ...requestOpts,
    method,
    json,
    url,
    headers,
    createError: (code, message, status) => new ApiClientError(code, message, status),
    onNetworkFailure: (context) => {
      if (!isWriteMethod || json === undefined) return;
      enqueue({
        url: context.url,
        method: method as 'POST' | 'PUT' | 'PATCH',
        body: json,
        headers: context.headers,
      });
    },
  });
}
