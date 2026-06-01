/* ============================================================
 * API 客户端 — 极简 fetch 封装
 *
 * - 自动附带 X-Axiom-Key 认证头
 * - 统一错误处理
 * - 类型安全
 * ============================================================ */

import type { ApiResponse } from '../types'

const KEY_STORAGE_KEY = 'axiom_key'

/** 相对当前 origin 请求，开发时由 Vite proxy 转发到 Flask */
const BASE = ''

/**
 * 通用请求函数
 * @param path   API 路径，例如 /api/learning/boards/xxx
 * @param options fetch 选项
 * @returns 解析后的 JSON 数据
 */
export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const key = localStorage.getItem(KEY_STORAGE_KEY) ?? ''

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Axiom-Key': key,
    ...((options.headers as Record<string, string> | undefined) ?? {}),
  }

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
  })

  // 处理空响应（204 No Content 等）
  if (res.status === 204) {
    return undefined as unknown as T
  }

  // 尝试解析 JSON 错误
  let body: ApiResponse<T> | null = null
  try {
    body = await res.json()
  } catch {
    // 非 JSON 响应
  }

  if (!res.ok) {
    const msg = body?.error ?? body?.code ?? `HTTP ${res.status}`
    throw new ApiError(msg, res.status, body)
  }

  // 后端返回 { ok: true, data: ... } 格式时自动解包
  if (body && body.ok && 'data' in body) {
    return body.data as T
  }

  return body as unknown as T
}

/** API 错误 */
export class ApiError extends Error {
  status: number
  body: unknown

  constructor(message: string, status: number, body: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}
