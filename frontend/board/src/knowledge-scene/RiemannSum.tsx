import React, { useEffect, useMemo, useRef } from 'react'

import { safeEval } from '../widgets/FunctionVizWidget'
import { KnowledgeTimelineControls, useKnowledgeTimeline } from './KnowledgeTimeline'
import { useSceneParameter } from './SceneRuntime'
import { isNumericalCancellation } from './numericalReadout'
import './advanced-scenes.css'

export interface RiemannSumData {
  mode: 'area_under_curve'
  expression: string
  domain: [number, number]
  range: [number, number]
  n_initial: number
  n_min: number
  n_max: number
  sample: 'left' | 'midpoint' | 'right'
  duration_ms?: number
  semantic_map?: {
    curve: string
    rectangles: string
    area: string
    limit: string
  }
}

export interface RiemannSumProps {
  data: RiemannSumData
  semanticId?: string
  semanticIds?: string[]
  domainLabels?: [string, string]
}

const WIDTH = 360
const HEIGHT = 250
const PAD = { left: 38, right: 14, top: 14, bottom: 36 }

function clamp(value: number, low: number, high: number) {
  return Math.min(high, Math.max(low, value))
}

function evaluate(expression: string, x: number) {
  try {
    const value = safeEval(expression, { x, t: x, pi: Math.PI, e: Math.E })
    return Number.isFinite(value) ? value : null
  } catch {
    return null
  }
}

function format(value: number | null, digits = 5) {
  if (value === null || !Number.isFinite(value)) return '—'
  const magnitude = Math.abs(value)
  if (magnitude !== 0 && (magnitude >= 10000 || magnitude < 0.0001)) {
    return value.toExponential(3)
  }
  return Number(value.toFixed(digits)).toString()
}

function sampleRatio(sample: RiemannSumData['sample']) {
  if (sample === 'left') return 0
  if (sample === 'right') return 1
  return 0.5
}

function formatSum(value: number | null, absoluteTotal: number | null) {
  return isNumericalCancellation(value, absoluteTotal) ? '≈ 0' : format(value)
}

function sampleLabel(sample: RiemannSumData['sample']) {
  if (sample === 'left') return '左端点'
  if (sample === 'right') return '右端点'
  return '中点'
}

function simpsonAreas(expression: string, domain: [number, number], intervals: number) {
  const [a, b] = domain
  const step = (b - a) / intervals
  let weighted = 0
  let positive = 0
  let negative = 0
  for (let index = 0; index <= intervals; index += 1) {
    const value = evaluate(expression, a + index * step)
    if (value === null) return null
    const weight = index === 0 || index === intervals ? 1 : index % 2 === 0 ? 2 : 4
    weighted += value * weight
    positive += Math.max(value, 0) * weight
    negative += Math.max(-value, 0) * weight
  }
  const result = weighted * step / 3
  const areas = { signed: result, positive: positive * step / 3, negative: negative * step / 3 }
  return Object.values(areas).every(Number.isFinite) ? areas : null
}

function referenceAreas(expression: string, domain: [number, number]) {
  // A single dense sample can report a plausible but false answer across a
  // pole.  Require two deterministic resolutions to agree before presenting
  // the value as a visual reference.  This is still numerical evidence, not
  // a model-authored symbolic antiderivative.
  const coarse = simpsonAreas(expression, domain, 1024)
  const fine = simpsonAreas(expression, domain, 2048)
  if (coarse === null || fine === null) return null
  // Agreement of signed sums alone can hide opposite-sign singularities.
  const stable = (['signed', 'positive', 'negative'] as const).every(key => (
    Math.abs(fine[key] - coarse[key]) <= Math.max(5e-6, Math.abs(fine[key]) * 2e-5)
  ))
  return stable ? { ...fine, geometric: fine.positive + fine.negative } : null
}

function refinementLevels(initial: number, maximum: number) {
  const levels = [initial]
  while (levels[levels.length - 1] < maximum) {
    const next = Math.min(maximum, Math.max(levels[levels.length - 1] + 1, levels[levels.length - 1] * 2))
    levels.push(next)
  }
  return levels
}

