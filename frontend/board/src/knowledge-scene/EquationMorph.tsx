import { useEffect, useMemo, useRef, useState } from 'react'
import katex from 'katex'

import type { FormulaPart, FormulaPartRelation, FormulaStep } from './schema'

const PART_ID_RE = /^[a-z][a-z0-9_-]{0,31}$/
const FORBIDDEN_PART_LATEX_RE = /\\(?:href|url|includegraphics|htmlClass|htmlStyle|htmlId|htmlData|class|style|require|def|gdef|newcommand)\b/i
const PART_RELATIONS = new Set<FormulaPartRelation>([
  'appear',
  'match',
  'copy',
  'rewrite',
  'derive',
  'substitute',
  'split',
  'merge',
])

const PROOF_TIMING = Object.freeze({
  mapped: 900,
  derived: 1100,
  split: 650,
  cancel: 850,
  tokenIn: 520,
  tokenDelay: 120,
  phaseGap: 200,
})

interface FormulaAnimationRun {
  finished: Promise<void>
  cancel: () => void
}

interface FormulaTokenIdentity {
  key: string
  group: number
}

interface RenderedFormulaToken extends FormulaTokenIdentity {
  element: HTMLElement
}

interface AnimationScope {
  animate: (
    element: Element,
    keyframes: Keyframe[] | PropertyIndexedKeyframes,
    options: number | KeyframeAnimationOptions,
  ) => Promise<void>
  wait: (duration: number) => Promise<void>
  addGhost: (ghost: HTMLElement) => void
  removeGhost: (ghost: HTMLElement) => void
  cancel: () => void
  isCancelled: () => boolean
}

const KATEX_TOKEN_ROLES = ['mord', 'mop', 'mrel', 'mbin', 'mopen', 'mclose', 'mpunct', 'minner'] as const
const KATEX_TOKEN_SELECTOR = KATEX_TOKEN_ROLES.map(role => `.${role}`).join(',')
const EXACT_TOKEN_MIN_COVERAGE = .12
const EXACT_TOKEN_MIN_MEANINGFUL_KEYS = 3

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

function MathFormula({ latex }: { latex: string }) {
  const elementRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!elementRef.current) return
    try {
      katex.render(latex, elementRef.current, {
        displayMode: true,
        throwOnError: true,
        strict: 'ignore',
        trust: false,
        output: 'html',
      })
    } catch {
      elementRef.current.textContent = latex
    }
  }, [latex])
  return <span ref={elementRef} className="scene-math" aria-label={latex} />
}

function splitEquationForSideRail(latex: string) {
  const parts: string[] = []
  let depth = 0
  let start = 0
  for (let index = 0; index < latex.length; index++) {
    const char = latex[index]
    if (char === '{') depth += 1
    if (char === '}') depth = Math.max(0, depth - 1)
    if (char === '=' && depth === 0) {
      parts.push(latex.slice(start, index).trim())
      start = index + 1
    }
  }
  parts.push(latex.slice(start).trim())
  if (parts.length < 3 || parts.some(part => !part)) return [latex]
  return [
    `${parts[0]} = ${parts[1]}`,
    ...parts.slice(2).map(part => `= ${part}`),
  ]
}

function SideRailFormula({ latex }: { latex: string }) {
  const lines = useMemo(() => splitEquationForSideRail(latex), [latex])
  return (
    <div className={`scene-equation-lines${lines.length > 1 ? ' is-multiline' : ''}`}>
      {lines.map((line, index) => <MathFormula key={`${index}-${line}`} latex={line} />)}
    </div>
  )
}

/** Split model-authored multi-equality slides into actual proof beats. */
function expandGenericFormulaSteps(steps: FormulaStep[]) {
  return steps.flatMap(step => {
    const lines = splitEquationForSideRail(step.latex)
    if (lines.length === 1) return [step]
    return lines.map((latex, index) => ({
      latex,
      // The explanation belongs to the completed transformation, not every
      // mechanically extracted intermediate line.
      note: index === lines.length - 1 ? step.note : '',
    }))
  })
}

function canonicalLatex(value: string) {
  return value.replace(/\s+/g, '')
}

function relationFor(part: FormulaPart): FormulaPartRelation {
  if (part.relation) return part.relation
  if (!part.from?.length) return 'appear'
  return part.from.length > 1 ? 'merge' : 'match'
}

function hasValidSemanticParts(steps: FormulaStep[]) {
  if (steps.length < 2 || !steps.every(step => Array.isArray(step.parts) && step.parts.length > 0)) return false

  let previousParts = new Map<string, FormulaPart>()
  for (let stepIndex = 0; stepIndex < steps.length; stepIndex += 1) {
    const step = steps[stepIndex]
    const parts = step.parts ?? []
    if (parts.length > 24) return false
    if (canonicalLatex(parts.map(part => part.latex).join('')) !== canonicalLatex(step.latex)) return false

    const currentParts = new Map<string, FormulaPart>()
    for (const part of parts) {
      if (!PART_ID_RE.test(part.id) || currentParts.has(part.id)) return false
      if (!part.latex || part.latex.length > 180 || FORBIDDEN_PART_LATEX_RE.test(part.latex)) return false
      if (part.phase !== undefined && (!Number.isInteger(part.phase) || part.phase < 0 || part.phase > 4)) return false
      if (part.relation !== undefined && !PART_RELATIONS.has(part.relation)) return false

      const sourceIds = part.from ?? []
      if (!Array.isArray(sourceIds) || sourceIds.length > 4 || sourceIds.some(id => !previousParts.has(id))) return false
      const relation = relationFor(part)
      if (stepIndex === 0 && sourceIds.length > 0) return false
      if (relation === 'appear' && sourceIds.length !== 0) return false
      if (['match', 'copy', 'rewrite', 'split'].includes(relation) && sourceIds.length !== 1) return false
      if (relation === 'merge' && sourceIds.length < 2) return false
      if (['derive', 'substitute'].includes(relation) && sourceIds.length < 1) return false

      if (relation === 'match' || relation === 'copy') {
        const source = previousParts.get(sourceIds[0])
        if (!source || canonicalLatex(source.latex) !== canonicalLatex(part.latex)) return false
      }
      currentParts.set(part.id, part)
    }
    previousParts = currentParts
  }
  return true
}

function splitSemanticPartsForSideRail(parts: FormulaPart[]) {
  const equalityIndexes = parts.flatMap((part, index) => canonicalLatex(part.latex) === '=' ? [index] : [])
  if (equalityIndexes.length < 2) return [parts]

  const lines: FormulaPart[][] = []
  let start = 0
  equalityIndexes.slice(1).forEach(index => {
    lines.push(parts.slice(start, index))
    start = index
  })
  lines.push(parts.slice(start))
  return lines.filter(line => line.length > 0)
}

