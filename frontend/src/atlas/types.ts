export type AtlasNodeType =
  | 'root'
  | 'lifeline'
  | 'domain'
  | 'module'
  | 'cluster'
  | 'memory'
  | 'task'
  | 'decision'
  | 'item'

export type AtlasEdgeClass = 'structural' | 'semantic' | 'focus'

export interface AtlasLayout {
  x: number
  y: number
  z?: number
  fixed?: boolean
  sector_angle?: number
}

export interface AtlasNode {
  id: string
  type: AtlasNodeType
  label: string
  summary: string
  layer: number
  semantic_level: string
  lifeline_id: string | null
  cluster_id: string | null
  module_id: string | null
  weight: number
  centrality: number
  status: string | null
  created_at: string | null
  updated_at: string | null
  visible_label: boolean
  size: number
  raw_id: string | null
  layout: AtlasLayout
  meta: Record<string, unknown>
}

export interface AtlasEdge {
  id: string
  source: string
  target: string
  edge_class: AtlasEdgeClass
  relation_type: string
  strength: number
  confidence: number
  layer_delta: number
  evidence: string
  generated_by: string
  visible_by_default: boolean
  distance: number
  width: number
  opacity: number
  color_from: string
  color_to: string
  line_style: 'solid' | 'dashed' | 'dotted' | 'directed' | 'arrow' | string
}

export interface AtlasGraphPayload {
  schema_version: 'atlas.v1'
  mode: 'global' | 'local'
  nodes: AtlasNode[]
  edges: AtlasEdge[]
  view: {
    max_nodes: number
    node_count: number
    edge_count: number
    hidden_nodes: number
    hidden_edges: number
    unclassified_count?: number
    unclassified_ratio?: number
    hidden_unclassified_items?: number
    layout?: string
    generated_at: string
    graph_hash?: string
    center?: string
    depth?: number
  }
}
