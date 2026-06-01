/* ============================================================
 * ConceptMapWidget — 概念地图控件
 *
 * 以交互卡片 + 前置依赖箭头展示知识点关系。
 * 支持点击聚焦/取消聚焦、标记完成。
 * ============================================================ */

import React, { useCallback, useMemo, useState } from 'react'
import type { Widget, BoardNode } from '../types'

interface Props {
  widget: Widget
  onEvent: (type: string, payload: Record<string, unknown>) => void
}

/** 解析 widget.data.nodes */
function getNodes(widget: Widget): BoardNode[] {
  const nodes = widget.data?.nodes as BoardNode[] | undefined
  return Array.isArray(nodes) ? nodes : []
}

export default function ConceptMapWidget({ widget, onEvent }: Props) {
  const nodes = useMemo(() => getNodes(widget), [widget])
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [doneNodes, setDoneNodes] = useState<Set<string>>(new Set())
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleNodeClick = useCallback(
    (nodeId: string) => {
      if (focusedId === nodeId) {
        setFocusedId(null)
        setExpandedId(null)
        onEvent('node_unfocused', { node_id: nodeId })
      } else {
        setFocusedId(nodeId)
        setExpandedId(nodeId)
        onEvent('node_focused', { node_id: nodeId })
      }
    },
    [focusedId, onEvent],
  )

  const handleMarkDone = useCallback(
    (nodeId: string, e: React.MouseEvent) => {
      e.stopPropagation()
      setDoneNodes((prev) => {
        const next = new Set(prev)
        if (next.has(nodeId)) {
          next.delete(nodeId)
        } else {
          next.add(nodeId)
        }
        return next
      })
      onEvent('concept_marked_done', {
        node_id: nodeId,
        done: !doneNodes.has(nodeId),
      })
    },
    [doneNodes, onEvent],
  )

  const totalNodes = nodes.length
  const doneCount = doneNodes.size
  const progress = totalNodes > 0 ? Math.round((doneCount / totalNodes) * 100) : 0

  // 找出有前置依赖的节点
  const prerequisites = useMemo(() => {
    const map = new Map<string, string[]>()
    for (const n of nodes) {
      for (const pre of n.prerequisite_for) {
        const list = map.get(pre) || []
        list.push(n.id)
        map.set(pre, list)
      }
    }
    return map
  }, [nodes])

  // 是否为紧凑模式（S 尺寸）
  const isCompact = widget.size_family === 'S'

  return (
    <div className="widget-card">
      {/* 头部 */}
      <div className="widget-card__header">
        <span className="type-badge">概念地图</span>
        <span className="title">{widget.title}</span>
        <span style={{ fontSize: 11, color: 'var(--text-4)' }}>
          {doneCount}/{totalNodes}
        </span>
      </div>

      {/* 主体 */}
      <div className="widget-card__body">
        {isCompact ? (
          /* 紧凑列表模式（S） */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {nodes.map((node) => (
              <div
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 6px',
                  borderRadius: 'var(--r-1)',
                  cursor: 'pointer',
                  background: focusedId === node.id ? 'var(--accent-dim)' : 'transparent',
                  color: node.state === 'locked' ? 'var(--text-4)' : 'var(--text-2)',
                  fontSize: 'var(--fs-2)',
                  transition: 'background 0.12s ease',
                }}
              >
                {/* 状态图标 */}
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    flexShrink: 0,
                    background:
                      node.state === 'done' || doneNodes.has(node.id)
                        ? 'var(--accent-dim)'
                        : node.state === 'locked'
                          ? 'var(--surface-1)'
                          : 'var(--surface-3)',
                    color:
                      node.state === 'done' || doneNodes.has(node.id)
                        ? 'var(--accent)'
                        : 'var(--text-4)',
                    border: '1px solid var(--line-1)',
                  }}
                  onClick={(e) => handleMarkDone(node.id, e)}
                >
                  {(doneNodes.has(node.id) || node.state === 'done') ? '✓' : ''}
                </span>
                <span style={{ flex: 1 }}>{node.label}</span>
                <span className="dim" style={{ fontSize: 10 }}>
                  {Math.round(node.difficulty * 100)}%
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* 卡片网格/地图模式（M/L/XL） */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, height: '100%' }}>
            {/* 简单 SVG 依赖线（仅非 S 尺寸显示） */}
            {widget.size_family !== 'S' && (
              <svg
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  width: '100%',
                  height: '100%',
                  zIndex: 0,
                }}
              >
                {nodes.map((node) =>
                  node.prerequisite_for.map((targetId) => {
                    const target = nodes.find((n) => n.id === targetId)
                    if (!target) return null
                    return (
                      <line
                        key={`${node.id}-${targetId}`}
                        x1="50%"
                        y1="50%"
                        x2="50%"
                        y2="50%"
                        stroke="var(--line-2)"
                        strokeWidth={1}
                        strokeDasharray="4 2"
                      />
                    )
                  }),
                )}
              </svg>
            )}

            {/* 节点卡片 */}
            {nodes.map((node) => {
              const isFocused = focusedId === node.id
              const isDone = doneNodes.has(node.id) || node.state === 'done'
              const isLocked = node.state === 'locked'
              const hasDeps = (prerequisites.get(node.id)?.length ?? 0) > 0

              return (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node.id)}
                  style={{
                    padding: isFocused ? '10px 12px' : '6px 10px',
                    borderRadius: 'var(--r-1)',
                    cursor: 'pointer',
                    background: isFocused ? 'var(--accent-dim)' : 'var(--surface-1)',
                    border: isFocused
                      ? '1px solid rgba(110,231,208,0.3)'
                      : '1px solid var(--line-1)',
                    opacity: isLocked ? 0.4 : 1,
                    transition: 'all 0.18s ease',
                    zIndex: 1,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {/* 完成勾选框 */}
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        flexShrink: 0,
                        cursor: 'pointer',
                        background: isDone ? 'var(--accent-dim)' : 'var(--surface-3)',
                        color: isDone ? 'var(--accent)' : 'transparent',
                        border: '1px solid var(--line-2)',
                      }}
                      onClick={(e) => handleMarkDone(node.id, e)}
                    >
                      &#x2713;
                    </span>

                    {/* 标签 */}
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 'var(--fs-3)',
                          fontWeight: isFocused ? 600 : 400,
                          color: isFocused ? 'var(--text-1)' : 'var(--text-2)',
                        }}
                      >
                        {node.label}
                      </div>
                      {isFocused && node.description && (
                        <div style={{ fontSize: 'var(--fs-2)', color: 'var(--text-3)', marginTop: 4 }}>
                          {node.description}
                        </div>
                      )}
                    </div>

                    {/* 难度 */}
                    <span
                      style={{
                        fontSize: 10,
                        color: 'var(--text-4)',
                        padding: '2px 6px',
                        borderRadius: 3,
                        background: 'var(--surface-3)',
                      }}
                    >
                      {Math.round(node.difficulty * 100)}%
                    </span>
                  </div>

                  {/* 前置依赖标签 */}
                  {hasDeps && isFocused && (
                    <div style={{ marginTop: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {(prerequisites.get(node.id) ?? []).map((depId) => {
                        const dep = nodes.find((n) => n.id === depId)
                        return (
                          <span
                            key={depId}
                            style={{
                              fontSize: 10,
                              padding: '1px 6px',
                              borderRadius: 3,
                              background: 'var(--surface-2)',
                              color: 'var(--text-4)',
                            }}
                          >
                            &larr; {dep?.label ?? depId}
                          </span>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* 进度条 */}
        {totalNodes > 0 && (
          <div className="progress-bar">
            <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </div>
  )
}
