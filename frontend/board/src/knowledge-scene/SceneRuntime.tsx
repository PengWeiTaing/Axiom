import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ScenePrediction } from './schema'

type ParameterUpdater = number | ((previous: number) => number)
type SetSceneParameter = (next: ParameterUpdater) => void

export interface SceneParameterOptions {
  id?: string
  initial: number
  min?: number
  max?: number
  step?: number
}

export interface SceneParameterController {
  value: number
  setValue: SetSceneParameter
  min?: number
  max?: number
  step?: number
}

interface SceneRuntimeValue {
  parameters: ReadonlyMap<string, number>
  initializeParameter: (id: string, initial: number) => void
  updateParameter: (
    id: string,
    initial: number,
    updater: ParameterUpdater,
    bounds?: Pick<SceneParameterOptions, 'min' | 'max' | 'step'>,
  ) => void
  parameterDrivers: ReadonlyMap<string, string>
  claimParameterDriver: (parameterId: string, ownerId: string, preempt: boolean) => boolean
  releaseParameterDriver: (parameterId: string, ownerId: string) => void
  stopParameterDriver: (parameterId: string) => void
  activeSemanticIds: ReadonlySet<string>
  setSemanticSource: (sourceId: string, semanticIds: readonly string[]) => void
  clearSemanticSource: (sourceId: string) => void
}

const SceneRuntimeContext = createContext<SceneRuntimeValue | null>(null)

function normalizeParameter(
  value: number,
  { min, max, step }: Pick<SceneParameterOptions, 'min' | 'max' | 'step'> = {},
) {
  let next = Number.isFinite(value) ? value : 0
  if (typeof min === 'number') next = Math.max(min, next)
  if (typeof max === 'number') next = Math.min(max, next)
  if (typeof step === 'number' && step > 0) {
    const origin = typeof min === 'number' ? min : 0
    next = origin + Math.round((next - origin) / step) * step
    if (typeof min === 'number') next = Math.max(min, next)
    if (typeof max === 'number') next = Math.min(max, next)
  }
  return next
}

export function SceneRuntimeProvider({ children }: { children: React.ReactNode }) {
  const [parameters, setParameters] = useState<Map<string, number>>(() => new Map())
  const parameterDriversRef = useRef<Map<string, string>>(new Map())
  const [parameterDrivers, setParameterDrivers] = useState<Map<string, string>>(() => parameterDriversRef.current)
  const [semanticSources, setSemanticSources] = useState<Map<string, readonly string[]>>(() => new Map())

  const initializeParameter = useCallback((id: string, initial: number) => {
    setParameters(previous => {
      if (previous.has(id)) return previous
      const next = new Map(previous)
      next.set(id, initial)
      return next
    })
  }, [])

  const updateParameter = useCallback((
    id: string,
    initial: number,
    updater: ParameterUpdater,
    bounds?: Pick<SceneParameterOptions, 'min' | 'max' | 'step'>,
  ) => {
    setParameters(previous => {
      const current = previous.get(id) ?? initial
      const requested = typeof updater === 'function' ? updater(current) : updater
      const value = normalizeParameter(requested, bounds)
      if (previous.has(id) && Object.is(value, current)) return previous
      const next = new Map(previous)
      next.set(id, value)
      return next
    })
  }, [])

  const publishParameterDrivers = useCallback((next: Map<string, string>) => {
    parameterDriversRef.current = next
    setParameterDrivers(next)
  }, [])

  const claimParameterDriver = useCallback((parameterId: string, ownerId: string, preempt: boolean) => {
    const currentOwner = parameterDriversRef.current.get(parameterId)
    if (currentOwner === ownerId) return true
    if (currentOwner && !preempt) return false
    const next = new Map(parameterDriversRef.current)
    next.set(parameterId, ownerId)
    publishParameterDrivers(next)
    return true
  }, [publishParameterDrivers])

  const releaseParameterDriver = useCallback((parameterId: string, ownerId: string) => {
    if (parameterDriversRef.current.get(parameterId) !== ownerId) return
    const next = new Map(parameterDriversRef.current)
    next.delete(parameterId)
    publishParameterDrivers(next)
  }, [publishParameterDrivers])

  const stopParameterDriver = useCallback((parameterId: string) => {
    if (!parameterDriversRef.current.has(parameterId)) return
    const next = new Map(parameterDriversRef.current)
    next.delete(parameterId)
    publishParameterDrivers(next)
  }, [publishParameterDrivers])

  const setSemanticSource = useCallback((sourceId: string, semanticIds: readonly string[]) => {
    setSemanticSources(previous => {
      const current = previous.get(sourceId)
      if (current?.length === semanticIds.length && current.every((id, index) => id === semanticIds[index])) {
        return previous
      }
      const next = new Map(previous)
      next.set(sourceId, semanticIds)
      return next
    })
  }, [])

  const clearSemanticSource = useCallback((sourceId: string) => {
    setSemanticSources(previous => {
      if (!previous.has(sourceId)) return previous
      const next = new Map(previous)
      next.delete(sourceId)
      return next
    })
  }, [])

  const activeSemanticIds = useMemo(() => {
    const active = new Set<string>()
    semanticSources.forEach(ids => ids.forEach(id => active.add(id)))
    return active
  }, [semanticSources])

  const value = useMemo<SceneRuntimeValue>(() => ({
    parameters,
    initializeParameter,
    updateParameter,
    parameterDrivers,
    claimParameterDriver,
    releaseParameterDriver,
    stopParameterDriver,
    activeSemanticIds,
    setSemanticSource,
    clearSemanticSource,
  }), [
    activeSemanticIds,
    claimParameterDriver,
    clearSemanticSource,
    initializeParameter,
    parameterDrivers,
    parameters,
    releaseParameterDriver,
    setSemanticSource,
    stopParameterDriver,
    updateParameter,
  ])

  return <SceneRuntimeContext.Provider value={value}>{children}</SceneRuntimeContext.Provider>
}

