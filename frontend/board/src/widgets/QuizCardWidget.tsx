/* ============================================================
 * QuizCardWidget — 测验卡片控件
 *
 * 支持单选题、多选题、文本输入、判断题。
 * 一次展示一题，带提示、提交、反馈、导航。
 * ============================================================ */

import React, { useCallback, useMemo, useRef, useState } from 'react'
import type { Widget, QuizItem } from '../types'

interface Props {
  widget: Widget
  onEvent: (type: string, payload: Record<string, unknown>) => void
}

/** 从 widget.data.items 提取题目列表 */
function getItems(widget: Widget): QuizItem[] {
  const items = widget.data?.items as QuizItem[] | undefined
  return Array.isArray(items) ? items : []
}

export default function QuizCardWidget({ widget, onEvent }: Props) {
  const items = useMemo(() => getItems(widget), [widget])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Set<string>>(new Set())
  const [textAnswer, setTextAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [confidence, setConfidence] = useState(0.5)
  const startTimeRef = useRef(performance.now())
  const attemptRef = useRef(0)

  const currentItem = items[currentIndex]
  const totalItems = items.length
  const progress = totalItems > 0 ? Math.round(((currentIndex + (submitted ? 1 : 0)) / totalItems) * 100) : 0

  // 开始计时
  const resetTimer = useCallback(() => {
    startTimeRef.current = performance.now()
  }, [])

  // 检查答案
  const checkAnswer = useCallback((): boolean => {
    if (!currentItem) return false
    switch (currentItem.kind) {
      case 'single_choice':
      case 'true_false': {
        const selected = Array.from(selectedAnswers)[0]
        return selected === currentItem.answer
      }
      case 'multi_choice': {
        const correct = Array.isArray(currentItem.answer)
          ? currentItem.answer
          : [currentItem.answer]
        const correctSet = new Set(correct)
        if (selectedAnswers.size !== correctSet.size) return false
        return Array.from(selectedAnswers).every((a) => correctSet.has(a))
      }
      case 'text_input': {
        const correct = Array.isArray(currentItem.answer)
          ? currentItem.answer[0]
          : currentItem.answer
        return (
          textAnswer.trim().toLowerCase() ===
          String(correct).toLowerCase()
        )
      }
      default:
        return false
    }
  }, [currentItem, selectedAnswers, textAnswer])

  // 提交答案
  const handleSubmit = useCallback(() => {
    if (!currentItem) return
    const latencyMs = Math.round(performance.now() - startTimeRef.current)
    const correct = checkAnswer()
    setIsCorrect(correct)
    setSubmitted(true)
    attemptRef.current += 1

    onEvent('answer_submitted', {
      question_id: currentItem.id,
      selected: selectedAnswers.size > 0
        ? Array.from(selectedAnswers)
        : textAnswer.trim(),
      correct,
      attempt_index: attemptRef.current,
      latency_ms: latencyMs,
      hint_used: showHint,
      confidence: Math.round(confidence * 100) / 100,
      concept_refs: currentItem.concept_refs,
    })
  }, [currentItem, selectedAnswers, textAnswer, showHint, confidence, checkAnswer, onEvent])

  // 下一题
  const handleNext = useCallback(() => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex((i) => i + 1)
      setSelectedAnswers(new Set())
      setTextAnswer('')
      setShowHint(false)
      setSubmitted(false)
      setIsCorrect(null)
      setConfidence(0.5)
      resetTimer()
      onEvent('next_question', { from_index: currentIndex, to_index: currentIndex + 1 })
    } else {
      onEvent('completed', { total: totalItems })
    }
  }, [currentIndex, totalItems, resetTimer, onEvent])

  // 重试
  const handleRetry = useCallback(() => {
    setSelectedAnswers(new Set())
    setTextAnswer('')
    setSubmitted(false)
    setIsCorrect(null)
    resetTimer()
    onEvent('retry_requested', { question_id: currentItem?.id })
  }, [currentItem, resetTimer, onEvent])

  // 选项选择处理
  const toggleOption = useCallback(
    (option: string) => {
      if (submitted) return
      setSelectedAnswers((prev) => {
        const next = new Set(prev)
        if (currentItem?.kind === 'single_choice' || currentItem?.kind === 'true_false') {
          next.clear()
          next.add(option)
        } else {
          if (next.has(option)) next.delete(option)
          else next.add(option)
        }
        return next
      })
    },
    [submitted, currentItem],
  )

  // 空状态
  if (items.length === 0) {
    return (
      <div className="widget-card">
        <div className="widget-card__header">
          <span className="type-badge">测验</span>
          <span className="title">{widget.title}</span>
        </div>
        <div className="widget-card__body">
          <p className="muted" style={{ textAlign: 'center', padding: '20px 0' }}>
            暂无题目
          </p>
        </div>
      </div>
    )
  }

  const isSmall = widget.size_family === 'S'

  return (
    <div className="widget-card">
      {/* 头部 */}
      <div className="widget-card__header">
        <span className="type-badge">测验</span>
        <span className="title">{widget.title}</span>
        <span style={{ fontSize: 11, color: 'var(--text-4)' }}>
          {currentIndex + 1}/{totalItems}
        </span>
      </div>

      {/* 主体 */}
      <div className="widget-card__body">
        {/* 进度条 */}
        <div className="progress-bar" style={{ marginBottom: 10 }}>
          <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
        </div>

        {/* 题目 */}
        <div
          style={{
            fontSize: 'var(--fs-4)',
            fontWeight: 500,
            color: 'var(--text-1)',
            marginBottom: 12,
            lineHeight: 1.5,
          }}
        >
          {currentItem.question}
        </div>

        {/* 难度标签 */}
        <div style={{ marginBottom: 10 }}>
          <span
            style={{
              fontSize: 10,
              padding: '2px 8px',
              borderRadius: 3,
              background: 'var(--surface-1)',
              color: 'var(--text-4)',
            }}
          >
            难度 {Math.round(currentItem.difficulty * 100)}%
          </span>
        </div>

        {/* 选项区域 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 10 }}>
          {(currentItem.kind === 'single_choice' ||
            currentItem.kind === 'multi_choice' ||
            currentItem.kind === 'true_false') &&
            (currentItem.options ?? []).map((opt) => {
              const isSelected = selectedAnswers.has(opt)
              const isCorrectAnswer =
                submitted &&
                (Array.isArray(currentItem.answer)
                  ? currentItem.answer.includes(opt)
                  : opt === currentItem.answer)

              let bg = 'var(--surface-1)'
              let border = '1px solid var(--line-1)'
              if (submitted) {
                if (isCorrectAnswer) {
                  bg = 'rgba(110,231,208,0.08)'
                  border = '1px solid rgba(110,231,208,0.25)'
                } else if (isSelected && !isCorrectAnswer) {
                  bg = 'rgba(232,120,120,0.08)'
                  border = '1px solid rgba(232,120,120,0.25)'
                }
              } else if (isSelected) {
                bg = 'var(--accent-dim)'
                border = '1px solid rgba(110,231,208,0.3)'
              }

              return (
                <button
                  key={opt}
                  onClick={() => toggleOption(opt)}
                  disabled={submitted}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: isSmall ? '4px 8px' : '8px 12px',
                    borderRadius: 'var(--r-1)',
                    background: bg,
                    border: border,
                    color:
                      submitted && isCorrectAnswer
                        ? 'var(--accent)'
                        : 'var(--text-2)',
                    fontSize: 'var(--fs-3)',
                    cursor: submitted ? 'default' : 'pointer',
                    transition: 'all 0.12s ease',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: currentItem.kind === 'multi_choice' ? 3 : '50%',
                      border: '2px solid',
                      borderColor: isSelected
                        ? 'var(--accent)'
                        : 'var(--line-2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      flexShrink: 0,
                      background: isSelected ? 'var(--accent)' : 'transparent',
                      color: 'var(--surface-0)',
                    }}
                  >
                    {isSelected && (currentItem.kind === 'multi_choice' ? '✓' : '')}
                  </span>
                  {opt}
                  {submitted && isCorrectAnswer && (
                    <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: 12 }}>
                      &#x2713;
                    </span>
                  )}
                </button>
              )
            })}

          {currentItem.kind === 'text_input' && (
            <input
              type="text"
              className="input"
              placeholder="输入答案…"
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              disabled={submitted}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !submitted) handleSubmit()
              }}
              aria-label="文本答案"
              style={{ marginTop: 4 }}
            />
          )}
        </div>

        {/* 提示 */}
        {showHint && currentItem.hint && (
          <div className="hint-text">{currentItem.hint}</div>
        )}

        {/* 反馈 */}
        {submitted && isCorrect !== null && (
          <div>
            <div className={`feedback feedback--${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? '回答正确！' : '回答有误。'}
            </div>
            {currentItem.explanation && (
              <div
                style={{
                  marginTop: 6,
                  fontSize: 'var(--fs-2)',
                  color: 'var(--text-3)',
                  lineHeight: 1.5,
                }}
              >
                {currentItem.explanation}
              </div>
            )}
          </div>
        )}

        {/* 操作按钮 */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            marginTop: 10,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {!submitted && currentItem.hint && !showHint && (
            <button
              className="btn btn--ghost btn--small"
              onClick={() => {
                setShowHint(true)
                onEvent('hint_opened', { question_id: currentItem.id })
              }}
            >
              提示
            </button>
          )}

          {!submitted && (
            <>
              <button
                className="btn btn--primary btn--small"
                onClick={handleSubmit}
                disabled={
                  selectedAnswers.size === 0 &&
                  textAnswer.trim() === '' &&
                  currentItem.kind !== 'text_input'
                }
              >
                提交
              </button>

              {/* 信心滑块 */}
              {!isSmall && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
                  <span style={{ fontSize: 10, color: 'var(--text-4)' }}>信心</span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={confidence}
                    onChange={(e) => setConfidence(parseFloat(e.target.value))}
                    style={{ width: 60, accentColor: 'var(--accent)' }}
                    aria-label="信心程度"
                  />
                </div>
              )}
            </>
          )}

          {submitted && (
            <div style={{ display: 'flex', gap: 6 }}>
              {!isCorrect && (
                <button className="btn btn--secondary btn--small" onClick={handleRetry}>
                  重试
                </button>
              )}
              <button className="btn btn--primary btn--small" onClick={handleNext}>
                {currentIndex < totalItems - 1 ? '下一题' : '完成'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