export function RiemannSum({ data, semanticId, semanticIds, domainLabels }: RiemannSumProps) {
  const manualOverrideRef = useRef(false)
  const timeline = useKnowledgeTimeline({
    durationMs: data.duration_ms ?? 10000,
    steps: [0, 0.3, 0.48, 0.65, 0.78, 0.9, 1],
    onPlayRequest: (reason) => {
      if (reason === 'autoplay') return !manualOverrideRef.current
      manualOverrideRef.current = false
      return true
    },
  })
  const rootSemanticId = semanticId ?? 'riemann-sum'
  const curveSemanticId = data.semantic_map?.curve ?? semanticIds?.[0] ?? `${rootSemanticId}:curve`
  const rectangleSemanticId = data.semantic_map?.rectangles ?? semanticIds?.[1] ?? `${rootSemanticId}:rectangles`
  const areaSemanticId = data.semantic_map?.area ?? semanticIds?.[2] ?? `${rootSemanticId}:area`
  const limitSemanticId = data.semantic_map?.limit ?? semanticIds?.[3] ?? `${rootSemanticId}:limit`
  const nParameter = useSceneParameter({
    id: `${rootSemanticId}:n`,
    min: data.n_min,
    max: data.n_max,
    step: 1,
    initial: data.n_initial,
  })
  const levels = useMemo(
    () => refinementLevels(data.n_initial, data.n_max),
    [data.n_initial, data.n_max],
  )

  useEffect(() => {
    if (manualOverrideRef.current) return
    if (timeline.reducedMotion) {
      nParameter.setValue(data.n_initial)
      return
    }
    if (timeline.progress < 0.65) {
      nParameter.setValue(data.n_initial)
      return
    }
    const refinementProgress = (timeline.progress - 0.65) / 0.35
    const levelIndex = Math.min(
      levels.length - 1,
      Math.floor(refinementProgress * levels.length),
    )
    nParameter.setValue(levels[levelIndex])
  }, [data.n_initial, levels, nParameter.setValue, timeline.progress, timeline.reducedMotion])

  const n = clamp(Math.round(nParameter.value), data.n_min, data.n_max)
  const [xMin, xMax] = data.domain
  const [yMin, yMax] = data.range
  const xSpan = xMax - xMin
  const ySpan = yMax - yMin
  const xToSvg = (x: number) => PAD.left + ((x - xMin) / xSpan) * (WIDTH - PAD.left - PAD.right)
  const yToSvg = (y: number) => HEIGHT - PAD.bottom - ((y - yMin) / ySpan) * (HEIGHT - PAD.top - PAD.bottom)
  const yZero = yToSvg(0)
  const deltaX = xSpan / n
  const ratio = sampleRatio(data.sample)

  const rectangles = useMemo(() => Array.from({ length: n }, (_, index) => {
    const left = xMin + index * deltaX
    const right = left + deltaX
    const sampleX = left + deltaX * ratio
    const value = evaluate(data.expression, sampleX)
    return { index, left, right, sampleX, value, contribution: value === null ? null : value * deltaX }
  }), [data.expression, deltaX, n, ratio, xMin])

  const approximation = useMemo(() => {
    if (rectangles.some(rectangle => rectangle.contribution === null)) return null
    return rectangles.reduce((sum, rectangle) => sum + (rectangle.contribution ?? 0), 0)
  }, [rectangles])
  const areas = useMemo(
    () => referenceAreas(data.expression, data.domain),
    [data.domain, data.expression],
  )
  const integral = areas?.signed ?? null
  const absoluteRectangleSum = approximation === null ? null
    : rectangles.reduce((sum, rectangle) => sum + Math.abs(rectangle.contribution ?? 0), 0)
  const error = approximation === null || integral === null ? null : Math.abs(approximation - integral)

  const curvePath = useMemo(() => {
    const parts: string[] = []
    let drawing = false
    for (let index = 0; index <= 240; index += 1) {
      const x = xMin + (index / 240) * xSpan
      const value = evaluate(data.expression, x)
      if (value === null || value < yMin - ySpan || value > yMax + ySpan) {
        drawing = false
        continue
      }
      parts.push(`${drawing ? 'L' : 'M'}${xToSvg(x).toFixed(2)},${yToSvg(value).toFixed(2)}`)
      drawing = true
    }
    return parts.join(' ')
  }, [data.expression, xMin, xSpan, yMax, yMin, ySpan])

  const areaPaths = useMemo(() => {
    const values: { x: number; value: number }[] = []
    for (let index = 0; index <= 180; index += 1) {
      const x = xMin + (index / 180) * xSpan
      const value = evaluate(data.expression, x)
      if (value === null) return { positive: '', negative: '' }
      values.push({ x, value })
    }
    const path = (positive: boolean) => {
      const points: string[] = [`M${xToSvg(xMin).toFixed(2)},${yZero.toFixed(2)}`]
      for (const { x, value } of values) {
        const visibleY = clamp(positive ? Math.max(value, 0) : Math.min(value, 0), yMin, yMax)
        points.push(`L${xToSvg(x).toFixed(2)},${yToSvg(visibleY).toFixed(2)}`)
      }
      points.push(`L${xToSvg(xMax).toFixed(2)},${yZero.toFixed(2)} Z`)
      return points.join(' ')
    }
    return { positive: path(true), negative: path(false) }
  }, [data.expression, xMax, xMin, xSpan, yMax, yMin, yZero])

  const growProgress = clamp(timeline.progress / 0.3, 0, 1)
  const inspecting = timeline.progress >= 0.3 && timeline.progress < 0.48
  const scanning = timeline.progress >= 0.48 && timeline.progress < 0.65
  const inspectIndex = Math.min(n - 1, Math.max(0, Math.floor(n * 0.42)))
  const scanProgress = scanning ? clamp((timeline.progress - 0.48) / 0.17, 0, 1) : 1
  const scanIndex = Math.min(n - 1, Math.floor(scanProgress * n))
  const focusIndex = inspecting ? inspectIndex : scanning ? scanIndex : -1
  const focusRectangle = rectangles[focusIndex]
  const stageCaption = timeline.progress < 0.3
    ? '矩形从基线长出：每块高度取 f(xᵢ*)'
    : inspecting
      ? '单块面积 = 高度 f(xᵢ*) × 宽度 Δx'
      : scanning
        ? `逐块求和 ${Math.min(n, scanIndex + 1)}/${n}`
        : n < data.n_max
          ? '加密分割：Δx 变小，矩形和逼近有向面积'
          : '分割达到上限：比较矩形和与稳定的数值参考'

  const focusValue = focusRectangle?.value ?? null
  const focusTop = focusValue === null ? yZero : yToSvg(clamp(focusValue, yMin, yMax))
  const focusSampleX = focusRectangle ? xToSvg(focusRectangle.sampleX) : 0
  const focusLeft = focusRectangle ? xToSvg(focusRectangle.left) : 0
  const focusRight = focusRectangle ? xToSvg(focusRectangle.right) : 0
  const bracketY = yZero > HEIGHT - PAD.bottom - 18
    ? Math.max(PAD.top + 13, yZero - 12)
    : Math.min(HEIGHT - 12, yZero + 14)

  const setNManually = (value: number) => {
    manualOverrideRef.current = true
    timeline.pause()
    nParameter.setValue(value)
  }

  return (
    <section
      ref={timeline.ref}
      className="advanced-scene riemann-sum"
      data-kind="riemann_sum"
      data-semantic-id={rootSemanticId}
      aria-label="黎曼和逼近定积分"
    >
      <div className="advanced-scene__stage">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="矩形逐块生长并随分割数增加逼近曲线下的积分面积">
          {areaPaths.positive && <path className="riemann-sum__area" data-sign="positive" d={areaPaths.positive} data-semantic-id={areaSemanticId} />}
          {areaPaths.negative && <path className="riemann-sum__area" data-sign="negative" d={areaPaths.negative} data-semantic-id={areaSemanticId} />}
          <line className="advanced-scene__axis" x1={PAD.left} y1={yZero} x2={WIDTH - PAD.right} y2={yZero} />
          {xMin <= 0 && xMax >= 0 && (
            <line className="advanced-scene__axis" x1={xToSvg(0)} y1={PAD.top} x2={xToSvg(0)} y2={HEIGHT - PAD.bottom} />
          )}
          <g data-semantic-id={rectangleSemanticId}>
            {rectangles.map((rectangle) => {
              if (rectangle.value === null) return null
              const localGrow = clamp(growProgress * (n + 2) - rectangle.index, 0, 1)
              const animatedValue = rectangle.value * localGrow
              const visibleValue = clamp(animatedValue, yMin, yMax)
              const valueY = yToSvg(visibleValue)
              const top = Math.min(valueY, yZero)
              const rectHeight = Math.max(0.4, Math.abs(valueY - yZero))
              const isFocus = rectangle.index === focusIndex
              const isMuted = inspecting
                ? !isFocus
                : scanning
                  ? rectangle.index > scanIndex
                  : false
              return (
                <rect
                  key={rectangle.index}
                  className={`riemann-sum__rectangle${isFocus ? ' is-focus' : ''}${isMuted ? ' is-muted' : ''}`}
                  data-sign={rectangle.value < 0 ? 'negative' : 'positive'}
                  x={xToSvg(rectangle.left) + 0.35}
                  y={top}
                  width={Math.max(0.45, xToSvg(rectangle.right) - xToSvg(rectangle.left) - 0.7)}
                  height={rectHeight}
                />
              )
            })}
          </g>
          <path className="riemann-sum__curve" d={curvePath} data-semantic-id={curveSemanticId} />

          {focusRectangle && focusValue !== null && (
            <g className="riemann-sum__measure" data-semantic-id={areaSemanticId}>
              <line x1={focusSampleX} y1={yZero} x2={focusSampleX} y2={focusTop} />
              <line x1={focusLeft} y1={bracketY - 4} x2={focusLeft} y2={bracketY + 4} />
              <line x1={focusRight} y1={bracketY - 4} x2={focusRight} y2={bracketY + 4} />
              <line x1={focusLeft} y1={bracketY} x2={focusRight} y2={bracketY} />
              <text x={focusSampleX + 5} y={(focusTop + yZero) / 2}>f(xᵢ*)={format(focusValue, 3)}</text>
              <text x={(focusLeft + focusRight) / 2} y={bracketY - 6} textAnchor="middle">Δx</text>
            </g>
          )}

          <text className="riemann-sum__endpoint" x={xToSvg(xMin)} y={yZero + 13} textAnchor="middle">a={domainLabels?.[0] ?? format(xMin, 3)}</text>
          <text className="riemann-sum__endpoint" x={xToSvg(xMax)} y={yZero + 13} textAnchor="middle">b={domainLabels?.[1] ?? format(xMax, 3)}</text>
          <text className="advanced-scene__caption" x={WIDTH - PAD.right} y={HEIGHT - 9} textAnchor="end">{stageCaption}</text>
        </svg>
      </div>

      <p className="riemann-sum__sign-key"><span>＋ 横轴上方按正值</span><span>− 横轴下方按负值</span></p>

      <label className="advanced-scene__control">
        <span>分割数 n（{sampleLabel(data.sample)}取样）</span>
        <output>{n}，Δx={format(deltaX, 4)}</output>
        <input
          aria-label="黎曼和分割数 n"
          type="range"
          min={data.n_min}
          max={data.n_max}
          step={1}
          value={n}
          onPointerDown={() => {
            manualOverrideRef.current = true
            timeline.pause()
          }}
          onChange={(event) => setNManually(Number(event.currentTarget.value))}
        />
      </label>

      <div className="advanced-scene__readouts" aria-live="polite">
        <div className="advanced-scene__readout" data-semantic-id={rectangleSemanticId}>
          <span>矩形和 Sₙ = Σ f(xᵢ*)Δx</span>
          <b>{formatSum(approximation, absoluteRectangleSum)}</b>
        </div>
        <div className="advanced-scene__readout" data-semantic-id={areaSemanticId}>
          <span>定积分数值参考 I = ∫ₐᵇ f(x)dx</span>
          <b>{integral === null ? '区间内未稳定收敛' : formatSum(integral, areas?.geometric ?? null)}</b>
        </div>
        <div className="advanced-scene__readout riemann-sum__geometric" data-semantic-id={areaSemanticId}>
          <span>几何面积数值参考 A = ∫ₐᵇ |f(x)|dx</span>
          <b>{areas === null ? '参考值不稳定，暂不比较' : format(areas.geometric)}</b>
          {areas && <small>上方面积约 {format(areas.positive)}，下方面积约 {format(areas.negative)}；相减算 I，相加算 A。</small>}
        </div>
        <div className="advanced-scene__readout riemann-sum__error" data-semantic-id={limitSemanticId}>
          <span>绝对误差 |Sₙ − ∫f|</span>
          <b>{integral === null ? '参考值不稳定，暂不比较' : formatSum(error, areas?.geometric ?? null)}</b>
        </div>
        <div className="advanced-scene__readout" data-semantic-id={limitSemanticId}>
          <span>逼近极限</span>
          <b>n ↑，Δx ↓，Sₙ → ∫ₐᵇ f(x)dx</b>
        </div>
      </div>

      <div className="advanced-scene__timeline">
        <KnowledgeTimelineControls timeline={timeline} label="黎曼和从单块面积到积分极限" />
      </div>
    </section>
  )
}
