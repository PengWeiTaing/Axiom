/* ============================================================
 * FunctionVizWidget — 函数可视化控件
 *
 * Canvas 2D 绘制函数图像，支持参数滑块调节。
 * 使用安全表达式求值器（白名单），绝不用 eval/Function。
 * ============================================================ */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Widget } from '../types'

// ================================================================
// 安全表达式求值器
//
// 仅允许：
// - 数字字面量
// - 运算符：+ - * / ^
// - 括号
// - Math 函数子集：sin cos tan sqrt abs exp log
// - 变量：x 和声明的参数名
// - 空白字符
//
// 实现：递归下降解析器，每次调用 parseExpression 返回数值结果。
// ================================================================

type Token =
  | { type: 'number'; value: number }
  | { type: 'ident'; name: string }
  | { type: 'op'; value: string }
  | { type: 'lparen' }
  | { type: 'rparen' }
  | { type: 'comma' }

interface ParserContext {
  tokens: Token[]
  pos: number
  vars: Record<string, number>
}

function tokenize(expr: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  while (i < expr.length) {
    const ch = expr[i]

    // 空白
    if (/\s/.test(ch)) {
      i++
      continue
    }

    // 数字
    if (/[0-9.]/.test(ch)) {
      let num = ''
      while (i < expr.length && /[0-9.]/.test(expr[i])) {
        num += expr[i]
        i++
      }
      const val = parseFloat(num)
      if (isNaN(val)) throw new ExpressionError(`无效数字: ${num}`)
      tokens.push({ type: 'number', value: val })
      continue
    }

    // 标识符（函数名或变量名）
    if (/[a-zA-Z_]/.test(ch)) {
      let name = ''
      while (i < expr.length && /[a-zA-Z0-9_]/.test(expr[i])) {
        name += expr[i]
        i++
      }
      // 关键字
      if (
        name === 'sin' || name === 'cos' || name === 'tan' ||
        name === 'sqrt' || name === 'abs' || name === 'exp' || name === 'log'
      ) {
        tokens.push({ type: 'ident', name })
      } else {
        tokens.push({ type: 'ident', name })
      }
      continue
    }

    // 运算符
    if ('+-*/^'.includes(ch)) {
      tokens.push({ type: 'op', value: ch })
      i++
      continue
    }

    // 括号和逗号
    if (ch === '(') { tokens.push({ type: 'lparen' }); i++; continue }
    if (ch === ')') { tokens.push({ type: 'rparen' }); i++; continue }
    if (ch === ',') { tokens.push({ type: 'comma' }); i++; continue }

    throw new ExpressionError(`不允许的字符: "${ch}"`)
  }
  return tokens
}

function parseExpression(ctx: ParserContext): number {
  return parseAddSub(ctx)
}

function parseAddSub(ctx: ParserContext): number {
  let left = parseMulDiv(ctx)
  while (ctx.pos < ctx.tokens.length) {
    const tok = ctx.tokens[ctx.pos]
    if (tok.type === 'op' && (tok.value === '+' || tok.value === '-')) {
      ctx.pos++
      const right = parseMulDiv(ctx)
      left = tok.value === '+' ? left + right : left - right
    } else {
      break
    }
  }
  return left
}

function parseMulDiv(ctx: ParserContext): number {
  let left = parsePower(ctx)
  while (ctx.pos < ctx.tokens.length) {
    const tok = ctx.tokens[ctx.pos]
    if (tok.type === 'op' && (tok.value === '*' || tok.value === '/')) {
      ctx.pos++
      const right = parsePower(ctx)
      if (tok.value === '*') left = left * right
      else {
        if (right === 0) throw new ExpressionError('除零错误')
        left = left / right
      }
    } else {
      break
    }
  }
  return left
}

function parsePower(ctx: ParserContext): number {
  let left = parseUnary(ctx)
  while (ctx.pos < ctx.tokens.length) {
    const tok = ctx.tokens[ctx.pos]
    if (tok.type === 'op' && tok.value === '^') {
      ctx.pos++
      const right = parseUnary(ctx)
      left = Math.pow(left, right)
    } else {
      break
    }
  }
  return left
}

function parseUnary(ctx: ParserContext): number {
  const tok = ctx.tokens[ctx.pos]
  if (tok && tok.type === 'op' && tok.value === '-') {
    ctx.pos++
    return -parsePrimary(ctx)
  }
  return parsePrimary(ctx)
}

