/*
 * 统一 API 客户端
 *
 * 设计原则：
 * - 一个 apiRequest 函数，所有调用走它
 * - X-Axiom-Key 从 auth store 拿，调用方不操心
 * - 成功直接返回 payload；失败抛 ApiError（带 code）
 * - SSE 流式单独一个 streamRequest
 */

import type { ApiErrorPayload } from './types';

export class ApiError extends Error {
  code: string;
  status: number;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
    this.name = 'ApiError';
  }
}

// 全局 key 来源 — 在 main.ts 初始化时由 auth store 注入
let keyGetter: () => string | null = () => null;
export function setKeyGetter(fn: () => string | null) {
  keyGetter = fn;
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  query?: Record<string, string | number | undefined | null>;
  json?: unknown;
  formData?: FormData;
  signal?: AbortSignal;
  // 跳过 key 检查（/health / /app 等公开端点）
  skipAuth?: boolean;
}

export async function apiRequest<T = unknown>(
  path: string,
  opts: RequestOptions = {},
): Promise<T> {
  const { method = 'GET', query, json, formData, signal, skipAuth = false } = opts;

  const url = buildUrl(path, query);
  const headers: Record<string, string> = {};

  if (!skipAuth) {
    const key = keyGetter();
    if (!key) {
      throw new ApiError('no_key', '未配置 Axiom key', 401);
    }
    headers['X-Axiom-Key'] = key;
  }

  let body: BodyInit | undefined;
  if (formData) {
    body = formData;
  } else if (json !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(json);
  }

  let resp: Response;
  try {
    resp = await fetch(url, { method, headers, body, signal });
  } catch (err) {
    if ((err as Error).name === 'AbortError') throw err;
    throw new ApiError('network', '网络错误', 0);
  }

  const contentType = resp.headers.get('content-type') || '';

  // 文件下载等非 JSON 响应
  if (!contentType.includes('application/json')) {
    if (!resp.ok) {
      throw new ApiError('http_' + resp.status, resp.statusText, resp.status);
    }
    return resp as unknown as T;
  }

  const data = await resp.json();

  if (!resp.ok || data?.ok === false) {
    const err: ApiErrorPayload = data?.error ?? {
      code: 'unknown',
      message: `请求失败 (${resp.status})`,
    };
    throw new ApiError(err.code, err.message, resp.status);
  }

  // 后端 ok 响应是 {ok: true, ...payload}；把 ok 剥掉
  if (data && typeof data === 'object' && 'ok' in data) {
    const { ok: _ok, ...rest } = data as Record<string, unknown>;
    return rest as T;
  }
  return data as T;
}

function buildUrl(path: string, query?: Record<string, string | number | undefined | null>): string {
  if (!query) return path;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null || v === '') continue;
    params.append(k, String(v));
  }
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

/**
 * SSE 流式请求 — 用于 /chat/stream
 * 后端约定格式: data: {"content":"字"}\n\n
 */
export async function streamRequest(
  path: string,
  json: unknown,
  onChunk: (text: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const key = keyGetter();
  if (!key) throw new ApiError('no_key', '未配置 Axiom key', 401);

  const resp = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Axiom-Key': key,
      Accept: 'text/event-stream',
    },
    body: JSON.stringify(json),
    signal,
  });

  if (!resp.ok || !resp.body) {
    throw new ApiError('stream_failed', `流请求失败 (${resp.status})`, resp.status);
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE 帧以 \n\n 分隔
    let sep: number;
    while ((sep = buffer.indexOf('\n\n')) !== -1) {
      const frame = buffer.slice(0, sep);
      buffer = buffer.slice(sep + 2);

      for (const line of frame.split('\n')) {
        if (!line.startsWith('data:')) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === '[DONE]') continue;
        try {
          const data = JSON.parse(payload);
          if (typeof data.content === 'string') onChunk(data.content);
        } catch {
          // 忽略解析失败的帧
        }
      }
    }
  }
}
