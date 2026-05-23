/** 状态机 — 四态定义 + 切换函数 */
import type { CosmosState } from './types'

export const STATES = ['global_overview', 'region_zoom', 'node_focus', 'relation_reveal'] as const

export function isRelationReveal(s: CosmosState): s is CosmosState & { kind: 'relation_reveal' } {
  return s.kind === 'relation_reveal'
}

export function isNodeFocus(s: CosmosState): boolean {
  return s.kind === 'node_focus' || s.kind === 'relation_reveal'
}

export function transition(
  from: CosmosState,
  to: CosmosState,
  emit: (event: string, payload: unknown) => void
): CosmosState {
  emit(`leave_${from.kind}`, from)
  emit(`enter_${to.kind}`, to)
  return to
}
