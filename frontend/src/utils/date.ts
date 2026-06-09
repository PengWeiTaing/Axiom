export function isoTimestamp(value: Date | string | number = new Date()): string {
  return new Date(value).toISOString()
}

export function isoDate(value: Date | string | number = new Date()): string {
  return isoTimestamp(value).slice(0, 10)
}

export function todayIsoDate(): string {
  return isoDate()
}
