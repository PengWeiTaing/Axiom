import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type KnowledgePlaybackRate = 0.5 | 1
export type KnowledgeTimelinePlayReason = 'autoplay' | 'play' | 'replay'

export interface KnowledgeTimelineOptions {
  durationMs: number
  steps?: number | readonly number[]
  autoplay?: boolean
  reducedMotion?: boolean
  onPlayRequest?: (reason: KnowledgeTimelinePlayReason) => boolean
}

export interface KnowledgeTimelineController {
  ref: (node: HTMLElement | null) => void
  timeMs: number
  progress: number
  playing: boolean
  isPlaying: boolean
  hasPlayed: boolean
  currentStep: number
  stepCount: number
  playbackRate: KnowledgePlaybackRate
  rate: KnowledgePlaybackRate
  reducedMotion: boolean
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  play: () => void
  pause: () => void
  togglePlaying: () => void
  seek: (timeMs: number) => void
  scrub: (progress: number) => void
  setProgress: (progress: number) => void
  previousStep: () => void
  nextStep: () => void
  setPlaybackRate: (rate: KnowledgePlaybackRate) => void
  replay: () => void
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0))
}

function usePrefersReducedMotion(override?: boolean) {
  const [preferred, setPreferred] = useState(() => (
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  ))

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPreferred(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return override ?? preferred
}

function stepBoundaries(steps: KnowledgeTimelineOptions['steps'], durationMs: number) {
  if (typeof steps === 'number') {
    const count = Math.max(2, Math.floor(steps))
    return Array.from({ length: count }, (_, index) => index / (count - 1))
  }
  if (Array.isArray(steps) && steps.length) {
    const normalized = steps.map(value => clamp01(value > 1 ? value / durationMs : value))
    return Array.from(new Set([0, ...normalized, 1])).sort((left, right) => left - right)
  }
  return [0, 1]
}

export function useKnowledgeTimeline({
  durationMs,
  steps,
  autoplay = true,
  reducedMotion: reducedMotionOverride,
  onPlayRequest,
}: KnowledgeTimelineOptions): KnowledgeTimelineController {
  const safeDuration = Math.max(1, durationMs)
  const reducedMotion = usePrefersReducedMotion(reducedMotionOverride)
  const initialProgress = reducedMotion ? 1 : 0
  const [node, setNode] = useState<HTMLElement | null>(null)
  const [progress, setProgressState] = useState(initialProgress)
  const progressRef = useRef(initialProgress)
  const [playing, setPlayingState] = useState(false)
  const playingRef = useRef(false)
  const [hasPlayed, setHasPlayed] = useState(reducedMotion)
  const [playbackRate, setPlaybackRateState] = useState<KnowledgePlaybackRate>(1)
  const autoplayStarted = useRef(false)
  const playRequestRef = useRef(onPlayRequest)
  playRequestRef.current = onPlayRequest
  const boundaries = useMemo(() => stepBoundaries(steps, safeDuration), [safeDuration, steps])

  const applyProgress = useCallback((next: number) => {
    const clamped = clamp01(next)
    progressRef.current = clamped
    setProgressState(clamped)
    if (clamped >= 1) setHasPlayed(true)
  }, [])

  const applyPlaying = useCallback((next: boolean) => {
    if (reducedMotion && next) {
      applyProgress(1)
      playingRef.current = false
      setPlayingState(false)
      return
    }
    playingRef.current = next
    setPlayingState(next)
  }, [applyProgress, reducedMotion])

  const startPlaying = useCallback((reason: KnowledgeTimelinePlayReason) => {
    if (reducedMotion) {
      applyProgress(1)
      return false
    }
    if (playRequestRef.current && !playRequestRef.current(reason)) return false
    autoplayStarted.current = true
    if (progressRef.current >= 1) applyProgress(0)
    applyPlaying(true)
    return true
  }, [applyPlaying, applyProgress, reducedMotion])

  const setPlaying = useCallback<React.Dispatch<React.SetStateAction<boolean>>>((updater) => {
    const next = typeof updater === 'function' ? updater(playingRef.current) : updater
    if (next) startPlaying('play')
    else applyPlaying(false)
  }, [applyPlaying, startPlaying])

  const play = useCallback(() => {
    startPlaying('play')
  }, [startPlaying])

  const pause = useCallback(() => applyPlaying(false), [applyPlaying])
  const togglePlaying = useCallback(() => {
    if (playingRef.current) pause()
    else play()
  }, [pause, play])

  const setProgress = useCallback((next: number) => {
    pause()
    applyProgress(next)
  }, [applyProgress, pause])
  const seek = useCallback((timeMs: number) => setProgress(timeMs / safeDuration), [safeDuration, setProgress])
  const scrub = useCallback((next: number) => setProgress(next), [setProgress])

  const previousStep = useCallback(() => {
    pause()
    const current = progressRef.current
    const previous = [...boundaries].reverse().find(boundary => boundary < current - 0.0001) ?? 0
    applyProgress(previous)
  }, [applyProgress, boundaries, pause])

  const nextStep = useCallback(() => {
    pause()
    const current = progressRef.current
    const next = boundaries.find(boundary => boundary > current + 0.0001) ?? 1
    applyProgress(next)
  }, [applyProgress, boundaries, pause])

  const setPlaybackRate = useCallback((rate: KnowledgePlaybackRate) => {
    setPlaybackRateState(rate === 0.5 ? 0.5 : 1)
  }, [])

  const replay = useCallback(() => {
    if (reducedMotion) {
      applyProgress(1)
      applyPlaying(false)
      return
    }
    if (!startPlaying('replay')) return
    applyProgress(0)
  }, [applyPlaying, applyProgress, reducedMotion, startPlaying])

  useEffect(() => {
    if (!playing) return undefined
    let frame = 0
    let previousTime = performance.now()
    const tick = (time: number) => {
      const elapsed = Math.max(0, time - previousTime)
      previousTime = time
      const next = progressRef.current + elapsed * playbackRate / safeDuration
      if (next >= 1) {
        applyProgress(1)
        applyPlaying(false)
        return
      }
      applyProgress(next)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [applyPlaying, applyProgress, playbackRate, playing, safeDuration])

  useEffect(() => {
    if (!reducedMotion) return
    applyPlaying(false)
    applyProgress(1)
  }, [applyPlaying, applyProgress, reducedMotion])

  useEffect(() => {
    if (!node || !autoplay || reducedMotion || autoplayStarted.current) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      autoplayStarted.current = true
      startPlaying('autoplay')
      return undefined
    }
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= 0.35)) return
      autoplayStarted.current = true
      startPlaying('autoplay')
      observer.disconnect()
    }, { threshold: 0.35 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [autoplay, node, reducedMotion, startPlaying])

  const currentStep = boundaries.reduce(
    (last, boundary, index) => boundary <= progress + 0.0001 ? index : last,
    0,
  )

  return {
    ref: setNode,
    timeMs: progress * safeDuration,
    progress,
    playing,
    isPlaying: playing,
    hasPlayed,
    currentStep,
    stepCount: boundaries.length,
    playbackRate,
    rate: playbackRate,
    reducedMotion,
    setPlaying,
    play,
    pause,
    togglePlaying,
    seek,
    scrub,
    setProgress,
    previousStep,
    nextStep,
    setPlaybackRate,
    replay,
  }
}

export function KnowledgeTimelineControls({
  timeline,
  label = '演示时间轴',
}: {
  timeline: KnowledgeTimelineController
  label?: string
}) {
  return (
    <div className="knowledge-timeline" aria-label={label}>
      <div className="knowledge-timeline__transport">
        <button type="button" onClick={timeline.previousStep} aria-label="上一步">上一步</button>
        <button type="button" onClick={timeline.togglePlaying} disabled={timeline.reducedMotion}>
          {timeline.playing ? '暂停' : '播放'}
        </button>
        <button type="button" onClick={timeline.nextStep} aria-label="下一步">下一步</button>
      </div>
      <input
        className="knowledge-timeline__scrubber"
        type="range"
        min={0}
        max={1}
        step={0.001}
        value={timeline.progress}
        aria-label="演示进度"
        onChange={event => timeline.scrub(Number(event.target.value))}
      />
      <span className="knowledge-timeline__step" aria-live="polite">
        {timeline.currentStep + 1}/{timeline.stepCount}
      </span>
      <button
        type="button"
        onClick={() => timeline.setPlaybackRate(timeline.playbackRate === 1 ? 0.5 : 1)}
        aria-label="切换播放速度"
      >
        {timeline.playbackRate}×
      </button>
      <button type="button" onClick={timeline.replay}>重演</button>
    </div>
  )
}
