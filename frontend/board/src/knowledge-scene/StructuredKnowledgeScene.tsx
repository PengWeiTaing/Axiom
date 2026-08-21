import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import type { KnowledgeSceneManifest } from '../api/endpoints'
import { safeEval } from '../widgets/FunctionVizWidget'
import { ConstrainedExtremum2D, type ConstrainedExtremumData } from './ConstrainedExtremum2D'
import { ConstraintGeometry, type ConstraintGeometryData } from './ConstraintGeometry'
import {
  EquationMorph as SemanticEquationMorph,
} from './EquationMorph'
import { FieldExperiment, type FieldExperimentData } from './FieldExperiment'
import { LimitMicroscope, type LimitMicroscopeData } from './LimitMicroscope'
import { LinkedLab, type LinkedLabData } from './LinkedLab'
import { RiemannSum, type RiemannSumData } from './RiemannSum'
import {
  PredictionFrame,
  SceneRuntimeProvider,
  useSceneSemanticFocus,
} from './SceneRuntime'
import type {
  FormulaStep,
  SceneBlock,
  SceneDemonstration,
  SceneSection,
} from './schema'

type UnknownRecord = Record<string, unknown>

interface DerivationSourceBlock {
  key: string
  sectionId: string
  steps: FormulaStep[]
}

interface CompanionEquationMorphs {
  demoIds: Set<string>
  derivationBlockKeys: Set<string>
}

function derivationBlockKey(sectionId: string, blockIndex: number) {
  return `${sectionId}\u0000${blockIndex}`
}

function derivationConclusionLatex(steps: FormulaStep[]): string | null {
  const lastLatex = steps[steps.length - 1]?.latex.trim() ?? ''
  if (!lastLatex) return null
  if (!lastLatex.startsWith('=')) return lastLatex

  // Generated derivations often continue a displayed chain with a leading
  // equals sign.  In the reading column that step now stands alone, so restore
  // the quantity named by the first equation instead of showing an orphaned
  // relation such as "= -Aω sin(...)".
  const firstLatex = steps[0]?.latex ?? ''
  const equalsIndex = firstLatex.indexOf('=')
  if (equalsIndex <= 0) return null
  const leftHandSide = firstLatex.slice(0, equalsIndex).replace(/\s+/g, '')
  // Only a single named scalar (optionally used as a one-variable function)
  // proves what the omitted left side was.  Do not infer from vectors,
  // systems, logical statements, comma-separated quantities or arbitrary
  // expressions: those derivations remain complete in the reading column.
  const simpleNamedQuantity = /^(?:[A-Za-z]|\\(?:alpha|beta|gamma|delta|epsilon|varepsilon|zeta|eta|theta|vartheta|iota|kappa|lambda|mu|nu|xi|omicron|pi|varpi|rho|varrho|sigma|varsigma|tau|upsilon|phi|varphi|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega))'*(?:\([A-Za-z]\))?$/
  if (!simpleNamedQuantity.test(leftHandSide)) return null
  return `${leftHandSide}${lastLatex}`
}

function canonicalFormula(value: string) {
  return value.replace(/\s+/g, '')
}

function sameFormulaStep(left: FormulaStep, right: FormulaStep) {
  return canonicalFormula(left.latex) === canonicalFormula(right.latex)
    && (left.note ?? '').trim() === (right.note ?? '').trim()
}

function equationMorphSteps(demo: SceneDemonstration) {
  const rawSteps = (demo.data as UnknownRecord).steps
  if (!Array.isArray(rawSteps) || rawSteps.length === 0) return null

  const steps: FormulaStep[] = []
  for (const rawStep of rawSteps) {
    if (!rawStep || typeof rawStep !== 'object') return null
    const step = rawStep as UnknownRecord
    if (typeof step.latex !== 'string') return null
    if (step.note !== undefined && typeof step.note !== 'string') return null
    steps.push({
      latex: step.latex,
      note: typeof step.note === 'string' ? step.note : '',
    })
  }
  return steps
}

/**
 * A side animation is a prose companion only when its unexpanded source steps
 * are the unique concatenation of one or more complete derivation blocks.
 * Deliberate projections (for example, animating only the right hand side of a
 * derivative) remain independent demonstrations.
 */
