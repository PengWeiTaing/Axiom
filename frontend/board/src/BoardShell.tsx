/* ============================================================
 * BoardShell — 主白板组件
 *
 * 使用 tldraw 作为无限画布引擎（平移/缩放），
 * Widget 卡片以 React 组件覆盖在画布上。
 * 包含侧边栏、生成对话框、布局保存。
 * ============================================================ */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

import type { Board, ReviewItem } from './types'
import { generateBoard, getReviewQueue, saveLayout, postWidgetEvent } from './api/endpoints'
import { renderWidget } from './widgets'

// ================================================================
// Props
// ================================================================

interface BoardShellProps {
  board: Board
  onBoardUpdate: (board: Board) => void
}

// ================================================================
// 侧边栏
// ================================================================

function Sidebar(props: {
  board: Board
  activeWidgetId: string | null
  reviewQueue: ReviewItem[]
  onSelectWidget: (id: string) => void
  onGenerateClick: () => void
}) {
  const { board, activeWidgetId, reviewQueue, onSelectWidget, onGenerateClick } = props

  return (
    <aside className="board-sidebar">
      <div className="board-sidebar__header">
        <h2>{board.title || '学习白板'}</h2>
        {board.goal && <p className="board-goal">{board.goal}</p>}
      </div>

      <div className="board-sidebar__section">
        <h3>控件 ({board.widgets.length})</h3>
        <ul className="widget-list">
          {board.widgets.map((w) => (
            <li
              key={w.id}
              className={`widget-list__item ${activeWidgetId === w.id ? 'widget-list__item--active' : ''}`}
              onClick={() => onSelectWidget(w.id)}
            >
              <span className={`widget-list__status widget-list__status--${w.state.status}`} />
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {w.title}
              </span>
              <span className="dim" style={{ fontSize: 10, flexShrink: 0 }}>
                {w.widget_type.replace(/_/g, ' ')}
              </span>
            </li>
          ))}
          {board.widgets.length === 0 && (
            <li className="muted" style={{ fontSize: 'var(--fs-2)', padding: '8px' }}>
              暂无控件，点击下方按钮由 AI 生成
            </li>
          )}
        </ul>
      </div>

      {reviewQueue.length > 0 && (
        <div className="board-sidebar__section">
          <h3>复习队列 ({reviewQueue.length})</h3>
          <ul className="review-list">
            {reviewQueue.map((r) => (
              <li key={r.id} className="review-list__item">
                <div className={`urgency urgency--${r.urgency}`}>{r.urgency}</div>
                <div style={{ color: 'var(--text-2)', fontWeight: 500 }}>{r.node_label}</div>
                <div className="reason">{r.reason}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ flex: 1 }} />

      <button className="board-gen-btn" onClick={onGenerateClick}>
        + AI 生成控件
      </button>
    </aside>
  )
}

// ================================================================
// 生成对话框
// ================================================================

function GenerateDialog(props: {
  onClose: () => void
  onSubmit: (goal: string, sourceRefs: { kind: string; id: string }[], maxWidgets: number) => void
  loading: boolean
}) {
  const { onClose, onSubmit, loading } = props
  const [goal, setGoal] = useState('')
  const [sourceRefsText, setSourceRefsText] = useState('')
  const [maxWidgets, setMaxWidgets] = useState(4)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!goal.trim()) return
    const refs = sourceRefsText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
        onSubmit(goal.trim(), refs.map(r => ({ kind: 'memory', id: r })), maxWidgets)
  }

  return (
    <div
      className="gen-dialog-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <form className="gen-dialog" onSubmit={handleSubmit}>
        <h2>AI 生成学习白板</h2>
        <p className="sub">描述你想学什么，AI 会生成交互式控件。</p>

        <div className="gen-dialog__field">
          <label htmlFor="gen-goal">学习目标 *</label>
          <textarea
            id="gen-goal"
            placeholder="例如：理解线性代数中的矩阵乘法..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            autoFocus
          />
        </div>

        <div className="gen-dialog__field">
          <label htmlFor="gen-refs">参考资料（每行一个，可选）</label>
          <textarea
            id="gen-refs"
            placeholder="支持链接、文本引用..."
            value={sourceRefsText}
            onChange={(e) => setSourceRefsText(e.target.value)}
          />
        </div>

        <div className="gen-dialog__field">
          <label htmlFor="gen-max">最大控件数</label>
          <input
            id="gen-max"
            type="number"
            min={1}
            max={10}
            value={maxWidgets}
            onChange={(e) => setMaxWidgets(Number(e.target.value))}
          />
        </div>

        <div className="gen-dialog__actions">
          <button type="button" className="gen-dialog__cancel" onClick={onClose}>
            取消
          </button>
          <button
            type="submit"
            className="gen-dialog__submit"
            disabled={loading || !goal.trim()}
          >
            {loading ? '生成中…' : '生成'}
          </button>
        </div>
      </form>
    </div>
  )
}

// ================================================================
// 可拖拽的 Widget 卡片
// ================================================================

function DraggableWidget(props: {
  widget: import('./types').Widget
  isActive: boolean
  onClick: () => void
  onPositionChange: (id: string, x: number, y: number) => void
  onEvent: (type: string, payload: Record<string, unknown>) => void
}) {
  const { widget, isActive, onClick, onPositionChange, onEvent } = props
  const dragRef = useRef<{
    startX: number
    startY: number
    origX: number
    origY: number
    currentX: number
    currentY: number
  } | null>(null)
  const [pos, setPos] = useState<{ x: number; y: number }>(() => {
    const p = widget.position ?? { x: 100, y: 100 }
    return { x: p.x, y: p.y }
  })

  const sizeMap: Record<string, { w: number; h: number }> = {
    S: { w: 260, h: 180 },
    M: { w: 340, h: 260 },
    L: { w: 480, h: 360 },
    XL: { w: 640, h: 480 },
  }
  const size = sizeMap[widget.size_family] ?? sizeMap.M

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('button, input, textarea, select, [role="button"]')) {
        return
      }
      e.preventDefault()
      const origX = pos.x
      const origY = pos.y
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX,
        origY,
        currentX: origX,
        currentY: origY,
      }

      const handleMouseMove = (ev: MouseEvent) => {
        if (!dragRef.current) return
        const dx = ev.clientX - dragRef.current.startX
        const dy = ev.clientY - dragRef.current.startY
        const nx = dragRef.current.origX + dx
        const ny = dragRef.current.origY + dy
        dragRef.current.currentX = nx
        dragRef.current.currentY = ny
        setPos({ x: nx, y: ny })
      }

      const handleMouseUp = () => {
        if (dragRef.current) {
          onPositionChange(widget.id, dragRef.current.currentX, dragRef.current.currentY)
        }
        dragRef.current = null
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    },
    [widget.id, pos, onPositionChange],
  )

  const jsx = useMemo(
    () => renderWidget(widget, onEvent),
    [widget, onEvent],
  )

  return (
    <div
      className={`widget-${widget.size_family}`}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        width: size.w,
        height: size.h,
        zIndex: isActive ? 10 : 1,
        transition: 'box-shadow 0.18s ease',
        boxShadow: isActive
          ? '0 0 0 1px var(--accent), 0 0 24px var(--accent-glow)'
          : '0 2px 12px rgba(0,0,0,0.3)',
        borderRadius: 'var(--r-2)',
      }}
      onMouseDown={handleMouseDown}
      onClick={onClick}
    >
      {jsx}
    </div>
  )
}

