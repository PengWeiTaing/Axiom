/* ============================================================
 * Axiom Learning Board — 类型定义
 *
 * 与后端 /api/learning/* 返回的 JSON 结构一致。
 * ============================================================ */

/** 控件类型 */
export type WidgetType = 'concept_map' | 'function_visualizer' | 'quiz_card' | 'example_card'

/** 控件尺寸族 */
export type SizeFamily = 'S' | 'M' | 'L' | 'XL'

/** 知识点节点（概念地图内部使用） */
export interface BoardNode {
  id: string
  label: string
  prerequisite_for: string[]
  difficulty: number           // 0-1
  state: 'locked' | 'available' | 'focused' | 'done'
  description?: string
  position?: { x: number; y: number }
}

/** 题目项（测验卡片内部使用） */
export interface QuizItem {
  id: string
  kind: 'single_choice' | 'multi_choice' | 'text_input' | 'true_false'
  question: string
  options?: string[]           // single/multi choice 时使用
  answer: string | string[]    // 正确答案
  explanation: string
  hint?: string
  concept_refs: string[]       // 关联的知识点 ID
  difficulty: number
}

/** 例题步骤 */
export interface ExampleStep {
  index: number
  title: string
  content: string
  reveal_condition?: string
}

/** 控件（白板上的一个卡片） */
export interface Widget {
  id: string
  board_id: string
  widget_type: WidgetType
  title: string
  size_family: SizeFamily
  position: { x: number; y: number }
  size: { width: number; height: number }
  data: Record<string, unknown>   // widget_type 对应的具体数据
  input: WidgetInput
  state: {
    status: 'idle' | 'active' | 'completed' | 'error'
    progress?: number            // 0-100
    focused_node_id?: string
    current_quiz_index?: number
    revealed_steps?: number[]
    variant_count?: number
  }
  created_at: string
  updated_at: string
}

/** 控件输入配置 */
export interface WidgetInput {
  parameters?: Record<string, number>   // 函数可视化：{ a: 1, b: 0, c: 0 }
  expression?: string                   // 函数可视化：sin(a*x + b)
  question?: string
  domain?: [number, number]             // x 轴范围
}

/** 白板 */
export interface Board {
  id: string
  title: string
  goal: string
  widgets: Widget[]
  source_refs: string[]
  created_at: string
  updated_at: string
  version: number
}

/** 控件事件（用户交互记录） */
export interface WidgetEvent {
  id: string
  widget_id: string
  board_id: string
  event_type: string
  payload: Record<string, unknown>
  client_ts: number             // performance.now() 毫秒
  server_ts: string
}

/** 掌握度记录 */
export interface MasteryRecord {
  id: string
  node_id: string
  user_id: string
  mastery: number               // 0-1
  last_practiced: string
  total_attempts: number
  correct_attempts: number
  avg_latency_ms: number
}

/** 复习项 */
export interface ReviewItem {
  id: string
  node_id: string
  node_label: string
  widget_id: string
  widget_title: string
  urgency: 'high' | 'medium' | 'low'
  last_seen: string
  reason: string
}

/** 生成白板的请求 */
export interface GenerateBoardRequest {
  goal: string
  source_refs?: string[]
  max_widgets?: number
}

/** 保存布局的更新 */
export interface LayoutUpdate {
  widget_id: string
  position?: { x: number; y: number }
  size?: { width: number; height: number }
}

/** API 标准响应包装 */
export interface ApiResponse<T> {
  ok: boolean
  data?: T
  error?: string
  code?: string
}