function findCompanionEquationMorphs(
  sections: SceneSection[],
  demonstrations: SceneDemonstration[],
): CompanionEquationMorphs {
  const derivations: DerivationSourceBlock[] = sections.flatMap(section => (
    section.blocks.flatMap((block, blockIndex) => block.kind === 'derivation'
      ? [{
          key: derivationBlockKey(section.id, blockIndex),
          sectionId: section.id,
          steps: block.steps,
        }]
      : [])
  ))
  const companionDemoIds = new Set<string>()
  const companionDerivationBlockKeys = new Set<string>()
  const claims: Array<{ demoId: string; blockKeys: string[] }> = []

  demonstrations.forEach(demo => {
    if (demo.kind !== 'equation_morph') return
    const demoSteps = equationMorphSteps(demo)
    if (!demoSteps) return

    const candidates: string[][] = []
    for (let start = 0; start < derivations.length; start += 1) {
      if (derivations[start].sectionId !== demo.anchor_section_id) continue

      let demoOffset = 0
      const sourceBlockKeys: string[] = []
      for (let end = start; end < derivations.length; end += 1) {
        const sourceSteps = derivations[end].steps
        if (demoOffset + sourceSteps.length > demoSteps.length) break
        if (!sourceSteps.every((step, index) => (
          sameFormulaStep(step, demoSteps[demoOffset + index])
        ))) break

        demoOffset += sourceSteps.length
        sourceBlockKeys.push(derivations[end].key)
        if (demoOffset === demoSteps.length) {
          candidates.push(sourceBlockKeys)
          break
        }
      }
    }

    if (candidates.length === 1) claims.push({ demoId: demo.id, blockKeys: candidates[0] })
  })

  const claimCountByBlock = new Map<string, number>()
  claims.forEach(claim => claim.blockKeys.forEach(key => {
    claimCountByBlock.set(key, (claimCountByBlock.get(key) ?? 0) + 1)
  }))

  claims.forEach(claim => {
    // A block with two visual owners would recreate the same proof twice.  In
    // that ambiguous case none of the competing demos owns the prose fold.
    if (claim.blockKeys.some(key => claimCountByBlock.get(key) !== 1)) return
    const sourceBlocks = claim.blockKeys.map(key => derivations.find(block => block.key === key))
    if (sourceBlocks.some(block => !block || derivationConclusionLatex(block.steps) === null)) return
    companionDemoIds.add(claim.demoId)
    claim.blockKeys.forEach(key => companionDerivationBlockKeys.add(key))
  })

  return {
    demoIds: companionDemoIds,
    derivationBlockKeys: companionDerivationBlockKeys,
  }
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => (
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  ))
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

const NARROW_SCENE_WIDTH = 1000

function useNarrowSceneLayout() {
  const [sceneRoot, setSceneRoot] = useState<HTMLElement | null>(null)
  const [narrow, setNarrow] = useState(() => (
    typeof window !== 'undefined'
      ? window.innerWidth <= NARROW_SCENE_WIDTH
      : false
  ))

  useLayoutEffect(() => {
    if (!sceneRoot) return undefined
    const update = () => {
      const width = sceneRoot.getBoundingClientRect().width
      setNarrow(width > 0 && width <= NARROW_SCENE_WIDTH)
    }
    update()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update)
      return () => window.removeEventListener('resize', update)
    }

    const observer = new ResizeObserver(update)
    observer.observe(sceneRoot)
    return () => observer.disconnect()
  }, [sceneRoot])

  return { narrow, sceneRootRef: setSceneRoot }
}

function MathFormula({ latex, display = true }: { latex: string; display?: boolean }) {
  const elementRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!elementRef.current) return
    try {
      katex.render(latex, elementRef.current, {
        displayMode: display,
        throwOnError: true,
        strict: 'ignore',
        trust: false,
        output: 'html',
      })
    } catch {
      elementRef.current.textContent = latex
    }
  }, [latex, display])
  return <span ref={elementRef} className="scene-math" aria-label={latex} />
}

function DerivationBlock({
  title,
  steps,
  conclusionOnly = false,
}: {
  title: string
  steps: FormulaStep[]
  conclusionOnly?: boolean
}) {
  const conclusionLatex = conclusionOnly ? derivationConclusionLatex(steps) : null
  if (conclusionOnly && conclusionLatex !== null) {
    return (
      <div className="scene-derivation scene-derivation--conclusion" data-derivation-display="conclusion">
        <p className="scene-block-label">结论</p>
        <div className="scene-derivation__conclusion">
          <MathFormula latex={conclusionLatex} />
        </div>
      </div>
    )
  }

  return (
    <div className="scene-derivation" data-derivation-display="complete">
      {title ? <p className="scene-block-label">{title}</p> : null}
      <ol>
        {steps.map((step, index) => (
          <li key={`${step.latex}-${index}`}>
            <MathFormula latex={step.latex} />
            {step.note ? <span className="scene-derivation__note">{step.note}</span> : null}
          </li>
        ))}
      </ol>
    </div>
  )
}

