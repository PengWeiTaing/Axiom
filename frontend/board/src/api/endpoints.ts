/* API 端点 — 类型化封装 + 后端响应 → 前端类型适配 */
import { apiRequest, firecupApiRequest } from './client'
import type { Board, Widget, WidgetEvent, ReviewItem, BoardNode, LayoutUpdate } from '../types'
import type { SceneRenderer, StructuredSceneContent } from '../knowledge-scene/schema'

export const CURRENT_KNOWLEDGE_SCENE_QUALITY_VERSION = '1.7'

export interface KnowledgeSceneManifest {
  schema_version: string
  scene_id: string
  template_id: string
  title: string
  topic: string
  subject: string
  learning_goal: string
  renderer: SceneRenderer
  content?: StructuredSceneContent
  learning_path: Array<{ id: string; label: string }>
  capabilities: string[]
  generation: {
    provider: 'coze' | 'demo'
    workflow_id: string
    generated_at: string
    fallback_reason: string
    quality_status: 'approved'
    quality_score: number
    quality_version: string
  }
}

export type KnowledgeSceneJobStatus = 'queued' | 'running' | 'succeeded' | 'failed'

export interface KnowledgeSceneJobProgress {
  percent?: number | null
  stage: string
  message?: string
}

export interface KnowledgeSceneJobCreated {
  job_id: string
  status: KnowledgeSceneJobStatus
  status_url?: string
  retry_after_ms?: number
}

export interface KnowledgeSceneJob extends KnowledgeSceneJobCreated {
  progress: KnowledgeSceneJobProgress
  scene?: KnowledgeSceneManifest
  error?: unknown
}

// ---- 适配器：后端 JSON → 前端类型 ----

interface BackendWidget {
  id: string; board_id: string; type: string; title: string
  spec_version: string; spec_json: string
  locked_by_user: number; pinned_by_user: number
  generation_id: string | null; created_at: string; updated_at: string
}

interface BackendBoard {
  id: string; title: string; source_type: string; status: string
  created_at: string; updated_at: string
}

interface BackendNode {
  board_id: string; widget_id: string; x: number; y: number
  w: number; h: number; size_family: string; z_index: number
  collapsed: number; hidden: number
}

interface BackendResponse {
  board: BackendBoard
  widgets: BackendWidget[]
  nodes: BackendNode[]
  mastery_summary: Record<string, unknown>
}

function adaptWidget(bw: BackendWidget, node?: BackendNode): Widget {
  let spec: Record<string, unknown> = {}
  try { spec = JSON.parse(bw.spec_json || '{}') } catch { /* keep default */ }

  return {
    id: bw.id,
    board_id: bw.board_id,
    widget_type: bw.type as Widget['widget_type'],
    title: bw.title,
    size_family: (node?.size_family || 'M') as Widget['size_family'],
    position: { x: node?.x ?? 48, y: node?.y ?? 48 },
    size: { width: node?.w ?? 400, height: node?.h ?? 300 },
    data: (spec.input || spec) as Record<string, unknown>,
    input: (spec.input || spec) as Widget['input'],
    state: (spec.state as Widget['state']) || { status: 'idle' },
    created_at: bw.created_at,
    updated_at: bw.updated_at,
  }
}

function adaptBoard(raw: BackendResponse): Board {
  const nodeMap = new Map(raw.nodes.map(n => [n.widget_id, n]))
  const widgets = raw.widgets.map(w => adaptWidget(w, nodeMap.get(w.id)))
  return {
    id: raw.board.id,
    title: raw.board.title,
    goal: '',
    widgets,
    source_refs: [],
    created_at: raw.board.created_at,
    updated_at: raw.board.updated_at,
    version: 1,
  }
}

// ---- 端点 ----

export async function generateBoard(
  goal: string,
  sourceRefs: { kind: string; id: string }[] = [],
  maxWidgets?: number,
): Promise<Board> {
  const raw = await apiRequest<BackendResponse>('/api/learning/boards/generate', {
    method: 'POST',
    body: JSON.stringify({ goal, source_refs: sourceRefs, max_widgets: maxWidgets }),
  })
  return adaptBoard(raw)
}

export async function getBoard(boardId: string): Promise<Board> {
  const raw = await apiRequest<BackendResponse>(`/api/learning/boards/${boardId}`)
  return adaptBoard(raw)
}

export async function saveLayout(
  boardId: string,
  updates: LayoutUpdate[],
): Promise<{ ok: boolean }> {
  return apiRequest(`/api/learning/boards/${boardId}/layout`, {
    method: 'PATCH',
    body: JSON.stringify({ updates }),
  })
}

export async function postWidgetEvent(
  widgetId: string,
  eventType: string,
  payload: Record<string, unknown> = {},
): Promise<{ accepted: boolean; mastery_delta?: unknown }> {
  return apiRequest(`/api/learning/widgets/${widgetId}/event`, {
    method: 'POST',
    body: JSON.stringify({
      event_type: eventType,
      payload,
      idempotency_key: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    }),
  })
}

