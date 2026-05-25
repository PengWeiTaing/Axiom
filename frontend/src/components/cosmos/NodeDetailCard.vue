<script setup lang="ts">
import { computed } from 'vue'
import { useCosmosStore } from '@/stores/cosmos'
import type { CosmosEntity, CosmosAssociation } from '@/cosmos/types'

const store = useCosmosStore()

const entity = computed<CosmosEntity | null>(() => {
  const s = store.state
  if (s.kind !== 'node_focus' && s.kind !== 'relation_reveal') return null
  const eid = (s as any).entity_id as string
  return store.data?.entities.find(e => e.id === eid) ?? null
})

const entityAssociations = computed<CosmosAssociation[]>(() => {
  if (!entity.value || !store.data) return []
  const eid = entity.value.id
  return store.data.associations.filter(a =>
    (a.from === eid || a.to === eid) && a.status !== 'rejected'
  )
})

const lifelineInfo = computed<{ id: string; name: string } | null>(() => {
  if (!entity.value || !store.data) return null
  const lid = entity.value.lifeline_id
  if (!lid) return null
  const ll = store.data.lifelines.find(l => l.id === lid)
  return ll ? { id: ll.id, name: ll.name } : null
})

function kindLabel(kind: string): string {
  switch (kind) {
    case 'task': return 'T'
    case 'memory': return 'M'
    case 'decision': return 'D'
    case 'item': return 'I'
    default: return kind[0]?.toUpperCase() || '?'
  }
}

function relLabel(rt: string): string {
  switch (rt) {
    case 'co_occurrence': return '共现'
    case 'causal': return '因果'
    case 'tension': return '张力'
    case 'derived_from': return '衍生'
    default: return rt
  }
}

function relColor(rt: string): string {
  switch (rt) {
    case 'causal': return 'var(--accent)'
    case 'tension': return 'var(--text-5)'
    case 'derived_from': return 'var(--text-4)'
    default: return 'var(--text-3)'
  }
}

function oppositeEntity(assoc: CosmosAssociation): { id: string; kind: string; title: string } {
  const eid = entity.value!.id
  const isFrom = assoc.from === eid
  const targetId = isFrom ? assoc.to : assoc.from
  const targetKind = targetId.split(':')[0]
  const targetEntity = store.data?.entities.find(e => e.id === targetId)
  return {
    id: targetId,
    kind: targetKind,
    title: targetEntity?.title || targetId,
  }
}

function switchFocus(assoc: CosmosAssociation) {
  const opp = oppositeEntity(assoc)
  store.transition({ kind: 'node_focus', entity_kind: opp.kind, entity_id: opp.id } as any)
}

function zoomToLifeline(lifelineId: string) {
  store.transition({ kind: 'region_zoom', lifeline_id: lifelineId } as any)
}

async function acceptAssoc(assocId: string) {
  await store.reviewAssociation(assocId, 'accepted')
}

async function rejectAssoc(assocId: string) {
  await store.reviewAssociation(assocId, 'rejected')
}
</script>

<template>
  <div v-if="entity" class="node-detail-card">
    <!-- 头部 -->
    <div class="card-header">
      <span class="kind-badge">{{ kindLabel(entity.kind) }}</span>
      <span class="entity-name">{{ entity.title.slice(0, 40) }}</span>
    </div>

    <!-- lifeline 路径 -->
    <div class="lifeline-path">
      <span v-if="lifelineInfo" class="lifeline-link" @click="zoomToLifeline(lifelineInfo.id)">
        {{ lifelineInfo.name }}
      </span>
      <span v-else class="no-lifeline">未归类</span>
    </div>

    <!-- 关联列表 -->
    <div class="assoc-section">
      <div class="assoc-title">关联 ({{ entityAssociations.length }})</div>
      <div v-if="entityAssociations.length === 0" class="empty-text">暂无关联</div>
      <div
        v-for="a in entityAssociations"
        :key="a.id"
        class="assoc-row"
        :class="{ pending: a.status === 'pending' }"
      >
        <span class="rel-badge" :style="{ color: relColor(a.relation_type) }">
          [{{ relLabel(a.relation_type) }}]
        </span>
        <span class="assoc-target" @click="switchFocus(a)">
          {{ oppositeEntity(a).title.slice(0, 30) }}
        </span>
        <span class="confidence">{{ Math.round(a.confidence * 100) }}%</span>
        <span class="status-badge" :class="a.status">{{ a.status === 'accepted' ? '已确认' : '待定' }}</span>
        <span v-if="a.status === 'pending'" class="assoc-actions">
          <button class="btn-accept" @click="acceptAssoc(a.id)">✓</button>
          <button class="btn-reject" @click="rejectAssoc(a.id)">✗</button>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.node-detail-card {
  position: fixed;
  top: var(--s-4);
  right: var(--s-4);
  width: 280px;
  max-height: 60vh;
  overflow-y: auto;
  background: var(--surface-1);
  border-radius: var(--r-2);
  padding: var(--s-3);
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--s-1);
}

.kind-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  font-size: 11px;
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: var(--r-1);
  flex-shrink: 0;
}

.entity-name {
  font-weight: 600;
  color: var(--text-1);
  font-size: var(--fs-3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lifeline-path {
  font-size: var(--fs-1);
}

.lifeline-link {
  color: var(--accent);
  cursor: pointer;
}

.lifeline-link:hover {
  text-decoration: underline;
}

.no-lifeline {
  color: var(--text-3);
}

.assoc-section {
  display: flex;
  flex-direction: column;
  gap: var(--s-1);
}

.assoc-title {
  font-size: var(--fs-2);
  color: var(--text-2);
  font-weight: 500;
}

.empty-text {
  color: var(--text-3);
  font-size: var(--fs-1);
}

.assoc-row {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 0;
  font-size: var(--fs-1);
}

.assoc-row.pending {
  border-left: 2px solid var(--text-4);
  padding-left: 6px;
}

.rel-badge {
  font-size: 10px;
  flex-shrink: 0;
}

.assoc-target {
  flex: 1;
  color: var(--text-2);
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.assoc-target:hover {
  color: var(--accent);
}

.confidence {
  color: var(--text-4);
  font-size: 10px;
  flex-shrink: 0;
}

.status-badge {
  font-size: 10px;
  flex-shrink: 0;
}

.status-badge.accepted {
  color: #34d399;
}

.status-badge.pending {
  color: var(--text-4);
  border: 1px dashed var(--text-4);
  border-radius: var(--r-1);
  padding: 0 2px;
}

.assoc-actions {
  display: flex;
  gap: 2px;
  flex-shrink: 0;
}

.btn-accept, .btn-reject {
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--fs-2);
  padding: 0 2px;
  line-height: 1;
}

.btn-accept {
  color: #34d399;
}

.btn-reject {
  color: var(--text-5);
}
</style>
