import React, { useId, useRef } from 'react'

import { KnowledgeTimelineControls, useKnowledgeTimeline } from './KnowledgeTimeline'
import './advanced-scenes.css'

export interface FieldExperimentData {
  mode: 'faraday_loop'
  turns: number
  area: number
  orientation_deg: number
  field_start: number
  field_end: number
  change_duration_s?: number
  semantic_map?: {
    field: string
    flux: string
    emf: string
    direction: string
  }
  duration_ms?: number
}

export interface FieldExperimentProps {
  data: FieldExperimentData
  semanticId?: string
  semanticIds?: string[]
}

const WIDTH = 360
const HEIGHT = 238
const FIELD_CENTER = { x: 83, y: 103 }
const FIELD_RX = 54
const GRAPH = { left: 174, right: 348, top: 16, bottom: 214 }

function clamp(value: number, low: number, high: number) {
  return Math.min(high, Math.max(low, value))
}

function format(value: number, digits = 3) {
  if (!Number.isFinite(value)) return '—'
  const magnitude = Math.abs(value)
  if (magnitude !== 0 && (magnitude >= 10000 || magnitude < 0.001)) {
    return value.toExponential(2)
  }
  return Number(value.toFixed(digits)).toString()
}

export function FieldExperiment({ data, semanticId, semanticIds }: FieldExperimentProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const draggingRef = useRef(false)
  const markerId = `${useId().replace(/:/g, '')}-emf-arrow`
  const durationMs = data.duration_ms ?? 9000
  const changeDurationSeconds = Math.max(1e-6, data.change_duration_s ?? 1)
  const timeline = useKnowledgeTimeline({ durationMs, steps: [0, 0.25, 0.5, 0.75, 1] })
  const progress = timeline.progress
  const orientationRad = data.orientation_deg * Math.PI / 180
  const orientationFactor = Math.cos(orientationRad)
  const deltaField = data.field_end - data.field_start
  const field = data.field_start + deltaField * progress
  const flux = data.area * orientationFactor * field
  const rampActive = progress < 1 && Math.abs(deltaField) > 1e-12
  const dBdt = rampActive ? deltaField / changeDurationSeconds : 0
  const emf = -data.turns * data.area * orientationFactor * dBdt
  const rootSemanticId = semanticId ?? 'field-faraday-loop'
  const fieldSemanticId = data.semantic_map?.field ?? semanticIds?.[0] ?? `${rootSemanticId}:magnetic-field`
  const fluxSemanticId = data.semantic_map?.flux ?? semanticIds?.[1] ?? `${rootSemanticId}:magnetic-flux`
  const emfSemanticId = data.semantic_map?.emf ?? semanticIds?.[2] ?? `${rootSemanticId}:induced-emf`
  const directionSemanticId = data.semantic_map?.direction ?? semanticIds?.[3] ?? `${rootSemanticId}:lenz-direction`
  const loopRy = Math.max(8, 34 * Math.max(0.2, Math.abs(orientationFactor)))
  const fieldDirection = field > 1e-10 ? '⊙ 出纸面' : field < -1e-10 ? '⊗ 入纸面' : 'B = 0'
  const emfDirection = emf > 1e-10 ? '逆时针' : emf < -1e-10 ? '顺时针' : '无感应电动势'
  const strength = clamp(Math.abs(field) / Math.max(Math.abs(data.field_start), Math.abs(data.field_end), 1e-9), 0.14, 1)

  const bandHeight = (GRAPH.bottom - GRAPH.top) / 3
  const bands = [
    { id: 'b', label: 'B', className: 'field-experiment__curve--b', semantic: fieldSemanticId },
    { id: 'flux', label: 'Φ', className: 'field-experiment__curve--flux', semantic: fluxSemanticId },
    { id: 'emf', label: 'ε', className: 'field-experiment__curve--emf', semantic: emfSemanticId },
  ] as const
  const graphX = (value: number) => GRAPH.left + value * (GRAPH.right - GRAPH.left)
  const bandCenter = (index: number) => GRAPH.top + bandHeight * (index + 0.5)
  const bScale = Math.max(Math.abs(data.field_start), Math.abs(data.field_end), 1e-9)
  const fluxStart = data.area * orientationFactor * data.field_start
  const fluxEnd = data.area * orientationFactor * data.field_end
  const fluxScale = Math.max(Math.abs(fluxStart), Math.abs(fluxEnd), 1e-9)
  const emfDuringRamp = -data.turns * data.area * orientationFactor * deltaField / changeDurationSeconds
  const emfScale = Math.max(Math.abs(emfDuringRamp), 1e-9)

  const seriesValue = (kind: 'b' | 'flux' | 'emf', at: number) => {
    const b = data.field_start + deltaField * at
    if (kind === 'b') return b / bScale
    if (kind === 'flux') return (data.area * orientationFactor * b) / fluxScale
    return at >= 1 ? 0 : emfDuringRamp / emfScale
  }
  const seriesPath = (kind: 'b' | 'flux' | 'emf', index: number) => {
    const center = bandCenter(index)
    const amplitude = bandHeight * 0.31
    const points = kind === 'emf' ? 90 : 72
    return Array.from({ length: points + 1 }, (_, pointIndex) => {
      const at = pointIndex / points
      const value = seriesValue(kind, at)
      return `${pointIndex === 0 ? 'M' : 'L'}${graphX(at).toFixed(2)},${(center - value * amplitude).toFixed(2)}`
    }).join(' ')
  }

  const scrubFromClientX = (clientX: number) => {
    const svg = svgRef.current
    if (!svg) return
    const bounds = svg.getBoundingClientRect()
    const viewX = ((clientX - bounds.left) / bounds.width) * WIDTH
    timeline.scrub(clamp((viewX - GRAPH.left) / (GRAPH.right - GRAPH.left), 0, 1))
  }

  const fieldMarks = Array.from({ length: 20 }, (_, index) => ({
    x: 25 + (index % 5) * 29,
    y: 38 + Math.floor(index / 5) * 42,
  }))
  const emfSweep = emf >= 0 ? 0 : 1
  const emfPath = [
    `M${FIELD_CENTER.x + FIELD_RX},${FIELD_CENTER.y}`,
    `A${FIELD_RX},${loopRy} 0 1,${emfSweep} ${FIELD_CENTER.x - FIELD_RX},${FIELD_CENTER.y}`,
  ].join(' ')

  return (
    <section
      ref={timeline.ref}
      className="advanced-scene field-experiment"
      data-kind="field_experiment"
      data-semantic-id={rootSemanticId}
      aria-label="法拉第电磁感应线圈实验"
    >
      <div className="advanced-scene__stage">
        <svg ref={svgRef} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label="磁场变化与磁通量、感应电动势的同步时间图">
          <defs>
            <marker id={markerId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="var(--advanced-yellow)" />
            </marker>
          </defs>

          <g
            data-semantic-id={fieldSemanticId}
            style={{ '--field-strength': strength } as React.CSSProperties}
          >
            {Math.abs(field) > 1e-10 && fieldMarks.map((mark, index) => field > 0 ? (
              <g key={index}>
                <circle className="field-experiment__field-dot" cx={mark.x} cy={mark.y} r="3.1" />
                <circle
                  cx={mark.x}
                  cy={mark.y}
                  r="7"
                  fill="none"
                  stroke="var(--advanced-blue)"
                  strokeWidth="0.7"
                  opacity={strength}
                />
              </g>
            ) : (
              <g key={index} className="field-experiment__field-cross">
                <line x1={mark.x - 4} y1={mark.y - 4} x2={mark.x + 4} y2={mark.y + 4} />
                <line x1={mark.x + 4} y1={mark.y - 4} x2={mark.x - 4} y2={mark.y + 4} />
              </g>
            ))}
          </g>

          <ellipse
            className="field-experiment__loop"
            cx={FIELD_CENTER.x}
            cy={FIELD_CENTER.y}
            rx={FIELD_RX}
            ry={loopRy}
            data-semantic-id={fluxSemanticId}
          />
          {Math.abs(emf) > 1e-10 && (
            <path
              className="field-experiment__emf"
              d={emfPath}
              markerEnd={`url(#${markerId})`}
              data-semantic-id={directionSemanticId}
            />
          )}
          <line className="field-experiment__lead" x1="29" y1="103" x2="13" y2="103" />
          <line className="field-experiment__lead" x1="137" y1="103" x2="153" y2="103" />
          <text className="advanced-scene__label" x={FIELD_CENTER.x} y="215" textAnchor="middle">{fieldDirection}</text>
          <text className="advanced-scene__caption" x={FIELD_CENTER.x} y="229" textAnchor="middle">ε&gt;0 为逆时针</text>

          {bands.map((band, index) => (
            <g key={band.id} data-semantic-id={band.semantic}>
              <line className="advanced-scene__grid" x1={GRAPH.left} y1={bandCenter(index)} x2={GRAPH.right} y2={bandCenter(index)} />
              <text className="advanced-scene__label" x={GRAPH.left - 7} y={bandCenter(index) + 3} textAnchor="end">{band.label}</text>
              <path className={`field-experiment__curve ${band.className}`} d={seriesPath(band.id, index)} />
            </g>
          ))}
          <line className="advanced-scene__axis" x1={GRAPH.left} y1={GRAPH.top} x2={GRAPH.left} y2={GRAPH.bottom} />
          <line className="field-experiment__cursor" x1={graphX(progress)} y1={GRAPH.top} x2={graphX(progress)} y2={GRAPH.bottom} />
          <text className="advanced-scene__caption" x={GRAPH.left} y="229">0</text>
          <text className="advanced-scene__caption" x={GRAPH.right} y="229" textAnchor="end">t</text>
          <rect
            className="field-experiment__scrub"
            x={GRAPH.left}
            y={GRAPH.top}
            width={GRAPH.right - GRAPH.left}
            height={GRAPH.bottom - GRAPH.top}
            fill="transparent"
            data-drag-handle="true"
            onPointerDown={(event) => {
              draggingRef.current = true
              event.currentTarget.setPointerCapture(event.pointerId)
              timeline.setPlaying(false)
              scrubFromClientX(event.clientX)
            }}
            onPointerMove={(event) => {
              if (draggingRef.current) scrubFromClientX(event.clientX)
            }}
            onPointerUp={(event) => {
              draggingRef.current = false
              event.currentTarget.releasePointerCapture(event.pointerId)
            }}
            onPointerCancel={() => { draggingRef.current = false }}
          />
        </svg>
      </div>

      <div className="advanced-scene__readouts" aria-live="polite">
        <div className="advanced-scene__readout" data-semantic-id={fieldSemanticId}>
          <span>磁感应强度 B · {fieldDirection}</span>
          <b>{format(field)} T</b>
        </div>
        <div className="advanced-scene__readout" data-semantic-id={fluxSemanticId}>
          <span>单匝磁通量 Φ = BA cosθ</span>
          <b>{format(flux)} Wb</b>
        </div>
        <div className="advanced-scene__readout" data-semantic-id={emfSemanticId}>
          <span>感应电动势 ε = −N dΦ/dt（线性变化 {format(changeDurationSeconds, 2)} s）</span>
          <b>{format(emf)} V</b>
        </div>
        <div className="advanced-scene__readout" data-semantic-id={directionSemanticId}>
          <span>楞次定律方向</span>
          <b>{emfDirection} · θ={format(data.orientation_deg, 1)}°</b>
        </div>
      </div>

      <div className="advanced-scene__timeline">
        <KnowledgeTimelineControls timeline={timeline} label="B → Φ → ε" />
      </div>
    </section>
  )
}