function TokenizedMathLine({ parts }: { parts: FormulaPart[] }) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const markedLatex = useMemo(() => parts.map(part => (
    `\\htmlData{token-id=${part.id}}{${part.latex}}`
  )).join(''), [parts])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    try {
      katex.render(markedLatex, element, {
        displayMode: true,
        throwOnError: true,
        strict: 'ignore',
        output: 'html',
        // htmlData is generated locally from strictly validated ids. Model
        // authored LaTeX is still forbidden from containing any HTML command.
        trust: context => context.command === '\\htmlData',
      })
      const partsById = new Map(parts.map(part => [part.id, part]))
      element.querySelectorAll<HTMLElement>('[data-token-id]').forEach(token => {
        const part = partsById.get(token.dataset.tokenId ?? '')
        if (!part) return
        token.classList.add('scene-semantic-token')
        if (part.from?.length) token.dataset.from = part.from.join(' ')
        token.dataset.relation = relationFor(part)
        token.dataset.phase = String(part.phase ?? 0)
        if (part.cancel_out) token.dataset.cancelOut = 'true'
        if (part.final) token.dataset.finalAnswer = 'true'
      })
    } catch {
      element.textContent = parts.map(part => part.latex).join('')
    }
  }, [markedLatex, parts])

  return <span ref={elementRef} className="scene-math scene-tokenized-math" />
}

function SemanticSideRailFormula({ step }: { step: FormulaStep }) {
  const lines = useMemo(() => splitSemanticPartsForSideRail(step.parts ?? []), [step.parts])
  return (
    <div
      className={`scene-equation-lines scene-tokenized-lines${lines.length > 1 ? ' is-multiline' : ''}`}
      role="img"
      aria-label={step.latex}
    >
      {lines.map((line, index) => (
        <TokenizedMathLine key={`${index}-${line.map(part => part.id).join('-')}`} parts={line} />
      ))}
    </div>
  )
}

function collectRenderedFormulaTokens(layer: HTMLElement): RenderedFormulaToken[] {
  const tokens: RenderedFormulaToken[] = []
  layer.querySelectorAll<HTMLElement>('.katex-html > .base').forEach((base, group) => {
    base.querySelectorAll<HTMLElement>(KATEX_TOKEN_SELECTOR).forEach(child => {
      // KaTeX wraps fractions, superscripts and accents in outer `mord`
      // containers. Treating those containers as a single atom makes almost
      // every generated proof look like a slide replacement. Prefer the
      // deepest visible math atoms so d/dt, omega and its exponent can keep
      // their own identity between two rows.
      if (child.querySelector(KATEX_TOKEN_SELECTOR)) return
      const role = KATEX_TOKEN_ROLES.find(name => child.classList.contains(name))
      const text = child.textContent?.replace(/\s+/g, '') ?? ''
      if (!role || !text) return
      tokens.push({ element: child, key: `${role}:${text}`, group })
    })
  })
  return tokens
}

function equationLead(latex: string) {
  let depth = 0
  for (let index = 0; index < latex.length; index += 1) {
    if (latex[index] === '{') depth += 1
    else if (latex[index] === '}') depth = Math.max(0, depth - 1)
    else if (latex[index] === '=' && depth === 0) return canonicalLatex(latex.slice(0, index))
  }
  return canonicalLatex(latex)
}

function formulaThreadLead(steps: FormulaStep[], index: number) {
  for (let cursor = index; cursor >= 0; cursor -= 1) {
    const lead = equationLead(steps[cursor].latex)
    if (lead) return lead
  }
  return ''
}

/** Only a changed explicit lhs starts a new concept; `= ...` keeps the current thread. */
function isGenericConceptBoundary(steps: FormulaStep[], sourceIndex: number, targetIndex: number) {
  const sourceThread = formulaThreadLead(steps, sourceIndex)
  const targetLead = equationLead(steps[targetIndex].latex)
  return Boolean(sourceThread && targetLead && sourceThread !== targetLead)
}

function tokenContext(tokens: FormulaTokenIdentity[], index: number) {
  const token = tokens[index]
  const previous = index > 0 && tokens[index - 1].group === token.group
    ? tokens[index - 1].key
    : '^'
  const next = index + 1 < tokens.length && tokens[index + 1].group === token.group
    ? tokens[index + 1].key
    : '$'
  return `${previous}\u0000${next}`
}

/**
 * Match exact KaTeX atoms without guessing the identity of repeated symbols.
 * A repeated key moves only when every occurrence has the same unique adjacent
 * context on both sides. Otherwise the whole key group falls back to fades.
 */
function matchFormulaTokenIndexes(
  source: FormulaTokenIdentity[],
  target: FormulaTokenIdentity[],
) {
  const indexesByKey = (tokens: FormulaTokenIdentity[]) => {
    const indexes = new Map<string, number[]>()
    tokens.forEach((token, index) => {
      const matches = indexes.get(token.key) ?? []
      matches.push(index)
      indexes.set(token.key, matches)
    })
    return indexes
  }

  const sourceByKey = indexesByKey(source)
  const targetByKey = indexesByKey(target)
  const matches: Array<{ sourceIndex: number; targetIndex: number }> = []

  targetByKey.forEach((targetIndexes, key) => {
    const sourceIndexes = sourceByKey.get(key) ?? []
    if (sourceIndexes.length === 1 && targetIndexes.length === 1) {
      matches.push({ sourceIndex: sourceIndexes[0], targetIndex: targetIndexes[0] })
      return
    }
    if (sourceIndexes.length !== targetIndexes.length || sourceIndexes.length < 2) return

    const sourceByContext = new Map<string, number>()
    for (const sourceIndex of sourceIndexes) {
      const context = tokenContext(source, sourceIndex)
      if (sourceByContext.has(context)) return
      sourceByContext.set(context, sourceIndex)
    }

    const candidateMatches: Array<{ sourceIndex: number; targetIndex: number }> = []
    const usedContexts = new Set<string>()
    for (const targetIndex of targetIndexes) {
      const context = tokenContext(target, targetIndex)
      const sourceIndex = sourceByContext.get(context)
      if (sourceIndex === undefined || usedContexts.has(context)) return
      usedContexts.add(context)
      candidateMatches.push({ sourceIndex, targetIndex })
    }
    if (candidateMatches.length === sourceIndexes.length) matches.push(...candidateMatches)
  })

  return matches.sort((left, right) => left.targetIndex - right.targetIndex)
}

function matchRenderedFormulaTokens(source: RenderedFormulaToken[], target: RenderedFormulaToken[]) {
  const pairs = matchFormulaTokenIndexes(source, target).map(match => ({
    source: source[match.sourceIndex],
    target: target[match.targetIndex],
  }))
  const pairedSources = new Set(pairs.map(pair => pair.source))
  const pairedTargets = new Set(pairs.map(pair => pair.target))
  const unmatchedSourceOperators = source.filter(token => !pairedSources.has(token) && /^mop:(?:sin|cos)$/.test(token.key))
  const unmatchedTargetOperators = target.filter(token => !pairedTargets.has(token) && /^mop:(?:sin|cos)$/.test(token.key))

  // sin <-> cos is the one rewrite we can infer from rendered atoms without
  // knowing the subject or guessing which repeated variable produced it.
  if (unmatchedSourceOperators.length === 1 && unmatchedTargetOperators.length === 1) {
    pairs.push({ source: unmatchedSourceOperators[0], target: unmatchedTargetOperators[0] })
  }
  return pairs
}

