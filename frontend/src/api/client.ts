/*
 * 统一 API 客户端
 *
 * 设计原则：
 * - 一个 apiRequest 函数，所有调用走它
 * - X-Axiom-Key 从 auth store 拿，调用方不操心
 * - 成功直接返回 payload；失败抛 ApiError（带 code）
 * - SSE 流式单独一个 streamRequest
 */

import { applyJsonBody } from '@/utils/http';
import { buildQueryString, type QueryValue } from '@/utils/query';
import { executeRequest } from '@/utils/request';

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
  query?: Record<string, QueryValue>;
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
  const { query, skipAuth = false, ...requestOpts } = opts;

  const url = buildUrl(path, query);
  const headers: Record<string, string> = {};

  if (!skipAuth) {
    const key = keyGetter();
    if (!key) {
      throw new ApiError('no_key', '未配置 Axiom key', 401);
    }
    headers['X-Axiom-Key'] = key;
  }

  return executeRequest<T, ApiError>({
    ...requestOpts,
    url,
    headers,
    createError: (code, message, status) => new ApiError(code, message, status),
  });
}

function buildUrl(path: string, query?: Record<string, QueryValue>): string {
  const qs = buildQueryString(query);
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
  const headers: Record<string, string> = {
    'X-Axiom-Key': key,
    Accept: 'text/event-stream',
  };

  const resp = await fetch(path, {
    method: 'POST',
    headers,
    body: applyJsonBody(headers, json),
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
