/* ============================================================
 * ExampleCardWidget — 例题卡片控件
 *
 * 展示题目，步骤逐步揭示。支持"先自己试试"交互模式。
 * 含常见错误、变体请求、复习书签。
 * ============================================================ */

import React, { useCallback, useMemo, useState, useRef } from 'react'
import type { Widget, ExampleStep } from '../types'

interface Props {
  widget: Widget
  onEvent: (type: string, payload: Record<string, unknown>) => void
}

/** 从 widget.data 提取例题数据 */
interface ExampleData {
  problem: string
  steps: ExampleStep[]
  common_errors?: { error: string; correction: string }[]
}

function getExampleData(widget: Widget): ExampleData {
  const data = widget.data as unknown as ExampleData
  return {
    problem: data?.problem ?? '',
    steps: Array.isArray(data?.steps) ? data.steps : [],
    common_errors: Array.isArray(data?.common_errors) ? data.common_errors : [],
  }
}

export default function ExampleCardWidget({ widget, onEvent }: Props) {
  const data = useMemo(() => getExampleData(widget), [widget])
  const [revealedSteps, setRevealedSteps] = useState<Set<number>>(
    () => new Set(widget.state?.revealed_steps ?? []),
  )
  const [tryingStep, setTryingStep] = useState<number | null>(null)
  const [bookmarked, setBookmarked] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [variantRequested, setVariantRequested] = useState(false)
  const stepStartRef = useRef<number>(performance.now())

  const totalSteps = data.steps.length
  const revealedCount = revealedSteps.size
  const progress = totalSteps > 0 ? Math.round((revealedCount / totalSteps) * 100) : 0

  // 揭示步骤
  const handleRevealStep = useCallback(
    (index: number) => {
      const latencyMs = Math.round(performance.now() - stepStartRef.current)
      setRevealedSteps((prev) => {
        const next = new Set(prev)
        next.add(index)
        return next
      })
      setTryingStep(null)
      onEvent('step_revealed', {
        step_index: index,
        latency_ms: latencyMs,
        total_steps: totalSteps,
      })
      stepStartRef.current = performance.now()
    },
    [totalSteps, onEvent],
  )

  // "自己试试"模式
  const handleTryIt = useCallback(
    (index: number) => {
      setTryingStep(index)
      onEvent('self_try_started', { step_index: index })
    },
    [onEvent],
  )

  // 请求变体
  const handleVariant = useCallback(() => {
    setVariantRequested(true)
    onEvent('variant_requested', {
      widget_id: widget.id,
      variant_count: (widget.state?.variant_count ?? 0) + 1,
    })
  }, [widget.id, widget.state, onEvent])

  // 书签复习
  const handleBookmark = useCallback(() => {
    const next = !bookmarked
    setBookmarked(next)
    onEvent('bookmark_review', { bookmarked: next })
  }, [bookmarked, onEvent])

  // 完成
  const handleComplete = useCallback(() => {
    onEvent('completed', { steps_revealed: revealedSteps.size, total_steps: totalSteps })
  }, [revealedSteps.size, totalSteps, onEvent])

  const isSmall = widget.size_family === 'S'

  // 没有数据时展示空状态
  if (!data.problem) {
    return (
      <div className="widget-card">
        <div className="widget-card__header">
          <span className="type-badge">例题</span>
          <span className="title">{widget.title}</span>
        </div>
        <div className="widget-card__body">
          <p className="muted" style={{ textAlign: 'center', padding: '20px 0' }}>
            暂无例题数据
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="widget-card">
      {/* 头部 */}
      <div className="widget-card__header">
        <span className="type-badge">例题</span>
        <span className="title">{widget.title}</span>
        <span style={{ fontSize: 11, color: 'var(--text-4)' }}>
          {revealedCount}/{totalSteps} 步
        </span>
      </div>

      {/* 主体 */}
      <div className="widget-card__body">
        {/* 进度条 */}
        <div className="progress-bar" style={{ marginBottom: 10 }}>
          <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
        </div>

        {/* 问题陈述 */}
        <div
          style={{
            padding: '10px 12px',
            borderRadius: 'var(--r-1)',
            background: 'var(--surface-1)',
            border: '1px solid var(--line-1)',
            marginBottom: 10,
          }}
        >
          <div
            style={{
              fontSize: 'var(--fs-1)',
              color: 'var(--text-4)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 4,
            }}
          >
            题目
          </div>
          <div style={{ fontSize: 'var(--fs-4)', color: 'var(--text-1)', lineHeight: 1.6 }}>
            {data.problem}
          </div>
        </div>

        {/* 步骤列表 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isSmall ? 4 : 6,
            maxHeight: isSmall ? 100 : undefined,
            overflowY: 'auto',
          }}
        >
          {data.steps.map((step, idx) => {
            const isRevealed = revealedSteps.has(step.index)
            const isTrying = tryingStep === step.index

            return (
              <div
                key={step.index}
                style={{
                  borderRadius: 'var(--r-1)',
                  border: `1px solid ${isRevealed ? 'rgba(110,231,208,0.15)' : 'var(--line-1)'}`,
                  overflow: 'hidden',
                  transition: 'all 0.18s ease',
                }}
              >
                {/* 步骤头部 */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: isSmall ? '4px 8px' : '6px 10px',
                    background: isRevealed
                      ? 'rgba(110,231,208,0.05)'
                      : 'var(--surface-1)',
                    cursor: isRevealed ? 'default' : 'pointer',
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: isRevealed
                        ? 'var(--accent-dim)'
                        : 'var(--surface-3)',
                      color: isRevealed ? 'var(--accent)' : 'var(--text-4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {isRevealed ? '✓' : step.index + 1}
                  </span>

                  <span
                    style={{
                      flex: 1,
                      fontSize: 'var(--fs-3)',
                      color: isRevealed ? 'var(--text-2)' : 'var(--text-1)',
                      fontWeight: 500,
                    }}
                  >
                    {step.title}
                  </span>

                  {!isRevealed && (
                    <button
                      className="btn btn--ghost btn--small"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleTryIt(step.index)
                      }}
                    >
                      自己试试
                    </button>
                  )}
                </div>

                {/* 步骤内容（揭示后） */}
                {isRevealed && (
                  <div
                    style={{
                      padding: isSmall ? '6px 8px' : '8px 12px',
                      fontSize: 'var(--fs-3)',
                      color: 'var(--text-2)',
                      lineHeight: 1.6,
                      borderTop: '1px solid var(--line-1)',
                    }}
                  >
                    {step.content}
                  </div>
                )}

                {/* 尝试中提示 */}
                {isTrying && !isRevealed && (
                  <div
                    style={{
                      padding: isSmall ? '6px 8px' : '8px 12px',
                      fontSize: 'var(--fs-2)',
                      color: 'var(--text-3)',
                      borderTop: '1px solid var(--line-1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <span>先自己想一想，然后</span>
                    <button
                      className="btn btn--primary btn--small"
                      onClick={() => handleRevealStep(step.index)}
                    >
                      查看解法
                    </button>
                  </div>
                )}

                {/* 未揭示且非尝试中 */}
                {!isRevealed && !isTrying && (
                  <div
                    style={{
                      padding: isSmall ? '4px 8px' : '6px 10px',
                      fontSize: 'var(--fs-2)',
                      color: 'var(--text-4)',
                      borderTop: '1px solid var(--line-1)',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleRevealStep(step.index)}
                  >
                    点击查看解法
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* 常见错误 */}
        {data.common_errors && data.common_errors.length > 0 && !isSmall && (
          <div style={{ marginTop: 10 }}>
            <button
              className="btn btn--ghost btn--small"
              onClick={() => setShowErrors(!showErrors)}
              style={{ width: '100%', justifyContent: 'flex-start' }}
            >
              {showErrors ? '▼' : '▶'} 常见错误 ({data.common_errors.length})
            </button>
            {showErrors && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
                {data.common_errors.map((err, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 'var(--r-1)',
                      background: 'rgba(232,120,120,0.06)',
                      border: '1px solid rgba(232,120,120,0.15)',
                      fontSize: 'var(--fs-2)',
                    }}
                  >
                    <div style={{ color: 'var(--error)', fontWeight: 500 }}>{err.error}</div>
                    <div style={{ color: 'var(--text-3)', marginTop: 2 }}>{err.correction}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 底部操作 */}
        <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
          <button
            className="btn btn--secondary btn--small"
            onClick={handleVariant}
            disabled={variantRequested}
          >
            {variantRequested ? '已请求变体' : '换一题'}
          </button>

          <button
            className={`btn btn--small ${bookmarked ? 'btn--primary' : 'btn--ghost'}`}
            onClick={handleBookmark}
          >
            {bookmarked ? '已加复习' : '加复习'}
          </button>

          {revealedCount === totalSteps && totalSteps > 0 && (
            <button
              className="btn btn--primary btn--small"
              onClick={handleComplete}
              style={{ marginLeft: 'auto' }}
            >
              完成学习
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
