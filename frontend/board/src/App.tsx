import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  createKnowledgeSceneJob,
  CURRENT_KNOWLEDGE_SCENE_QUALITY_VERSION,
  getBoard,
  getKnowledgeSceneJob,
  requireApprovedKnowledgeScene,
  type KnowledgeSceneJob,
  type KnowledgeSceneManifest,
} from './api/endpoints'
import { ApiError } from './api/client'
import BoardShell from './BoardShell'
import StructuredKnowledgeScene from './knowledge-scene/StructuredKnowledgeScene'
import type { Board } from './types'

const DEFAULT_GOAL = '理解如何用定积分表示并计算平面区域的面积'
const LAST_SCENE_STORAGE_KEY = 'axiom.competition.lastScene.v7'
const SCENE_THEME_STORAGE_KEY = 'axiom.scene.theme'
const SET_SCENE_THEME_MESSAGE = 'axiom:set-scene-theme'
const STATIC_SCENE_PREFIX = '/static/board/knowledge-scenes/'
const STATIC_SCENE_ASSET_BASE = `${import.meta.env.BASE_URL}knowledge-scenes/`

type SceneTheme = 'dark' | 'light'

function readSceneTheme(): SceneTheme {
  if (typeof window === 'undefined') return 'dark'
  try {
    return window.localStorage.getItem(SCENE_THEME_STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function persistSceneTheme(theme: SceneTheme) {
  try {
    window.localStorage.setItem(SCENE_THEME_STORAGE_KEY, theme)
  } catch {
    // Theme persistence is optional; the current page still stays synchronized.
  }
}

const PREMIUM_TEMPLATE_IDS = new Set([
  'calculus_area_v1',
  'lagrange_multiplier_v1',
])

const INITIAL_SCENE: KnowledgeSceneManifest = {
  schema_version: '1.0',
  scene_id: 'scene_calculus_demo',
  template_id: 'calculus_area_v1',
  title: '用定积分表示平面区域的面积',
  topic: '定积分 · 平面区域面积',
  subject: '高等数学',
  learning_goal: DEFAULT_GOAL,
  renderer: {
    kind: 'static_html',
    src: '/static/board/knowledge-scenes/calculus-area.html',
  },
  learning_path: [
    { id: 'see', label: '先看区域' },
    { id: 'slice', label: '把区域切成窄条' },
    { id: 'sum', label: '从有限和走向极限' },
    { id: 'integrate', label: '写成定积分' },
    { id: 'transfer', label: '迁移到两曲线之间' },
  ],
  capabilities: [
    '连续文字主线',
    '函数与几何联动',
    '黎曼和动态演示',
    '公式逐步推导',
    '明暗背景翻转',
  ],
  generation: {
    provider: 'demo',
    workflow_id: '',
    generated_at: '',
    fallback_reason: '内置比赛演示场景',
    quality_status: 'approved',
    quality_score: 100,
    quality_version: CURRENT_KNOWLEDGE_SCENE_QUALITY_VERSION,
  },
}

interface PersistedCompetitionState {
  version: 7
  goal: string
  scene: KnowledgeSceneManifest
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isRestorableScene(value: unknown): value is KnowledgeSceneManifest {
  if (!isRecord(value) || !isRecord(value.renderer) || !isRecord(value.generation)) return false
  const requiredText = ['schema_version', 'scene_id', 'template_id', 'title', 'topic', 'subject', 'learning_goal']
  if (requiredText.some(key => typeof value[key] !== 'string')) return false
  if (!Array.isArray(value.learning_path) || !Array.isArray(value.capabilities)) return false

  const rendererKind = value.renderer.kind
  if (rendererKind === 'static_html') {
    const src = value.renderer.src
    if (typeof src !== 'string' || !src.startsWith('/static/board/knowledge-scenes/')) return false
  } else if (rendererKind === 'structured_scene') {
    if (!isRecord(value.content)) return false
    if (!Array.isArray(value.content.sections)
      || !Array.isArray(value.content.demonstrations)
      || !Array.isArray(value.content.summary)) return false
  } else {
    return false
  }

  return (value.generation.provider === 'coze' || value.generation.provider === 'demo')
    && typeof value.generation.workflow_id === 'string'
    && typeof value.generation.generated_at === 'string'
    && typeof value.generation.fallback_reason === 'string'
    && value.generation.quality_status === 'approved'
    && typeof value.generation.quality_score === 'number'
    && value.generation.quality_version === CURRENT_KNOWLEDGE_SCENE_QUALITY_VERSION
}

function readPersistedCompetitionState(): PersistedCompetitionState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(LAST_SCENE_STORAGE_KEY)
    if (!raw || raw.length > 1_000_000) return null
    const parsed: unknown = JSON.parse(raw)
    if (!isRecord(parsed) || parsed.version !== 7) return null
    if (typeof parsed.goal !== 'string' || !parsed.goal.trim() || parsed.goal.length > 240) return null
    if (!isRestorableScene(parsed.scene)) return null
    return parsed as unknown as PersistedCompetitionState
  } catch {
    return null
  }
}

function persistCompetitionState(goal: string, scene: KnowledgeSceneManifest) {
  try {
    const state: PersistedCompetitionState = { version: 7, goal, scene }
    window.localStorage.setItem(LAST_SCENE_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage can be disabled or full. Generation remains usable for this tab.
  }
}

function resolveStaticSceneSrc(src: string) {
  if (!src.startsWith(STATIC_SCENE_PREFIX)) return src
  return `${STATIC_SCENE_ASSET_BASE}${src.slice(STATIC_SCENE_PREFIX.length)}`
}

type GenerationProgressStatus =
  | 'idle'
  | 'submitting'
  | 'queued'
  | 'running'
  | 'complete'
  | 'failed'
  | 'cancelled'

interface GenerationProgressState {
  status: GenerationProgressStatus
  elapsedMs: number
  percent: number
  hasMeasuredPercent: boolean
  stage: string
  message: string
}

const IDLE_GENERATION_PROGRESS: GenerationProgressState = {
  status: 'idle',
  elapsedMs: 0,
  percent: 0,
  hasMeasuredPercent: false,
  stage: '',
  message: '',
}

const ACTIVE_GENERATION_STATUSES = new Set<GenerationProgressStatus>([
  'submitting',
  'queued',
  'running',
])

function isActiveGenerationStatus(status: GenerationProgressStatus) {
  return ACTIVE_GENERATION_STATUSES.has(status)
}

function getDisplayFailureReason(message: string) {
  const reason = message
    .replace(/([，,；;]\s*)?当前白板已保留(?=[，,；;。.！!]|$)/g, '')
    .replace(/^[，,；;。.！!\s]+/, '')
    .trim()
  return reason || '学习场景生成失败'
}

const DEFAULT_POLL_INTERVAL_MS = 2_000
const MAX_TRANSIENT_POLL_RETRIES = 3

function normalizeRetryAfterMs(value: unknown, fallback = DEFAULT_POLL_INTERVAL_MS) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) return fallback
  return Math.min(120_000, Math.max(DEFAULT_POLL_INTERVAL_MS, Math.round(value)))
}

function abortableDelay(delayMs: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Aborted', 'AbortError'))
      return
    }

    const timer = window.setTimeout(() => {
      signal.removeEventListener('abort', abort)
      resolve()
    }, delayMs)
    const abort = () => {
      window.clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    }
    signal.addEventListener('abort', abort, { once: true })
  })
}

