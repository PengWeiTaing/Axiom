import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { apiRequest } from '@/api/client'
import type { AtlasEdge, AtlasGraphPayload, AtlasNode } from '@/atlas/types'

type LodMode = 'overview' | 'semantic' | 'tags' | 'structure' | 'relations'

const CACHE_TTL = 30_000

export const useAtlasGraphStore = defineStore('atlasGraph', () => {
  const data = ref<AtlasGraphPayload | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const lastLoaded = ref(0)
  const selectedId = ref<string | null>(null)
  const hoveredId = ref<string | null>(null)
  const lod = ref<LodMode>('overview')
  const showStructural = ref(true)
  const showSemantic = ref(true)

  const nodeMap = computed(() => new Map((data.value?.nodes || []).map(node => [node.id, node])))

  const selectedNode = computed(() => selectedId.value ? nodeMap.value.get(selectedId.value) || null : null)

  const focusedEdges = computed(() => {
    const id = selectedId.value || hoveredId.value
    if (!id || !data.value) return []
    return data.value.edges.filter(edge => edge.source === id || edge.target === id)
  })

  const visibleEdges = computed(() => {
    if (!data.value) return []
    const focusId = selectedId.value || hoveredId.value
    return data.value.edges.filter(edge => {
      if (edge.edge_class === 'structural' && !showStructural.value) return false
      if (edge.edge_class === 'semantic' && !showSemantic.value) return false
      if (lod.value === 'structure') return edge.edge_class === 'structural'
      if (lod.value === 'relations') return edge.edge_class === 'semantic'
      if (lod.value === 'tags') {
        if (edge.edge_class === 'structural') return edge.visible_by_default
        return edge.visible_by_default && edge.strength >= 0.9
      }
      if (lod.value === 'semantic' && edge.edge_class === 'structural' && !focusId) {
        return edge.visible_by_default && edge.strength >= 0.9
      }
      if (lod.value === 'overview' && edge.edge_class === 'semantic' && !focusId) {
        return edge.visible_by_default && edge.confidence >= 0.88
      }
      return true
    })
  })

  async function load(force = false) {
    if (loading.value) return
    if (!force && data.value && Date.now() - lastLoaded.value < CACHE_TTL) return
    loading.value = true
    error.value = null
    try {
      data.value = await apiRequest<AtlasGraphPayload>('/api/atlas/graph', {
        query: { max_nodes: 300 },
      })
      lastLoaded.value = Date.now()
      if (selectedId.value && !nodeMap.value.has(selectedId.value)) selectedId.value = null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Atlas 数据加载失败'
    } finally {
      loading.value = false
    }
  }

  function selectNode(node: AtlasNode | null) {
    selectedId.value = node?.id || null
  }

  function selectNeighbor(edge: AtlasEdge) {
    if (!selectedId.value) return
    const nextId = edge.source === selectedId.value ? edge.target : edge.source
    selectedId.value = nodeMap.value.has(nextId) ? nextId : selectedId.value
  }

  return {
    data,
    loading,
    error,
    selectedId,
    hoveredId,
    selectedNode,
    focusedEdges,
    visibleEdges,
    nodeMap,
    lod,
    showStructural,
    showSemantic,
    load,
    selectNode,
    selectNeighbor,
  }
})
