import React, { useEffect, useId, useRef, useState } from 'react'

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

export interface ConstrainedExtremumData {
  constraint: {
    kind: 'circle'
    center: [number, number]
    radius: number
    label: string
  }
  objective: {
    kind: 'linear'
    coefficients: [number, number]
    constant: number
    label: string
  }
  extremum: 'maximum' | 'minimum'
  start_angle_deg: number
  duration_ms: number
}

export function ConstrainedExtremum2D({ data }: { data: ConstrainedExtremumData }) {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const rawId = useId().replace(/:/g, '')
  const svgRef = useRef<SVGSVGElement>(null)
  const frameRef = useRef(0)
  const timerRef = useRef(0)
  const draggingRef = useRef(false)
  const [replay, setReplay] = useState(0)
  const [inView, setInView] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return undefined
    }
    const element = containerRef.current
    if (!element) return undefined
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some(entry => entry.isIntersecting)) return
      setInView(true)
      observer.disconnect()
    }, { threshold: 0.35 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [reducedMotion])

  const [a, b] = data.objective.coefficients
  const coefficientNorm = Math.hypot(a, b)
  const targetBase = Math.atan2(b, a) + (data.extremum === 'minimum' ? Math.PI : 0)
  const startAngle = data.start_angle_deg * Math.PI / 180
  const shortestDelta = Math.atan2(
    Math.sin(targetBase - startAngle),
    Math.cos(targetBase - startAngle),
  )
  const targetAngle = startAngle + shortestDelta
  const [theta, setTheta] = useState(reducedMotion ? targetAngle : startAngle)

  const stopAnimation = () => {
    window.clearTimeout(timerRef.current)
    cancelAnimationFrame(frameRef.current)
  }

  useEffect(() => {
    stopAnimation()
    if (!inView) return undefined
    if (reducedMotion) {
      setTheta(targetAngle)
      return undefined
    }
    setTheta(startAngle)
    let startedAt = 0
    const tick = (time: number) => {
      if (!startedAt) startedAt = time
      const progress = Math.min(1, (time - startedAt) / data.duration_ms)
      const eased = 0.5 - Math.cos(progress * Math.PI) / 2
      setTheta(startAngle + shortestDelta * eased)
      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
    }
    timerRef.current = window.setTimeout(() => {
      frameRef.current = requestAnimationFrame(tick)
    }, 520)
    return stopAnimation
  }, [data.duration_ms, inView, reducedMotion, replay, shortestDelta, startAngle, targetAngle])

  const width = 330
  const height = 280
  const cx = 165
  const cy = 128
  const displayRadius = 84
  const cos = Math.cos(theta)
  const sin = Math.sin(theta)
  const px = cx + displayRadius * cos
  const py = cy - displayRadius * sin
  const targetCos = Math.cos(targetAngle)
  const targetSin = Math.sin(targetAngle)
  const targetX = cx + displayRadius * targetCos
  const targetY = cy - displayRadius * targetSin
  const targetDistance = Math.hypot(targetX - px, targetY - py)
  const atTarget = targetDistance < 5
  const nearTarget = targetDistance < 30
  const normalX = a / coefficientNorm
  const normalY = -b / coefficientNorm
  const contourX = b / coefficientNorm
  const contourY = a / coefficientNorm
  const tangentX = -sin
  const tangentY = -cos
  const levelOffset = a * cos + b * sin
  const coefficientNormSquared = coefficientNorm * coefficientNorm
  const qUnitX = 2 * levelOffset * a / coefficientNormSquared - cos
  const qUnitY = 2 * levelOffset * b / coefficientNormSquared - sin
  const qx = cx + displayRadius * qUnitX
  const qy = cy - displayRadius * qUnitY
  const merged = Math.hypot(qx - px, qy - py) < 4
  const directional = -a * sin + b * cos
  const normalizedDirectional = Math.max(-1, Math.min(1, directional / coefficientNorm))
  const [centerX, centerY] = data.constraint.center
  const worldX = centerX + data.constraint.radius * cos
  const worldY = centerY + data.constraint.radius * sin
  const objectiveValue = a * worldX + b * worldY + data.objective.constant
  const line = (throughX: number, throughY: number, length: number) => ({
    x1: throughX - contourX * length,
    y1: throughY - contourY * length,
    x2: throughX + contourX * length,
    y2: throughY + contourY * length,
  })
  const activeContour = line(px, py, 178)
  const tangent = {
    x1: px - tangentX * 62,
    y1: py - tangentY * 62,
    x2: px + tangentX * 62,
    y2: py + tangentY * 62,
  }
  const markerF = `scene-constrained-f-${rawId}`
  const markerG = `scene-constrained-g-${rawId}`
  const markerT = `scene-constrained-t-${rawId}`
  const angleDegrees = ((theta * 180 / Math.PI + 540) % 360) - 180
  const vectorFLength = 58
  const vectorGLength = 42

  const labelPosition = (
    x: number,
    y: number,
    directionX: number,
    directionY: number,
    options: { inward?: boolean; width?: number } = {},
  ) => {
    const direction = options.inward ? -1 : 1
    const screenX = directionX * direction
    const screenY = -directionY * direction
    const labelWidth = options.width ?? 18
    return {
      x: Math.max(6, Math.min(width - labelWidth - 5, x + (screenX >= 0 ? 8 : -labelWidth - 5))),
      y: Math.max(14, Math.min(238, y + (screenY >= 0 ? 15 : -8))),
    }
  }

  const pointLabel = labelPosition(px, py, cos, sin, {
    inward: nearTarget && !atTarget,
    width: atTarget ? 34 : 18,
  })
  const targetLabel = labelPosition(targetX, targetY, targetCos, targetSin, { width: 22 })

  const angleFromPointer = (event: React.PointerEvent<SVGCircleElement>) => {
    const box = svgRef.current?.getBoundingClientRect()
    if (!box) return theta
    const x = (event.clientX - box.left) / box.width * width
    const y = (event.clientY - box.top) / box.height * height
    return Math.atan2(-(y - cy), x - cx)
  }

  const updateFromPointer = (event: React.PointerEvent<SVGCircleElement>) => {
    stopAnimation()
    setTheta(angleFromPointer(event))
  }

  const formatScalar = (value: number) => Number(value.toPrecision(4)).toString()
  const objectiveCaption = `线性目标 · ∇f=(${formatScalar(a)}, ${formatScalar(b)}), c=${formatScalar(data.objective.constant)}`
  const constraintCaption = `圆约束 · 圆心=(${formatScalar(centerX)}, ${formatScalar(centerY)}), r=${formatScalar(data.constraint.radius)}`

  return (
    <div ref={containerRef} className="scene-constrained-extremum">
      <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="圆约束上的线性目标极值联动演示">
        <defs>
          <marker id={markerF} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path className="scene-constrained-marker-f" d="M0 0L8 4L0 8Z" /></marker>
          <marker id={markerG} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path className="scene-constrained-marker-g" d="M0 0L8 4L0 8Z" /></marker>
          <marker id={markerT} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path className="scene-constrained-marker-t" d="M0 0L8 4L0 8Z" /></marker>
        </defs>
        <line className="scene-constrained-axis" x1="24" y1={cy} x2="306" y2={cy} />
        <line className="scene-constrained-axis" x1={cx} y1="20" x2={cx} y2="236" />
        {[-48, 0, 48].map(offset => {
          const backgroundLine = line(cx + normalX * offset, cy + normalY * offset, 180)
          return <line key={offset} className="scene-constrained-contour scene-constrained-contour--faint" {...backgroundLine} />
        })}
        <circle className="scene-constrained-circle" cx={cx} cy={cy} r={displayRadius} />
        <line className="scene-constrained-contour" {...activeContour} />
        <line className="scene-constrained-tangent" {...tangent} />
        <line className="scene-constrained-vector scene-constrained-vector--f" x1={px} y1={py} x2={px + normalX * vectorFLength} y2={py + normalY * vectorFLength} markerEnd={`url(#${markerF})`} />
        <line className="scene-constrained-vector scene-constrained-vector--g" x1={px} y1={py} x2={px + cos * vectorGLength} y2={py - sin * vectorGLength} markerEnd={`url(#${markerG})`} />
        <line className="scene-constrained-vector scene-constrained-vector--t" x1={px} y1={py} x2={px + tangentX * 38} y2={py + tangentY * 38} markerEnd={`url(#${markerT})`} />
        <circle className="scene-constrained-target" cx={targetX} cy={targetY} r="7" />
        <circle className="scene-constrained-q" cx={qx} cy={qy} r="4" style={{ opacity: merged ? 0 : 0.82 }} />
        <circle
          className="scene-constrained-point"
          cx={px}
          cy={py}
          r="5.5"
        />
        <circle
          className="scene-constrained-point-hit"
          cx={px}
          cy={py}
          r="18"
          tabIndex={0}
          aria-label="可拖动的约束点 P"
          onPointerDown={event => {
            draggingRef.current = true
            event.currentTarget.setPointerCapture(event.pointerId)
            updateFromPointer(event)
          }}
          onPointerMove={event => {
            if (draggingRef.current) updateFromPointer(event)
          }}
          onPointerUp={() => { draggingRef.current = false }}
          onPointerCancel={() => { draggingRef.current = false }}
          onLostPointerCapture={() => { draggingRef.current = false }}
        />
        <text className="scene-constrained-label scene-constrained-label--f" x="22" y="16">∇f</text>
        <text className="scene-constrained-label scene-constrained-label--g" x="54" y="16">∇g</text>
        <text className="scene-constrained-label scene-constrained-label--t" x="86" y="16">t</text>
        <text className="scene-constrained-label" x={pointLabel.x} y={pointLabel.y}>{atTarget ? 'P=P*' : 'P'}</text>
        <text className="scene-constrained-label scene-constrained-label--q" x={qx - 13} y={qy + 16} style={{ opacity: merged ? 0 : 0.82 }}>Q</text>
        {!atTarget && <text className="scene-constrained-label scene-constrained-label--target" x={targetLabel.x} y={targetLabel.y}>P*</text>}
        <text className="scene-constrained-caption" x="20" y="258">{objectiveCaption}</text>
        <text className="scene-constrained-caption" x="20" y="274">{constraintCaption}</text>
      </svg>

      <label className="scene-constrained-slider">
        <span>沿约束移动 P</span>
        <input
          type="range"
          min="-180"
          max="180"
          step="0.5"
          value={angleDegrees}
          onChange={event => {
            stopAnimation()
            setTheta(Number(event.target.value) * Math.PI / 180)
          }}
        />
      </label>
      <div className="scene-constrained-readout">
        <button type="button" onClick={() => setReplay(value => value + 1)}>重演接近极值</button>
        <span>P=({worldX.toFixed(2)}, {worldY.toFixed(2)})</span>
        <span>f(P)={objectiveValue.toFixed(2)}</span>
      </div>
      <div className="scene-constrained-meter" aria-label="目标函数沿切线的方向导数">
        <i /><b style={{ left: `${(normalizedDirectional + 1) * 50}%` }} />
        <span>∇f·t = {directional.toFixed(2)}</span>
      </div>
    </div>
  )
}
