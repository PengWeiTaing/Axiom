import { tokenStore } from './auth';
import { enqueue } from './uploadQueue';
import { applyJsonBody, isAbortError, isJsonResponse } from '@/utils/http';
import { buildQueryString, type QueryValue } from '@/utils/query';

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
  const { method = 'GET', query, json, formData, signal, skipAuth = false } = opts;

  const url = buildUrl(path, query);
  const headers: Record<string, string> = {};

  if (!skipAuth) {
    const key = tokenStore.getToken();
    if (!key) {
      throw new ApiClientError('no_key', '未配置 Axiom key', 401);
    }
    headers['X-Axiom-Key'] = key;
  }

  let body: BodyInit | undefined;
  if (formData) {
    body = formData;
  } else if (json !== undefined) {
    body = applyJsonBody(headers, json);
  }

  const isWriteMethod = method === 'POST' || method === 'PUT' || method === 'PATCH';

  let resp: Response;
  try {
    resp = await fetch(url, { method, headers, body, signal });
  } catch (err) {
    if (isAbortError(err)) throw err;

    if (isWriteMethod && json !== undefined) {
      enqueue({
        url,
        method: method as 'POST' | 'PUT' | 'PATCH',
        body: json,
        headers,
      });
    }

    throw new ApiClientError('network', '网络错误', 0);
  }

  if (!isJsonResponse(resp)) {
    if (!resp.ok) {
      throw new ApiClientError('http_' + resp.status, resp.statusText, resp.status);
    }
    return resp as unknown as T;
  }

  const data = await resp.json();

  if (!resp.ok || data?.ok === false) {
    const err = data?.error ?? {
      code: 'unknown',
      message: `请求失败 (${resp.status})`,
    };
    throw new ApiClientError(err.code, err.message, resp.status);
  }

  if (data && typeof data === 'object' && 'ok' in data) {
    const { ok: _ok, ...rest } = data as Record<string, unknown>;
    return rest as T;
  }

  return data as T;
}
