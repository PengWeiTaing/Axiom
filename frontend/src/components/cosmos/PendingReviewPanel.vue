<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCosmosStore } from '@/stores/cosmos'
const store = useCosmosStore()

const expandedIds = ref<Set<string>>(new Set())

function toggleEvidence(id: string) {
  if (expandedIds.value.has(id)) expandedIds.value.delete(id)
  else expandedIds.value.add(id)
  expandedIds.value = new Set(expandedIds.value)
}

function evidenceTypeLabel(t: string): string {
  const m: Record<string, string> = { semantic: '语义', keyword: '关键词', co_occurrence: '共现', temporal: '时序', causal: '因果', manual: '手动' }
  return m[t] || t
}

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'focus-entity', entityId: string): void
}>()

const pendingList = computed(() => {
  if (!store.data) return []
  return store.data.associations
    .filter(a => a.status === 'pending')
    .map(a => {
      const fromEnt = store.data?.entities.find(e => e.id === a.from)
      const toEnt = store.data?.entities.find(e => e.id === a.to)
      return { assoc: a, fromTitle: fromEnt?.title || a.from, toTitle: toEnt?.title || a.to }
    })
})

function relLabel(rt: string): string {
  const m: Record<string, string> = { co_occurrence: '共现', causal: '因果', tension: '张力', derived_from: '衍生', manual: '人工' }
  return m[rt] || rt
}

function kindBadge(id: string): string {
  const k = id.split(':')[0]
  return k === 'task' ? 'T' : k === 'memory' ? 'M' : k === 'decision' ? 'D' : k === 'item' ? 'I' : '?'
}

async function acceptAssoc(id: string) {
  await store.reviewAssociation(id, 'accepted')
}

async function rejectAssoc(id: string) {
  await store.reviewAssociation(id, 'rejected')
}

function focusEntity(id: string) {
  emit('focus-entity', id)
  emit('close')
}
</script>

<template>
  <div class="pending-panel">
    <div class="pending-header">
      <span class="pending-title">待确认关联</span>
      <span class="pending-count">共 {{ pendingList.length }} 条</span>
      <button class="pending-close" @click="emit('close')">✕</button>
    </div>
    <div v-if="pendingList.length === 0" class="pending-empty">无待确认关联</div>
    <div class="pending-list">
      <div v-for="item in pendingList" :key="item.assoc.id" class="pending-item">
        <div class="pending-assoc-info">
          <span class="pending-rel">{{ relLabel(item.assoc.relation_type) }}</span>
          <span class="pending-conf">{{ Math.round(item.assoc.confidence * 100) }}%</span>
        </div>
        <div class="pending-entity from">
          <span class="pending-kind">{{ kindBadge(item.assoc.from) }}</span>
          <span class="pending-entity-title" @click="focusEntity(item.assoc.from)">{{ item.fromTitle.slice(0, 30) }}</span>
        </div>
        <div class="pending-arrow">→</div>
        <div class="pending-entity to">
          <span class="pending-kind">{{ kindBadge(item.assoc.to) }}</span>
          <span class="pending-entity-title" @click="focusEntity(item.assoc.to)">{{ item.toTitle.slice(0, 30) }}</span>
        </div>
        <!-- evidence toggle -->
        <div v-if="item.assoc.evidence && item.assoc.evidence.length > 0" class="evidence-toggle" @click="toggleEvidence(item.assoc.id)">
          <span class="ev-toggle-icon">{{ expandedIds.has(item.assoc.id) ? '▾' : '▸' }}</span>
          <span>{{ item.assoc.evidence.length }} 条证据</span>
        </div>
        <div v-else class="no-evidence">无证据</div>
        <div v-if="expandedIds.has(item.assoc.id) && item.assoc.evidence" class="evidence-list">
          <div v-for="(ev, i) in (item.assoc.evidence || [])" :key="i" class="ev-item">
            <div class="ev-header">
              <span class="ev-type">{{ evidenceTypeLabel(ev.type) }}</span>
              <span class="ev-weight">{{ Math.round(ev.weight * 100) }}%</span>
            </div>
            <div class="ev-weight-track"><div class="ev-weight-fill" :style="{ width: (ev.weight * 100) + '%' }"></div></div>
            <div class="ev-excerpt" :title="ev.excerpt">{{ ev.excerpt.slice(0, 100) }}{{ ev.excerpt.length > 100 ? '…' : '' }}</div>
          </div>
        </div>

        <div class="pending-actions">
          <button class="pending-btn accept" @click="acceptAssoc(item.assoc.id)">✓</button>
          <button class="pending-btn reject" @click="rejectAssoc(item.assoc.id)">✗</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pending-panel {
  position: fixed;
  top: var(--s-4);
  right: var(--s-4);
  width: 320px;
  max-height: 60vh;
  overflow-y: auto;
  background: var(--surface-1);
  border-radius: var(--r-2);
  padding: var(--s-3);
  z-index: 21;
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
}

