import katex from 'katex'
import React, { useEffect, useId, useMemo, useRef } from 'react'

import { safeEval } from '../widgets/FunctionVizWidget'
import { KnowledgeTimelineControls, useKnowledgeTimeline } from './KnowledgeTimeline'
import { useSceneParameter, useSceneParameterDriver } from './SceneRuntime'
import './advanced-scenes.css'

export interface LinkedLabData {
  parameter: {
    id: string
    label: string
    min: number
    max: number
    initial: number
    step?: number
    unit?: string
  }
  domain?: [number, number]
  range: [number, number]
  readouts: Array<{
    id: string
    semantic_id: string
    label: string
    expression: string
    unit?: string
  }>
  curves?: Array<{
    id: string
    semantic_id: string
    label: string
    expression: string
  }>
  vectors?: Array<{
    id: string
    semantic_id: string
    label: string
    x_expression: string
    y_expression: string
  }>
  formula_latex?: string
}

export interface LinkedLabProps {
  data: LinkedLabData
  semanticId?: string
}

const WIDTH = 360
const HEIGHT = 226
const PAD = { left: 34, right: 14, top: 14, bottom: 28 }
const CURVE_COLORS = [
  'var(--advanced-cyan)',
  'var(--advanced-yellow)',
  'var(--advanced-blue)',
  'var(--advanced-red)',
]
const VECTOR_COLORS = [
  'var(--advanced-yellow)',
  'var(--advanced-blue)',
  'var(--advanced-red)',
]

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(() => (
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  ))
  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

function evaluate(expression: string, vars: Record<string, number>) {
  try {
    const value = safeEval(expression, vars)
    return Number.isFinite(value) ? value : null
  } catch {
    return null
  }
}

function formatNumber(value: number | null) {
  if (value === null) return '—'
  const magnitude = Math.abs(value)
  if (magnitude !== 0 && (magnitude >= 10000 || magnitude < 0.001)) {
    return value.toExponential(2)
  }
  return Number(value.toFixed(3)).toString()
}

function Formula({ latex }: { latex: string }) {
  const elementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!elementRef.current) return
    katex.render(latex, elementRef.current, {
      displayMode: true,
      throwOnError: false,
      strict: 'warn',
      trust: false,
    })
  }, [latex])
  return <div ref={elementRef} />
}