function SceneBlockView({ block, conclusionOnly = false }: { block: SceneBlock; conclusionOnly?: boolean }) {
  switch (block.kind) {
    case 'paragraph':
      return <p className="scene-paragraph">{block.text}</p>
    case 'definition':
      return (
        <div className="scene-definition">
          <p><span>{block.term}</span>{block.text}</p>
          {block.latex ? <MathFormula latex={block.latex} /> : null}
        </div>
      )
    case 'formula':
      return (
        <figure className="scene-formula">
          <MathFormula latex={block.latex} />
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      )
    case 'derivation':
      return <DerivationBlock title={block.title} steps={block.steps} conclusionOnly={conclusionOnly} />
    case 'example':
      return (
        <div className="scene-example">
          <p className="scene-block-label">例</p>
          <p>{block.prompt}</p>
          {block.steps.length ? (
            <ol>
              {block.steps.map((step, index) => (
                <li key={`${step.text}-${index}`}>
                  <span>{step.text}</span>
                  {step.latex ? <MathFormula latex={step.latex} /> : null}
                </li>
              ))}
            </ol>
          ) : null}
          {block.result ? <p className="scene-example__result">{block.result}</p> : null}
        </div>
      )
    case 'list': {
      const List = block.style === 'ordered' ? 'ol' : 'ul'
      return <List className="scene-list">{block.items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</List>
    }
    case 'comparison':
      return (
        <div className="scene-table-wrap">
          <table>
            <thead><tr>{block.columns.map(column => <th key={column}>{column}</th>)}</tr></thead>
            <tbody>{block.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>
            ))}</tbody>
          </table>
        </div>
      )
  }
}

interface PlotSeries { expression: string; label: string }
interface PlotParameter { name: string; min: number; max: number; initial: number }
interface FunctionPlotData {
  domain: [number, number]
  range: [number, number]
  series: PlotSeries[]
  x_label: string
  y_label: string
  parameter?: PlotParameter
}

