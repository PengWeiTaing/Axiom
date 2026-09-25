import React, { useEffect, useMemo, useRef } from 'react'

import { safeEval } from '../widgets/FunctionVizWidget'
import { KnowledgeTimelineControls, useKnowledgeTimeline } from './KnowledgeTimeline'
import { useSceneParameter } from './SceneRuntime'
import './advanced-scenes.css'

export interface LimitMicroscopeData {
  mode: 'derivative'
  expression: string
  domain: [number, number]
  range: [number, number]
  x0: number
  h_initial: number
  h_min: number
  h_max: number
  semantic_map?: {
    secant: string
    tangent: string
    process: string
  }
  duration_ms?: number
}

export interface LimitMicroscopeProps {
  data: LimitMicroscopeData
  semanticId?: string
  semanticIds?: string[]
}

const WIDTH = 360
const HEIGHT = 238
const PAD = { left: 38, right: 14, top: 14, bottom: 30 }

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

function format(value: number | null, digits = 3) {
  if (value === null || !Number.isFinite(value)) return '—'
  const magnitude = Math.abs(value)
  if (magnitude !== 0 && (magnitude >= 10000 || magnitude < 0.001)) {
    return value.toExponential(2)
  }
  return Number(value.toFixed(digits)).toString()
}

type DerivativeAssessment = {
  status: 'exists' | 'missing' | 'pending'
  derivative: number | null
  leftSlope: number | null
  rightSlope: number | null
  reason: string
}

function assessDerivative(
  expression: string,
  x0: number,
  domain: [number, number],
  hMin: number,
  f0: number | null,
): DerivativeAssessment {
  const [domainMin, domainMax] = domain
  const domainSpan = domainMax - domainMin
  const availableRadius = Math.min(x0 - domainMin, domainMax - x0)
  const numericalFloor = Math.sqrt(Number.EPSILON) * Math.max(1, Math.abs(x0))
  const preferredStep = Math.max(
    Math.min(hMin, domainSpan * 1e-3),
    domainSpan * 1e-7,
    numericalFloor * 16,
  )
  const baseStep = Math.min(preferredStep, availableRadius * 0.5)

  if (f0 === null || !Number.isFinite(baseStep) || baseStep / 4 <= numericalFloor) {
    return {
      status: 'pending',
      derivative: null,
      leftSlope: null,
      rightSlope: null,
      reason: '当前尺度尚未收敛',
    }
  }

  const scales = [baseStep, baseStep / 2, baseStep / 4]
  const pairs = scales.map((step) => {
    const leftValue = evaluate(expression, x0 - step)
    const rightValue = evaluate(expression, x0 + step)
    if (leftValue === null || rightValue === null) return null
    const left = (f0 - leftValue) / step
    const right = (rightValue - f0) / step
    return Number.isFinite(left) && Number.isFinite(right) ? { left, right } : null
  })

  if (pairs.some(pair => pair === null)) {
    const finest = [...pairs].reverse().find(pair => pair !== null)
    return {
      status: 'pending',
      derivative: null,
      leftSlope: finest?.left ?? null,
      rightSlope: finest?.right ?? null,
      reason: '当前尺度尚未收敛',
    }
  }

  const finitePairs = pairs as Array<{ left: number; right: number }>
  const left = finitePairs.map(pair => pair.left)
  const right = finitePairs.map(pair => pair.right)
  const finestLeft = left[2]
  const finestRight = right[2]
  const scale = Math.max(1, Math.abs(finestLeft), Math.abs(finestRight))
  const tolerance = Math.max(5e-5, scale * 0.01)
  const leftChanges = [Math.abs(left[1] - left[0]), Math.abs(left[2] - left[1])]
  const rightChanges = [Math.abs(right[1] - right[0]), Math.abs(right[2] - right[1])]
  const gaps = left.map((value, index) => Math.abs(value - right[index]))

  const sameFiniteLimit = gaps[2] <= tolerance * 2
    && leftChanges[1] <= tolerance
    && rightChanges[1] <= tolerance
  if (sameFiniteLimit) {
    return {
      status: 'exists',
      derivative: (finestLeft + finestRight) / 2,
      leftSlope: finestLeft,
      rightSlope: finestRight,
      reason: '左右差商稳定到同一有限值',
    }
  }

  const eachSideStable = leftChanges[1] <= tolerance * 1.5
    && rightChanges[1] <= tolerance * 1.5
  const separatedLimits = eachSideStable
    && gaps[2] > tolerance * 6
    && gaps[2] >= gaps[1] * 0.85
  if (separatedLimits) {
    return {
      status: 'missing',
      derivative: null,
      leftSlope: finestLeft,
      rightSlope: finestRight,
      reason: '左右斜率趋向不同有限值，导数不存在',
    }
  }

  const magnitudes = finitePairs.map(pair => Math.max(Math.abs(pair.left), Math.abs(pair.right)))
  const firstRatio = magnitudes[1] / Math.max(magnitudes[0], 1e-12)
  const secondRatio = magnitudes[2] / Math.max(magnitudes[1], 1e-12)
  const clearlyDiverging = magnitudes[2] > 8
    && firstRatio > 1.22
    && secondRatio > 1.22
    && Math.abs(firstRatio - secondRatio) <= Math.max(firstRatio, secondRatio) * 0.25
  if (clearlyDiverging) {
    return {
      status: 'missing',
      derivative: null,
      leftSlope: finestLeft,
      rightSlope: finestRight,
      reason: '差商随尺度缩小持续发散，导数不存在',
    }
  }

  return {
    status: 'pending',
    derivative: null,
    leftSlope: finestLeft,
    rightSlope: finestRight,
    reason: '当前尺度尚未收敛',
  }
}

