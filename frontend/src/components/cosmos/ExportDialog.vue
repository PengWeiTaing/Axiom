<script setup lang="ts">
import { computed } from 'vue'
import { useCosmosStore } from '@/stores/cosmos'
import { downloadBlob } from '@/composables/useDownload'
import { isoTimestamp, todayIsoDate } from '@/utils/date'

const store = useCosmosStore()
const emit = defineEmits<{ (e: 'close'): void }>()

const lifelineCount = computed(() => store.data?.lifelines.length || 0)
const entityCount = computed(() => store.data?.entities.length || 0)
const assocCount = computed(() => store.data?.associations.length || 0)

function relLabel(rt: string): string {
  const m: Record<string, string> = { co_occurrence: '共现', causal: '因果', tension: '张力', derived_from: '衍生', manual: '人工' }
  return m[rt] || rt
}

function buildMarkdownExport(data: NonNullable<typeof store.data>): string {
  const lines: string[] = []
  const now = todayIsoDate()
  lines.push(`# Axiom Atlas 导出 — ${now}`, '', '## 概览', '')

  const byKind = { task: 0, memory: 0, decision: 0, item: 0 }
  for (const e of data.entities) { if (byKind[e.kind] !== undefined) byKind[e.kind]++ }
  const byStatus = { accepted: 0, pending: 0, rejected: 0 }
  for (const a of data.associations) { if (byStatus[a.status] !== undefined) byStatus[a.status]++ }

  lines.push(`- Lifeline: ${data.lifelines.length} 条`)
  lines.push(`- Entity: ${data.entities.length} 个 (Task ${byKind.task}, Memory ${byKind.memory}, Decision ${byKind.decision}, Item ${byKind.item})`)
  lines.push(`- 关联: ${data.associations.length} 条 (已确认 ${byStatus.accepted}, 待确认 ${byStatus.pending}, 已拒绝 ${byStatus.rejected})`, '')

  const entityMap = new Map(data.entities.map(e => [e.id, e]))

  for (const ll of data.lifelines) {
    lines.push(`## Lifeline: ${ll.name}`, '')
    const llEntities = data.entities.filter(e => e.lifeline_id === ll.id)
    if (llEntities.length === 0) { lines.push('_无 entity_', ''); continue }
    for (const ent of llEntities) {
      lines.push(`- ${ent.id} ${ent.title}`)
      for (const a of data.associations) {
        if (a.from !== ent.id && a.to !== ent.id) continue
        const isFrom = a.from === ent.id
        const otherId = isFrom ? a.to : a.from
        const otherEnt = entityMap.get(otherId)
        lines.push(`  - ${relLabel(a.relation_type)} ${isFrom ? '→' : '←'} ${otherEnt?.title || otherId} (${Math.round(a.confidence * 100)}%)`)
      }
      lines.push('')
    }
  }
  return lines.join('\n')
}

function doExport(format: 'json' | 'markdown') {
  if (!store.data) return
  const now = todayIsoDate()
  let content: string; let filename: string; let mime: string
  if (format === 'json') {
    content = JSON.stringify({ exported_at: isoTimestamp(), schema_version: store.data.schema_version, root: store.data.root, lifelines: store.data.lifelines, entities: store.data.entities, associations: store.data.associations }, null, 2)
    filename = `axiom-export-${now}.json`; mime = 'application/json'
  } else {
    content = buildMarkdownExport(store.data)
    filename = `axiom-export-${now}.md`; mime = 'text/markdown'
  }
  const blob = new Blob([content], { type: mime })
  downloadBlob(blob, filename)
  emit('close')
}
</script>

<template>
  <div class="export-overlay" @click.self="emit('close')">
    <div class="export-dialog">
      <div class="export-title">导出 Atlas 数据</div>
      <div class="export-stats">
        <div class="stat-row"><span>Lifeline</span><span>{{ lifelineCount }}</span></div>
        <div class="stat-row"><span>Entity</span><span>{{ entityCount }}</span></div>
        <div class="stat-row"><span>关联</span><span>{{ assocCount }}</span></div>
      </div>
      <div class="export-options">
        <button class="export-opt" @click="doExport('json')">
          <span class="opt-title">JSON</span>
          <span class="opt-desc">完整数据，可用于备份或导入</span>
        </button>
        <button class="export-opt" @click="doExport('markdown')">
          <span class="opt-title">Markdown</span>
          <span class="opt-desc">可读摘要，按 Lifeline 分组</span>
        </button>
      </div>
      <button class="export-cancel" @click="emit('close')">取消</button>
    </div>
  </div>
</template>

<style scoped>
.export-overlay {
  position: fixed; inset: 0; z-index: 120;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
}

.export-dialog {
  background: var(--surface-1); border-radius: var(--r-2);
  padding: var(--s-4); width: 360px;
  display: flex; flex-direction: column; gap: var(--s-3);
}

.export-title {
  font-size: var(--fs-3); color: var(--text-1); font-weight: 600;
}

.export-stats {
  display: flex; flex-direction: column; gap: 4px;
  padding: var(--s-2); background: var(--surface-2); border-radius: var(--r-1);
}

.stat-row {
  display: flex; justify-content: space-between;
  font-size: var(--fs-2); color: var(--text-2);
}

.export-options {
  display: flex; flex-direction: column; gap: var(--s-2);
}

.export-opt {
  display: flex; flex-direction: column; gap: 2px;
  padding: var(--s-2); background: var(--surface-2); border: 1px solid var(--line-1);
  border-radius: var(--r-1); cursor: pointer; text-align: left;
}

.export-opt:hover { border-color: var(--accent); }

.opt-title {
  font-size: var(--fs-2); color: var(--text-1); font-weight: 500;
}

.opt-desc {
  font-size: var(--fs-1); color: var(--text-4);
}

.export-cancel {
  background: var(--surface-2); border: 1px solid var(--line-1); border-radius: var(--r-1);
  color: var(--text-2); font-size: var(--fs-2); padding: var(--s-1) var(--s-3); cursor: pointer;
  align-self: flex-end;
}
</style>
