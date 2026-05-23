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
      const resp = await fetch('/mock/cosmos.json')
      data.value = await resp.json()
    } catch {
      error.value = 'Cosmos mock 加载失败'
    } finally {
      loading.value = false
    }
  }

  function transition(next: CosmosState) {
    emit(`leave_${state.value.kind}`, state.value)
    state.value = next
    emit(`enter_${next.kind}`, next)
  }

  return { data, state, loading, error, load, transition, on }
})