.pending-header {
  display: flex; align-items: center; gap: var(--s-1);
}

.pending-title { font-size: var(--fs-3); color: var(--text-1); font-weight: 600; }
.pending-count { font-size: var(--fs-1); color: var(--text-4); margin-left: var(--s-1); }
.pending-close { background: none; border: none; color: var(--text-3); font-size: var(--fs-3); cursor: pointer; margin-left: auto; }

.pending-empty { font-size: var(--fs-2); color: var(--text-4); text-align: center; padding: var(--s-3); }

.pending-list { display: flex; flex-direction: column; gap: var(--s-1); }

.pending-item {
  background: var(--surface-2); border-radius: var(--r-1); padding: var(--s-2);
  display: flex; flex-direction: column; gap: 4px;
}

.pending-assoc-info {
  display: flex; gap: var(--s-1); font-size: var(--fs-1);
}

.pending-rel { color: var(--accent); }
.pending-conf { color: var(--text-4); }

.pending-entity {
  display: flex; align-items: center; gap: 4px; font-size: var(--fs-1);
}

.pending-kind {
  width: 14px; height: 14px; display: flex; align-items: center; justify-content: center;
  font-size: 8px; color: var(--accent); border: 1px solid var(--accent); border-radius: var(--r-1);
  flex-shrink: 0;
}

.pending-entity-title {
  flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  color: var(--text-2); cursor: pointer;
}

.pending-entity-title:hover { color: var(--accent); }

.pending-arrow { color: var(--text-4); padding-left: 16px; font-size: var(--fs-1); }

.pending-actions {
  display: flex; gap: var(--s-1); justify-content: flex-end;
}

.pending-btn {
  background: none; border: 1px solid var(--text-4); border-radius: var(--r-1);
  color: var(--text-3); cursor: pointer; font-size: var(--fs-2); padding: 2px 8px;
}

.pending-btn.accept:hover { border-color: var(--accent); color: var(--accent); }
.pending-btn.reject:hover { border-color: var(--text-5); color: var(--text-5); }

/* evidence */
.evidence-toggle {
  display: flex; align-items: center; gap: 4px; font-size: var(--fs-1);
  color: var(--text-4); cursor: pointer; padding: 2px 0;
}

.evidence-toggle:hover { color: var(--accent); }

.no-evidence { font-size: var(--fs-1); color: var(--text-5); font-style: italic; }

.evidence-list {
  display: flex; flex-direction: column; gap: var(--s-1);
  padding-left: var(--s-1); border-left: 2px solid var(--line-2);
  margin-top: 2px;
}

.ev-item {
  display: flex; flex-direction: column; gap: 2px;
}

.ev-header {
  display: flex; gap: var(--s-1); align-items: center; font-size: var(--fs-1);
}

.ev-type { color: var(--accent); font-size: 10px; }
.ev-weight { color: var(--text-4); font-size: 10px; }

.ev-weight-track {
  height: 2px; background: var(--line-2); border-radius: 1px;
}

.ev-weight-fill {
  height: 100%; background: var(--accent); border-radius: 1px;
}

.ev-excerpt {
  font-size: var(--fs-1); color: var(--text-3); line-height: 1.4;
}
</style>
