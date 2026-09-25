/* ============================================================
 * API 客户端 — 极简 fetch 封装
 *
 * - 自动附带 X-Axiom-Key 认证头
 * - 统一错误处理
 * - 类型安全
 * ============================================================ */

import type { ApiResponse } from '../types'

const KEY_STORAGE_KEY = 'axiom.key'

/** 相对当前 origin 请求，开发时由 Vite proxy 转发到 Flask */
const BASE = ''

function normalizeApiBase(value: string | undefined) {
  return (value ?? '').trim().replace(/\/$/, '')
}

const FIRECUP_API_BASE = normalizeApiBase(import.meta.env.VITE_FIRECUP_API_BASE)

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
    const responseError = body?.error
    const msg = typeof responseError === 'string'
      ? responseError
      : responseError?.message ?? responseError?.code ?? body?.code ?? `HTTP ${res.status}`
    throw new ApiError(msg, res.status, body)
  }

  // 后端返回 { ok: true, data: ... } 格式时自动解包
  if (body && body.ok && 'data' in body) {
    return body.data as T
  }

  return body as unknown as T
}

/**
 * 火山杯公开页专用请求：只在配置了服务端网关时启用。
 *
 * 与 Axiom 主应用请求刻意分离，不读取 localStorage，也不向公开页面
 * 发送 X-Axiom-Key。扣子 PAT 只能存在于服务端网关环境中。
 */
export async function firecupApiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  if (!FIRECUP_API_BASE) {
    return apiRequest<T>(path, options)
  }

  const res = await fetch(`${FIRECUP_API_BASE}${path}`, {
    ...options,
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string> | undefined) ?? {}),
    },
  })

  let body: ApiResponse<T> | null = null
  try {
    body = await res.json()
  } catch {
    // Non-JSON gateway errors are reported by status below.
  }

  if (!res.ok) {
    const responseError = body?.error
    const msg = typeof responseError === 'string'
      ? responseError
      : responseError?.message ?? responseError?.code ?? body?.code ?? `HTTP ${res.status}`
    throw new ApiError(msg, res.status, body)
  }

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