// ================================================================
// BoardShell 主组件
// ================================================================

export default function BoardShell({ board, onBoardUpdate }: BoardShellProps) {
  const [activeWidgetId, setActiveWidgetId] = useState<string | null>(null)
  const [reviewQueue, setReviewQueue] = useState<ReviewItem[]>([])
  const [showGenDialog, setShowGenDialog] = useState(board.widgets.length === 0)
  const [genLoading, setGenLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 加载复习队列
  useEffect(() => {
    if (!board.id) return
    getReviewQueue().then(setReviewQueue).catch(() => {
      /* 静默失败 */
    })
  }, [board.id])

  // 控件事件处理 + 乐观更新
  const handleWidgetEvent = useCallback(
    (widgetId: string) => (eventType: string, payload: Record<string, unknown> = {}) => {
      postWidgetEvent(widgetId, eventType, payload).catch((err) => {
        console.warn('事件上报失败:', err)
      })

      const updatedWidgets = board.widgets.map((w) => {
        if (w.id !== widgetId) return w
        const newState = { ...w.state }

        switch (eventType) {
          case 'widget_activated':
            newState.status = 'active'
            break
          case 'concept_marked_done':
          case 'quiz_answer_submitted':
          case 'step_revealed':
            newState.progress = Math.min(100, (newState.progress ?? 0) + Math.max(1, Math.floor(100 / (board.widgets.length || 4))))
            if (newState.progress >= 100) newState.status = 'completed'
            break
          case 'completed':
            newState.status = 'completed'
            newState.progress = 100
            break
          case 'variant_requested':
            newState.variant_count = (newState.variant_count ?? 0) + 1
            break
        }

        return { ...w, state: newState, updated_at: new Date().toISOString() }
      })

      onBoardUpdate({ ...board, widgets: updatedWidgets })
    },
    [board, onBoardUpdate],
  )

  // 位置变更 debounce 保存
  const handlePositionChange = useCallback(
    (widgetId: string, x: number, y: number) => {
      // 本地立即更新
      const updated = board.widgets.map((w) =>
        w.id === widgetId
          ? { ...w, position: { x, y }, updated_at: new Date().toISOString() }
          : w,
      )
      onBoardUpdate({ ...board, widgets: updated })

      // 延迟保存到后端
      if (!board.id) return
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        saveLayout(board.id, [{ widget_id: widgetId, position: { x, y } }]).catch((err) => {
          console.warn('保存布局失败:', err)
        })
      }, 500)
    },
    [board, onBoardUpdate],
  )

  // 生成白板
  const handleGenerate = useCallback(
    async (goal: string, sourceRefs: { kind: string; id: string }[], maxWidgets: number) => {
      setGenLoading(true)
      try {
        const newBoard = await generateBoard(goal, sourceRefs, maxWidgets)
        onBoardUpdate(newBoard)
        setShowGenDialog(false)
        if (newBoard.id) {
          localStorage.setItem('axiom_board_recent', newBoard.id)
          window.history.pushState(null, '', `/board/${newBoard.id}`)
        }
      } catch (err) {
        console.error('生成失败:', err)
        alert('生成失败，请重试。')
      } finally {
        setGenLoading(false)
      }
    },
    [onBoardUpdate],
  )

  // cleanup
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  const isEmpty = board.widgets.length === 0

  return (
    <div className="board-shell">
      <Sidebar
        board={board}
        activeWidgetId={activeWidgetId}
        reviewQueue={reviewQueue}
        onSelectWidget={setActiveWidgetId}
        onGenerateClick={() => setShowGenDialog(true)}
      />

      <div className="board-canvas">
        {/* 标题栏 */}
        <div className="board-titlebar">
          <h1>{board.title || '学习白板'}</h1>
        </div>

        {/* tldraw 画布 */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <Tldraw hideUi>
            {/* 空画布提示 */}
            {isEmpty && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  zIndex: 50,
                }}
              >
                <div style={{ textAlign: 'center', color: 'var(--text-3)' }}>
                  <p style={{ fontSize: 18, marginBottom: 8, color: 'var(--text-2)' }}>空白画布</p>
                  <p style={{ fontSize: 14 }}>点击侧边栏「AI 生成控件」开始构建你的学习白板</p>
                </div>
              </div>
            )}

            {/* Widget 卡片覆盖层 */}
            {board.widgets.map((widget) => (
              <DraggableWidget
                key={widget.id}
                widget={widget}
                isActive={activeWidgetId === widget.id}
                onClick={() => setActiveWidgetId(widget.id)}
                onPositionChange={handlePositionChange}
                onEvent={handleWidgetEvent(widget.id)}
              />
            ))}
          </Tldraw>
        </div>
      </div>

      {/* 生成对话框 */}
      {showGenDialog && (
        <GenerateDialog
          onClose={() => setShowGenDialog(false)}
          onSubmit={handleGenerate}
          loading={genLoading}
        />
      )}
    </div>
  )
}
