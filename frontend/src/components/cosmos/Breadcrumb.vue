<script setup lang="ts">
import { computed } from 'vue'
import type { CosmosState } from '@/cosmos/types'

const props = defineProps<{ state: CosmosState }>()
const emit = defineEmits<{ nav: [state: CosmosState] }>()

const label = computed(() => {
  const s = props.state
  if (s.kind === 'global_overview') return 'Atlas'
  if (s.kind === 'region_zoom') return `Atlas › #${s.lifeline_id}`
  if (s.kind === 'node_focus') return `Atlas › #${s.entity_id}`
  if (s.kind === 'relation_reveal') return `Atlas › #${s.entity_id} (关联)`
  return 'Atlas'
})
</script>

<template>
  <div class="breadcrumb">
    <button class="crumb-link" @click="emit('nav', { kind: 'global_overview' })">Atlas</button>
    <span class="crumb-current" v-if="state.kind !== 'global_overview'"> › {{ label.split('› ').slice(1).join(' › ') }}</span>
  </div>
</template>

<style scoped>
.breadcrumb { font-size: var(--fs-2); color: var(--text-3); }
.crumb-link { background: none; border: none; color: var(--text-3); font-size: var(--fs-2); cursor: pointer; padding: 0; }
.crumb-link:hover { color: var(--text-1); }
.crumb-current { color: var(--text-2); }
</style>