export async function getReviewQueue(): Promise<ReviewItem[]> {
  const resp = await apiRequest<{ items: Array<Record<string, unknown>> }>('/api/learning/reviews/queue')
  return (resp.items || []).map((r: Record<string, unknown>) => ({
    id: r.id as string,
    node_id: r.concept_key as string,
    node_label: r.concept_key as string,
    widget_id: '',
    widget_title: '',
    urgency: (r.score as number) < 0.45 ? 'high' : (r.score as number) < 0.7 ? 'medium' : 'low',
    last_seen: r.scheduled_for as string,
    reason: r.reason as string,
  }))
}

export async function searchBoard(boardId: string, q: string): Promise<{ results: unknown[] }> {
  return apiRequest(`/api/learning/boards/${boardId}/search?q=${encodeURIComponent(q)}`)
}

export async function createBoard(title: string): Promise<Board> {
  const wid = `w_${Math.random().toString(36).slice(2, 10)}`
  const raw = await apiRequest<BackendResponse>('/api/learning/boards', {
    method: 'POST',
    body: JSON.stringify({
      title,
      source_type: 'manual',
      widgets: [{
        id: wid,
        type: 'quiz_card',
        spec_version: '1.0.0',
        title: '快速测验',
        input: {
          items: [{ id: 'q1', kind: 'single_choice', prompt: '占位题目 (可在右侧编辑)', options: ['A', 'B', 'C'], answer: 'A', concept_refs: ['demo'] }],
          scoring: { mode: 'deterministic' },
        },
        state: {},
        security: 'pure_client',
        writeback: ['mastery'],
      }],
      nodes: [{ widget_id: wid, x: 200, y: 160, w: 440, h: 320, size_family: 'M' }],
    }),
  })
  return adaptBoard(raw)
}

export async function generateKnowledgeScene(
  goal: string,
  sourceText = '',
): Promise<KnowledgeSceneManifest> {
  const response = await firecupApiRequest<{ scene: KnowledgeSceneManifest }>(
    '/api/learning/knowledge-scenes/generate',
    {
      method: 'POST',
      body: JSON.stringify({ goal, source_text: sourceText }),
    },
  )
  return requireApprovedKnowledgeScene(response?.scene)
}

function isKnowledgeSceneJobStatus(value: unknown): value is KnowledgeSceneJobStatus {
  return value === 'queued' || value === 'running' || value === 'succeeded' || value === 'failed'
}

function validateJobIdentity(value: unknown): asserts value is KnowledgeSceneJobCreated {
  if (!value || typeof value !== 'object') {
    throw new Error('生成服务返回了无效的任务信息')
  }
  const job = value as Partial<KnowledgeSceneJobCreated>
  if (typeof job.job_id !== 'string' || !job.job_id.trim() || !isKnowledgeSceneJobStatus(job.status)) {
    throw new Error('生成服务返回了无效的任务信息')
  }
}

/** Runtime quality check shared by both the synchronous fallback and async jobs. */
export function requireApprovedKnowledgeScene(scene: unknown): KnowledgeSceneManifest {
  if (!scene || typeof scene !== 'object') {
    throw new Error('生成任务已完成，但没有返回可用白板；当前白板已保留')
  }
  const candidate = scene as Partial<KnowledgeSceneManifest>
  if (candidate.generation?.quality_status !== 'approved') {
    throw new Error('生成结果未通过 Axiom 教学质量门，当前白板已保留')
  }
  if (candidate.generation.quality_version !== CURRENT_KNOWLEDGE_SCENE_QUALITY_VERSION) {
    throw new Error('生成结果来自旧版教学质量策略，当前白板已保留；请重新生成')
  }
  return candidate as KnowledgeSceneManifest
}

export async function createKnowledgeSceneJob(
  goal: string,
  sourceText = '',
  signal?: AbortSignal,
): Promise<KnowledgeSceneJobCreated> {
  const response = await firecupApiRequest<KnowledgeSceneJobCreated>(
    '/api/learning/knowledge-scenes/jobs',
    {
      method: 'POST',
      body: JSON.stringify({ goal, source_text: sourceText }),
      signal,
    },
  )
  validateJobIdentity(response)
  return response
}

function resolveKnowledgeSceneJobPath(jobId: string, statusUrl?: string) {
  const fallback = `/api/learning/knowledge-scenes/jobs/${encodeURIComponent(jobId)}`
  if (!statusUrl) return fallback

  try {
    const parsed = new URL(statusUrl, 'https://axiom.invalid')
    const allowedPrefix = '/api/learning/knowledge-scenes/jobs/'
    if (!parsed.pathname.startsWith(allowedPrefix)) return fallback
    return `${parsed.pathname}${parsed.search}`
  } catch {
    return fallback
  }
}

export async function getKnowledgeSceneJob(
  jobId: string,
  options: { signal?: AbortSignal; statusUrl?: string } = {},
): Promise<KnowledgeSceneJob> {
  const response = await firecupApiRequest<KnowledgeSceneJob>(
    resolveKnowledgeSceneJobPath(jobId, options.statusUrl),
    { signal: options.signal },
  )
  validateJobIdentity(response)
  if (response.job_id !== jobId) {
    throw new Error('生成服务返回了不匹配的任务信息')
  }
  if (!response.progress || typeof response.progress !== 'object') {
    throw new Error('生成服务没有返回任务进度')
  }
  return response
}