function isAbortError(error: unknown) {
  return error instanceof Error && error.name === 'AbortError'
}

function findBodyField(value: unknown, key: string, depth = 0): unknown {
  if (!isRecord(value) || depth > 2) return undefined
  if (key in value) return value[key]
  for (const nestedKey of ['error', 'data', 'details']) {
    const found = findBodyField(value[nestedKey], key, depth + 1)
    if (found !== undefined) return found
  }
  return undefined
}

function retryAfterFromError(error: unknown) {
  if (!(error instanceof ApiError)) return undefined
  const value = findBodyField(error.body, 'retry_after_ms')
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

function isTransientPollError(error: unknown) {
  if (error instanceof TypeError) return true
  if (!(error instanceof ApiError)) return false
  return error.status === 408
    || error.status === 425
    || error.status === 429
    || error.status >= 500
    || ((error.status === 404 || error.status === 410) && mayStillBeRunning(error))
}

function mayStillBeRunning(error: ApiError) {
  return findBodyField(error.body, 'job_may_still_be_running') === true
    || findBodyField(error.body, 'retryable') === true
}

function isGoneJobError(error: unknown) {
  if (!(error instanceof ApiError) || mayStillBeRunning(error)) return false
  if (error.status === 410) return true
  if (error.status !== 404) return false

  const code = findBodyField(error.body, 'code')
  const normalizedCode = typeof code === 'string' ? code.toLowerCase() : ''
  return normalizedCode.includes('job_not_found')
    || normalizedCode.includes('job_gone')
    || normalizedCode.includes('job_expired')
    || /job.+(not.?found|gone|expired)/i.test(error.message)
}

function getJobFailureMessage(error: unknown) {
  if (typeof error === 'string' && error.trim()) return error
  if (isRecord(error)) {
    const message = error.message
    if (typeof message === 'string' && message.trim()) return message
    const code = error.code
    if (typeof code === 'string' && code.trim()) return code
  }
  return '生成任务未完成，当前白板已保留'
}

function getReportedProgress(job: KnowledgeSceneJob) {
  const value = job.progress?.percent
  if (typeof value !== 'number' || !Number.isFinite(value)) return null
  // 100 is reserved for a succeeded scene that also passed the client quality check.
  return Math.min(99, Math.max(0, value))
}

const JOB_STAGE_LABELS: Record<string, string> = {
  queued: '已进入生成队列',
  waiting_for_slot: '等待生成资源',
  generating: '工作流生成中',
  completed: '服务端生成完成',
  failed: '生成未完成',
}

function getJobStage(job: KnowledgeSceneJob) {
  if (typeof job.progress?.stage === 'string' && job.progress.stage.trim()) {
    const stage = job.progress.stage.trim()
    const stageLabel = JOB_STAGE_LABELS[stage.toLowerCase()]
    if (stageLabel) return stageLabel
    // Keep human-authored stage text, but do not leak an unknown machine code.
    if (!/^[a-z0-9_-]+$/i.test(stage)) return stage
  }
  if (job.status === 'queued') return '已进入生成队列'
  if (job.status === 'running') return '工作流生成中'
  if (job.status === 'succeeded') return '服务端生成完成'
  return '生成未完成'
}

function formatElapsedTime(elapsedMs: number) {
  const totalSeconds = Math.max(0, Math.floor(elapsedMs / 1000))
  if (totalSeconds < 60) return `${totalSeconds} 秒`
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes} 分 ${seconds.toString().padStart(2, '0')} 秒`
}

type IntakePhase = 'intake' | 'clarifying' | 'confirming' | 'generating' | 'result'

interface IntakeMessage {
  id: number
  role: 'assistant' | 'user'
  text: string
}

interface LearningContract {
  focus: string
  relation: string
  approach: string
  outcome: string
  goal: string
}

const INITIAL_INTAKE_MESSAGES: IntakeMessage[] = [{
  id: 1,
  role: 'assistant',
  text: '你现在想弄懂什么？可以只说一句，我会先和你确认清楚，再生成白板。',
}]

const INTAKE_EXAMPLES = [
  {
    label: '看懂概念',
    prompt: '为什么定积分能算面积？',
    description: '适合数学、理工和抽象概念：先讲直觉，再连到公式。',
  },
  {
    label: '解具体题',
    prompt: '2 kg物体受10 N向右拉力和4 N向左摩擦力，求加速度并画受力图',
    description: '适合数学、物理、化学和工程题：条件、步骤与图一起讲。',
  },
  {
    label: '读懂材料',
    prompt: '根据我粘贴的教材，梳理核心机制、对比关系和易错点',
    description: '适合生物、计算机和人文材料：抓主线、做对比、找易错点。',
  },
]

const VAGUE_REQUEST_RE = /^(?:讲讲|说说|介绍|解释|学习|了解|看看|帮我学)?\s*(?:数学|物理|化学|生物|计算机|历史|语文|英语|积分|函数|力学|这个|知识点|内容)?\s*[吧呀吗呢？?。！!]*$/

function needsClarification(text: string) {
  const normalized = text.trim()
  if (normalized.length < 6 || VAGUE_REQUEST_RE.test(normalized)) return true

  const withoutInstructions = normalized.replace(
    /讲讲|说说|介绍|解释|说明|分析|理解|学习|掌握|展示|演示|可视化|帮我|如何|为什么|内容|知识点/g,
    '',
  )
  return !/[A-Za-z][A-Za-z0-9_-]{3,}/.test(withoutInstructions)
    && !/[\u3400-\u9fff]{3,}/.test(withoutInstructions)
}

function buildConfirmedGoal(seed: string, answers: string[]) {
  const parts = [seed, ...answers]
    .map(part => part.trim().replace(/\s+/g, ' '))
    .filter(Boolean)
  return parts.join('；补充要求：').slice(0, 240)
}

function buildLearningContract(request: string): LearningContract {
  const focus = request.trim().replace(/\s+/g, ' ')
  const isMaterial = /教材|笔记|讲义|材料|原文|文章/.test(focus)
  const isProblem = /(?:求|计算|证明|推导|解方程|画.*图|已知|多少|最大|最小)/.test(focus)
    || /\d\s*(?:kg|g|N|V|A|m|s|mol|%|°)/i.test(focus)
  const isComparison = /比较|对比|区分|异同|区别/.test(focus)

  let relation = '核心对象之间的变化、因果或约束'
  let approach = '先看直观关系，再连接关键文字或公式'
  let outcome = '能用自己的话解释核心关系'
  if (isMaterial) {
    relation = '材料主线、前后因果、对比关系和易错点'
    approach = '沿原文主线梳理，用对比和演示抓重点'
    outcome = '能不看原文复述主线，并指出至少一个易错点'
  } else if (isProblem) {
    relation = '题目条件怎样决定关键步骤和结果'
    approach = '按条件、关系、推导、检查的顺序讲解'
    outcome = '能独立完成同类题的关键步骤并检查结果'
  } else if (isComparison) {
    relation = '比较对象在条件、机制、结果和边界上的差异'
    approach = '先建立共同尺度，再逐项对比并给出反例'
    outcome = '能根据条件判断该用哪一种解释或方法'
  } else if (/为什么|原理|机制|如何|关系|直观|理解/.test(focus)) {
    relation = '概念直觉与公式、图像或现象之间的对应'
    approach = '先观察变化，再用关键关系解释原因'
    outcome = '能用自己的话解释原因，并读懂对应图或公式'
  }

  const suffix = `；重点：${relation}；方式：${approach}；学完：${outcome}`
  const goal = focus.length + suffix.length <= 240
    ? `${focus}${suffix}`
    : focus.slice(0, 240)
  return {
    focus,
    relation,
    approach,
    outcome,
    goal,
  }
}

function getPlainFailureReason(message: string) {
  if (/教学质量门|topic_anchor_missing|topic_mismatch|正文只碰到了泛化词/.test(message)) {
    return '这次生成跑偏了，没有真正讲到你想学的知识点。旧白板没有被替换，你可以补充得更具体后再试。'
  }
  if (/credits|额度|余额|4028/i.test(message)) {
    return '生成服务当前没有可用额度。旧白板没有被替换，额度恢复后可以继续。'
  }
  if (/timeout|超时|连接|network/i.test(message)) {
    return '连接中断了，但旧白板没有被替换。可以稍后再试。'
  }
  return '这次没有生成出可靠的白板，所以旧白板没有被替换。你可以补充需求后再试。'
}

function CompetitionBoardApp() {
  const [initialState] = useState(() => readPersistedCompetitionState())
  const [goal, setGoal] = useState(initialState?.goal ?? DEFAULT_GOAL)
  const [draft, setDraft] = useState('')
  const [intakePhase, setIntakePhase] = useState<IntakePhase>('intake')
  const [messages, setMessages] = useState<IntakeMessage[]>(INITIAL_INTAKE_MESSAGES)
  const [requestSeed, setRequestSeed] = useState('')
  const [clarificationAnswers, setClarificationAnswers] = useState<string[]>([])
  const [clarificationRound, setClarificationRound] = useState(0)
  const [confirmedGoal, setConfirmedGoal] = useState('')
  const [confirmedContract, setConfirmedContract] = useState<LearningContract | null>(null)
  const [sourceText, setSourceText] = useState('')
  const [scene, setScene] = useState<KnowledgeSceneManifest>(initialState?.scene ?? INITIAL_SCENE)
  const [showScene, setShowScene] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationComplete, setGenerationComplete] = useState(Boolean(initialState))
  const [error, setError] = useState('')
  const [generationProgress, setGenerationProgress] = useState<GenerationProgressState>(IDLE_GENERATION_PROGRESS)
  const [frameHeight, setFrameHeight] = useState(1200)
  const [sceneTheme, setSceneThemeState] = useState<SceneTheme>(readSceneTheme)
  const observerRef = useRef<ResizeObserver | null>(null)
  const sceneFrameRef = useRef<HTMLIFrameElement | null>(null)
  const generationStartedAtRef = useRef<number | null>(null)
  const progressDismissTimerRef = useRef<number | null>(null)
  const generationAbortRef = useRef<AbortController | null>(null)
  const cancelRequestedRef = useRef(false)
  const mountedRef = useRef(true)
  const nextMessageIdRef = useRef(2)

  const measureScene = useCallback((frame: HTMLIFrameElement) => {
    try {
      const doc = frame.contentDocument
      if (!doc) return

      const updateHeight = () => {
        const nextHeight = Math.max(
          900,
          doc.documentElement.scrollHeight,
          doc.body?.scrollHeight ?? 0,
        )
        setFrameHeight(nextHeight)
      }

      observerRef.current?.disconnect()
      observerRef.current = new ResizeObserver(updateHeight)
      observerRef.current.observe(doc.documentElement)
      updateHeight()
    } catch {
      // The checked-in renderer is same-origin; keep a usable fallback height
      // if a development proxy changes that assumption.
      setFrameHeight(1200)
    }
  }, [])

  const setSceneTheme = useCallback((theme: SceneTheme) => {
    setSceneThemeState(theme)
    persistSceneTheme(theme)
  }, [])

  const syncThemeToFrame = useCallback((frame: HTMLIFrameElement) => {
    frame.contentWindow?.postMessage(
      { type: SET_SCENE_THEME_MESSAGE, theme: sceneTheme },
      window.location.origin,
    )
  }, [sceneTheme])

  const removeLegacyFrameThemeControls = useCallback((frame: HTMLIFrameElement) => {
    try {
      frame.contentDocument
        ?.querySelectorAll<HTMLElement>('.ams-tone, .als-theme')
        .forEach(control => control.remove())
    } catch {
      // The production scenes are same-origin. If a development proxy changes
      // that, the parent theme remains authoritative through postMessage.
    }
  }, [])

  const handleSceneFrameLoad = useCallback((frame: HTMLIFrameElement) => {
    removeLegacyFrameThemeControls(frame)
    measureScene(frame)
    syncThemeToFrame(frame)
  }, [measureScene, removeLegacyFrameThemeControls, syncThemeToFrame])

  useEffect(() => {
    const frame = sceneFrameRef.current
    if (frame) syncThemeToFrame(frame)
  }, [sceneTheme, syncThemeToFrame])

  useLayoutEffect(() => {
    const root = document.documentElement
    root.dataset.axiomTheme = sceneTheme
    return () => {
      if (root.dataset.axiomTheme === sceneTheme) {
        delete root.dataset.axiomTheme
      }
    }
  }, [sceneTheme])

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      observerRef.current?.disconnect()
      generationAbortRef.current?.abort()
      if (progressDismissTimerRef.current !== null) {
        window.clearTimeout(progressDismissTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isGenerating || generationStartedAtRef.current === null) return

    const updateElapsed = () => {
      const elapsedMs = Date.now() - (generationStartedAtRef.current ?? Date.now())
      setGenerationProgress(current => isActiveGenerationStatus(current.status)
        ? { ...current, elapsedMs }
        : current)
    }

    updateElapsed()
    const timer = window.setInterval(updateElapsed, 250)
    return () => window.clearInterval(timer)
  }, [isGenerating])

  const appendMessage = useCallback((role: IntakeMessage['role'], text: string) => {
    const nextMessage: IntakeMessage = {
      id: nextMessageIdRef.current,
      role,
      text,
    }
    nextMessageIdRef.current += 1
    setMessages(current => [...current, nextMessage])
  }, [])

  const openConfirmation = useCallback((nextGoal: string) => {
    const contract = buildLearningContract(nextGoal)
    setConfirmedContract(contract)
    setConfirmedGoal(contract.goal)
    setGoal(contract.goal)
    setIntakePhase('confirming')
    setError('')
    setGenerationProgress(IDLE_GENERATION_PROGRESS)
  }, [])

  const resetIntake = useCallback(() => {
    generationAbortRef.current?.abort()
    setDraft('')
    setRequestSeed('')
    setClarificationAnswers([])
    setClarificationRound(0)
    setConfirmedGoal('')
    setConfirmedContract(null)
    setMessages([{
      id: nextMessageIdRef.current,
      role: 'assistant',
      text: '好，我们换个知识点。你想弄懂什么？',
    }])
    nextMessageIdRef.current += 1
    setIntakePhase('intake')
    setShowScene(false)
    setGenerationComplete(false)
    setError('')
    setGenerationProgress(IDLE_GENERATION_PROGRESS)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const continueLastScene = useCallback(() => {
    if (!initialState) return
    setScene(initialState.scene)
    setGoal(initialState.goal)
    setShowScene(true)
    setGenerationComplete(true)
    setIntakePhase('result')
    appendMessage('assistant', `已打开上次白板：${initialState.scene.title}`)
  }, [appendMessage, initialState])

  const handleIntakeSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const answer = draft.trim()
    if (!answer || isGenerating || intakePhase === 'confirming') return

    appendMessage('user', answer)
    setDraft('')
    setError('')
    setGenerationProgress(IDLE_GENERATION_PROGRESS)

    if (intakePhase === 'intake') {
      setRequestSeed(answer)
      setClarificationAnswers([])
      const needsSource = /教材|笔记|讲义|材料/.test(answer) && !sourceText.trim()
      if (needsClarification(answer) || needsSource) {
        setClarificationRound(1)
        setIntakePhase('clarifying')
        appendMessage(
          'assistant',
          needsSource
            ? '可以。先把教材或笔记粘贴到下方，再告诉我你最想看懂哪一部分。'
            : '你想具体弄懂哪个知识点？比如“定积分为什么能算面积”“换元积分怎么做”，请尽量说出核心对象。',
        )
        return
      }

      openConfirmation(answer)
      return
    }

    if (intakePhase === 'clarifying') {
      const nextAnswers = [...clarificationAnswers, answer]
      setClarificationAnswers(nextAnswers)
      if (clarificationRound < 2 && needsClarification(answer)) {
        setClarificationRound(clarificationRound + 1)
        appendMessage(
          'assistant',
          '再具体一点：请直接写出要讲的概念、题目条件或材料主题。你也可以补一句想看“直观动画”“一步步推导”还是“例题”。',
        )
        return
      }

      openConfirmation(buildConfirmedGoal(requestSeed, nextAnswers))
    }
  }

  const cancelGeneration = useCallback(() => {
    if (!generationAbortRef.current) return
    cancelRequestedRef.current = true
    generationAbortRef.current.abort()
  }, [])

  const handleGenerate = async (requestedGoal: string) => {
    const normalizedGoal = requestedGoal.trim()
    if (!normalizedGoal || isGenerating || generationAbortRef.current) return

    const controller = new AbortController()
    generationAbortRef.current = controller
    cancelRequestedRef.current = false

    setIsGenerating(true)
    setIntakePhase('generating')
    setGoal(normalizedGoal)
    setGenerationComplete(false)
    setError('')
    if (progressDismissTimerRef.current !== null) {
      window.clearTimeout(progressDismissTimerRef.current)
      progressDismissTimerRef.current = null
    }
    generationStartedAtRef.current = Date.now()
    setGenerationProgress({
      status: 'submitting',
      elapsedMs: 0,
      percent: 0,
      hasMeasuredPercent: false,
      stage: '正在创建生成任务',
      message: '',
    })
    try {
      const created = await createKnowledgeSceneJob(normalizedGoal, sourceText, controller.signal)
      const jobId = created.job_id
      let statusUrl = created.status_url
      let pollDelayMs = normalizeRetryAfterMs(created.retry_after_ms)
      let transientFailures = 0
      let nextScene: KnowledgeSceneManifest | null = null

      setGenerationProgress(current => ({
        ...current,
        status: created.status === 'queued' ? 'queued' : 'running',
        stage: created.status === 'running' ? '工作流生成中' : '已进入生成队列',
        message: '',
      }))

      while (!nextScene) {
        await abortableDelay(pollDelayMs, controller.signal)

        let job: KnowledgeSceneJob
        try {
          job = await getKnowledgeSceneJob(jobId, {
            signal: controller.signal,
            statusUrl,
          })
        } catch (pollError: unknown) {
          if (isAbortError(pollError)) throw pollError

          if (isGoneJobError(pollError)) {
            const reason = pollError instanceof ApiError && pollError.status === 410
              ? '生成任务结果已过期'
              : '生成任务记录不存在'
            throw new Error(`${reason}；为避免重复消耗额度，未自动重新提交。请手动重试，当前白板已保留`)
          }

          if (isTransientPollError(pollError) && transientFailures < MAX_TRANSIENT_POLL_RETRIES) {
            transientFailures += 1
            const serverDelay = retryAfterFromError(pollError)
            const exponentialDelay = DEFAULT_POLL_INTERVAL_MS * (2 ** (transientFailures - 1))
            pollDelayMs = normalizeRetryAfterMs(
              serverDelay === undefined ? exponentialDelay : Math.max(serverDelay, exponentialDelay),
            )
            setGenerationProgress(current => ({
              ...current,
              stage: `连接暂时中断，正在重试（${transientFailures}/${MAX_TRANSIENT_POLL_RETRIES}）`,
              message: `将在 ${Math.ceil(pollDelayMs / 1000)} 秒后重新查询；任务不会重复提交`,
            }))
            continue
          }
          throw pollError
        }

        transientFailures = 0
        statusUrl = job.status_url ?? statusUrl
        pollDelayMs = normalizeRetryAfterMs(job.retry_after_ms)

        if (job.status === 'failed') {
          throw new Error(getJobFailureMessage(job.error))
        }
        if (job.status === 'succeeded') {
          nextScene = requireApprovedKnowledgeScene(job.scene)
          continue
        }

        const reportedPercent = getReportedProgress(job)
        setGenerationProgress(current => ({
          status: job.status === 'queued' ? 'queued' : 'running',
          elapsedMs: current.elapsedMs,
          percent: reportedPercent ?? current.percent,
          hasMeasuredPercent: reportedPercent !== null || current.hasMeasuredPercent,
          stage: getJobStage(job),
          message: typeof job.progress.message === 'string' ? job.progress.message.trim() : '',
        }))
      }

      const elapsedMs = Date.now() - (generationStartedAtRef.current ?? Date.now())
      setGenerationProgress({
        status: 'complete',
        elapsedMs,
        percent: 100,
        hasMeasuredPercent: true,
        stage: '白板已生成',
        message: '内容检查通过，正在打开新白板。',
      })
      persistCompetitionState(normalizedGoal, nextScene)
      setScene(nextScene)
      setShowScene(true)
      setIntakePhase('result')
      setGenerationComplete(true)
      appendMessage('assistant', `白板已经生成：${nextScene.title}`)
      progressDismissTimerRef.current = window.setTimeout(() => {
        setGenerationProgress(IDLE_GENERATION_PROGRESS)
        progressDismissTimerRef.current = null
      }, 1800)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err: unknown) {
      const elapsedMs = generationStartedAtRef.current === null
        ? 0
        : Date.now() - generationStartedAtRef.current
      if (isAbortError(err)) {
        if (mountedRef.current && cancelRequestedRef.current) {
          setGenerationProgress(current => ({
            ...current,
            status: 'cancelled',
            elapsedMs,
            stage: '已停止等待',
            message: '当前白板已保留；服务端任务可能仍会继续执行',
          }))
          setIntakePhase('confirming')
          progressDismissTimerRef.current = window.setTimeout(() => {
            setGenerationProgress(IDLE_GENERATION_PROGRESS)
            progressDismissTimerRef.current = null
          }, 2600)
        }
      } else if (mountedRef.current) {
        setGenerationProgress(current => ({
          ...current,
          status: 'failed',
          elapsedMs,
          stage: '生成未完成',
          message: '',
        }))
        setError(err instanceof Error ? err.message : '学习场景生成失败')
        setIntakePhase('confirming')
      }
    } finally {
      generationStartedAtRef.current = null
      if (generationAbortRef.current === controller) {
        generationAbortRef.current = null
      }
      if (mountedRef.current) setIsGenerating(false)
    }
  }

  const generationIsActive = isActiveGenerationStatus(generationProgress.status)
  const showGenerationProgress = generationIsActive
    || generationProgress.status === 'complete'
    || generationProgress.status === 'cancelled'
  const showComposer = intakePhase === 'intake' || intakePhase === 'clarifying'
  const showExamples = intakePhase === 'intake' && messages.length === 1

  return (
    <main className={`competition-board competition-board--${sceneTheme}${showScene ? ' competition-board--with-scene' : ' competition-board--intake'}`}>
      <header className="competition-board__prompt">
        <div className="intake-shell">
          <div className="intake-heading">
            <a className="axiom-wordmark" href="/app" aria-label="返回 Axiom">Axiom</a>
            <p>先把你真正想学的说清楚，再生成白板。</p>
            <button
              className="competition-theme-toggle"
              type="button"
              aria-label={sceneTheme === 'dark' ? '切换为浅色模式' : '切换为深色模式'}
              onClick={() => setSceneTheme(sceneTheme === 'dark' ? 'light' : 'dark')}
            >
              {sceneTheme === 'dark' ? '浅色' : '深色'}
            </button>
          </div>

          <div className="chat-thread" aria-live="polite">
            {messages.map(message => (
              <div key={message.id} className={`chat-message chat-message--${message.role}`}>
                {message.role === 'assistant' ? <span className="chat-avatar">A</span> : null}
                <div className="chat-bubble">{message.text}</div>
              </div>
            ))}

            {intakePhase === 'confirming' ? (
              <div className="chat-message chat-message--assistant">
                <span className="chat-avatar">A</span>
                <div className="chat-bubble chat-confirmation">
                  <strong>我理解的是：</strong>
                  {confirmedContract ? (
                    <dl className="learning-contract">
                      <div><dt>学习主题</dt><dd>{confirmedContract.focus}</dd></div>
                      <div><dt>看清关系</dt><dd>{confirmedContract.relation}</dd></div>
                      <div><dt>讲解方式</dt><dd>{confirmedContract.approach}</dd></div>
                      <div><dt>学完以后</dt><dd>{confirmedContract.outcome}</dd></div>
                    </dl>
                  ) : <p>{confirmedGoal}</p>}
                  <small>只有你确认后才会开始生成；确认前不会调用生成服务。</small>
                  <div className="chat-confirmation__actions">
                    <button
                      type="button"
                      className="chat-primary-action"
                      disabled={isGenerating}
                      onClick={() => { void handleGenerate(confirmedGoal) }}
                    >
                      确认并生成
                    </button>
                    <button
                      type="button"
                      className="chat-secondary-action"
                      disabled={isGenerating}
                      onClick={() => {
                        setDraft(confirmedGoal)
                        setRequestSeed('')
                        setClarificationAnswers([])
                        setClarificationRound(0)
                        setConfirmedGoal('')
                        setConfirmedContract(null)
                        setIntakePhase('intake')
                        setError('')
                      }}
                    >
                      修改需求
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {showGenerationProgress ? (
              <div className="chat-message chat-message--assistant">
                <span className="chat-avatar">A</span>
                <div className={`chat-bubble generation-progress generation-progress--${generationProgress.status}`}>
                  <div className="generation-progress__line">
                    <span role="status" aria-live="polite" aria-atomic="true">
                      {generationProgress.stage}
                    </span>
                    <span className="generation-progress__elapsed">
                      已耗时 {formatElapsedTime(generationProgress.elapsedMs)}
                    </span>
                  </div>
                  {generationIsActive || generationProgress.status === 'complete' ? (
                    <div
                      className={`generation-progress__track${generationIsActive
                        && !generationProgress.hasMeasuredPercent
                        ? ' generation-progress__track--indeterminate'
                        : ''}`}
                      role="progressbar"
                      aria-label="白板生成等待进度"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={generationProgress.hasMeasuredPercent
                        ? Math.round(generationProgress.percent)
                        : undefined}
                    >
                      <span style={generationProgress.hasMeasuredPercent
                        ? { width: `${generationProgress.percent}%` }
                        : undefined}
                      />
                    </div>
                  ) : null}
                  <small>{generationProgress.message || '旧白板不会在生成过程中被替换。'}</small>
                  {generationIsActive ? (
                    <button type="button" className="chat-stop-action" onClick={cancelGeneration}>
                      停止等待
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}

            {generationProgress.status === 'failed' && error ? (
              <div className="chat-message chat-message--assistant">
                <span className="chat-avatar">A</span>
                <div id="generation-error" className="chat-bubble generation-error" role="alert">
                  <strong>这次没有生成新白板</strong>
                  <p>{getPlainFailureReason(error)}</p>
                  <button type="button" className="chat-secondary-action" onClick={() => {
                    setDraft(confirmedGoal)
                    setConfirmedGoal('')
                    setIntakePhase('intake')
                    setError('')
                    setGenerationProgress(IDLE_GENERATION_PROGRESS)
                  }}>
                    补充需求
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {showComposer ? (
            <form className="chat-composer" onSubmit={handleIntakeSubmit}>
              <label className="sr-only" htmlFor="learning-request">学习需求</label>
              <div className="chat-composer__box">
                <textarea
                  id="learning-request"
                  value={draft}
                  rows={2}
                  maxLength={240}
                  placeholder={intakePhase === 'clarifying' ? '补充你想学的具体内容…' : '说说你想弄懂什么…'}
                  onChange={event => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault()
                      event.currentTarget.form?.requestSubmit()
                    }
                  }}
                />
                <button type="submit" disabled={!draft.trim()} aria-label="发送需求">发送</button>
              </div>
              <details className="source-input">
                <summary>＋ 加入教材或笔记（可选）</summary>
                <textarea
                  value={sourceText}
                  maxLength={12000}
                  onChange={event => setSourceText(event.target.value)}
                  placeholder="粘贴课程定义、教师讲义或自己的笔记。确认生成后才会发送。"
                />
              </details>
            </form>
          ) : null}

          {showExamples ? (
            <div className="intake-examples" aria-label="演示案例">
              {INTAKE_EXAMPLES.map(example => (
                <button
                  key={example.label}
                  type="button"
                  className="intake-example"
                  onClick={() => setDraft(example.prompt)}
                >
                  <span>{example.label}</span>
                  <strong>{example.prompt}</strong>
                  <small>{example.description}</small>
                </button>
              ))}
            </div>
          ) : null}

          {initialState && !showScene && intakePhase !== 'generating' ? (
            <button type="button" className="continue-scene" onClick={continueLastScene}>
              继续上次白板
              <span>{initialState.scene.title}</span>
            </button>
          ) : null}

          {showScene ? (
            <div className="scene-actions">
              <span>当前白板：{scene.title}</span>
              <button type="button" onClick={resetIntake}>换个知识点</button>
            </div>
          ) : null}
        </div>
      </header>

      {showScene ? <section
        className={`knowledge-scene knowledge-scene--${scene.renderer.kind}`}
        aria-label={scene.title}
      >
        {scene.renderer.kind === 'static_html' ? <iframe
          ref={sceneFrameRef}
          key={scene.scene_id}
          src={resolveStaticSceneSrc(scene.renderer.src)}
          title={scene.title}
          style={{ height: `${frameHeight}px` }}
          sandbox="allow-scripts allow-same-origin"
          onLoad={(event) => handleSceneFrameLoad(event.currentTarget)}
        /> : <StructuredKnowledgeScene
          key={scene.scene_id}
          scene={scene}
          theme={sceneTheme}
        />}
      </section> : null}

      {showScene ? <footer className="competition-board__footnote">
        <details>
          <summary>本次白板的生成记录</summary>
          <dl>
            <div>
              <dt>学习目标</dt>
              <dd>{scene.learning_goal}</dd>
            </div>
            <div>
              <dt>内容组织</dt>
              <dd>
                {PREMIUM_TEMPLATE_IDS.has(scene.template_id)
                  ? 'Axiom 精品知识场景'
                  : scene.generation.provider === 'coze'
                    ? '扣子 v2 通用工作流'
                    : '已校验的离线样例'}
              </dd>
            </div>
            <div>
              <dt>当前覆盖</dt>
              <dd>{scene.subject} · {scene.topic}</dd>
            </div>
            {scene.generation.fallback_reason ? (
              <div>
                <dt>说明</dt>
                <dd>{scene.generation.fallback_reason}</dd>
              </div>
            ) : null}
          </dl>
        </details>
      </footer> : null}
    </main>
  )
}

type LegacyBoardState =
  | { phase: 'loading' }
  | { phase: 'error'; message: string }
  | { phase: 'loaded'; board: Board }

function extractBoardId() {
  if (typeof window === 'undefined') return null
  const hashPath = window.location.hash.replace(/^#/, '')
  const hashMatch = hashPath.match(/^\/?board\/([a-zA-Z0-9_-]+)\/?$/)
  if (hashMatch) return hashMatch[1]
  const pathMatch = window.location.pathname.match(/^\/board\/([a-zA-Z0-9_-]+)\/?$/)
  return pathMatch?.[1] ?? null
}

function LegacyBoardApp({ boardId }: { boardId: string }) {
  const [state, setState] = useState<LegacyBoardState>({ phase: 'loading' })

  useLayoutEffect(() => {
    const root = document.documentElement
    root.dataset.axiomTheme = 'dark'
    return () => {
      if (root.dataset.axiomTheme === 'dark') {
        delete root.dataset.axiomTheme
      }
    }
  }, [])

  const loadBoard = useCallback(async () => {
    setState({ phase: 'loading' })
    try {
      setState({ phase: 'loaded', board: await getBoard(boardId) })
    } catch (err: unknown) {
      setState({
        phase: 'error',
        message: err instanceof Error ? err.message : '加载白板失败',
      })
    }
  }, [boardId])

  useEffect(() => { void loadBoard() }, [loadBoard])

  if (state.phase === 'loading') {
    return (
      <div className="board-loading">
        <div className="board-loading__spinner" />
        <p className="board-loading__text">正在加载学习白板…</p>
      </div>
    )
  }

  if (state.phase === 'error') {
    return (
      <div className="board-error">
        <div className="board-error__icon">!</div>
        <h2>加载失败</h2>
        <p>{state.message}</p>
        <button className="board-error__retry" onClick={() => { void loadBoard() }}>
          重试
        </button>
      </div>
    )
  }

  return (
    <BoardShell
      board={state.board}
      onBoardUpdate={(updated) => {
        setState({ phase: 'loaded', board: updated })
        if (updated.id) localStorage.setItem('axiom_board_recent', updated.id)
      }}
    />
  )
}

export default function App() {
  const boardId = extractBoardId()
  return boardId ? <LegacyBoardApp boardId={boardId} /> : <CompetitionBoardApp />
}