export interface SceneParameterDriverController {
  ownerId: string
  isDriver: boolean
  claim: (preempt?: boolean) => boolean
  release: () => void
  stop: () => void
}

export function useSceneParameterDriver(parameterId: string): SceneParameterDriverController {
  const runtime = useContext(SceneRuntimeContext)
  const rawOwnerId = useId()
  const ownerId = `scene-driver-${rawOwnerId}`
  const claimDriver = runtime?.claimParameterDriver
  const releaseDriver = runtime?.releaseParameterDriver
  const stopDriver = runtime?.stopParameterDriver
  const claim = useCallback((preempt = false) => (
    claimDriver?.(parameterId, ownerId, preempt) ?? true
  ), [claimDriver, ownerId, parameterId])
  const release = useCallback(() => {
    releaseDriver?.(parameterId, ownerId)
  }, [ownerId, parameterId, releaseDriver])
  const stop = useCallback(() => {
    stopDriver?.(parameterId)
  }, [parameterId, stopDriver])

  useEffect(() => release, [release])

  return {
    ownerId,
    isDriver: runtime ? runtime.parameterDrivers.get(parameterId) === ownerId : true,
    claim,
    release,
    stop,
  }
}

export function useSceneParameter(id: string, initial: number): [number, SetSceneParameter]
export function useSceneParameter(options: SceneParameterOptions): SceneParameterController
export function useSceneParameter(
  idOrOptions: string | SceneParameterOptions,
  legacyInitial?: number,
): [number, SetSceneParameter] | SceneParameterController {
  const runtime = useContext(SceneRuntimeContext)
  const initializeParameter = runtime?.initializeParameter
  const updateParameter = runtime?.updateParameter
  const localId = useId()
  const options = typeof idOrOptions === 'string'
    ? { id: idOrOptions, initial: legacyInitial ?? 0 }
    : idOrOptions
  const id = options.id ?? `local-${localId}`
  const initial = normalizeParameter(options.initial, options)
  const [localValue, setLocalValue] = useState(initial)

  useEffect(() => {
    initializeParameter?.(id, initial)
  }, [id, initial, initializeParameter])

  const value = runtime?.parameters.get(id) ?? localValue
  const setValue = useCallback<SetSceneParameter>((updater) => {
    if (updateParameter) {
      updateParameter(id, initial, updater, options)
      return
    }
    setLocalValue(previous => normalizeParameter(
      typeof updater === 'function' ? updater(previous) : updater,
      options,
    ))
  }, [id, initial, options.max, options.min, options.step, updateParameter])

  if (typeof idOrOptions === 'string') return [value, setValue]
  return {
    value,
    setValue,
    min: options.min,
    max: options.max,
    step: options.step,
  }
}

export interface SceneSemanticFocusBinding {
  highlighted: boolean
  activeSemanticIds: ReadonlySet<string>
  semanticProps: Pick<React.HTMLAttributes<HTMLElement>,
    'tabIndex' | 'onPointerEnter' | 'onPointerOver' | 'onPointerLeave' | 'onFocus' | 'onBlur'>
}

const EMPTY_SEMANTIC_IDS: ReadonlySet<string> = new Set()

function descendantSemanticId(
  target: EventTarget | null,
  currentTarget: EventTarget | null,
  allowedIds: ReadonlySet<string>,
) {
  if (!(target instanceof Element) || !(currentTarget instanceof Element)) return null
  if (!currentTarget.contains(target)) return null
  let element: Element | null = target
  while (element && element !== currentTarget) {
    const semanticId = element.getAttribute('data-semantic-id')?.trim() ?? ''
    if (allowedIds.has(semanticId)) return semanticId
    element = element.parentElement
  }
  return null
}

