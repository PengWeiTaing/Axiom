import React, { useEffect, useMemo, useRef } from 'react'

import { KnowledgeTimelineControls, useKnowledgeTimeline } from './KnowledgeTimeline'
import { useSceneParameter } from './SceneRuntime'
import './advanced-scenes.css'

export interface ConstraintGeometryData {
  mode: 'inscribed_angle'
  center: [number, number]
  radius: number
  fixed_angles_deg: [number, number]
  moving_angle_deg: number
  semantic_map?: {
    chord: string
    angle: string
    invariant: string
  }
  duration_ms?: number
}

export interface ConstraintGeometryProps {
  data: ConstraintGeometryData
  semanticId?: string
  semanticIds?: string[]
}

const WIDTH = 360
const HEIGHT = 246
const CX = 180
const CY = 116
const RADIUS = 86

function normalizeDegrees(value: number) {
  return ((value % 360) + 360) % 360
}

function ccwDelta(from: number, to: number) {
  return normalizeDegrees(to - from)
}

function angularDistance(a: number, b: number) {
  const delta = Math.abs(normalizeDegrees(a - b))
  return Math.min(delta, 360 - delta)
}

function clamp(value: number, low: number, high: number) {
  return Math.min(high, Math.max(low, value))
}

function pointAt(angleDeg: number, radius = RADIUS) {
  const angle = angleDeg * Math.PI / 180
  return { x: CX + radius * Math.cos(angle), y: CY - radius * Math.sin(angle) }
}

function sampledArc(startDeg: number, lengthDeg: number, radius = RADIUS) {
  const steps = Math.max(8, Math.ceil(Math.abs(lengthDeg) / 8))
  return Array.from({ length: steps + 1 }, (_, index) => {
    const point = pointAt(startDeg + (index / steps) * lengthDeg, radius)
    return `${index === 0 ? 'M' : 'L'}${point.x.toFixed(2)},${point.y.toFixed(2)}`
  }).join(' ')
}

function angleBetween(origin: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }) {
  const ax = a.x - origin.x
  const ay = a.y - origin.y
  const bx = b.x - origin.x
  const by = b.y - origin.y
  const denominator = Math.hypot(ax, ay) * Math.hypot(bx, by)
  if (denominator === 0) return 0
  return Math.acos(clamp((ax * bx + ay * by) / denominator, -1, 1)) * 180 / Math.PI
}

function localAngleArc(origin: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }) {
  const radius = 18
  const start = Math.atan2(a.y - origin.y, a.x - origin.x)
  const end = Math.atan2(b.y - origin.y, b.x - origin.x)
  let delta = end - start
  while (delta > Math.PI) delta -= Math.PI * 2
  while (delta < -Math.PI) delta += Math.PI * 2
  return Array.from({ length: 13 }, (_, index) => {
    const angle = start + (index / 12) * delta
    const x = origin.x + radius * Math.cos(angle)
    const y = origin.y + radius * Math.sin(angle)
    return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
  }).join(' ')
}

