<script setup lang="ts">
import { computed } from 'vue'

export interface PathHop {
  entityId: string
  entityTitle: string
  assocId: string | null
  assocType: string | null
  assocConfidence: number | null
}

const props = defineProps<{
  paths: PathHop[][]
  currentPathIndex: number
  fromTitle: string
  toTitle: string
}>()

const emit = defineEmits<{
  (e: 'prev-path'): void
  (e: 'next-path'): void
  (e: 'clear'): void
  (e: 'focus-entity', entityId: string): void
  (e: 'copied'): void
}>()

async function copyPath() {
  let md = `**路径（${hops.value} 跳）**：\n`
  currentPath.value.forEach((h, i) => {
    md += `${i + 1}. ${h.entityTitle} (\`${h.entityId}\`)\n`
    if (h.assocId) {
      md += `   [${relLabel(h.assocType || '')} ${h.assocConfidence ? Math.round(h.assocConfidence * 100) + '%' : ''}] →\n`
    }
  })
  await navigator.clipboard.writeText(md)
  emit('copied')
}

const currentPath = computed(() => props.paths[props.currentPathIndex] || [])

const hops = computed(() => currentPath.value.length - 1)

function relLabel(rt: string): string {
  const m: Record<string, string> = { co_occurrence: '共现', causal: '因果', tension: '张力', derived_from: '衍生', manual: '人工' }
  return m[rt] || rt
}

function kindBadge(entityId: string): string {
  const k = entityId.split(':')[0]
  return k === 'task' ? 'T' : k === 'memory' ? 'M' : k === 'decision' ? 'D' : k === 'item' ? 'I' : '?'
}
</script>

<template>
  <div v-if="paths.length > 0" class="path-panel">
    <div class="path-title">路径（{{ hops }} 跳）<span v-if="paths.length > 1"> 共 {{ paths.length }} 条 · {{ currentPathIndex + 1 }}/{{ paths.length }}</span></div>

    <div class="path-steps">
      <template v-for="(hop, i) in currentPath" :key="i">
        <div class="path-entity" @click="emit('focus-entity', hop.entityId)">
          <span class="path-kind">{{ kindBadge(hop.entityId) }}</span>
          <span class="path-e-title">{{ hop.entityTitle.slice(0, 30) }}</span>
        </div>
        <div v-if="hop.assocId" class="path-assoc">
          <span class="path-line">┊</span>
          <span class="path-a-type">[{{ relLabel(hop.assocType || '') }}]</span>
          <span class="path-a-conf">{{ hop.assocConfidence ? Math.round(hop.assocConfidence * 100) + '%' : '' }}</span>
        </div>
      </template>
    </div>

    <div class="path-actions">
      <button v-if="paths.length > 1" class="path-btn" :disabled="currentPathIndex === 0" @click="emit('prev-path')">上一条</button>
      <button v-if="paths.length > 1" class="path-btn" :disabled="currentPathIndex >= paths.length - 1" @click="emit('next-path')">下一条</button>
      <button class="path-btn" @click="copyPath">复制路径</button>
      <button class="path-btn clear" @click="emit('clear')">清除</button>
    </div>
  </div>
  <div v-else class="path-panel">
    <div class="path-title">未找到路径</div>
    <div class="path-none">深度 5 内无连接</div>
    <button class="path-btn clear" @click="emit('clear')">关闭</button>
  </div>
</template>

<style scoped>
.path-panel {
  position: fixed;
  top: calc(var(--s-4) + 200px);
  right: var(--s-4);
  width: 320px;
  max-height: 40vh;
  overflow-y: auto;
  background: var(--surface-1);
  border-radius: var(--r-2);
  padding: var(--s-3);
  z-index: 22;
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
}

.path-title {
  font-size: var(--fs-2);
  color: var(--text-2);
  font-weight: 500;
}

.path-steps {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.path-entity {
  display: flex;
  align-items: center;
  gap: var(--s-1);
  padding: 2px 4px;
  cursor: pointer;
  border-radius: var(--r-1);
}

.path-entity:hover { background: var(--surface-2); }

.path-kind {
  width: 16px; height: 16px;
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; color: var(--accent);
  border: 1px solid var(--accent); border-radius: var(--r-1);
  flex-shrink: 0;
}

.path-e-title {
  font-size: var(--fs-2);
  color: var(--text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.path-assoc {
  display: flex;
  align-items: center;
  gap: var(--s-1);
  padding-left: 24px;
  font-size: var(--fs-1);
}

.path-line { color: var(--text-4); }
.path-a-type { color: var(--accent); }
.path-a-conf { color: var(--text-4); font-size: 10px; }

.path-actions {
  display: flex;
  gap: var(--s-1);
}

.path-btn {
  background: var(--surface-2);
  border: 1px solid var(--line-1);
  border-radius: var(--r-1);
  color: var(--text-2);
  font-size: var(--fs-1);
  padding: 2px var(--s-2);
  cursor: pointer;
}

.path-btn:hover { border-color: var(--accent); color: var(--accent); }
.path-btn.clear { border-color: #f87171; color: #f87171; }
.path-btn:disabled { opacity: 0.3; cursor: default; }

.path-none {
  font-size: var(--fs-1);
  color: var(--text-4);
}
</style>