function isMeaningfulFormulaToken(token: FormulaTokenIdentity) {
  const separator = token.key.indexOf(':')
  const role = separator < 0 ? token.key : token.key.slice(0, separator)
  const text = separator < 0 ? '' : token.key.slice(separator + 1)
  if (role === 'mopen' || role === 'mclose' || role === 'mpunct') return false
  return role !== 'mrel' || text !== '='
}

/** Keep sparse scaffold matches from turning an otherwise new formula into a hybrid. */
function hasSubstantialFormulaMatch(
  sourceCount: number,
  targetCount: number,
  pairs: Array<{ target: FormulaTokenIdentity }>,
) {
  if (!sourceCount || !targetCount || !pairs.length) return false
  const coverage = Math.min(pairs.length / sourceCount, pairs.length / targetCount)
  const meaningfulKeys = new Set(
    pairs.filter(pair => isMeaningfulFormulaToken(pair.target)).map(pair => pair.target.key),
  )
  return coverage >= EXACT_TOKEN_MIN_COVERAGE
    && meaningfulKeys.size >= EXACT_TOKEN_MIN_MEANINGFUL_KEYS
}

function animateMatchedFormula(
  stage: HTMLElement,
  sourceLayer: HTMLElement,
  targetLayer: HTMLElement,
  forceWholeFormula = false,
): FormulaAnimationRun {
  const animations: Animation[] = []
  const ghosts: HTMLElement[] = []
  const sourceTokens = collectRenderedFormulaTokens(sourceLayer)
  const targetTokens = collectRenderedFormulaTokens(targetLayer)
  const candidatePairs = matchRenderedFormulaTokens(sourceTokens, targetTokens)
  const pairs = !forceWholeFormula && hasSubstantialFormulaMatch(sourceTokens.length, targetTokens.length, candidatePairs)
    ? candidatePairs
    : []
  const pairedTargets = new Set(pairs.map(pair => pair.target.element))
  const stageRect = stage.getBoundingClientRect()

  stage.dataset.matchMode = pairs.length ? 'atoms' : 'whole'
  stage.dataset.matchCount = String(pairs.length)
  stage.dataset.sourceTokenCount = String(sourceTokens.length)
  stage.dataset.targetTokenCount = String(targetTokens.length)
  const hasOperatorRewrite = pairs.some(pair => pair.source.key !== pair.target.key)
  stage.dataset.matchReason = forceWholeFormula
    ? 'concept-boundary'
    : pairs.length
      ? hasOperatorRewrite ? 'exact-plus-rewrite' : 'exact-context'
      : 'low-confidence'

  targetLayer.style.opacity = '1'

  if (!pairs.length) {
    animations.push(targetLayer.animate([
      { opacity: 0, transform: 'translateY(7px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 1050, delay: 180, easing: 'cubic-bezier(.22,.72,.24,1)', fill: 'forwards' }))
  } else {
    targetTokens.forEach(token => { token.element.style.opacity = '0' })
    pairs.forEach((pair, index) => {
      const sourceRect = pair.source.element.getBoundingClientRect()
      const targetRect = pair.target.element.getBoundingClientRect()
      const ghost = pair.source.element.cloneNode(true) as HTMLElement
      const computed = window.getComputedStyle(pair.source.element)
      ghost.classList.add('scene-equation-ghost')
      Object.assign(ghost.style, {
        left: `${sourceRect.left - stageRect.left}px`,
        top: `${sourceRect.top - stageRect.top}px`,
        width: `${sourceRect.width}px`,
        height: `${sourceRect.height}px`,
        color: computed.color,
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        lineHeight: computed.lineHeight,
      })
      stage.appendChild(ghost)
      ghosts.push(ghost)

      const dx = targetRect.left - sourceRect.left
      const dy = targetRect.top - sourceRect.top
      const centered = index - (pairs.length - 1) / 2
      const curveX = Math.max(-14, Math.min(14, centered * 2.5))
      const curveY = -8 - Math.min(8, Math.abs(centered))
      const delay = Math.min(index * 22, 150)
      animations.push(ghost.animate([
        { transform: 'translate3d(0,0,0) scale(1)', opacity: .96 },
        { transform: `translate3d(${dx * .52 + curveX}px,${dy * .52 + curveY}px,0) scale(1.035)`, opacity: 1, offset: .52 },
        { transform: `translate3d(${dx}px,${dy}px,0) scale(.96)`, opacity: 0 },
      ], {
        duration: 1120,
        delay,
        easing: 'cubic-bezier(.22,.72,.24,1)',
        fill: 'forwards',
      }))
      animations.push(pair.target.element.animate([
        { opacity: 0, transform: 'scale(.94)' },
        { opacity: 0, transform: 'scale(.96)', offset: .58 },
        { opacity: 1, transform: 'scale(1)' },
      ], {
        duration: 1120,
        delay,
        easing: 'cubic-bezier(.22,.72,.24,1)',
        fill: 'forwards',
      }))
    })

    targetTokens.filter(token => !pairedTargets.has(token.element)).forEach((token, index) => {
      animations.push(token.element.animate([
        { opacity: 0, transform: 'translateY(6px) scale(.86)' },
        { opacity: 1, transform: 'translateY(0) scale(1)' },
      ], {
        duration: 720,
        delay: 430 + Math.min(index * 24, 220),
        easing: 'cubic-bezier(.22,.72,.24,1)',
        fill: 'forwards',
      }))
    })
  }

  let cleaned = false
  const cleanup = (cancelled: boolean) => {
    if (cleaned) return
    cleaned = true
    ghosts.forEach(ghost => ghost.remove())
    sourceTokens.forEach(token => {
      token.element.style.visibility = ''
      token.element.style.opacity = ''
      token.element.style.transform = ''
    })
    targetTokens.forEach(token => {
      token.element.style.opacity = '1'
      token.element.style.transform = ''
    })
    sourceLayer.style.opacity = '1'
    sourceLayer.style.transform = ''
    targetLayer.style.opacity = cancelled ? '' : '1'
    targetLayer.style.transform = ''
  }
  const finished = Promise.all(animations.map(animation => animation.finished.catch(() => undefined)))
    .then(() => { cleanup(false) })

  return {
    finished,
    cancel: () => {
      animations.forEach(animation => animation.cancel())
      cleanup(true)
    },
  }
}

function createAnimationScope(): AnimationScope {
  const animations = new Set<Animation>()
  const ghosts = new Set<HTMLElement>()
  const timers = new Map<number, () => void>()
  let cancelled = false

  return {
    animate: (element, keyframes, options) => {
      if (cancelled) return Promise.resolve()
      const animation = element.animate(keyframes, options)
      animations.add(animation)
      return animation.finished.catch(() => undefined).then(() => {
        animations.delete(animation)
      })
    },
    wait: duration => {
      if (cancelled || duration <= 0) return Promise.resolve()
      return new Promise(resolve => {
        const timer = window.setTimeout(() => {
          timers.delete(timer)
          resolve()
        }, duration)
        timers.set(timer, resolve)
      })
    },
    addGhost: ghost => { ghosts.add(ghost) },
    removeGhost: ghost => {
      ghosts.delete(ghost)
      ghost.remove()
    },
    cancel: () => {
      if (cancelled) return
      cancelled = true
      animations.forEach(animation => animation.cancel())
      animations.clear()
      timers.forEach((resolve, timer) => {
        window.clearTimeout(timer)
        resolve()
      })
      timers.clear()
      ghosts.forEach(ghost => ghost.remove())
      ghosts.clear()
    },
    isCancelled: () => cancelled,
  }
}

function semanticToken(layer: HTMLElement, id: string) {
  return layer.querySelector<HTMLElement>(`[data-token-id="${id}"]`)
}

function makeMatchGhost(stage: HTMLElement, sourceToken: HTMLElement) {
  const stageRect = stage.getBoundingClientRect()
  const from = sourceToken.getBoundingClientRect()
  const ghost = sourceToken.cloneNode(true) as HTMLElement
  const computed = window.getComputedStyle(sourceToken)
  ghost.removeAttribute('data-token-id')
  ghost.removeAttribute('data-from')
  ghost.classList.add('scene-equation-ghost')
  Object.assign(ghost.style, {
    left: `${from.left - stageRect.left}px`,
    top: `${from.top - stageRect.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
    color: computed.color,
    fontFamily: computed.fontFamily,
    fontSize: computed.fontSize,
    lineHeight: computed.lineHeight,
    visibility: 'visible',
  })
  stage.appendChild(ghost)
  return { ghost, from }
}

function relationCurve(relation: FormulaPartRelation, index: number, total: number) {
  const centered = index - (total - 1) / 2
  if (relation === 'copy' || relation === 'split') return { x: centered * 18, y: -16 - Math.abs(centered) * 4 }
  if (relation === 'merge') return { x: centered * 14, y: 10 + Math.abs(centered) * 3 }
  if (relation === 'derive' || relation === 'substitute') return { x: centered * 10, y: -12 }
  if (relation === 'rewrite') return { x: centered * 8, y: -7 }
  return { x: centered * 6, y: 0 }
}

function animateMappedPart(
  scope: AnimationScope,
  stage: HTMLElement,
  sourceToken: HTMLElement,
  targetToken: HTMLElement,
  relation: FormulaPartRelation,
  index: number,
  total: number,
  revealTarget: boolean,
  hiddenSources: Set<HTMLElement>,
) {
  if (scope.isCancelled()) return Promise.resolve()
  const { ghost, from } = makeMatchGhost(stage, sourceToken)
  scope.addGhost(ghost)
  const keepSource = relation === 'copy'
  if (!keepSource) {
    sourceToken.style.visibility = 'hidden'
    hiddenSources.add(sourceToken)
  }
  const to = targetToken.getBoundingClientRect()
  const dx = to.left - from.left
  const dy = to.top - from.top
  const curve = relationCurve(relation, index, total)
  const morph = ['rewrite', 'derive', 'substitute', 'merge'].includes(relation)
  const duration = relation === 'derive' || relation === 'substitute'
    ? PROOF_TIMING.derived
    : PROOF_TIMING.mapped

  const ghostFinished = scope.animate(ghost, [
    { transform: 'translate3d(0,0,0) scale(1)', opacity: keepSource ? .12 : .96 },
    { transform: `translate3d(${dx * .12}px,${dy * .12}px,0) scale(1)`, opacity: .96, offset: .12 },
    { transform: `translate3d(${dx * .52 + curve.x}px,${dy * .52 + curve.y}px,0) scale(${morph ? 1.04 : 1})`, opacity: 1, offset: .52 },
    { transform: `translate3d(${dx}px,${dy}px,0) scale(${morph ? .9 : 1})`, opacity: 0 },
  ], {
    duration,
    easing: 'cubic-bezier(.22,.72,.24,1)',
    fill: 'forwards',
  })
  const targetFinished = revealTarget
    ? scope.animate(targetToken, [
        { opacity: 0, transform: 'scale(.9)' },
        { opacity: 0, transform: 'scale(.94)', offset: .55 },
        { opacity: 1, transform: 'scale(1)' },
      ], {
        duration,
        easing: 'cubic-bezier(.22,.72,.24,1)',
        fill: 'forwards',
      })
    : Promise.resolve()

  return Promise.all([ghostFinished, targetFinished]).then(() => {
    scope.removeGhost(ghost)
    if (scope.isCancelled()) return
    targetToken.style.opacity = '1'
    targetToken.style.transform = ''
  })
}

function animateSplitPart(
  scope: AnimationScope,
  sourceToken: HTMLElement,
  targetToken: HTMLElement,
  order: number,
  pulseSource: boolean,
) {
  const delay = Math.min(order * 46, 320)
  const targetFinished = scope.animate(targetToken, [
    { opacity: 0, transform: 'translateY(4px) scale(.94)' },
    { opacity: 1, transform: 'translateY(0) scale(1)' },
  ], {
    duration: PROOF_TIMING.split,
    delay,
    easing: 'cubic-bezier(.22,.72,.24,1)',
    fill: 'forwards',
  })
  const sourceFinished = pulseSource
    ? scope.animate(sourceToken, [
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(1.06)', opacity: 1, offset: .5 },
        { transform: 'scale(1)', opacity: .72 },
      ], { duration: PROOF_TIMING.split, easing: 'ease-in-out' })
    : Promise.resolve()
  return Promise.all([targetFinished, sourceFinished]).then(() => {
    if (scope.isCancelled()) return
    targetToken.style.opacity = '1'
    targetToken.style.transform = ''
  })
}

function animateCancellation(scope: AnimationScope, sourceToken: HTMLElement) {
  sourceToken.classList.add('scene-equation-cancel-ghost')
  return scope.animate(sourceToken, [
    { opacity: .62, transform: 'scale(1)', offset: 0 },
    { opacity: 1, transform: 'scale(1.04)', offset: .25 },
    { opacity: 1, transform: 'scale(1)', offset: .68 },
    { opacity: .34, transform: 'scale(.9)' },
  ], { duration: PROOF_TIMING.cancel, easing: 'ease-out', fill: 'forwards' }).then(() => {
    sourceToken.classList.remove('scene-equation-cancel-ghost')
  })
}

function animateAppearingPart(scope: AnimationScope, targetToken: HTMLElement) {
  return scope.animate(targetToken, [
    { opacity: 0, transform: 'translateY(5px) scale(.84)' },
    { opacity: 1, transform: 'translateY(0) scale(1)' },
  ], {
    duration: PROOF_TIMING.tokenIn,
    delay: PROOF_TIMING.tokenDelay,
    easing: 'cubic-bezier(.22,.72,.24,1)',
    fill: 'forwards',
  }).then(() => {
    if (scope.isCancelled()) return
    targetToken.style.opacity = '1'
    targetToken.style.transform = ''
  })
}

function animateDisappearingPart(scope: AnimationScope, sourceToken: HTMLElement, order: number) {
  return scope.animate(sourceToken, [
    { opacity: 1, transform: 'translateY(0) scale(1)' },
    { opacity: 0, transform: 'translateY(-5px) scale(.92)' },
  ], {
    duration: 620,
    delay: Math.min(order * 18, 160),
    easing: 'ease-in',
    fill: 'forwards',
  })
}

function animateSemanticFormula(
  stage: HTMLElement,
  sourceLayer: HTMLElement,
  targetLayer: HTMLElement,
  sourceStep: FormulaStep,
  targetStep: FormulaStep,
): FormulaAnimationRun {
  const sourceParts = sourceStep.parts ?? []
  const targetParts = targetStep.parts ?? []
  const sourceTokens = new Map(sourceParts.map(part => [part.id, semanticToken(sourceLayer, part.id)]))
  const targetTokens = new Map(targetParts.map(part => [part.id, semanticToken(targetLayer, part.id)]))
  if ([...sourceTokens.values(), ...targetTokens.values()].some(token => !token)) {
    return animateMatchedFormula(stage, sourceLayer, targetLayer)
  }

  const scope = createAnimationScope()
  const hiddenSources = new Set<HTMLElement>()
  const allSourceTokens = [...sourceTokens.values()] as HTMLElement[]
  const allTargetTokens = [...targetTokens.values()] as HTMLElement[]
  let cleaned = false

  const cleanup = (cancelled: boolean) => {
    if (cleaned) return
    cleaned = true
    allSourceTokens.forEach(token => {
      token.style.visibility = ''
      token.style.opacity = ''
      token.style.transform = ''
      token.classList.remove('scene-equation-cancel-ghost')
    })
    allTargetTokens.forEach(token => {
      token.style.opacity = '1'
      token.style.transform = ''
    })
    hiddenSources.clear()
    sourceLayer.style.opacity = '1'
    sourceLayer.style.transform = ''
    targetLayer.style.opacity = cancelled ? '' : '1'
    targetLayer.style.transform = ''
  }

  const finished = (async () => {
    targetLayer.style.opacity = '1'
    allTargetTokens.forEach(token => { token.style.opacity = '0' })

    const phaseJobs = new Map<number, Array<() => Promise<unknown>>>()
    const referencedSourceIds = new Set<string>()
    const splitSources = new Set<string>()
    const addPhaseJob = (phase: number, job: () => Promise<unknown>) => {
      if (!phaseJobs.has(phase)) phaseJobs.set(phase, [])
      phaseJobs.get(phase)!.push(job)
    }

    targetParts.forEach((part, targetOrder) => {
      const targetToken = targetTokens.get(part.id) as HTMLElement
      const sourceIds = part.from ?? []
      const relation = relationFor(part)
      const phase = part.phase ?? 0
      sourceIds.forEach(id => referencedSourceIds.add(id))

      if (relation === 'appear' || sourceIds.length === 0) {
        addPhaseJob(phase, () => animateAppearingPart(scope, targetToken))
        return
      }

      if (relation === 'split') {
        const sourceId = sourceIds[0]
        const sourceToken = sourceTokens.get(sourceId) as HTMLElement
        const pulseSource = !splitSources.has(sourceId)
        splitSources.add(sourceId)
        addPhaseJob(phase, () => animateSplitPart(scope, sourceToken, targetToken, targetOrder, pulseSource))
        return
      }

      sourceIds.forEach((sourceId, sourceIndex) => {
        const sourceToken = sourceTokens.get(sourceId) as HTMLElement
        addPhaseJob(phase, () => animateMappedPart(
          scope,
          stage,
          sourceToken,
          targetToken,
          relation,
          sourceIndex,
          sourceIds.length,
          sourceIndex === 0,
          hiddenSources,
        ))
      })
    })

    sourceParts.forEach((part, order) => {
      const sourceToken = sourceTokens.get(part.id) as HTMLElement
      if (part.cancel_out) {
        addPhaseJob(targetStep.cancel_phase ?? 0, () => animateCancellation(scope, sourceToken))
      } else if (!referencedSourceIds.has(part.id)) {
        addPhaseJob(0, () => animateDisappearingPart(scope, sourceToken, order))
      }
    })

    const phases = [...phaseJobs.keys()].sort((left, right) => left - right)
    for (let index = 0; index < phases.length; index += 1) {
      if (scope.isCancelled()) break
      await Promise.all(phaseJobs.get(phases[index])!.map(job => job()))
      if (index < phases.length - 1) await scope.wait(PROOF_TIMING.phaseGap)
    }

    const finalAnswer = targetParts.find(part => part.final)
    const finalToken = finalAnswer ? targetTokens.get(finalAnswer.id) : null
    if (finalToken && !scope.isCancelled()) {
      await scope.animate(finalToken, [
        { transform: 'scale(1)' },
        { transform: 'scale(1.12)', offset: .5 },
        { transform: 'scale(1)' },
      ], { duration: 900, easing: 'ease-in-out' })
    }
  })().finally(() => {
    cleanup(scope.isCancelled())
  })

  return {
    finished,
    cancel: () => {
      scope.cancel()
      cleanup(true)
    },
  }
}

interface FormulaDeltaBeat {
  source: FormulaStep
  target: FormulaStep
  semantic: boolean
}

const SEMANTIC_DELTA_RELATIONS = new Set<FormulaPartRelation>([
  'rewrite',
  'derive',
  'substitute',
  'split',
  'merge',
])

const LATEX_MULTI_ARGUMENT_COMMANDS = new Map([
  ['\\frac', 2],
  ['\\dfrac', 2],
  ['\\tfrac', 2],
  ['\\binom', 2],
])

const GENERIC_DELTA_MAX_LATEX = 72

function hasDeltaContent(latex: string) {
  const value = canonicalLatex(latex)
  return Boolean(value && !/^(?:=|\\cdot|[()[\]{},;])+$/.test(value))
}

function isShortDeltaFragment(latex: string, originalLatex: string) {
  const value = canonicalLatex(latex)
  return hasDeltaContent(value)
    && value.length <= GENERIC_DELTA_MAX_LATEX
    && value !== canonicalLatex(originalLatex)
}

function deltaIdentity(latex: string) {
  return canonicalLatex(latex)
    .replace(/\\(?:left|right)/g, '')
    .replace(/[()[\]]/g, '')
}

function isLowInformationSemanticDelta(
  sourceLatex: string,
  targetLatex: string,
  relation: FormulaPartRelation,
) {
  const source = canonicalLatex(sourceLatex)
  const target = canonicalLatex(targetLatex)
  if (relation !== 'derive') return false
  if (/^[+-]$/.test(target)) return true
  // Changing only the name of a function is a thread boundary, not a visual
  // derivation. The prose already introduces that new quantity.
  return /^[A-Za-z]+\([^)]*\)$/.test(source) && /^[A-Za-z]+\([^)]*\)$/.test(target)
}

function buildSemanticDeltaBeats(steps: FormulaStep[]) {
  const beats: FormulaDeltaBeat[] = []
  const seen = new Set<string>()

  for (let stepIndex = 1; stepIndex < steps.length; stepIndex += 1) {
    const sourceStep = steps[stepIndex - 1]
    const targetStep = steps[stepIndex]
    const sourceParts = sourceStep.parts ?? []
    const sourceById = new Map(sourceParts.map(part => [part.id, part]))

    for (const targetPart of targetStep.parts ?? []) {
      const relation = relationFor(targetPart)
      const sourceIds = targetPart.from ?? []
      if (!SEMANTIC_DELTA_RELATIONS.has(relation) || !sourceIds.length) continue

      const selectedSources = sourceParts.filter(part => sourceIds.includes(part.id))
      if (selectedSources.length !== new Set(sourceIds).size || selectedSources.length > 4) continue

      const sourceLatex = selectedSources.map(part => part.latex).join('')
      const targetLatex = targetPart.latex
      // An exact split is layout bookkeeping rather than a mathematical
      // change. Showing it would merely echo a fragment already in the prose.
      if (canonicalLatex(sourceLatex) === canonicalLatex(targetLatex)) continue
      if (!isShortDeltaFragment(sourceLatex, sourceStep.latex)
        || !isShortDeltaFragment(targetLatex, targetStep.latex)) continue
      if (isLowInformationSemanticDelta(sourceLatex, targetLatex, relation)) continue
      const identity = `${deltaIdentity(sourceLatex)}\u0000${deltaIdentity(targetLatex)}`
      if (seen.has(identity)) continue

      const deltaSourceParts = selectedSources.map(part => ({
        id: part.id,
        latex: part.latex,
        relation: 'appear' as const,
        phase: 0,
      }))
      const deltaTargetPart: FormulaPart = {
        ...targetPart,
        from: [...sourceIds],
        phase: 0,
      }
      const source: FormulaStep = { latex: sourceLatex, note: '', parts: deltaSourceParts }
      const target: FormulaStep = { latex: targetLatex, note: '', parts: [deltaTargetPart] }
      if (!hasValidSemanticParts([source, target])) continue
      seen.add(identity)
      beats.push({ source, target, semantic: true })
    }
  }

  return beats
}

function readBalancedLatex(value: string, start: number, open: string, close: string) {
  if (value[start] !== open) return null
  let depth = 0
  for (let index = start; index < value.length; index += 1) {
    if (value[index] === open) depth += 1
    if (value[index] === close) depth -= 1
    if (depth === 0) return { raw: value.slice(start, index + 1), end: index + 1 }
  }
  return null
}

function skipLatexWhitespace(value: string, start: number) {
  let index = start
  while (index < value.length && /\s/.test(value[index])) index += 1
  return index
}

/**
 * A deliberately small TeX lexer for conservative diffs. Fractions and
 * roots stay atomic so a selected fragment never contains half of a command
 * or an unbalanced group.
 */
function tokenizeLatexForDelta(value: string) {
  const atoms: string[] = []
  let index = 0

  while (index < value.length) {
    if (/\s/.test(value[index])) {
      index += 1
      continue
    }

    if (value[index] === '\\') {
      const commandMatch = value.slice(index).match(/^\\(?:[A-Za-z]+|.)/)
      if (!commandMatch) return []
      let raw = commandMatch[0]
      index += raw.length
      const argumentCount = LATEX_MULTI_ARGUMENT_COMMANDS.get(raw) ?? 0
      for (let argument = 0; argument < argumentCount; argument += 1) {
        index = skipLatexWhitespace(value, index)
        const group = readBalancedLatex(value, index, '{', '}')
        if (!group) return []
        raw += group.raw
        index = group.end
      }
      if (raw === '\\sqrt') {
        index = skipLatexWhitespace(value, index)
        if (value[index] === '[') {
          const degree = readBalancedLatex(value, index, '[', ']')
          if (!degree) return []
          raw += degree.raw
          index = degree.end
        }
        index = skipLatexWhitespace(value, index)
        const radicand = readBalancedLatex(value, index, '{', '}')
        if (!radicand) return []
        raw += radicand.raw
        index = radicand.end
      }
      atoms.push(raw)
      continue
    }

    if (value[index] === '^' || value[index] === '_') {
      if (!atoms.length) return []
      let raw = value[index]
      index = skipLatexWhitespace(value, index + 1)
      if (value[index] === '{') {
        const group = readBalancedLatex(value, index, '{', '}')
        if (!group) return []
        raw += group.raw
        index = group.end
      } else if (value[index] === '\\') {
        const commandMatch = value.slice(index).match(/^\\(?:[A-Za-z]+|.)/)
        if (!commandMatch) return []
        raw += commandMatch[0]
        index += commandMatch[0].length
      } else if (index < value.length) {
        raw += value[index]
        index += 1
      } else return []
      atoms[atoms.length - 1] += raw
      continue
    }

    if (value[index] === '{') {
      const group = readBalancedLatex(value, index, '{', '}')
      if (!group) return []
      atoms.push(group.raw)
      index = group.end
      continue
    }

    const numberMatch = value.slice(index).match(/^\d+(?:\.\d+)?/)
    if (numberMatch) {
      atoms.push(numberMatch[0])
      index += numberMatch[0].length
      continue
    }

    atoms.push(value[index])
    index += 1
  }

  return atoms
}

interface TrigCall {
  name: 'sin' | 'cos'
  argument: string
}

function extractTrigCalls(latex: string) {
  const calls: TrigCall[] = []
  const command = /\\(sin|cos)\b/g
  let match: RegExpExecArray | null
  while ((match = command.exec(latex)) !== null) {
    let cursor = skipLatexWhitespace(latex, match.index + match[0].length)
    if (latex.slice(cursor, cursor + 5) === '\\left') {
      cursor = skipLatexWhitespace(latex, cursor + 5)
    }
    if (latex[cursor] !== '(') continue
    const group = readBalancedLatex(latex, cursor, '(', ')')
    if (!group) continue
    const argument = group.raw.slice(1, -1)
    if (!argument || canonicalLatex(argument).length > 40) continue
    calls.push({ name: match[1] as TrigCall['name'], argument })
    command.lastIndex = group.end
  }
  return calls
}

function trigRewriteDelta(sourceStep: FormulaStep, targetStep: FormulaStep) {
  const sourceCalls = extractTrigCalls(sourceStep.latex)
  const targetCalls = extractTrigCalls(targetStep.latex)
  if (sourceCalls.length !== 1 || targetCalls.length !== 1) return null
  const source = sourceCalls[0]
  const target = targetCalls[0]
  if (source.name === target.name
    || canonicalLatex(source.argument) !== canonicalLatex(target.argument)) return null

  const sourceLatex = `\\${source.name}(${source.argument})`
  // These are the only two local derivative identities inferred without a
  // semantic map. A phase rewrite or any other trig change is not guessed.
  const targetLatex = source.name === 'cos' && target.name === 'sin'
    ? `-\\sin(${target.argument})`
    : source.name === 'sin' && target.name === 'cos'
      ? `\\cos(${target.argument})`
      : ''
  if (!targetLatex) return null
  return { sourceLatex, targetLatex }
}

function extractTimeDerivativeArguments(latex: string) {
  const derivatives: string[] = []
  const operator = /\\(?:d?frac)\s*\{\s*d\s*\}\s*\{\s*dt\s*\}/g
  let match: RegExpExecArray | null
  while ((match = operator.exec(latex)) !== null) {
    let cursor = skipLatexWhitespace(latex, match.index + match[0].length)
    if (latex.slice(cursor, cursor + 5) === '\\left') {
      cursor = skipLatexWhitespace(latex, cursor + 5)
    }
    const open = latex[cursor]
    if (open !== '(' && open !== '[') continue
    const group = readBalancedLatex(latex, cursor, open, open === '(' ? ')' : ']')
    if (!group) continue
    derivatives.push(group.raw.slice(1, -1))
    operator.lastIndex = group.end
  }
  return derivatives
}

function linearTimeCoefficient(argument: string) {
  const atoms = tokenizeLatexForDelta(argument).filter(atom => !['\\,', '\\!', '\\left', '\\right'].includes(atom))
  if (atoms.length < 2 || !/^(?:\\[A-Za-z]+|[A-Za-z])$/.test(atoms[0])) return null
  const timeIndex = atoms[1] === 't' ? 1 : atoms[1] === '\\cdot' && atoms[2] === 't' ? 2 : -1
  if (timeIndex < 0 || atoms.slice(timeIndex + 1).some(atom => atom === 't')) return null
  return atoms[0]
}

function innerDerivativeDelta(sourceStep: FormulaStep, targetStep: FormulaStep) {
  if (extractTimeDerivativeArguments(targetStep.latex).length) return null
  const derivativeArguments = extractTimeDerivativeArguments(sourceStep.latex)
  const candidates = derivativeArguments.map(argument => ({ argument, coefficient: linearTimeCoefficient(argument) }))
    .filter((candidate): candidate is { argument: string; coefficient: string } => Boolean(candidate.coefficient))
  if (candidates.length !== 1) return null
  const candidate = candidates[0]
  const targetAtoms = tokenizeLatexForDelta(targetStep.latex)
  if (!targetAtoms.some(atom => atom === candidate.coefficient || atom.startsWith(`${candidate.coefficient}^`))) return null
  return {
    sourceLatex: `\\frac{d}{dt}(${candidate.argument})`,
    targetLatex: candidate.coefficient,
  }
}

function squaredFactorDelta(sourceStep: FormulaStep, targetStep: FormulaStep) {
  const sourceAtoms = tokenizeLatexForDelta(sourceStep.latex)
  const targetAtoms = tokenizeLatexForDelta(targetStep.latex)
  if (!sourceAtoms.length || !targetAtoms.length) return null
  const squares = [...new Set(targetAtoms.flatMap(atom => {
    const match = atom.match(/^((?:\\[A-Za-z]+|[A-Za-z]))\^(?:\{2\}|2)$/)
    return match ? [match[1]] : []
  }))]
  if (squares.length !== 1) return null
  const base = squares[0]
  if (sourceAtoms.some(atom => atom.startsWith(`${base}^`))) return null
  const sourcePlain = sourceAtoms.filter(atom => atom === base).length
  const targetPlain = targetAtoms.filter(atom => atom === base).length
  const targetSquares = targetAtoms.filter(atom => atom === `${base}^2` || atom === `${base}^{2}`).length
  if (targetSquares !== 1 || sourcePlain !== targetPlain + 2) return null
  return { sourceLatex: `${base}\\cdot ${base}`, targetLatex: `${base}^2` }
}

function toGenericDeltaBeat(
  sourceStep: FormulaStep,
  targetStep: FormulaStep,
  relation: { sourceLatex: string; targetLatex: string } | null,
) {
  if (!relation
    || !isShortDeltaFragment(relation.sourceLatex, sourceStep.latex)
    || !isShortDeltaFragment(relation.targetLatex, targetStep.latex)) return null
  return {
    source: { latex: relation.sourceLatex, note: '' },
    target: { latex: relation.targetLatex, note: '' },
    semantic: false,
  } satisfies FormulaDeltaBeat
}

function buildGenericDeltaBeats(steps: FormulaStep[]) {
  const expanded = expandGenericFormulaSteps(steps)
  const beats: FormulaDeltaBeat[] = []
  const seen = new Set<string>()
  for (let index = 1; index < expanded.length; index += 1) {
    if (isGenericConceptBoundary(expanded, index - 1, index)) continue
    const sourceStep = expanded[index - 1]
    const targetStep = expanded[index]
    const candidates = [
      trigRewriteDelta(sourceStep, targetStep),
      innerDerivativeDelta(sourceStep, targetStep),
      squaredFactorDelta(sourceStep, targetStep),
    ]
    for (const candidate of candidates) {
      const beat = toGenericDeltaBeat(sourceStep, targetStep, candidate)
      if (!beat) continue
      const identity = `${deltaIdentity(beat.source.latex)}\u0000${deltaIdentity(beat.target.latex)}`
      if (seen.has(identity)) continue
      seen.add(identity)
      beats.push(beat)
    }
  }
  return beats
}

function DeltaFormula({ step, semantic }: { step: FormulaStep; semantic: boolean }) {
  return semantic ? <SemanticSideRailFormula step={step} /> : <SideRailFormula latex={step.latex} />
}

/** Lets the parent omit the entire figure when conservative extraction finds
 * no trustworthy visual relation; returning null inside the figure would
 * otherwise leave an empty caption shell. */
export function hasRenderableEquationDelta(steps: FormulaStep[]) {
  return (hasValidSemanticParts(steps)
    ? buildSemanticDeltaBeats(steps)
    : buildGenericDeltaBeats(steps)).length > 0
}

function EquationDelta({ steps }: { steps: FormulaStep[] }) {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const sourceRef = useRef<HTMLDivElement | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)
  const timerRef = useRef<number | null>(null)
  const animationRef = useRef<FormulaAnimationRun | null>(null)
  const semantic = useMemo(() => hasValidSemanticParts(steps), [steps])
  const beats = useMemo(
    () => semantic ? buildSemanticDeltaBeats(steps) : buildGenericDeltaBeats(steps),
    [semantic, steps],
  )
  const [active, setActive] = useState(0)
  const [phase, setPhase] = useState<'before' | 'animating' | 'after'>('before')
  const [runId, setRunId] = useState(0)
  const [hasEntered, setHasEntered] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion) {
      setHasEntered(true)
      return
    }
    const node = containerRef.current
    if (!node) return
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .35)) {
        setHasEntered(true)
        observer.disconnect()
      }
    }, { threshold: [.35] })
    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion])

  useEffect(() => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    timerRef.current = null
    animationRef.current?.cancel()
    animationRef.current = null
    if (reducedMotion || !hasEntered || !beats.length) return

    const beat = beats[active]
    setPhase('before')
    timerRef.current = window.setTimeout(() => {
      const stage = stageRef.current
      const sourceLayer = sourceRef.current
      const targetLayer = targetRef.current
      if (!stage || !sourceLayer || !targetLayer) return
      setPhase('animating')
      const run = beat.semantic
        ? animateSemanticFormula(stage, sourceLayer, targetLayer, beat.source, beat.target)
        : animateMatchedFormula(stage, sourceLayer, targetLayer)
      animationRef.current = run
      void run.finished.then(() => {
        animationRef.current = null
        setPhase('after')
        if (active >= beats.length - 1) return
        timerRef.current = window.setTimeout(() => setActive(value => value + 1), 1450)
      })
    }, 720)

    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
      timerRef.current = null
      animationRef.current?.cancel()
      animationRef.current = null
    }
  }, [active, beats, hasEntered, reducedMotion, runId])

  if (!beats.length) return null
  const beat = reducedMotion ? beats[beats.length - 1] : beats[active]

  return (
    <div
      ref={containerRef}
      className="scene-equation-morph scene-equation-morph--delta"
      data-delta-phase={reducedMotion ? 'after' : phase}
      data-active-delta={reducedMotion ? beats.length - 1 : active}
      data-delta-count={beats.length}
    >
      {!reducedMotion ? (
        <button
          className="scene-equation-replay"
          type="button"
          onClick={() => {
            if (timerRef.current !== null) window.clearTimeout(timerRef.current)
            timerRef.current = null
            animationRef.current?.cancel()
            animationRef.current = null
            setPhase('before')
            setActive(0)
            setRunId(value => value + 1)
          }}
        >
          重看变化
        </button>
      ) : null}
      <div
        ref={stageRef}
        className="scene-equation-delta-stage"
        key={`${runId}-${active}-${beat.source.latex}-${beat.target.latex}`}
        role="img"
        aria-label={`${beat.source.latex} 变为 ${beat.target.latex}`}
        data-delta-source={beat.source.latex}
        data-delta-target={beat.target.latex}
      >
        <div ref={sourceRef} className="scene-equation-delta__formula scene-equation-delta__source">
          <DeltaFormula step={beat.source} semantic={beat.semantic} />
        </div>
        <span className="scene-equation-delta__arrow" aria-hidden="true">→</span>
        <div ref={targetRef} className="scene-equation-delta__formula scene-equation-delta__target">
          <DeltaFormula step={beat.target} semantic={beat.semantic} />
        </div>
      </div>
    </div>
  )
}

function EquationTrail({ steps }: { steps: FormulaStep[] }) {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const timersRef = useRef<number[]>([])
  const animationRef = useRef<FormulaAnimationRun | null>(null)
  const [active, setActive] = useState(0)
  const [targetIndex, setTargetIndex] = useState<number | null>(null)
  const [runId, setRunId] = useState(0)
  const [hasEntered, setHasEntered] = useState(reducedMotion)
  const semantic = useMemo(() => hasValidSemanticParts(steps), [steps])
  const animationSteps = useMemo(
    () => semantic ? steps : expandGenericFormulaSteps(steps),
    [semantic, steps],
  )

  useEffect(() => {
    if (reducedMotion) {
      setHasEntered(true)
      return
    }
    const node = containerRef.current
    if (!node) return
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .35)) {
        setHasEntered(true)
        observer.disconnect()
      }
    }, { threshold: [.35] })
    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion])

  useEffect(() => {
    timersRef.current.forEach(timer => window.clearTimeout(timer))
    timersRef.current = []
    if (reducedMotion || !hasEntered || animationSteps.length < 2 || targetIndex !== null || active >= animationSteps.length - 1) return
    const hold = active === 0 ? 1000 : 1100
    timersRef.current = [window.setTimeout(() => setTargetIndex(active + 1), hold)]
    return () => {
      timersRef.current.forEach(timer => window.clearTimeout(timer))
      timersRef.current = []
    }
  }, [active, targetIndex, animationSteps, reducedMotion, runId, hasEntered])

  useEffect(() => {
    if (targetIndex === null || reducedMotion) return
    let disposed = false
    let frame = 0

    const start = async () => {
      if (document.fonts?.ready) await document.fonts.ready.catch(() => undefined)
      if (disposed) return
      frame = window.requestAnimationFrame(() => {
        frame = window.requestAnimationFrame(() => {
          const stage = stageRef.current
          const sourceLayer = stage?.querySelector<HTMLElement>(`[data-equation-index="${active}"] [data-equation-formula]`)
          const targetLayer = stage?.querySelector<HTMLElement>(`[data-equation-index="${targetIndex}"] [data-equation-formula]`)
          if (!stage || !sourceLayer || !targetLayer) {
            if (!disposed) {
              setActive(targetIndex)
              setTargetIndex(null)
            }
            return
          }

          const sourceStep = animationSteps[active]
          const nextStep = animationSteps[targetIndex]
          const run = semantic
            ? animateSemanticFormula(stage, sourceLayer, targetLayer, sourceStep, nextStep)
            : animateMatchedFormula(
                stage,
                sourceLayer,
                targetLayer,
                isGenericConceptBoundary(animationSteps, active, targetIndex),
              )
          animationRef.current = run
          void run.finished.then(() => {
            if (disposed) return
            animationRef.current = null
            setActive(targetIndex)
            setTargetIndex(null)
          })
        })
      })
    }
    void start()

    return () => {
      disposed = true
      window.cancelAnimationFrame(frame)
      animationRef.current?.cancel()
      animationRef.current = null
    }
  }, [active, targetIndex, reducedMotion, runId, semantic, animationSteps])

  if (reducedMotion) {
    return (
      <div className="scene-equation-static">
        {animationSteps.map((step, index) => (
          <div key={index}>
            <SideRailFormula latex={step.latex} />
            {step.note ? <p>{step.note}</p> : null}
          </div>
        ))}
      </div>
    )
  }

  const step = animationSteps[active] ?? animationSteps[0]
  if (!step) return null
  const visibleIndex = targetIndex ?? active
  return (
    <div
      ref={containerRef}
      className={`scene-equation-morph${semantic ? ' is-semantic' : ''}`}
      aria-live="polite"
      data-active-step={active}
      data-visible-step={visibleIndex}
      data-animation-layout="trail"
    >
      <button
        className="scene-equation-replay"
        type="button"
        onClick={() => {
          timersRef.current.forEach(timer => window.clearTimeout(timer))
          timersRef.current = []
          animationRef.current?.cancel()
          animationRef.current = null
          setTargetIndex(null)
          setActive(0)
          setRunId(value => value + 1)
        }}
      >
        重演推导
      </button>
      <div ref={stageRef} className="scene-equation-stage">
        {animationSteps.map((formulaStep, index) => {
          const state = index < visibleIndex ? 'resolved' : index === visibleIndex ? 'active' : 'pending'
          return (
            <div
              className={`scene-equation-row is-${state}${targetIndex === index ? ' is-entering' : ''}`}
              data-equation-index={index}
              data-equation-state={state}
              key={`${runId}-${index}-${formulaStep.latex}`}
            >
              <div className="scene-equation-formula" data-equation-formula>
                {semantic
                  ? <SemanticSideRailFormula step={formulaStep} />
                  : <SideRailFormula latex={formulaStep.latex} />}
              </div>
              {formulaStep.note ? <p>{formulaStep.note}</p> : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function EquationMorph({
  steps,
  mode = 'trail',
}: {
  steps: FormulaStep[]
  mode?: 'trail' | 'delta'
}) {
  return mode === 'delta' ? <EquationDelta steps={steps} /> : <EquationTrail steps={steps} />
}