export function ConstraintGeometry({ data, semanticId, semanticIds }: ConstraintGeometryProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const draggingRef = useRef(false)
  const timeline = useKnowledgeTimeline({
    durationMs: data.duration_ms ?? 9000,
    steps: [0, 0.25, 0.5, 0.75, 1],
  })
  const aAngle = normalizeDegrees(data.fixed_angles_deg[0])
  const bAngle = normalizeDegrees(data.fixed_angles_deg[1])
  const initialAngle = normalizeDegrees(data.moving_angle_deg)
  const aToB = ccwDelta(aAngle, bAngle)
  const initialOnAToB = ccwDelta(aAngle, initialAngle) < aToB
  const allowedStart = initialOnAToB ? aAngle : bAngle
  const allowedLength = initialOnAToB ? aToB : 360 - aToB
  const endpointMargin = Math.min(4, allowedLength * 0.12)
  const uMin = endpointMargin / allowedLength
  const uMax = 1 - uMin
  const initialU = clamp(ccwDelta(allowedStart, initialAngle) / allowedLength, uMin, uMax)
  const movingParameter = useSceneParameter({
    id: `${semanticId ?? 'inscribed-angle'}:position`,
    min: uMin,
    max: uMax,
    initial: initialU,
  })

  useEffect(() => {
    if (!timeline.playing) return
    const phase = Math.asin(clamp((initialU - 0.5) / 0.44, -1, 1))
    const animated = 0.5 + 0.44 * Math.sin(timeline.progress * Math.PI * 2 + phase)
    movingParameter.setValue(clamp(animated, uMin, uMax))
  }, [initialU, movingParameter.setValue, timeline.playing, timeline.progress, uMax, uMin])

  const u = clamp(movingParameter.value, uMin, uMax)
  const movingAngle = normalizeDegrees(allowedStart + u * allowedLength)
  const a = pointAt(aAngle)
  const b = pointAt(bAngle)
  const p = pointAt(movingAngle)
  const inscribedAngle = angleBetween(p, a, b)
  const rootSemanticId = semanticId ?? 'constraint-inscribed-angle'
  const chordSemanticId = data.semantic_map?.chord ?? semanticIds?.[0] ?? `${rootSemanticId}:fixed-chord`
  const angleSemanticId = data.semantic_map?.angle ?? semanticIds?.[1] ?? `${rootSemanticId}:inscribed-angle`
  const invariantSemanticId = data.semantic_map?.invariant ?? semanticIds?.[2] ?? `${rootSemanticId}:circle-invariant`
  const interceptedArcStart = initialOnAToB ? bAngle : aAngle
  const interceptedArcLength = 360 - allowedLength
  const interceptedArc = useMemo(
    () => sampledArc(interceptedArcStart, interceptedArcLength),
    [interceptedArcLength, interceptedArcStart],
  )

  const setPositionFromPointer = (clientX: number, clientY: number) => {
    const svg = svgRef.current
    if (!svg) return
    const bounds = svg.getBoundingClientRect()
    const x = ((clientX - bounds.left) / bounds.width) * WIDTH
    const y = ((clientY - bounds.top) / bounds.height) * HEIGHT
    const pointerAngle = normalizeDegrees(Math.atan2(CY - y, x - CX) * 180 / Math.PI)
    const offset = ccwDelta(allowedStart, pointerAngle)
    if (offset <= allowedLength) {
      movingParameter.setValue(clamp(offset / allowedLength, uMin, uMax))
      return
    }
    const end = normalizeDegrees(allowedStart + allowedLength)
    movingParameter.setValue(
      angularDistance(pointerAngle, allowedStart) <= angularDistance(pointerAngle, end) ? uMin : uMax,
    )
  }

  return (
    <section
      ref={timeline.ref}
      className="advanced-scene constraint-geometry"
      data-kind="constraint_geometry"
      data-semantic-id={rootSemanticId}
      aria-label="圆周角不变量约束实验"
    >
      <div className="advanced-scene__stage">
        <svg ref={svgRef} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="拖动点 P 沿同一段圆弧移动，圆周角 APB 保持不变">
          <circle className="constraint-geometry__circle" cx={CX} cy={CY} r={RADIUS} />
          <path className="constraint-geometry__arc" d={interceptedArc} data-semantic-id={chordSemanticId} />
          <line className="constraint-geometry__central" x1={CX} y1={CY} x2={a.x} y2={a.y} />
          <line className="constraint-geometry__central" x1={CX} y1={CY} x2={b.x} y2={b.y} />
          <line className="constraint-geometry__chord" x1={a.x} y1={a.y} x2={b.x} y2={b.y} data-semantic-id={chordSemanticId} />
          <line className="constraint-geometry__ray" x1={p.x} y1={p.y} x2={a.x} y2={a.y} />
          <line className="constraint-geometry__ray" x1={p.x} y1={p.y} x2={b.x} y2={b.y} />
          <path className="constraint-geometry__arc" d={localAngleArc(p, a, b)} data-semantic-id={angleSemanticId} />

          <circle className="constraint-geometry__fixed-point" cx={a.x} cy={a.y} r="4" />
          <circle className="constraint-geometry__fixed-point" cx={b.x} cy={b.y} r="4" />
          <circle className="constraint-geometry__moving-point" cx={p.x} cy={p.y} r="5.5" />
          <circle
            className="constraint-geometry__hit"
            cx={p.x}
            cy={p.y}
            r="18"
            data-drag-handle="true"
            data-dragging={draggingRef.current ? 'true' : undefined}
            onPointerDown={(event) => {
              draggingRef.current = true
              event.currentTarget.setPointerCapture(event.pointerId)
              timeline.setPlaying(false)
              setPositionFromPointer(event.clientX, event.clientY)
            }}
            onPointerMove={(event) => {
              if (draggingRef.current) setPositionFromPointer(event.clientX, event.clientY)
            }}
            onPointerUp={(event) => {
              draggingRef.current = false
              event.currentTarget.releasePointerCapture(event.pointerId)
            }}
            onPointerCancel={() => { draggingRef.current = false }}
          />

          <text className="advanced-scene__label" x={a.x + 8} y={a.y + 4}>A</text>
          <text className="advanced-scene__label" x={b.x + 8} y={b.y + 4}>B</text>
          <text className="advanced-scene__label" x={p.x + 9} y={p.y - 7}>P</text>
          <text className="advanced-scene__label" x={CX + 7} y={CY - 7}>O</text>
          <text className="constraint-geometry__invariant" x={p.x} y={p.y + (p.y < CY ? 35 : -28)} textAnchor="middle">
            ∠APB = {inscribedAngle.toFixed(1)}°
          </text>
          <text className="advanced-scene__caption" x={WIDTH - 10} y={HEIGHT - 10} textAnchor="end">拖动 P；黄弧为被对弧</text>
        </svg>
      </div>

      <label className="advanced-scene__control">
        <span>P 在约束圆弧上的位置</span>
        <output>{Math.round(u * 100)}%</output>
        <input
          aria-label="P 在圆弧上的位置"
          type="range"
          min={uMin}
          max={uMax}
          step={(uMax - uMin) / 240}
          value={u}
          onPointerDown={() => timeline.setPlaying(false)}
          onChange={(event) => movingParameter.setValue(Number(event.currentTarget.value))}
        />
      </label>

      <div className="advanced-scene__readouts" aria-live="polite">
        <div className="advanced-scene__readout" data-semantic-id={angleSemanticId}>
          <span>圆周角 ∠APB</span>
          <b>{inscribedAngle.toFixed(2)}°</b>
        </div>
        <div className="advanced-scene__readout" data-semantic-id={chordSemanticId}>
          <span>被对弧的圆心角</span>
          <b>{interceptedArcLength.toFixed(2)}°</b>
        </div>
        <div className="advanced-scene__readout" data-semantic-id={invariantSemanticId}>
          <span>不变关系</span>
          <b>∠APB = ½ × 被对弧</b>
        </div>
        <div className="advanced-scene__readout" data-semantic-id={invariantSemanticId}>
          <span>原始圆 (O, r)</span>
          <b>(({data.center[0]}, {data.center[1]}), {data.radius})</b>
        </div>
      </div>

      <div className="advanced-scene__timeline">
        <KnowledgeTimelineControls timeline={timeline} label="P 沿圆弧移动" />
      </div>
    </section>
  )
}
