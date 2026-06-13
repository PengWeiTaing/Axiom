import { applyJsonBody, isAbortError, isJsonResponse } from '@/utils/http'
import type { QueryValue } from '@/utils/query'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface BaseRequestOptions {
  method?: HttpMethod
  query?: Record<string, QueryValue>
  json?: unknown
  formData?: FormData
  signal?: AbortSignal
}

export interface RequestFailurePayload {
  code?: string
  message?: string
}

export interface NetworkFailureContext {
  url: string
  method: HttpMethod
  headers: Record<string, string>
  json: unknown
}

export interface ExecuteRequestOptions<TError extends Error> extends BaseRequestOptions {
  url: string
  headers?: Record<string, string>
  networkMessage?: string
  createError: (code: string, message: string, status: number) => TError
  onNetworkFailure?: (context: NetworkFailureContext) => void
}

export async function executeRequest<T = unknown, TError extends Error = Error>(
  options: ExecuteRequestOptions<TError>,
): Promise<T> {
  const {
    url,
    method = 'GET',
    json,
    formData,
    signal,
    headers: inputHeaders,
    networkMessage = '网络错误',
    createError,
    onNetworkFailure,
  } = options
  const headers: Record<string, string> = { ...(inputHeaders || {}) }

  let body: BodyInit | undefined
  if (formData) {
    body = formData
  } else if (json !== undefined) {
    body = applyJsonBody(headers, json)
  }

  let response: Response
  try {
    response = await fetch(url, { method, headers, body, signal })
  } catch (err) {
    if (isAbortError(err)) throw err
    onNetworkFailure?.({ url, method, headers, json })
    throw createError('network', networkMessage, 0)
  }

  if (!isJsonResponse(response)) {
    if (!response.ok) {
      throw createError(`http_${response.status}`, response.statusText, response.status)
    }
    return response as unknown as T
  }

  const data = await response.json()

  if (!response.ok || data?.ok === false) {
    const errorPayload: RequestFailurePayload = data?.error ?? {
      code: 'unknown',
      message: `请求失败 (${response.status})`,
    }
    throw createError(
      errorPayload.code || 'unknown',
      errorPayload.message || `请求失败 (${response.status})`,
      response.status,
    )
  }

  if (data && typeof data === 'object' && 'ok' in data) {
    const { ok: _ok, ...rest } = data as Record<string, unknown>
    return rest as T
  }

  return data as T
}
