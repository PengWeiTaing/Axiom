<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'

export interface AssocFilter29 {
  types: { causal: boolean; co_occurrence: boolean; tension: boolean; derived_from: boolean; manual: boolean }
  statuses: { accepted: boolean; pending: boolean; rejected: boolean }
}

const props = defineProps<{
  showAssoc: boolean
  filter: AssocFilter29
}>()

const emit = defineEmits<{
  (e: 'update:filter', filter: AssocFilter29): void
}>()

const faded = ref(false)
const hovering = ref(false)
let fadeTimer: number | undefined

function resetFade() {
  faded.value = false
  if (fadeTimer) clearTimeout(fadeTimer)
  fadeTimer = window.setTimeout(() => { if (!hovering.value) faded.value = true }, 5000)
}

onMounted(() => resetFade())
onBeforeUnmount(() => { if (fadeTimer) clearTimeout(fadeTimer) })

watch(() => props.showAssoc, () => resetFade())

function toggleType(t: keyof AssocFilter29['types']) {
  const next = { types: { ...props.filter.types }, statuses: { ...props.filter.statuses } }
  next.types[t] = !next.types[t]
  emit('update:filter', next)
}

function toggleStatus(s: keyof AssocFilter29['statuses']) {
  const next = { types: { ...props.filter.types }, statuses: { ...props.filter.statuses } }
  next.statuses[s] = !next.statuses[s]
  emit('update:filter', next)
}

function toggleAll() {
  const allOn = Object.values(props.filter.types).every(v => v) && Object.values(props.filter.statuses).every(v => v)
  const v = !allOn
  emit('update:filter', {
    types: { causal: v, co_occurrence: v, tension: v, derived_from: v, manual: v },
    statuses: { accepted: v, pending: v, rejected: v },
  })
}

function resetFilter() {
  emit('update:filter', {
    types: { causal: true, co_occurrence: true, tension: true, derived_from: true, manual: true },
    statuses: { accepted: true, pending: true, rejected: true },
  })
}

const hasActiveFilter = computed(() => {
  return !Object.values(props.filter.types).every(v => v) || !Object.values(props.filter.statuses).every(v => v)
})
</script>

<template>
  <div
    class="legend-bar"
    :class="{ faded: faded && !hovering }"
    @mouseenter="hovering = true; faded = false"
    @mouseleave="hovering = false; resetFade()"
  >
    <div class="legend-section">
      <span class="legend-title">节点</span>
      <span class="legend-item"><span class="dot task">■</span> 任务</span>
      <span class="legend-item"><span class="dot memory">●</span> 记忆</span>
      <span class="legend-item"><span class="dot decision">◆</span> 决策</span>
      <span class="legend-item"><span class="dot item">▲</span> 条目</span>
    </div>
    <template v-if="showAssoc">
      <div class="legend-sep">|</div>
      <div class="legend-section">
        <span class="legend-title">关联</span>
        <span class="legend-item" :class="{ inactive: !filter.types.causal }" @click="toggleType('causal')"><span class="line-sample causal" /> 因果</span>
        <span class="legend-item" :class="{ inactive: !filter.types.co_occurrence }" @click="toggleType('co_occurrence')"><span class="line-sample co" /> 共现</span>
        <span class="legend-item" :class="{ inactive: !filter.types.tension }" @click="toggleType('tension')"><span class="line-sample tension" /> 张力</span>
        <span class="legend-item" :class="{ inactive: !filter.types.derived_from }" @click="toggleType('derived_from')"><span class="line-sample derived" /> 衍生</span>
      </div>
      <div class="legend-sep">|</div>
      <div class="legend-section">
        <span class="legend-item" :class="{ inactive: !filter.statuses.accepted }" @click="toggleStatus('accepted')">已确认</span>
        <span class="legend-item" :class="{ inactive: !filter.statuses.pending }" @click="toggleStatus('pending')">待确认</span>
      </div>
      <span class="legend-item" :class="{ inactive: Object.values(filter.types).every(v => v) && Object.values(filter.statuses).every(v => v) }" @click="toggleAll">全部</span>
      <span v-if="hasActiveFilter" class="legend-reset" @click="resetFilter">重置</span>
    </template>
  </div>
</template>

<style scoped>
.legend-bar {
  position: absolute;
  bottom: var(--s-4);
  left: var(--s-3);
  display: flex;
  align-items: center;
  gap: var(--s-2);
  padding: var(--s-1) var(--s-2);
  background: var(--surface-1);
  border-radius: var(--r-2);
  z-index: 21;
  font-size: var(--fs-1);
  color: var(--text-3);
  transition: opacity 0.5s var(--ease);
}

.legend-bar.faded { opacity: 0.3; }

.legend-section {
  display: flex;
  align-items: center;
  gap: var(--s-1);
}

.legend-title {
  color: var(--text-4);
  margin-right: var(--s-1);
}

.legend-sep { color: var(--text-5); }

.legend-item {
  cursor: pointer;
  transition: opacity 0.2s;
  display: flex; align-items: center; gap: 2px;
}

.legend-item:hover { opacity: 0.8; }

.legend-item.inactive {
  opacity: 0.35;
  text-decoration: line-through;
}

.legend-reset {
  color: var(--accent);
  cursor: pointer;
  font-size: 10px;
  margin-left: var(--s-1);
}

.dot { font-size: 12px; }
.dot.task { color: var(--accent); }
.dot.memory { color: var(--text-2); }
.dot.decision { color: var(--warm); }
.dot.item { color: var(--text-3); }

.line-sample {
  display: inline-block;
  width: 16px;
  height: 2px;
  border-radius: 1px;
  vertical-align: middle;
  margin-right: 2px;
  pointer-events: none;
}

.line-sample.causal { background: var(--accent); }
.line-sample.co { background: var(--text-3); }
.line-sample.tension { background: var(--warm); }
.line-sample.derived { background: var(--text-4); }
</style>
