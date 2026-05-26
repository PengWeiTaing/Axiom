<script setup lang="ts">
import { computed } from 'vue'
import { useCosmosStore } from '@/stores/cosmos'
import type { CosmosState } from '@/cosmos/types'

const props = defineProps<{ state: CosmosState }>()
const emit = defineEmits<{ nav: [state: CosmosState] }>()

const store = useCosmosStore()

interface Crumb { label: string; action: CosmosState | null }

const crumbs = computed<Crumb[]>(() => {
  const s = props.state
  const result: Crumb[] = [
    { label: 'Atlas', action: { kind: 'global_overview' as const } },
  ]

  const lifelineId = s.kind === 'region_zoom' ? (s as any).lifeline_id
    : (s.kind === 'node_focus' || s.kind === 'relation_reveal')
      ? store.data?.entities.find(e => e.id === (s as any).entity_id)?.lifeline_id
      : null

  if (!lifelineId) return result

  // build path up to R1
  const path: Array<{ id: string; name: string; layer: number }> = []
  let curId: string | undefined = lifelineId
  while (curId) {
    const l = store.data?.lifelines.find(ll => ll.id === curId)
    if (!l) break
    const layer = l.parent_id === 'ROOT' ? 1 : 2
    path.unshift({ id: l.id, name: l.name, layer })
    curId = l.parent_id !== 'ROOT' ? l.parent_id : undefined
  }

  for (const p of path) {
    result.push({ label: p.name, action: { kind: 'region_zoom', lifeline_id: p.id } as CosmosState })
  }

  // entity level (if node_focus or relation_reveal)
  if (s.kind === 'node_focus' || s.kind === 'relation_reveal') {
    const eid = (s as any).entity_id
    const ent = store.data?.entities.find(e => e.id === eid)
    if (ent) {
      result.push({ label: ent.title.slice(0, 20), action: null })
    }
    if (s.kind === 'relation_reveal') {
      result.push({ label: '(关联)', action: null })
    }
  }

  return result
})
</script>

<template>
  <div class="breadcrumb">
    <template v-for="(c, i) in crumbs" :key="i">
      <span v-if="i > 0" class="sep">›</span>
      <button
        v-if="c.action"
        class="crumb-link"
        @click="emit('nav', c.action)"
      >{{ c.label }}</button>
      <span v-else class="crumb-current">{{ c.label }}</span>
    </template>
  </div>
</template>

<style scoped>
.breadcrumb { font-size: var(--fs-2); color: var(--text-3); display: flex; align-items: center; gap: 4px; }
.sep { color: var(--text-4); }
.crumb-link { background: none; border: none; color: var(--text-3); font-size: var(--fs-2); cursor: pointer; padding: 0; }
.crumb-link:hover { color: var(--text-1); }
.crumb-current { color: var(--text-2); }
</style>