export function LinkedLab({ data, semanticId }: LinkedLabProps) {
  const reducedMotion = useReducedMotion()
  const markerPrefix = useId().replace(/:/g, '')
  const parameter = useSceneParameter({
    id: data.parameter.id,
    min: data.parameter.min,
    max: data.parameter.max,
    initial: data.parameter.initial,
    step: data.parameter.step,
  })
  const parameterDriver = useSceneParameterDriver(data.parameter.id)
  const timeline = useKnowledgeTimeline({
    durationMs: 8000,
    reducedMotion,
    onPlayRequest: reason => parameterDriver.claim(reason !== 'autoplay'),
  })

  useEffect(() => {
    if (timeline.playing && !parameterDriver.isDriver) timeline.pause()
  }, [parameterDriver.isDriver, timeline.pause, timeline.playing])

  useEffect(() => {
    if (!timeline.playing) parameterDriver.release()
  }, [parameterDriver.release, timeline.playing])

  useEffect(() => {
    if (!timeline.playing || !parameterDriver.isDriver || reducedMotion) return
    const progress = timeline.progress
    const value = progress < 1 / 3
      ? data.parameter.initial + progress * 3 * (data.parameter.max - data.parameter.initial)
      : progress < 2 / 3
        ? data.parameter.max + (progress - 1 / 3) * 3 * (data.parameter.min - data.parameter.max)
        : data.parameter.min + (progress - 2 / 3) * 3 * (data.parameter.initial - data.parameter.min)
    parameter.setValue(value)
  }, [
    data.parameter.initial,
    data.parameter.max,
    data.parameter.min,
    parameter.setValue,
    parameterDriver.isDriver,
    reducedMotion,
    timeline.playing,
    timeline.progress,
  ])

  const [rawYLow, rawYHigh] = data.range
  const yLow = Number.isFinite(rawYLow) ? rawYLow : -5
  const yHigh = Number.isFinite(rawYHigh) && rawYHigh > yLow ? rawYHigh : yLow + 10
  const [rawXLow, rawXHigh] = data.domain ?? data.range
  const xLow = Number.isFinite(rawXLow) ? rawXLow : -5
  const xHigh = Number.isFinite(rawXHigh) && rawXHigh > xLow ? rawXHigh : xLow + 10
  const xToSvg = (x: number) => PAD.left + ((x - xLow) / (xHigh - xLow)) * (WIDTH - PAD.left - PAD.right)
  const yToSvg = (y: number) => HEIGHT - PAD.bottom - ((y - yLow) / (yHigh - yLow)) * (HEIGHT - PAD.top - PAD.bottom)
  const varsBase = useMemo(() => ({
    [data.parameter.id]: parameter.value,
    t: parameter.value,
    x: 0,
    pi: Math.PI,
    e: Math.E,
  }), [data.parameter.id, parameter.value])

  const curves = useMemo(() => (data.curves ?? []).map((curve) => {
    const parts: string[] = []
    let drawing = false
    for (let index = 0; index <= 180; index += 1) {
      const x = xLow + (index / 180) * (xHigh - xLow)
      const y = evaluate(curve.expression, { ...varsBase, x })
      const visible = y !== null && y >= yLow - (yHigh - yLow) && y <= yHigh + (yHigh - yLow)
      if (!visible) {
        drawing = false
        continue
      }
      parts.push(`${drawing ? 'L' : 'M'}${xToSvg(x).toFixed(2)},${yToSvg(y).toFixed(2)}`)
      drawing = true
    }
    return { ...curve, path: parts.join(' ') }
  }), [data.curves, varsBase, xHigh, xLow, yHigh, yLow])

  const vectors = useMemo(() => (data.vectors ?? []).map((vector) => ({
    ...vector,
    x: evaluate(vector.x_expression, varsBase),
    y: evaluate(vector.y_expression, varsBase),
  })), [data.vectors, varsBase])

  const readouts = useMemo(() => data.readouts.map((readout) => ({
    ...readout,
    value: evaluate(readout.expression, varsBase),
  })), [data.readouts, varsBase])

  const gridX = Array.from({ length: 5 }, (_, index) => xLow + (index / 4) * (xHigh - xLow))
  const gridY = Array.from({ length: 5 }, (_, index) => yLow + (index / 4) * (yHigh - yLow))
  const vectorMagnitudeMax = Math.max(
    1e-9,
    ...vectors.map(vector => vector.x === null || vector.y === null ? 0 : Math.hypot(vector.x, vector.y)),
  )
  const vectorInset = { x: WIDTH - PAD.right - 42, y: PAD.top + 42, radius: 27 }
  const rootSemanticId = semanticId ?? `linked-lab-${data.parameter.id}`

  return (
    <section
      ref={timeline.ref}
      className="advanced-scene linked-lab"
      data-kind="linked_lab"
      data-semantic-id={rootSemanticId}
      aria-label={`${data.parameter.label}联动实验`}
    >
      {(curves.length > 0 || vectors.length > 0) && (
        <div className="advanced-scene__stage">
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="参数同步驱动曲线、向量与数值">
            <defs>
              {vectors.map((vector, index) => (
                <marker
                  key={vector.id}
                  id={`${markerPrefix}-arrow-${index}`}
                  viewBox="0 0 8 8"
                  refX="7"
                  refY="4"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M0,0 L8,4 L0,8 Z" fill={VECTOR_COLORS[index % VECTOR_COLORS.length]} />
                </marker>
              ))}
            </defs>

            {gridX.map((value) => (
              <React.Fragment key={`x-${value}`}>
                <line className="advanced-scene__grid" x1={xToSvg(value)} y1={PAD.top} x2={xToSvg(value)} y2={HEIGHT - PAD.bottom} />
                <text className="advanced-scene__caption" x={xToSvg(value)} y={HEIGHT - 10} textAnchor="middle">{formatNumber(value)}</text>
              </React.Fragment>
            ))}
            {gridY.map((value) => (
              <React.Fragment key={`y-${value}`}>
                <line className="advanced-scene__grid" x1={PAD.left} y1={yToSvg(value)} x2={WIDTH - PAD.right} y2={yToSvg(value)} />
                <text className="advanced-scene__caption" x={PAD.left - 5} y={yToSvg(value) + 3} textAnchor="end">{formatNumber(value)}</text>
              </React.Fragment>
            ))}
            {xLow <= 0 && xHigh >= 0 && <line className="advanced-scene__axis" x1={xToSvg(0)} y1={PAD.top} x2={xToSvg(0)} y2={HEIGHT - PAD.bottom} />}
            {yLow <= 0 && yHigh >= 0 && <line className="advanced-scene__axis" x1={PAD.left} y1={yToSvg(0)} x2={WIDTH - PAD.right} y2={yToSvg(0)} />}

            {curves.map((curve, index) => (
              <path
                key={curve.id}
                className={`linked-lab__curve linked-lab__curve--${index % 4}`}
                d={curve.path}
                data-semantic-id={curve.semantic_id}
              />
            ))}

            {vectors.length > 0 && (
              <g className="linked-lab__vector-inset" aria-label="向量方向与相对长度">
                <rect x={vectorInset.x - 37} y={vectorInset.y - 35} width="76" height="76" rx="8" />
                <line className="linked-lab__vector-guide" x1={vectorInset.x - 30} y1={vectorInset.y} x2={vectorInset.x + 30} y2={vectorInset.y} />
                <line className="linked-lab__vector-guide" x1={vectorInset.x} y1={vectorInset.y - 29} x2={vectorInset.x} y2={vectorInset.y + 29} />
                <text className="advanced-scene__caption" x={vectorInset.x} y={vectorInset.y + 38} textAnchor="middle">向量·相对长度</text>
              </g>
            )}
            {vectors.map((vector, index) => vector.x !== null && vector.y !== null && (() => {
              const magnitude = Math.hypot(vector.x, vector.y)
              const displayLength = magnitude === 0 ? 0 : 9 + 18 * Math.sqrt(magnitude / vectorMagnitudeMax)
              const endX = vectorInset.x + (magnitude === 0 ? 0 : vector.x / magnitude * displayLength)
              const endY = vectorInset.y - (magnitude === 0 ? 0 : vector.y / magnitude * displayLength)
              return (
              <g key={vector.id} data-semantic-id={vector.semantic_id}>
                <line
                  className={`linked-lab__vector linked-lab__vector--${index % 3}`}
                  x1={vectorInset.x}
                  y1={vectorInset.y}
                  x2={endX}
                  y2={endY}
                  markerEnd={magnitude === 0 ? undefined : `url(#${markerPrefix}-arrow-${index})`}
                />
                <circle className="linked-lab__vector-origin" cx={vectorInset.x} cy={vectorInset.y} r="2.5" />
              </g>
              )
            })())}
          </svg>
        </div>
      )}

      {(curves.length > 0 || vectors.length > 0) && (
        <div className="linked-lab__legend" aria-label="图例">
          {curves.map((curve, index) => (
            <span
              key={curve.id}
              data-semantic-id={curve.semantic_id}
              style={{ '--legend-color': CURVE_COLORS[index % CURVE_COLORS.length] } as React.CSSProperties}
            >{curve.label}</span>
          ))}
          {vectors.map((vector, index) => (
            <span
              key={vector.id}
              data-semantic-id={vector.semantic_id}
              style={{ '--legend-color': VECTOR_COLORS[index % VECTOR_COLORS.length] } as React.CSSProperties}
            >{vector.label}</span>
          ))}
        </div>
      )}

      {data.formula_latex && (
        <div className="linked-lab__formula" data-semantic-id={`${rootSemanticId}:formula`}>
          <Formula latex={data.formula_latex} />
        </div>
      )}

      <label className="advanced-scene__control">
        <span>{data.parameter.label}</span>
        <output>{formatNumber(parameter.value)}{data.parameter.unit ?? ''}</output>
        <input
          aria-label={data.parameter.label}
          type="range"
          min={data.parameter.min}
          max={data.parameter.max}
          step={data.parameter.step ?? (data.parameter.max - data.parameter.min) / 200}
          value={parameter.value}
          onPointerDown={() => {
            parameterDriver.stop()
            timeline.setPlaying(false)
          }}
          onChange={(event) => {
            parameterDriver.stop()
            timeline.setPlaying(false)
            parameter.setValue(Number(event.currentTarget.value))
          }}
        />
      </label>

      <div className="advanced-scene__readouts" aria-live="polite">
        {readouts.map((readout) => (
          <div key={readout.id} className="advanced-scene__readout" data-semantic-id={readout.semantic_id}>
            <span>{readout.label}</span>
            <b>{formatNumber(readout.value)}{readout.unit ?? ''}</b>
          </div>
        ))}
      </div>

      <div className="advanced-scene__timeline">
        <KnowledgeTimelineControls timeline={timeline} label="联动参数" />
      </div>
    </section>
  )
}
