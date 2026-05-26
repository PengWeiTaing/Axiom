<script setup lang="ts">
import { ref } from 'vue'

interface RecentEntry {
  entityId: string; title: string; kind: string
  lifelineId: string; lifelineName: string; visitedAt: number
}

const LS_KEY = 'axiom_recent_entities'

function load(): RecentEntry[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') } catch { return [] }
}

const items = ref<RecentEntry[]>(load())

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'focus-entity', entityId: string): void
}>()

function kindBadge(kind: string): string {
  return kind === 'task' ? 'T' : kind === 'memory' ? 'M' : kind === 'decision' ? 'D' : kind === 'item' ? 'I' : '?'
}

function focus(id: string) {
  emit('focus-entity', id)
  emit('close')
}

function clearAll() {
  localStorage.removeItem(LS_KEY)
  items.value = []
}
</script>

<template>
  <div class="recent-panel">
    <div class="recent-header">
      <span class="recent-title">最近访问</span>
      <button v-if="items.length > 0" class="recent-clear" @click="clearAll">清除</button>
      <button class="recent-close" @click="emit('close')">✕</button>
    </div>
    <div v-if="items.length === 0" class="recent-empty">暂无访问记录</div>
    <div class="recent-list">
      <div v-for="item in items" :key="item.entityId" class="recent-item" @click="focus(item.entityId)">
        <span class="recent-kind">{{ kindBadge(item.kind) }}</span>
        <div class="recent-info">
          <span class="recent-entity-title">{{ item.title.slice(0, 28) }}</span>
          <span class="recent-lifeline">{{ item.lifelineName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recent-panel {
  width: 260px;
  max-height: 50vh;
  overflow-y: auto;
  background: var(--surface-1);
  border-radius: var(--r-2);
  padding: var(--s-2);
  display: flex; flex-direction: column; gap: var(--s-1);
}

.recent-header {
  display: flex; align-items: center; gap: var(--s-1);
}

.recent-title {
  font-size: var(--fs-2); color: var(--text-1); font-weight: 600;
}

.recent-clear {
  background: none; border: none; color: var(--text-4); font-size: var(--fs-1); cursor: pointer; margin-left: auto;
}

.recent-close {
  background: none; border: none; color: var(--text-3); font-size: var(--fs-2); cursor: pointer;
}

.recent-empty {
  font-size: var(--fs-1); color: var(--text-4); padding: var(--s-2); text-align: center;
}

.recent-list {
  display: flex; flex-direction: column; gap: 2px;
}

.recent-item {
  display: flex; align-items: center; gap: var(--s-1); padding: 4px var(--s-1);
  cursor: pointer; border-radius: var(--r-1);
}

.recent-item:hover { background: var(--surface-2); }

.recent-kind {
  width: 16px; height: 16px; display: flex; align-items: center; justify-content: center;
  font-size: 9px; color: var(--accent); border: 1px solid var(--accent); border-radius: var(--r-1);
  flex-shrink: 0;
}

.recent-info {
  flex: 1; min-width: 0; display: flex; flex-direction: column;
}

.recent-entity-title {
  font-size: var(--fs-2); color: var(--text-1); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

.recent-lifeline {
  font-size: var(--fs-1); color: var(--text-4); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
</style>
