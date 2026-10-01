import type { CheckQuestion } from './checkState'

export interface ComputedIntegralLesson {
  version: '1.0'
  generator: 'axiom-rational-integral-v1' | 'axiom-trig-signed-area-v1'
  id: string
  source: { expression: string; domain: [number, number]; sample: string; n_initial: number; domain_labels?: [string, string]; bound_origin?: 'explicit_request' }
  prediction: CheckQuestion
  transfer: CheckQuestion
  conclusion: string
  scope_note: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
function text(value: unknown, max: number): value is string {
  return typeof value === 'string' && value.length > 0 && value.length <= max
}
function question(value: unknown, id: string): value is CheckQuestion {
  if (!isRecord(value) || value.id !== id || !text(value.prompt, 800) || !text(value.answerId, 60) || !text(value.hint, 500)) return false
  if (!Array.isArray(value.solution) || value.solution.length < 2 || value.solution.length > 8 || !value.solution.every(step => text(step, 600))) return false
  if (!Array.isArray(value.options) || value.options.length < 2 || value.options.length > 4) return false
  const ids = new Set<string>()
  const labels = new Set<string>()
  for (const option of value.options) {
    if (!isRecord(option) || !text(option.id, 60) || !text(option.label, 200) || !text(option.feedback, 600)) return false
    if (ids.has(option.id) || labels.has(option.label)) return false
    ids.add(option.id)
    labels.add(option.label)
  }
  return ids.has(value.answerId)
}

// Cached/mixed-version content must not attach yesterday's questions to a new
// curve. This checks shape and binding, not cryptographic authenticity or grading.
export function getComputedIntegralLesson(demo: {
  kind: string; data: Record<string, unknown>; practice?: unknown
}): ComputedIntegralLesson | null {
  const lesson = demo.practice
  if (demo.kind !== 'riemann_sum' || demo.data.mode !== 'area_under_curve' || !isRecord(lesson) || lesson.version !== '1.0'
    || !text(lesson.id, 80) || !isRecord(lesson.source)) return null
  const isTrig = lesson.generator === 'axiom-trig-signed-area-v1'
  if (isTrig ? !/^trig-integral-[a-f0-9]{20}$/.test(lesson.id)
    : lesson.generator !== 'axiom-rational-integral-v1' || !/^integral-[a-f0-9]{20}$/.test(lesson.id)) return null
  const source = lesson.source
  if (isTrig && (typeof source.expression !== 'string' || !/^[+-]?(?:sin|cos)\(x\)$/.test(source.expression))) return null
  if (!isTrig && source.domain_labels !== undefined) return null
  if (isTrig && (source.bound_origin !== 'explicit_request' || !Array.isArray(source.domain_labels)
    || source.domain_labels.length !== 2 || !source.domain_labels.every(label => text(label, 24) && /^(?:0|−?(?:[1-9]\d?)?π(?:\/2)?)$/.test(label)))) return null
  if (source.expression !== demo.data.expression || source.sample !== demo.data.sample || source.n_initial !== demo.data.n_initial
    || !text(source.expression, 160) || !['left', 'midpoint', 'right'].includes(String(source.sample))
    || !Number.isInteger(source.n_initial) || Number(source.n_initial) < 2 || Number(source.n_initial) > 128
    || !Number.isInteger(demo.data.n_min) || !Number.isInteger(demo.data.n_max)
    || Number(demo.data.n_min) < 2 || Number(demo.data.n_max) > 128
    || Number(demo.data.n_min) > Number(source.n_initial) || Number(demo.data.n_max) <= Number(source.n_initial)
    || !Array.isArray(source.domain) || source.domain.length !== 2 || !Array.isArray(demo.data.domain)
    || demo.data.domain.length !== 2 || !source.domain.every((v, index) => typeof v === 'number' && Number.isFinite(v) && v === (demo.data.domain as unknown[])[index])
    || source.domain[0] >= source.domain[1]) return null
  if (!question(lesson.prediction, `${lesson.id}-predict`) || !question(lesson.transfer, `${lesson.id}-transfer`)
    || !text(lesson.conclusion, 600) || !text(lesson.scope_note, 400)) return null
  return lesson as unknown as ComputedIntegralLesson
}