export function useSceneSemanticFocus(
  semanticIds?: readonly string[],
  { delegateDescendants = false }: { delegateDescendants?: boolean } = {},
): SceneSemanticFocusBinding {
  const runtime = useContext(SceneRuntimeContext)
  const setSemanticSource = runtime?.setSemanticSource
  const clearSemanticSource = runtime?.clearSemanticSource
  const sourceId = useId()
  const semanticKey = (semanticIds ?? []).filter(Boolean).join('\u0000')
  const normalizedIds = useMemo(
    () => Array.from(new Set(semanticKey ? semanticKey.split('\u0000') : [])),
    [semanticKey],
  )
  const allowedIds = useMemo<ReadonlySet<string>>(() => new Set(normalizedIds), [normalizedIds])
  const hoverSource = `${sourceId}-hover`
  const focusSource = `${sourceId}-focus`
  const enabled = normalizedIds.length > 0

  useEffect(() => () => {
    clearSemanticSource?.(hoverSource)
    clearSemanticSource?.(focusSource)
  }, [clearSemanticSource, focusSource, hoverSource])

  const deactivate = useCallback((owner: string) => {
    clearSemanticSource?.(owner)
  }, [clearSemanticSource])
  const activateTarget = useCallback((
    owner: string,
    target: EventTarget | null,
    currentTarget: EventTarget | null,
  ) => {
    if (!enabled) return
    const delegatedId = delegateDescendants
      ? descendantSemanticId(target, currentTarget, allowedIds)
      : null
    setSemanticSource?.(owner, delegatedId ? [delegatedId] : normalizedIds)
  }, [allowedIds, delegateDescendants, enabled, normalizedIds, setSemanticSource])
  const highlighted = enabled && normalizedIds.some(id => runtime?.activeSemanticIds.has(id))

  return {
    highlighted,
    activeSemanticIds: runtime?.activeSemanticIds ?? EMPTY_SEMANTIC_IDS,
    semanticProps: {
      tabIndex: enabled ? 0 : undefined,
      onPointerEnter: enabled ? event => activateTarget(hoverSource, event.target, event.currentTarget) : undefined,
      onPointerOver: enabled && delegateDescendants
        ? event => activateTarget(hoverSource, event.target, event.currentTarget)
        : undefined,
      onPointerLeave: enabled ? () => deactivate(hoverSource) : undefined,
      onFocus: enabled ? event => activateTarget(focusSource, event.target, event.currentTarget) : undefined,
      onBlur: enabled ? event => {
        if (delegateDescendants
          && event.relatedTarget instanceof Node
          && event.currentTarget.contains(event.relatedTarget)) {
          activateTarget(focusSource, event.relatedTarget, event.currentTarget)
          return
        }
        deactivate(focusSource)
      } : undefined,
    },
  }
}

export interface PredictionGateState {
  revealed: boolean
  canAutoplay: boolean
}

const PredictionGateContext = createContext<PredictionGateState>({
  revealed: true,
  canAutoplay: true,
})

export function usePredictionGate() {
  return useContext(PredictionGateContext)
}

export function PredictionFrame({
  prediction,
  children,
}: {
  prediction: ScenePrediction
  children: React.ReactNode
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const options = prediction.options.slice(0, 4)
  const selected = options.find(option => option.id === selectedId)
  const matchesAnswer = selectedId !== null && selectedId === prediction.answer_id
  const gate = useMemo(() => ({ revealed, canAutoplay: revealed }), [revealed])

  return (
    <PredictionGateContext.Provider value={gate}>
      <div
        className="scene-prediction"
        data-revealed={revealed ? 'true' : 'false'}
        data-matches-answer={selectedId === null ? undefined : matchesAnswer ? 'true' : 'false'}
      >
        {!revealed ? (
          <div className="scene-prediction__question">
            <p>{prediction.prompt}</p>
            <div className="scene-prediction__options" role="group" aria-label="先预测演示结果">
              {options.map(option => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selectedId === option.id}
                  onClick={() => setSelectedId(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="scene-prediction__actions">
              <button type="button" className="scene-prediction__skip" onClick={() => setRevealed(true)}>
                跳过预测
              </button>
              <button type="button" disabled={!selectedId} onClick={() => setRevealed(true)}>
                {prediction.reveal_label ?? '揭示'}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="scene-prediction__stage">{children}</div>
            {(selected || prediction.explanation) ? (
              <div
                className="scene-prediction__explanation"
                data-matches-answer={selectedId === null ? undefined : matchesAnswer ? 'true' : 'false'}
                aria-live="polite"
              >
                {selected ? <p><span>刚才的选择</span>{selected.label}</p> : null}
                {prediction.explanation ? <p><span>观察结果</span>{prediction.explanation}</p> : null}
              </div>
            ) : null}
          </>
        )}
      </div>
    </PredictionGateContext.Provider>
  )
}