export function LimitMicroscope({ data, semanticId, semanticIds }: LimitMicroscopeProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const draggingRef = useRef(false)
  const timeline = useKnowledgeTimeline({
    durationMs: data.duration_ms ?? 8000,
    steps: [0, 0.36, 0.7, 1],
  })
  const hParameter = useSceneParameter({
    id: `${semanticId ?? 'limit'}:h`,
    min: data.h_min,
    max: data.h_max,
    initial: data.h_initial,
  })

  useEffect(() => {
    const ratio = Math.max(1, data.h_initial / data.h_min)
    const animatedH = data.h_min * Math.pow(ratio, 1 - timeline.progress)
    hParameter.setValue(animatedH)
  }, [data.h_initial, data.h_min, hParameter.setValue, timeline.progress])

  const [xMin, xMax] = data.domain
  const [yMin, yMax] = data.range
  const xSpan = xMax - xMin
  const ySpan = yMax - yMin
  const xToSvg = (x: number) => PAD.left + ((x - xMin) / xSpan) * (WIDTH - PAD.left - PAD.right)
  const yToSvg = (y: number) => HEIGHT - PAD.bottom - ((y - yMin) / ySpan) * (HEIGHT - PAD.top - PAD.bottom)
  const usableMax = Math.max(data.h_min, Math.min(data.h_max, xMax - data.x0))
  const h = clamp(hParameter.value, data.h_min, usableMax)
  const deltaX = h
  const x1 = data.x0 + deltaX
  const y0 = evaluate(data.expression, data.x0)
  const y1 = evaluate(data.expression, x1)

  const derivativeAssessment = assessDerivative(
    data.expression,
    data.x0,
    data.domain,
    data.h_min,
    y0,
  )
  const derivativeExists = derivativeAssessment.status === 'exists'
  const derivative = derivativeAssessment.derivative
  const secantSlope = y0 === null || y1 === null ? null : (y1 - y0) / deltaX
  const slopeError = derivative === null || secantSlope === null
    ? null
    : Math.abs(secantSlope - derivative)

  const curvePath = useMemo(() => {
    const parts: string[] = []
    let drawing = false
    for (let index = 0; index <= 220; index += 1) {
      const x = xMin + (index / 220) * xSpan
      const y = evaluate(data.expression, x)
      if (y === null || y < yMin - ySpan || y > yMax + ySpan) {
        drawing = false
        continue
      }
      parts.push(`${drawing ? 'L' : 'M'}${xToSvg(x).toFixed(2)},${yToSvg(y).toFixed(2)}`)
      drawing = true
    }
    return parts.join(' ')
  }, [data.expression, xMin, xSpan, yMax, yMin, ySpan])

  const lineForSlope = (slope: number | null) => {
    if (slope === null || y0 === null) return null
    const startY = y0 + slope * (xMin - data.x0)
    const endY = y0 + slope * (xMax - data.x0)
    return { x1: xToSvg(xMin), y1: yToSvg(startY), x2: xToSvg(xMax), y2: yToSvg(endY) }
  }
  const secantLine = lineForSlope(secantSlope)
  const tangentLine = lineForSlope(derivative)
  const gridX = Array.from({ length: 5 }, (_, index) => xMin + (index / 4) * xSpan)
  const gridY = Array.from({ length: 5 }, (_, index) => yMin + (index / 4) * ySpan)
  const rootSemanticId = semanticId ?? 'limit-derivative'
  const secantSemanticId = data.semantic_map?.secant ?? semanticIds?.[0] ?? `${rootSemanticId}:secant-slope`
  const tangentSemanticId = data.semantic_map?.tangent ?? semanticIds?.[1] ?? `${rootSemanticId}:tangent-slope`
  const processSemanticId = data.semantic_map?.process ?? semanticIds?.[2] ?? `${rootSemanticId}:limit-process`

  const setHFromClientX = (clientX: number) => {
    const svg = svgRef.current
    if (!svg) return
    const bounds = svg.getBoundingClientRect()
    const viewX = ((clientX - bounds.left) / bounds.width) * WIDTH
    const x = xMin + ((viewX - PAD.left) / (WIDTH - PAD.left - PAD.right)) * xSpan
    hParameter.setValue(clamp(Math.abs(x - data.x0), data.h_min, usableMax))
  }

  const relativeError = slopeError === null
    ? 0
    : clamp((slopeError / Math.max(1e-9, Math.abs(derivative ?? 0), 1)) * 100, 0, 100)

  return (
    <section
      ref={timeline.ref}
      className="advanced-scene limit-microscope"
      data-kind="limit_microscope"
      data-semantic-id={rootSemanticId}
      aria-label="导数的割线极限显微镜"
    >
      <div className="advanced-scene__stage">
        <svg ref={svgRef} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="两点逐渐靠近，割线逼近切线">
          {gridX.map((value) => (
            <line key={`x-${value}`} className="advanced-scene__grid" x1={xToSvg(value)} y1={PAD.top} x2={xToSvg(value)} y2={HEIGHT - PAD.bottom} />
          ))}
          {gridY.map((value) => (
            <line key={`y-${value}`} className="advanced-scene__grid" x1={PAD.left} y1={yToSvg(value)} x2={WIDTH - PAD.right} y2={yToSvg(value)} />
          ))}
          {xMin <= 0 && xMax >= 0 && <line className="advanced-scene__axis" x1={xToSvg(0)} y1={PAD.top} x2={xToSvg(0)} y2={HEIGHT - PAD.bottom} />}
          {yMin <= 0 && yMax >= 0 && <line className="advanced-scene__axis" x1={PAD.left} y1={yToSvg(0)} x2={WIDTH - PAD.right} y2={yToSvg(0)} />}

          <path className="limit-microscope__curve" d={curvePath} data-semantic-id={processSemanticId} />
          {tangentLine && <line className="limit-microscope__tangent" {...tangentLine} data-semantic-id={tangentSemanticId} />}
          {secantLine && <line className="limit-microscope__secant" {...secantLine} data-semantic-id={secantSemanticId} />}

          {y0 !== null && y1 !== null && (
            <g data-semantic-id={processSemanticId}>
              <line className="limit-microscope__h-guide" x1={xToSvg(data.x0)} y1={yToSvg(y0)} x2={xToSvg(x1)} y2={yToSvg(y0)} />
              <line className="limit-microscope__h-guide" x1={xToSvg(x1)} y1={yToSvg(y0)} x2={xToSvg(x1)} y2={yToSvg(y1)} />
              <text className="advanced-scene__label" x={(xToSvg(data.x0) + xToSvg(x1)) / 2} y={yToSvg(y0) + 15} textAnchor="middle">h={format(deltaX)}</text>
              <circle className="limit-microscope__point-a" cx={xToSvg(data.x0)} cy={yToSvg(y0)} r="4" />
              <circle className="limit-microscope__point-b" cx={xToSvg(x1)} cy={yToSvg(y1)} r="4.5" />
              <circle
                className="limit-microscope__point-hit"
                cx={xToSvg(x1)}
                cy={yToSvg(y1)}
                r="16"
                data-drag-handle="true"
                onPointerDown={(event) => {
                  draggingRef.current = true
                  event.currentTarget.setPointerCapture(event.pointerId)
                  timeline.setPlaying(false)
                  setHFromClientX(event.clientX)
                }}
                onPointerMove={(event) => {
                  if (draggingRef.current) setHFromClientX(event.clientX)
                }}
                onPointerUp={(event) => {
                  draggingRef.current = false
                  event.currentTarget.releasePointerCapture(event.pointerId)
                }}
                onPointerCancel={() => { draggingRef.current = false }}
              />
            </g>
          )}
          <text className="advanced-scene__caption" x={WIDTH - PAD.right} y={HEIGHT - 10} textAnchor="end">拖动黄点改变 h</text>
        </svg>
      </div>

      <label className="advanced-scene__control">
        <span>两点的水平间距 |h|</span>
        <output>{format(h)}</output>
        <input
          aria-label="两点间距 h"
          type="range"
          min={data.h_min}
          max={usableMax}
          step={(usableMax - data.h_min) / 240 || data.h_min}
          value={h}
          onPointerDown={() => timeline.setPlaying(false)}
          onChange={(event) => hParameter.setValue(Number(event.currentTarget.value))}
        />
      </label>

      <div className="advanced-scene__readouts" aria-live="polite">
        <div className="advanced-scene__readout" data-semantic-id={secantSemanticId}>
          <span>割线斜率 Δy/Δx</span>
          <b>{format(secantSlope)}</b>
        </div>
        <div
          className={`advanced-scene__readout${derivativeExists ? '' : ' limit-microscope__readout-detail'}`}
          data-semantic-id={tangentSemanticId}
        >
          <span>左右差商 → f′(x₀)</span>
          <b>{derivativeExists
            ? format(derivative)
            : `${derivativeAssessment.reason}（${format(derivativeAssessment.leftSlope)} / ${format(derivativeAssessment.rightSlope)}）`}</b>
        </div>
        <div className="advanced-scene__readout" data-semantic-id={processSemanticId}>
          <span>动点 (x₀+h, f(x₀+h))</span>
          <b>({format(x1)}, {format(y1)})</b>
        </div>
        <div
          className={`advanced-scene__readout limit-microscope__error${derivativeExists ? '' : ' limit-microscope__readout-detail'}`}
          data-semantic-id={processSemanticId}
          style={{ '--limit-error': `${relativeError}%` } as React.CSSProperties}
        >
          <span>|割线斜率 − 切线斜率|</span>
          <b>{derivativeExists
            ? format(slopeError)
            : derivativeAssessment.status === 'missing'
              ? '导数不存在，误差不适用'
              : '尚未收敛，暂不显示切线误差'}</b>
          <i aria-hidden="true" />
        </div>
      </div>

      <div className="advanced-scene__timeline">
        <KnowledgeTimelineControls timeline={timeline} label="h → 0" />
      </div>
    </section>
  )
}
