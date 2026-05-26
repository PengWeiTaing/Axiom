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
    try {
      const { apiRequest } = await import('@/api/client')
      data.value = await apiRequest<CosmosData>('/cosmos')
      historyStack.value = [{ state: { kind: 'global_overview' }, title: '全局' }]
      historyCursor.value = 0
    } catch (e: unknown) {
      try {
        const resp = await fetch('/mock/cosmos.json')
        data.value = await resp.json()
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
    const { updateEntity: apiUpdate } = await import('@/api/endpoints')
    await apiUpdate(kind, id, { title })
    await reload()
  }

  async function deleteEntityById(kind: string, id: number) {
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

  return { data, state, loading, error, load, reload, transition, on,
    createLifeline, updateLifeline, deleteLifeline, mountEntity, reviewAssociation,
    selectedAssocId, selectAssociation,
    updateEntityTitle, deleteEntityById,
    canGoBack, canGoForward, navigateBack, navigateForward,
    createAssoc, updateAssoc, deleteAssoc,
    selectingTarget, startSelectingTarget, cancelSelecting,
    editAssoc, openEditAssoc, closeEditAssoc,
    entityDetailCache }
})
