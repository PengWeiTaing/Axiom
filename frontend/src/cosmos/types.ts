/** Cosmos 数据模型 + 状态机类型 */

export interface CosmosLifeline {
  id: string
  name: string
  parent_id: string
  order_index: number
}

export interface CosmosEntity {
  id: string
  kind: 'task' | 'memory' | 'decision' | 'item'
  title: string
  lifeline_id: string
  meta?: Record<string, unknown>
}

export interface CosmosAssociation {
  id: string
  from: string
  to: string
  relation_type: 'co_occurrence' | 'causal' | 'tension' | 'derived_from'
  confidence: number
  status: 'accepted' | 'pending'
  evidence?: { type: string; excerpt: string; weight: number }[]
}

export interface CosmosData {
  schema_version: string
  root: { id: string; name: string }
  lifelines: CosmosLifeline[]
  entities: CosmosEntity[]
  associations: CosmosAssociation[]
}

export type CosmosState =
  | { kind: 'global_overview' }
  | { kind: 'region_zoom'; lifeline_id: string }
  | { kind: 'node_focus'; entity_kind: 'lifeline' | 'task' | 'memory' | 'decision' | 'item'; entity_id: string }
  | { kind: 'relation_reveal'; entity_kind: 'lifeline' | 'task' | 'memory' | 'decision' | 'item'; entity_id: string }