function FunctionPlot({ data }: { data: FunctionPlotData }) {
  const reducedMotion = useReducedMotion()
  const parameter = data.parameter
  const [parameterValue, setParameterValue] = useState(parameter?.initial ?? 0)
  const width = 312
  const height = 220
  const pad = 30
  const [xMin, xMax] = data.domain
  const [yMin, yMax] = data.range

  useEffect(() => {
    if (!parameter || reducedMotion) return
    let frame = 0
    let start = 0
    const tick = (time: number) => {
      if (!start) start = time
      const progress = Math.min(1, (time - start) / 7000)
      const eased = 0.5 - Math.cos(progress * Math.PI) / 2
      setParameterValue(parameter.min + (parameter.max - parameter.min) * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    const timer = window.setTimeout(() => { frame = requestAnimationFrame(tick) }, 650)
    return () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [parameter, reducedMotion])

  const paths = useMemo(() => data.series.map(series => {
    let path = ''
    let drawing = false
    for (let index = 0; index <= 180; index++) {
      const x = xMin + (index / 180) * (xMax - xMin)
      try {
        const y = safeEval(series.expression, {
          x,
          t: x,
          pi: Math.PI,
          e: Math.E,
          ...(parameter ? { [parameter.name]: parameterValue } : {}),
        })
        if (!Number.isFinite(y) || y < yMin - (yMax - yMin) || y > yMax + (yMax - yMin)) {
          drawing = false
          continue
        }
        const px = pad + ((x - xMin) / (xMax - xMin)) * (width - pad * 2)
        const py = height - pad - ((y - yMin) / (yMax - yMin)) * (height - pad * 2)
        path += `${drawing ? 'L' : 'M'}${px.toFixed(2)},${py.toFixed(2)} `
        drawing = true
      } catch {
        drawing = false
      }
    }
    return path
  }), [data.series, parameter, parameterValue, xMin, xMax, yMin, yMax])

  const xAxis = yMin <= 0 && yMax >= 0
    ? height - pad - ((0 - yMin) / (yMax - yMin)) * (height - pad * 2)
    : height - pad
  const yAxis = xMin <= 0 && xMax >= 0
    ? pad + ((0 - xMin) / (xMax - xMin)) * (width - pad * 2)
    : pad

  return (
    <div className="scene-function-plot">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="函数图像">
        <line className="scene-axis" x1={pad} y1={xAxis} x2={width - pad} y2={xAxis} />
        <line className="scene-axis" x1={yAxis} y1={pad} x2={yAxis} y2={height - pad} />
        <text x={width - pad} y={xAxis - 7} textAnchor="end">{data.x_label}</text>
        <text x={yAxis + 8} y={pad + 3}>{data.y_label}</text>
        {paths.map((path, index) => (
          <path key={data.series[index].label} className={`scene-curve scene-curve--${index + 1}`} d={path} pathLength={1} />
        ))}
      </svg>
      <div className="scene-plot-legend">
        {data.series.map((series, index) => <span key={series.label} className={`scene-plot-legend--${index + 1}`}>{series.label}</span>)}
      </div>
      {parameter ? (
        <label className="scene-plot-parameter">
          <span>{parameter.name} = {parameterValue.toFixed(2)}</span>
          <input
            type="range"
            min={parameter.min}
            max={parameter.max}
            step={(parameter.max - parameter.min) / 100}
            value={parameterValue}
            onChange={event => setParameterValue(Number(event.target.value))}
          />
        </label>
      ) : null}
    </div>
  )
}



interface PointSpec { id: string; x: number; y: number; label: string }
interface SegmentSpec { from: string; to: string; label: string }
interface GeometryData { points: PointSpec[]; segments: SegmentSpec[]; polygons: string[][] }

function GeometryDiagram({ data }: { data: GeometryData }) {
  const points = new Map(data.points.map(point => [point.id, point]))
  const toX = (value: number) => 28 + value * 256
  const toY = (value: number) => 20 + value * 176
  return (
    <svg className="scene-geometry" viewBox="0 0 312 216" role="img" aria-label="几何关系图">
      {data.polygons.map((polygon, index) => {
        const coordinates = polygon.map(id => points.get(id)).filter(Boolean).map(point => `${toX(point!.x)},${toY(point!.y)}`).join(' ')
        return <polygon key={index} points={coordinates} />
      })}
      {data.segments.map((segment, index) => {
        const from = points.get(segment.from)
        const to = points.get(segment.to)
        if (!from || !to) return null
        return (
          <g key={`${segment.from}-${segment.to}-${index}`}>
            <line x1={toX(from.x)} y1={toY(from.y)} x2={toX(to.x)} y2={toY(to.y)} pathLength={1} />
            {segment.label ? <text x={(toX(from.x) + toX(to.x)) / 2} y={(toY(from.y) + toY(to.y)) / 2 - 7}>{segment.label}</text> : null}
          </g>
        )
      })}
      {data.points.map(point => (
        <g key={point.id}>
          <circle cx={toX(point.x)} cy={toY(point.y)} r="3.5" />
          {point.label ? <text x={toX(point.x) + 7} y={toY(point.y) - 7}>{point.label}</text> : null}
        </g>
      ))}
    </svg>
  )
}

interface ForceVector { label: string; angle: number; magnitude: number }
function ForceDiagram({ data }: { data: { body_label: string; vectors: ForceVector[] } }) {
  const rawId = useId()
  const markerId = `scene-arrow-${rawId.replace(/:/g, '')}`
  const center = { x: 156, y: 108 }
  const maximumMagnitude = Math.max(...data.vectors.map(vector => vector.magnitude), 0)
  const maximumDisplayLength = 88
  return (
    <svg className="scene-force" viewBox="0 0 312 216" role="img" aria-label="受力图">
      <defs><marker id={markerId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" /></marker></defs>
      <rect x="126" y="82" width="60" height="52" rx="4" />
      <text className="scene-force__body-label" x="156" y="112" textAnchor="middle">{data.body_label}</text>
      {data.vectors.map((vector, index) => {
        const radians = vector.angle * Math.PI / 180
        const length = maximumMagnitude > 0
          ? maximumDisplayLength * vector.magnitude / maximumMagnitude
          : 0
        const x2 = center.x + Math.cos(radians) * length
        // SVG's y axis points down, while force angles follow the usual
        // mathematical convention: positive angles turn counter-clockwise.
        const y2 = center.y - Math.sin(radians) * length
        const labelX = length > 0 ? x2 + Math.cos(radians) * 8 : center.x + 8
        const labelY = length > 0 ? y2 - Math.sin(radians) * 8 : center.y - 8
        return (
          <g key={`${vector.label}-${index}`}>
            {length > 0 ? (
              <line className={`scene-vector scene-vector--${index % 3}`} x1={center.x} y1={center.y} x2={x2} y2={y2} markerEnd={`url(#${markerId})`} pathLength={1} />
            ) : (
              <circle className={`scene-vector-zero scene-vector-zero--${index % 3}`} cx={center.x} cy={center.y} r="2.5" />
            )}
            <text x={labelX} y={labelY} textAnchor="middle">{vector.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

interface MapNode { id: string; label: string }
interface MapEdge { from: string; to: string; label: string }
function ConceptMap({ data }: { data: { nodes: MapNode[]; edges: MapEdge[] } }) {
  const rawId = useId()
  const markerId = `scene-map-arrow-${rawId.replace(/:/g, '')}`
  const positions = new Map(data.nodes.map((node, index) => {
    const angle = -Math.PI / 2 + (index / data.nodes.length) * Math.PI * 2
    return [node.id, { x: 156 + Math.cos(angle) * 102, y: 106 + Math.sin(angle) * 72 }]
  }))
  return (
    <svg className="scene-concept-map" viewBox="0 0 312 216" role="img" aria-label="概念关系图">
      <defs><marker id={markerId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L8,4 L0,8 z" /></marker></defs>
      {data.edges.map((edge, index) => {
        const from = positions.get(edge.from)
        const to = positions.get(edge.to)
        if (!from || !to) return null
        const dx = to.x - from.x
        const dy = to.y - from.y
        const distance = Math.hypot(dx, dy)
        if (distance < 1) return null
        const unitX = dx / distance
        const unitY = dy / distance
        const nodeRadius = 25
        const x1 = from.x + unitX * (nodeRadius + 2)
        const y1 = from.y + unitY * (nodeRadius + 2)
        const x2 = to.x - unitX * (nodeRadius + 7)
        const y2 = to.y - unitY * (nodeRadius + 7)
        const labelOffset = (index % 2 === 0 ? 1 : -1) * 8
        const labelX = (x1 + x2) / 2 - unitY * labelOffset
        const labelY = (y1 + y2) / 2 + unitX * labelOffset
        const visibleLabel = edge.label.length > 12 ? `${edge.label.slice(0, 11)}…` : edge.label
        return (
          <React.Fragment key={`${edge.from}-${edge.to}-${index}`}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} markerEnd={`url(#${markerId})`} />
            {edge.label ? (
              <text
                className="scene-concept-map__edge-label"
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="central"
                aria-label={edge.label}
              >
                {visibleLabel}
              </text>
            ) : null}
          </React.Fragment>
        )
      })}
      {data.nodes.map(node => {
        const position = positions.get(node.id)!
        return (
          <g key={node.id} transform={`translate(${position.x} ${position.y})`}>
            <circle r="25" />
            <text textAnchor="middle" dominantBaseline="middle">{node.label.length > 7 ? `${node.label.slice(0, 7)}…` : node.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

function ProbabilityBars({ data }: { data: { bars: Array<{ label: string; value: number }> } }) {
  return (
    <div className="scene-bars">
      {data.bars.map((bar, index) => (
        <div key={`${bar.label}-${index}`}>
          <span>{bar.label}</span>
          <i style={{ '--bar-value': `${Math.min(1, Math.max(0, bar.value)) * 100}%`, '--bar-delay': `${index * 180}ms` } as React.CSSProperties} />
          <b>{(bar.value * 100).toFixed(bar.value < 0.1 ? 2 : 1)}%</b>
        </div>
      ))}
    </div>
  )
}

interface SequenceItem { label: string; detail: string }
function SequenceDiagram({ items, timeline }: { items: SequenceItem[]; timeline: boolean }) {
  return (
    <ol className={timeline ? 'scene-timeline' : 'scene-process'}>
      {items.map((item, index) => (
        <li key={`${item.label}-${index}`}>
          <i>{timeline ? index + 1 : '→'}</i>
          <div><strong>{item.label}</strong>{item.detail ? <span>{item.detail}</span> : null}</div>
        </li>
      ))}
    </ol>
  )
}

function DemoPrimitive({ demo }: { demo: SceneDemonstration }) {
  const data = demo.data as UnknownRecord
  switch (demo.kind) {
    case 'constrained_extremum_2d':
      return <ConstrainedExtremum2D data={data as unknown as ConstrainedExtremumData} />
    case 'constraint_geometry':
      return <ConstraintGeometry data={data as unknown as ConstraintGeometryData} semanticId={demo.id} semanticIds={demo.semantic_ids} />
    case 'equation_morph':
      return (
        <SemanticEquationMorph
          steps={(data.steps ?? []) as FormulaStep[]}
        />
      )
    case 'function_plot':
      return <FunctionPlot data={data as unknown as FunctionPlotData} />
    case 'field_experiment':
      return <FieldExperiment data={data as unknown as FieldExperimentData} semanticId={demo.id} semanticIds={demo.semantic_ids} />
    case 'geometry':
      return <GeometryDiagram data={data as unknown as GeometryData} />
    case 'limit_microscope':
      return <LimitMicroscope data={data as unknown as LimitMicroscopeData} semanticId={demo.id} semanticIds={demo.semantic_ids} />
    case 'linked_lab':
      return <LinkedLab data={data as unknown as LinkedLabData} semanticId={demo.id} />
    case 'force_diagram':
      return <ForceDiagram data={data as unknown as { body_label: string; vectors: ForceVector[] }} />
    case 'concept_map':
      return <ConceptMap data={data as unknown as { nodes: MapNode[]; edges: MapEdge[] }} />
    case 'probability_bars':
      return <ProbabilityBars data={data as unknown as { bars: Array<{ label: string; value: number }> }} />
    case 'riemann_sum':
      return <RiemannSum data={data as unknown as RiemannSumData} semanticId={demo.id} semanticIds={demo.semantic_ids} />
    case 'timeline':
      return <SequenceDiagram timeline items={(data.items ?? []) as SequenceItem[]} />
    case 'process':
      return <SequenceDiagram timeline={false} items={(data.steps ?? []) as SequenceItem[]} />
  }
}

function Demonstration({ demo, companion = false }: { demo: SceneDemonstration; companion?: boolean }) {
  const semantic = useSceneSemanticFocus(demo.semantic_ids, { delegateDescendants: true })
  const figureRef = useRef<HTMLElement>(null)
  const semanticKey = (demo.semantic_ids ?? []).join('\u0000')
  const allowedSemanticIds = useMemo(
    () => new Set(semanticKey ? semanticKey.split('\u0000') : []),
    [semanticKey],
  )

  useLayoutEffect(() => {
    const figure = figureRef.current
    if (!figure) return undefined
    const semanticElements = Array.from(figure.querySelectorAll('[data-semantic-id]'))
    const eligibleElements = semanticElements.filter(element => (
      allowedSemanticIds.has(element.getAttribute('data-semantic-id')?.trim() ?? '')
    ))
    const activeElements = eligibleElements.filter(element => (
      semantic.activeSemanticIds.has(element.getAttribute('data-semantic-id')?.trim() ?? '')
    ))
    const hasObjectMatch = activeElements.length > 0

    semanticElements.forEach(element => {
      const semanticId = element.getAttribute('data-semantic-id')?.trim() ?? ''
      const eligible = allowedSemanticIds.has(semanticId)
      const active = eligible && semantic.activeSemanticIds.has(semanticId)
      const containsActiveObject = !active && activeElements.some(activeElement => (
        element !== activeElement && element.contains(activeElement)
      ))
      if (active) element.setAttribute('data-semantic-active', 'true')
      else element.removeAttribute('data-semantic-active')
      if (hasObjectMatch && eligible && !active && !containsActiveObject) {
        element.setAttribute('data-semantic-muted', 'true')
      } else {
        element.removeAttribute('data-semantic-muted')
      }
    })
    if (hasObjectMatch) figure.dataset.semanticObjectActive = 'true'
    else delete figure.dataset.semanticObjectActive

    return () => {
      delete figure.dataset.semanticObjectActive
      semanticElements.forEach(element => {
        element.removeAttribute('data-semantic-active')
        element.removeAttribute('data-semantic-muted')
      })
    }
  }, [allowedSemanticIds, semantic.activeSemanticIds])

  const primitive = <DemoPrimitive demo={demo} />
  return (
    <figure
      ref={figureRef}
      className={`scene-demo scene-demo--${demo.kind}${semantic.highlighted ? ' is-semantic-highlighted' : ''}`}
      data-companion-derivation={companion ? 'true' : undefined}
      data-semantic-ids={demo.semantic_ids?.join(' ') || undefined}
      {...semantic.semanticProps}
    >
      <figcaption>{demo.title}</figcaption>
      {demo.prediction
        ? <PredictionFrame prediction={demo.prediction}>{primitive}</PredictionFrame>
        : primitive}
    </figure>
  )
}

function SemanticBlock({
  block,
  conclusionOnly,
}: {
  block: SceneBlock
  conclusionOnly: boolean
}) {
  const semantic = useSceneSemanticFocus(block.semantic_ids)
  return (
    <div
      className={`scene-semantic-block${semantic.highlighted ? ' is-semantic-highlighted' : ''}`}
      data-semantic-ids={block.semantic_ids?.join(' ') || undefined}
      {...semantic.semanticProps}
    >
      <SceneBlockView block={block} conclusionOnly={conclusionOnly} />
    </div>
  )
}

function SectionText({
  section,
  companionDerivationBlockKeys,
}: {
  section: SceneSection
  companionDerivationBlockKeys: Set<string>
}) {
  return (
    <section className="scene-text-section" id={`scene-${section.id}`}>
      <header><h2>{section.heading}</h2></header>
      <div className="scene-blocks">
        {section.blocks.map((block, blockIndex) => (
          <SemanticBlock
            key={`${section.id}-${block.kind}-${blockIndex}`}
            block={block}
            conclusionOnly={block.kind === 'derivation'
              && companionDerivationBlockKeys.has(derivationBlockKey(section.id, blockIndex))}
          />
        ))}
      </div>
    </section>
  )
}

export default function StructuredKnowledgeScene({
  scene,
  theme,
}: {
  scene: KnowledgeSceneManifest
  theme: 'dark' | 'light'
}) {
  const content = scene.content
  const { narrow: narrowLayout, sceneRootRef } = useNarrowSceneLayout()
  const companionEquationMorphs = useMemo(() => (
    content
      ? findCompanionEquationMorphs(content.sections, content.demonstrations)
      : { demoIds: new Set<string>(), derivationBlockKeys: new Set<string>() }
  ), [content])
  if (!content) return null

  return (
    <SceneRuntimeProvider key={scene.scene_id}>
    <article
      ref={sceneRootRef}
      className={`structured-scene structured-scene--${theme}`}
      data-layout={narrowLayout ? 'narrow' : 'wide'}
    >
      <header className="structured-scene__title">
        <p>{scene.subject} · {scene.topic}</p>
        <h1>{scene.title}</h1>
        <div>{scene.learning_goal}</div>
      </header>

      <div className="structured-scene__body">
        {content.sections.map(section => {
          const left = content.demonstrations.filter(demo => demo.anchor_section_id === section.id && demo.side === 'left')
          const right = content.demonstrations.filter(demo => demo.anchor_section_id === section.id && demo.side === 'right')
          const sectionDemos = [...left, ...right]
          return (
            <div className="scene-row" key={section.id}>
              {!narrowLayout ? <aside className="scene-rail scene-rail--left">{left.map(demo => <Demonstration key={demo.id} demo={demo} companion={companionEquationMorphs.demoIds.has(demo.id)} />)}</aside> : null}
              <SectionText
                section={section}
                companionDerivationBlockKeys={companionEquationMorphs.derivationBlockKeys}
              />
              {narrowLayout ? (
                <aside className="scene-inline-demos" aria-label={`${section.heading}的演示`}>
                  {sectionDemos.map(demo => <Demonstration key={demo.id} demo={demo} companion={companionEquationMorphs.demoIds.has(demo.id)} />)}
                </aside>
              ) : (
                <aside className="scene-rail scene-rail--right">{right.map(demo => <Demonstration key={demo.id} demo={demo} companion={companionEquationMorphs.demoIds.has(demo.id)} />)}</aside>
              )}
            </div>
          )
        })}
      </div>

      <section className="structured-scene__summary">
        <h2>收束</h2>
        <ul>{content.summary.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul>
      </section>
    </article>
    </SceneRuntimeProvider>
  )
}
