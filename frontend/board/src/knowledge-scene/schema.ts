export type SceneRenderer =
  | { kind: 'static_html'; src: string }
  | { kind: 'structured_scene' }

export type FormulaPartRelation =
  | 'appear'
  | 'match'
  | 'copy'
  | 'rewrite'
  | 'derive'
  | 'substitute'
  | 'split'
  | 'merge'

export interface FormulaPart {
  id: string
  latex: string
  from?: string[]
  relation?: FormulaPartRelation
  phase?: number
  cancel_out?: boolean
  final?: boolean
}

export type FormulaStep = {
  latex: string
  note: string
  parts?: FormulaPart[]
  cancel_phase?: number
}

export interface SceneSemanticLink {
  semantic_ids?: string[]
}

export type SceneBlock = (
  | { kind: 'paragraph'; text: string }
  | { kind: 'definition'; term: string; text: string; latex: string }
  | { kind: 'formula'; latex: string; caption: string }
  | { kind: 'derivation'; title: string; steps: FormulaStep[] }
  | { kind: 'example'; prompt: string; steps: Array<{ text: string; latex: string }>; result: string }
  | { kind: 'list'; style: 'ordered' | 'unordered'; items: string[] }
  | { kind: 'comparison'; columns: string[]; rows: string[][] }
  ) & SceneSemanticLink

export interface ScenePredictionOption {
  id: string
  label: string
}

export interface ScenePrediction {
  prompt: string
  options: ScenePredictionOption[]
  answer_id: string
  explanation?: string
  reveal_label?: string
}

export interface SceneSection {
  id: string
  heading: string
  blocks: SceneBlock[]
}

export type SceneDemonstrationKind =
  | 'constrained_extremum_2d'
  | 'equation_morph'
  | 'function_plot'
  | 'geometry'
  | 'force_diagram'
  | 'concept_map'
  | 'timeline'
  | 'probability_bars'
  | 'process'
  | 'linked_lab'
  | 'limit_microscope'
  | 'constraint_geometry'
  | 'field_experiment'
  | 'riemann_sum'

export interface SceneDemonstration {
  id: string
  kind: SceneDemonstrationKind
  title: string
  anchor_section_id: string
  side: 'left' | 'right'
  data: Record<string, unknown>
  semantic_ids?: string[]
  prediction?: ScenePrediction
}

export interface StructuredSceneContent {
  sections: SceneSection[]
  demonstrations: SceneDemonstration[]
  summary: string[]
}
