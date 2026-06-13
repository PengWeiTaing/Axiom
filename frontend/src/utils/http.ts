export function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError'
}

export function isJsonResponse(response: Response): boolean {
  return (response.headers.get('content-type') || '').includes('application/json')
}

export function applyJsonBody(headers: Record<string, string>, json: unknown): BodyInit {
  headers['Content-Type'] = 'application/json'
  return JSON.stringify(json)
}
