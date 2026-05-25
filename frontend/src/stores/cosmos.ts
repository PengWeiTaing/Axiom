/** Cosmos Pinia store — 数据 + 状态 + 极小事件总线 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CosmosState, CosmosData } from '@/cosmos/types'

export const useCosmosStore = defineStore('cosmos', () => {
  const data = ref<CosmosData | null>(null)
  const state = ref<CosmosState>({ kind: 'global_overview' })
  const loading = ref(false)
  const error = ref<string | null>(null)

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
    } catch (e: unknown) {
      // 线上失败时退回 mock 作为 fallback
      try {
        const resp = await fetch('/mock/cosmos.json')
        data.value = await resp.json()
      } catch {
        error.value = 'Cosmos 数据加载失败'
      }
    } finally {
      loading.value = false
    }
  }

  function transition(next: CosmosState) {
    emit(`leave_${state.value.kind}`, state.value)
    state.value = next
    emit(`enter_${next.kind}`, next)
  }

  async function reload() {
    data.value = null
    error.value = null
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

  return { data, state, loading, error, load, reload, transition, on,
    createLifeline, updateLifeline, deleteLifeline, mountEntity }
})
