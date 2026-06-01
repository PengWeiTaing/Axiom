/* ============================================================
 * API 端点 — 类型化封装
 * ============================================================ */

import { apiRequest } from './client'
import type {
  Board,
  Widget,
  WidgetEvent,
  ReviewItem,
  GenerateBoardRequest,
  LayoutUpdate,
} from '../types'

// ---- 白板 ----

/** 生成新白板 */
export async function generateBoard(
  goal: string,
  sourceRefs: string[] = [],
  maxWidgets?: number,
): Promise<Board> {
  return apiRequest<Board>('/api/learning/boards/generate', {
    method: 'POST',
    body: JSON.stringify({
      goal,
      source_refs: sourceRefs,
      max_widgets: maxWidgets,
    } as GenerateBoardRequest),
  })
}

/** 获取白板 */
export async function getBoard(boardId: string): Promise<Board> {
  return apiRequest<Board>(`/api/learning/boards/${boardId}`)
}

/** 保存布局 */
export async function saveLayout(
  boardId: string,
  updates: LayoutUpdate[],
): Promise<Board> {
  return apiRequest<Board>(`/api/learning/boards/${boardId}/layout`, {
    method: 'PATCH',
    body: JSON.stringify({ updates }),
  })
}

// ---- 控件事件 ----

/** 上报控件交互事件 */
export async function postWidgetEvent(
  widgetId: string,
  eventType: string,
  payload: Record<string, unknown> = {},
): Promise<WidgetEvent> {
  return apiRequest<WidgetEvent>(`/api/learning/widgets/${widgetId}/event`, {
    method: 'POST',
    body: JSON.stringify({
      event_type: eventType,
      payload,
      client_ts: performance.now(),
    }),
  })
}

// ---- 复习 ----

/** 获取复习队列 */
export async function getReviewQueue(): Promise<ReviewItem[]> {
  return apiRequest<ReviewItem[]>('/api/learning/reviews/queue')
}

// ---- 搜索 ----

/** 搜索白板内容 */
export async function searchBoard(
  boardId: string,
  q: string,
): Promise<{ results: unknown[] }> {
  return apiRequest<{ results: unknown[] }>(
    `/api/learning/boards/${boardId}/search?q=${encodeURIComponent(q)}`,
  )
}