function parsePrimary(ctx: ParserContext): number {
  if (ctx.pos >= ctx.tokens.length) {
    throw new ExpressionError('表达式不完整')
  }

  const tok = ctx.tokens[ctx.pos]
  ctx.pos++

  if (tok.type === 'number') {
    return tok.value
  }

  if (tok.type === 'lparen') {
    const val = parseExpression(ctx)
    if (ctx.pos >= ctx.tokens.length || ctx.tokens[ctx.pos].type !== 'rparen') {
      throw new ExpressionError('缺少右括号')
    }
    ctx.pos++ // consume rparen
    return val
  }

  if (tok.type === 'ident') {
    const name = tok.name

    // 函数调用
    if (ctx.pos < ctx.tokens.length && ctx.tokens[ctx.pos].type === 'lparen') {
      ctx.pos++ // consume lparen
      const args: number[] = []
      if (ctx.pos < ctx.tokens.length && ctx.tokens[ctx.pos].type !== 'rparen') {
        args.push(parseExpression(ctx))
        while (ctx.pos < ctx.tokens.length && ctx.tokens[ctx.pos].type === 'comma') {
          ctx.pos++ // consume comma
          args.push(parseExpression(ctx))
        }
      }
      if (ctx.pos >= ctx.tokens.length || ctx.tokens[ctx.pos].type !== 'rparen') {
        throw new ExpressionError('函数缺少右括号')
      }
      ctx.pos++ // consume rparen
      return applyFunction(name, args)
    }

    // 变量
    if (!(name in ctx.vars)) {
      throw new ExpressionError(`未知变量: "${name}"`)
    }
    return ctx.vars[name]
  }

  throw new ExpressionError(`意外的 token: ${JSON.stringify(tok)}`)
}

function applyFunction(name: string, args: number[]): number {
  const expected = 1 // 所有允许的函数都是单参数
  if (args.length !== expected) {
    throw new ExpressionError(`${name} 需要 ${expected} 个参数，传入了 ${args.length}`)
  }
  const x = args[0]
  switch (name) {
    case 'sin': return Math.sin(x)
    case 'cos': return Math.cos(x)
    case 'tan': return Math.tan(x)
    case 'sqrt':
      if (x < 0) throw new ExpressionError('sqrt 参数不能为负')
      return Math.sqrt(x)
    case 'abs': return Math.abs(x)
    case 'exp': return Math.exp(x)
    case 'log':
      if (x <= 0) throw new ExpressionError('log 参数必须为正')
      return Math.log(x)
    default:
      throw new ExpressionError(`未知函数: ${name}`)
  }
}

/** 安全求值 */
function safeEval(expr: string, vars: Record<string, number>): number {
  const tokens = tokenize(expr)
  const ctx: ParserContext = { tokens, pos: 0, vars }
  const result = parseExpression(ctx)
  if (ctx.pos < ctx.tokens.length) {
    throw new ExpressionError('表达式末尾有多余内容')
  }
  return result
}

class ExpressionError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'ExpressionError'
  }
}

// ================================================================
// Props
// ================================================================

interface Props {
  widget: Widget
  onEvent: (type: string, payload: Record<string, unknown>) => void
}

// ================================================================
// Component
// ================================================================

