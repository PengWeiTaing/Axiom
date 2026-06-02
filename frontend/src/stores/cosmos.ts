/** Cosmos Pinia store — 数据 + 状态 + 极小事件总线 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CosmosState, CosmosData } from '@/cosmos/types'

interface FocusEntry {
  state: CosmosState
  title: string
}

function sameState(a: CosmosState, b: CosmosState): boolean {
  if (a.kind !== b.kind) return false
  if (a.kind === 'global_overview') return true
  const alid = (a as any).lifeline_id; const blid = (b as any).lifeline_id
  if (alid && blid) return alid === blid
  const aeid = (a as any).entity_id; const beid = (b as any).entity_id
  if (aeid && beid) return aeid === beid
  return false
}

export const useCosmosStore = defineStore('cosmos', () => {
  const data = ref<CosmosData | null>(null)
  const state = ref<CosmosState>({ kind: 'global_overview' })
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedAssocId = ref<string | null>(null)
  // 当真实 /cosmos 不可用 / 空库时回退到 mock 数据时翻为 true，
  // 仅在 DEV 模式下可能为 true（生产环境不 fallback）。UI 可据此渲染 "demo 数据" 角标。
  const usingMockFallback = ref(false)

  // Focus history
  const historyStack = ref<FocusEntry[]>([{ state: { kind: 'global_overview' }, title: '全局' }])
  const historyCursor = ref(0)

  const canGoBack = computed(() => historyCursor.value > 0)
  const canGoForward = computed(() => historyCursor.value < historyStack.value.length - 1)

  function stateTitle(s: CosmosState): string {
    switch (s.kind) {
      case 'global_overview': return '全局'
      case 'region_zoom': {
        const name = data.value?.lifelines.find(l => l.id === (s as any).lifeline_id)?.name
        return name || (s as any).lifeline_id || '?'
      }
      case 'node_focus':
      case 'relation_reveal': {
        const eid = (s as any).entity_id as string
        const ent = data.value?.entities.find(e => e.id === eid)
        const t = ent?.title || eid
        return s.kind === 'relation_reveal' ? `${t} · 关联` : t
      }
    }
  }

  function pushHistory(next: CosmosState) {
    const cur = historyStack.value[historyCursor.value]
    if (cur && sameState(cur.state, next)) return
    historyStack.value = historyStack.value.slice(0, historyCursor.value + 1)
    historyStack.value.push({ state: { ...next }, title: stateTitle(next) })
    if (historyStack.value.length > 50) historyStack.value.shift()
    else historyCursor.value = historyStack.value.length - 1
  }

  function applyState(next: CosmosState) {
    emit(`leave_${state.value.kind}`, state.value)
    state.value = next
    selectedAssocId.value = null
    emit(`enter_${next.kind}`, next)
  }

  function selectAssociation(id: string | null) {
    selectedAssocId.value = id
  }

  const listeners: Record<string, Array<(payload: unknown) => void>> = {}

  function emit(event: string, payload: unknown) {
    listeners[event]?.forEach(fn => fn(payload))
  }

  function on(event: string, fn: (payload: unknown) => void) {
    if (!listeners[event]) listeners[event] = []
    listeners[event].push(fn)
  }

  async function load() {
    if (data.value) return
    loading.value = true
    const isDev = import.meta.env.DEV
    try {
      const { apiRequest } = await import('@/api/client')
      data.value = await apiRequest<CosmosData>('/cosmos')
      const isEmpty = !data.value || data.value.lifelines.length === 0
      if (isEmpty && isDev) {
        // DEV: 空库时 fallback 到 mock，方便本地展示。生产环境不走这条路，
        // 让 UI 直接渲染 empty state，避免把 mock 数据伪装成真实数据。
        throw new Error('empty')
      }
      historyStack.value = [{ state: { kind: 'global_overview' }, title: '全局' }]
      historyCursor.value = 0
    } catch (e: unknown) {
      if (!isDev) {
        // 生产环境：网络/服务错误 → error state；空库 → 上面已 set data.value 为真实空数据，UI 渲染 empty。
        error.value = 'Cosmos 数据加载失败'
        loading.value = false
        return
      }
      try {
        const resp = await fetch('/mock/cosmos.json')
        data.value = await resp.json()
        usingMockFallback.value = true
        historyStack.value = [{ state: { kind: 'global_overview' }, title: '全局' }]
        historyCursor.value = 0
      } catch {
        error.value = 'Cosmos 数据加载失败'
      }
    } finally {
      loading.value = false
    }
  }

  function transition(next: CosmosState) {
    pushHistory(next)
    applyState(next)
  }

  function navigateBack() {
    if (!canGoBack.value) return
    historyCursor.value--
    applyState(historyStack.value[historyCursor.value].state)
  }

  function navigateForward() {
    if (!canGoForward.value) return
    historyCursor.value++
    applyState(historyStack.value[historyCursor.value].state)
  }

  // Undo
  interface UndoEntry { action: string; redo: () => Promise<void> }
  const undoEntry = ref<UndoEntry | null>(null)
  const canUndo = computed(() => undoEntry.value !== null)

  function pushUndo(entry: UndoEntry) { undoEntry.value = entry }

  async function undoLast(): Promise<string | null> {
    if (!undoEntry.value) return null
    try {
      await undoEntry.value.redo()
      const name = undoEntry.value.action
      undoEntry.value = null
      return name
    } catch {
      await reload()
      undoEntry.value = null
      return null
    }
  }

  async function reload() {
    data.value = null
    error.value = null
    entityDetailCache.value.clear()
    await load()
  }

  async function createLifeline(params: { id: string; name: string; parent_id?: string; order_index?: number }) {
    const { createLifeline: apiCreate } = await import('@/api/endpoints')
    await apiCreate(params)
    await reload()
  }

  async function updateLifeline(id: string, params: { name?: string; parent_id?: string; order_index?: number }) {
    const { updateLifeline: apiUpdate } = await import('@/api/endpoints')
    await apiUpdate(id, params)
    await reload()
  }

  async function deleteLifeline(id: string) {
    const { deleteLifeline: apiDelete } = await import('@/api/endpoints')
    await apiDelete(id)
    await reload()
  }

  async function mountEntity(kind: string, entityId: number, lifelineId: string | null) {
    const { mountEntity: apiMount } = await import('@/api/endpoints')
    await apiMount(kind, entityId, lifelineId)
    await reload()
  }

  async function reviewAssociation(assocId: string, status: 'accepted' | 'rejected') {
    const old = data.value?.associations.find(a => a.id === assocId)
    const oldStatus = old?.status
    if (oldStatus && oldStatus !== status) {
      pushUndo({
        action: status === 'accepted' ? '确认关联' : '拒绝关联',
        redo: async () => { await reviewAssociation(assocId, oldStatus as 'accepted' | 'rejected') }
      })
    }
    if (data.value) {
      const idx = data.value.associations.findIndex(a => a.id === assocId)
      if (idx !== -1) {
        data.value = {
          ...data.value,
          associations: [
            ...data.value.associations.slice(0, idx),
            { ...data.value.associations[idx], status },
            ...data.value.associations.slice(idx + 1),
          ],
        }
      }
    }

    try {
      const { reviewAssociation: apiReview } = await import('@/api/endpoints')
      await apiReview(assocId, status)
    } catch {
      await reload()
    }
  }

  async function updateEntityTitle(kind: string, id: number, title: string) {
    const eid = `${kind}:${id}`
    const oldTitle = data.value?.entities.find(e => e.id === eid)?.title
    if (oldTitle && oldTitle !== title) {
      pushUndo({
        action: '修改标题',
        redo: async () => { await updateEntityTitle(kind, id, oldTitle) }
      })
    }
    const { updateEntity: apiUpdate } = await import('@/api/endpoints')
    await apiUpdate(kind, id, { title })
    await reload()
  }

  async function deleteEntityById(kind: string, id: number) {
    const eid = `${kind}:${id}`
    const ent = data.value?.entities.find(e => e.id === eid)
    if (ent) {
      const snap = { kind, id, title: ent.title, lifeline_id: ent.lifeline_id }
      pushUndo({
        action: `删除 entity "${ent.title.slice(0, 20)}"`,
        redo: async () => {
          // Recreate via API
          if (kind === 'task') {
            const { createTask } = await import('@/api/endpoints')
            const r = await createTask({ title: snap.title })
            if (snap.lifeline_id) await mountEntity('task', r.task.id, snap.lifeline_id)
          } else if (kind === 'memory') {
            const { createMemory: cm } = await import('@/api/endpoints')
            const r = await cm({ category: 'fact', content: snap.title })
            if (snap.lifeline_id) await mountEntity('memory', r.memory.id, snap.lifeline_id)
          } else if (kind === 'decision') {
            const { createDecision: cd } = await import('@/api/endpoints')
            const r = await cd({ title: snap.title, decision: snap.title })
            if (snap.lifeline_id) await mountEntity('decision', r.id, snap.lifeline_id)
          } else {
            const { addNote } = await import('@/api/endpoints')
            const r = await addNote(snap.title)
            if (snap.lifeline_id) await mountEntity('item', r.id, snap.lifeline_id)
          }
          await reload()
        }
      })
    }
    const { deleteEntity: apiDelete } = await import('@/api/endpoints')
    await apiDelete(kind, id)
    await reload()
  }

  // Association CRUD
  async function createAssoc(data: {
    from: string; to: string; relation_type: string; confidence: number
    evidence?: { type: string; excerpt: string; weight: number }[]
  }) {
    const { createAssociation: apiCreate } = await import('@/api/endpoints')
    await apiCreate({ ...data, status: 'accepted' })
    await reload()
  }

  async function updateAssoc(id: string, data: {
    relation_type?: string; confidence?: number
    evidence?: { type: string; excerpt: string; weight: number }[]
  }) {
    const { updateAssociation: apiUpdate } = await import('@/api/endpoints')
    await apiUpdate(id, data)
    await reload()
  }

  async function deleteAssoc(id: string) {
    const assoc = data.value?.associations.find(a => a.id === id)
    if (assoc) {
      const snap = { from: assoc.from, to: assoc.to, relation_type: assoc.relation_type, confidence: assoc.confidence, evidence: assoc.evidence || [] }
      pushUndo({
        action: '删除关联',
        redo: async () => { await createAssoc(snap) }
      })
    }
    const { deleteAssociation: apiDelete } = await import('@/api/endpoints')
    await apiDelete(id)
    await reload()
  }

  const entityDetailCache = ref<Map<string, Record<string, unknown>>>(new Map())

  const selectingTarget = ref<{ fromId: string; fromTitle: string } | null>(null)
  const editAssoc = ref<{
    id: string; from: string; fromTitle: string; to: string; toTitle: string
    relation_type: string; confidence: number; status: string
    evidence: { type: string; excerpt: string; weight: number }[]
  } | null>(null)

  function startSelectingTarget(fromId: string, fromTitle: string) {
    selectingTarget.value = { fromId, fromTitle }
  }

  function cancelSelecting() {
    selectingTarget.value = null
  }

  function openEditAssoc(data: NonNullable<typeof editAssoc.value>) {
    editAssoc.value = data
  }

  function closeEditAssoc() {
    editAssoc.value = null
  }

  return { data, state, loading, error, usingMockFallback, load, reload, transition, on,
    createLifeline, updateLifeline, deleteLifeline, mountEntity, reviewAssociation,
    selectedAssocId, selectAssociation,
    updateEntityTitle, deleteEntityById,
    canGoBack, canGoForward, navigateBack, navigateForward,
    canUndo, undoLast,
    createAssoc, updateAssoc, deleteAssoc,
    selectingTarget, startSelectingTarget, cancelSelecting,
    editAssoc, openEditAssoc, closeEditAssoc,
    entityDetailCache }
})
