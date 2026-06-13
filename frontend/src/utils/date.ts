export function isoTimestamp(value: Date | string | number = new Date()): string {
  return new Date(value).toISOString()
}

export function isoDate(value: Date | string | number = new Date()): string {
  return isoTimestamp(value).slice(0, 10)
}

export function todayIsoDate(): string {
  return isoDate()
}

export function formatZhDateTime(value: Date | string | number): string {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleString('zh-CN', { hour12: false })
}