export default function FunctionVizWidget({ widget, onEvent }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [params, setParams] = useState<Record<string, number>>(() => {
    return { ...(widget.input?.parameters ?? { a: 1, b: 0, c: 0 }) }
  })
  const [expression, setExpression] = useState(widget.input?.expression ?? 'sin(a * x + b)')
  const [domain, setDomain] = useState<[number, number]>(() => {
    return (widget.input?.domain as [number, number]) ?? [-5, 5]
  })
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const [exprError, setExprError] = useState<string | null>(null)
  const [startTime] = useState(() => performance.now())

  const paramKeys = useMemo(() => Object.keys(params), [params])
  const question = widget.input?.question ?? ''

  // 绘制函数图像
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.width
    const H = canvas.height
    const px = 20 // padding

    // 清除
    ctx.clearRect(0, 0, W, H)

    // 背景网格
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'
    ctx.lineWidth = 1
    for (let i = px; i < W - px; i += 30) {
      ctx.beginPath()
      ctx.moveTo(i, px)
      ctx.lineTo(i, H - px)
      ctx.stroke()
    }
    for (let j = px; j < H - px; j += 30) {
      ctx.beginPath()
      ctx.moveTo(px, j)
      ctx.lineTo(W - px, j)
      ctx.stroke()
    }

    // 坐标轴
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'
    ctx.lineWidth = 1.5
    const cx = W / 2
    const cy = H / 2
    ctx.beginPath()
    ctx.moveTo(px, cy)
    ctx.lineTo(W - px, cy)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(cx, px)
    ctx.lineTo(cx, H - px)
    ctx.stroke()

    // 函数曲线
    try {
      const [xMin, xMax] = domain
      const xScale = (W - px * 2) / (xMax - xMin)
      const samples = 200

      // 先计算所有 y 值以确定范围
      let yMin = Infinity
      let yMax = -Infinity
      const points: { sx: number; sy: number }[] = []

      for (let i = 0; i <= samples; i++) {
        const x = xMin + ((xMax - xMin) * i) / samples
        try {
          const y = safeEval(expression, { ...params, x })
          if (isFinite(y)) {
            yMin = Math.min(yMin, y)
            yMax = Math.max(yMax, y)
            points.push({ sx: x, sy: y })
          }
        } catch {
          // 跳过求值失败的点
        }
      }

      if (points.length > 0 && yMin !== Infinity) {
        const yRange = yMax - yMin || 1
        const yScale = (H - px * 2) / yRange

        // 绘制
        ctx.strokeStyle = '#6ee7d0'
        ctx.lineWidth = 2
        ctx.beginPath()
        let first = true
        for (const p of points) {
          const sx = px + (p.sx - xMin) * xScale
          const sy = H - px - (p.sy - yMin) * yScale
          if (first) {
            ctx.moveTo(sx, sy)
            first = false
          } else {
            ctx.lineTo(sx, sy)
          }
        }
        ctx.stroke()
        setExprError(null)
      } else {
        setExprError('无法绘制：表达式未产生有效值')
      }
    } catch (err) {
      const msg = err instanceof ExpressionError ? err.message : '表达式错误'
      setExprError(msg)
    }
  }, [expression, params, domain])

  const handleSliderChange = useCallback(
    (key: string, value: number) => {
      setParams((prev) => {
        const next = { ...prev, [key]: value }
        onEvent('slider_changed', { parameter: key, value, params: next })
        return next
      })
    },
    [onEvent],
  )

  const handleAnswerSubmit = useCallback(() => {
    if (!answer.trim()) return
    const latency = performance.now() - startTime
    // 简单的正确性检查——后端验证，这里先本地乐观
    setFeedback(answer.toLowerCase().includes('correct') ? 'correct' : 'incorrect')
    onEvent('question_answered', {
      answer: answer.trim(),
      correct: feedback === 'correct',
      latency_ms: Math.round(latency),
    })
  }, [answer, startTime, feedback, onEvent])

  const isSmall = widget.size_family === 'S'

  return (
    <div className="widget-card">
      {/* 头部 */}
      <div className="widget-card__header">
        <span className="type-badge">函数可视化</span>
        <span className="title">{widget.title}</span>
      </div>

      {/* 主体 */}
      <div className="widget-card__body">
        {/* 表达式 */}
        <div style={{ marginBottom: 8 }}>
          <code
            style={{
              fontSize: 'var(--fs-2)',
              color: 'var(--text-3)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            f(x) = {expression}
          </code>
        </div>

        {/* Canvas */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: isSmall ? 60 : 140,
            borderRadius: 'var(--r-1)',
            overflow: 'hidden',
            background: 'var(--surface-1)',
            border: '1px solid var(--line-1)',
            marginBottom: 8,
          }}
        >
          <canvas
            ref={canvasRef}
            width={400}
            height={isSmall ? 120 : 280}
            style={{ width: '100%', height: '100%' }}
          />
          {exprError && (
            <div
              style={{
                position: 'absolute',
                bottom: 4,
                left: 8,
                fontSize: 10,
                color: 'var(--error)',
              }}
            >
              {exprError}
            </div>
          )}
        </div>

        {/* 参数滑块 */}
        {!isSmall && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}>
            {paramKeys.map((key) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <label
                  style={{
                    fontSize: 'var(--fs-2)',
                    color: 'var(--text-3)',
                    width: 16,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {key}
                </label>
                <input
                  type="range"
                  min={-10}
                  max={10}
                  step={0.1}
                  value={params[key] ?? 0}
                  onChange={(e) => handleSliderChange(key, parseFloat(e.target.value))}
                  style={{ flex: 1, accentColor: 'var(--accent)' }}
                  aria-label={`参数 ${key}`}
                />
                <span
                  style={{
                    fontSize: 'var(--fs-2)',
                    color: 'var(--text-4)',
                    width: 36,
                    textAlign: 'right',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {(params[key] ?? 0).toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 题目 */}
        {question && (
          <div style={{ marginTop: 4, marginBottom: 8 }}>
            <div style={{ fontSize: 'var(--fs-3)', color: 'var(--text-2)', marginBottom: 4 }}>
              {question}
            </div>
            {!isSmall && (
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  className="input"
                  placeholder="输入你的答案…"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAnswerSubmit()
                  }}
                  style={{ flex: 1 }}
                  aria-label="答案输入"
                />
                <button className="btn btn--primary btn--small" onClick={handleAnswerSubmit}>
                  提交
                </button>
              </div>
            )}
          </div>
        )}

        {/* 反馈 */}
        {feedback && (
          <div className={`feedback feedback--${feedback}`}>
            {feedback === 'correct' ? '回答正确！' : '回答有误，再试试。'}
          </div>
        )}
      </div>
    </div>
  )
}
