<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { useCosmosStore } from '@/stores/cosmos'
import type { CosmosEntity, CosmosAssociation } from '@/cosmos/types'

const store = useCosmosStore()

const entity = computed<CosmosEntity | null>(() => {
  const s = store.state
  if (s.kind !== 'node_focus' && s.kind !== 'relation_reveal') return null
  const eid = (s as any).entity_id as string
  return store.data?.entities.find(e => e.id === eid) ?? null
})

// Detail loading
const detail = ref<Record<string, unknown> | null>(null)
const detailLoading = ref(false)
const detailError = ref(false)

async function loadDetail() {
  if (!entity.value) return
  const eid = entity.value.id
  const cached = store.entityDetailCache.get(eid)
  if (cached) { detail.value = cached; return }

  detailLoading.value = true
  detailError.value = false
  try {
    const parts = eid.split(':')
    const kind = parts[0]
    const rawId = parseInt(parts.slice(1).join(':'), 10)
    let data: Record<string, unknown> = {}
    if (kind === 'task') {
      const { getTask } = await import('@/api/endpoints')
      const r = await getTask(rawId); data = (r as any).task || r
    } else if (kind === 'memory') {
      const { getMemory: apiGet } = await import('@/api/endpoints')
      const r = await apiGet(rawId); data = (r as any).memory || r
    } else if (kind === 'decision') {
      const { getDecision } = await import('@/api/endpoints')
      const r = await getDecision(rawId); data = (r as any).decision || r
    } else if (kind === 'item') {
      const { getItem } = await import('@/api/endpoints')
      const r = await getItem(rawId); data = (r as any).item || r
    }
    detail.value = data
    store.entityDetailCache.set(eid, data)
  } catch {
    detailError.value = true
  } finally {
    detailLoading.value = false
  }
}

watch(() => entity.value?.id, () => { detail.value = null; loadDetail() }, { immediate: true })

// Inline title editing (existing)
const editingTitle = ref(false)
const editInput = ref<HTMLInputElement | null>(null)
const editValue = ref('')

function startEditTitle() {
  if (!entity.value) return
  editValue.value = entity.value.title
  editingTitle.value = true
  nextTick(() => editInput.value?.focus())
}

async function saveTitle() {
  if (!entity.value) return
  const newT = editValue.value.trim()
  if (!newT || newT === entity.value.title) { editingTitle.value = false; return }
  const parts = entity.value.id.split(':')
  const kind = parts[0]
  const rawId = parseInt(parts.slice(1).join(':'), 10)
  try { await store.updateEntityTitle(kind, rawId, newT) } catch { await store.reload() }
  editingTitle.value = false
}

function cancelEdit() { editingTitle.value = false }
function onEditKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') { e.stopPropagation(); saveTitle() }
  else if (e.key === 'Escape') { e.stopPropagation(); cancelEdit() }
}

// Field editing
const editingField = ref<string | null>(null)
const fieldEl = ref<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>(null)
const fieldValue = ref('')

function startEditField(fieldName: string) {
  if (!detail.value) return
  const val = detail.value[fieldName]
  fieldValue.value = val !== null && val !== undefined ? String(val) : ''
  editingField.value = fieldName
  nextTick(() => fieldEl.value?.focus())
}

async function saveField() {
  if (!entity.value || !editingField.value || !detail.value) return
  const fn = editingField.value
  const newVal = fieldValue.value.trim()
  if (newVal === String(detail.value[fn] || '')) { editingField.value = null; return }
  const parts = entity.value.id.split(':')
  const kind = parts[0]
  const rawId = parseInt(parts.slice(1).join(':'), 10)
  try {
    const { updateEntityField } = await import('@/api/endpoints')
    await updateEntityField(kind, rawId, { [fn]: newVal })
    detail.value = { ...detail.value, [fn]: newVal }
    store.entityDetailCache.set(entity.value.id, detail.value)
  } catch {
    // stay in edit mode on failure
  }
  editingField.value = null
}

function cancelField() { editingField.value = null }
function onFieldKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') { e.stopPropagation(); cancelField() }
  else if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) { e.stopPropagation(); saveField() }
  else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && e.target instanceof HTMLTextAreaElement) { e.stopPropagation(); saveField() }
}

// Quick actions
async function toggleTaskDone() {
  if (!entity.value || !detail.value) return
  const parts = entity.value.id.split(':')
  const rawId = parseInt(parts.slice(1).join(':'), 10)
  const curStatus = detail.value.status as string
  try {
    if (curStatus === 'todo') {
      const { markTaskDone } = await import('@/api/endpoints')
      await markTaskDone(rawId)
      detail.value = { ...detail.value, status: 'done' }
    } else {
      const { markTaskTodo } = await import('@/api/endpoints')
      await markTaskTodo(rawId)
      detail.value = { ...detail.value, status: 'todo' }
    }
    store.entityDetailCache.set(entity.value.id, detail.value)
    await store.reload()
  } catch { await store.reload() }
}

async function confirmOrArchiveMemory() {
  if (!entity.value || !detail.value) return
  const parts = entity.value.id.split(':')
  const rawId = parseInt(parts.slice(1).join(':'), 10)
  const curStatus = detail.value.status as string
  try {
    if (curStatus === 'candidate') {
      const { confirmMemory } = await import('@/api/endpoints')
      await confirmMemory(rawId)
      detail.value = { ...detail.value, status: 'confirmed' }
    } else {
      const { archiveMemory: apiArch } = await import('@/api/endpoints')
      await apiArch(rawId)
      detail.value = { ...detail.value, status: 'archived' }
    }
    store.entityDetailCache.set(entity.value.id, detail.value)
    await store.reload()
  } catch { await store.reload() }
}

// Emits
const emit = defineEmits<{
  (e: 'edit-assoc', assoc: CosmosAssociation): void
  (e: 'delete-assoc', assocId: string): void
  (e: 'copied'): void
  (e: 'enter-relation'): void
  (e: 'navigate-entity', entityId: string): void
}>()

defineExpose({ startEditTitle })

// Association summary
const assocSummaries = computed(() => {
  if (!entity.value || !store.data) return []
  const eid = entity.value.id
  const results: Array<{ assoc: CosmosAssociation; isFrom: boolean; target: CosmosEntity }> = []
  for (const a of store.data.associations) {
    if (a.status === 'rejected') continue
    const isFrom = a.from === eid
    const isTo = a.to === eid
    if (!isFrom && !isTo) continue
    const targetId = isFrom ? a.to : a.from
    const target = store.data.entities.find(e => e.id === targetId)
    if (target) results.push({ assoc: a, isFrom, target })
  }
  return results
})

const topAssociations = computed(() => assocSummaries.value.slice(0, 5))

const assocTypeCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const { assoc } of assocSummaries.value) {
    counts[assoc.relation_type] = (counts[assoc.relation_type] || 0) + 1
  }
  return counts
})

const assocExpanded = ref(true)

function navigateAssoc(targetId: string) {
  emit('navigate-entity', targetId)
}

function relLabelShort(rt: string): string {
  const m: Record<string, string> = { co_occurrence: '共现', causal: '因果', tension: '张力', derived_from: '衍生', manual: '人工' }
  return m[rt] || rt
}

// Associations (existing full list for relation_reveal)
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

// Helpers
function kindLabel(k: string): string {
  return k === 'task' ? 'T' : k === 'memory' ? 'M' : k === 'decision' ? 'D' : k === 'item' ? 'I' : '?'
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
function oppositeEntity(assoc: CosmosAssociation) {
  const eid = entity.value!.id
  const isFrom = assoc.from === eid
  const targetId = isFrom ? assoc.to : assoc.from
  const targetKind = targetId.split(':')[0]
  const targetEntity = store.data?.entities.find(e => e.id === targetId)
  return { id: targetId, kind: targetKind, title: targetEntity?.title || targetId }
}
function switchFocus(assoc: CosmosAssociation) {
  const opp = oppositeEntity(assoc)
  store.transition({ kind: 'node_focus', entity_kind: opp.kind, entity_id: opp.id } as any)
}
function zoomToLifeline(id: string) { store.transition({ kind: 'region_zoom', lifeline_id: id } as any) }

async function copyId(id: string) {
  await navigator.clipboard.writeText(id)
  emit('copied')
}

async function copyMarkdown(ent: CosmosEntity) {
  const md = `[${ent.kind}] ${ent.title} (\`${ent.id}\`)`
  await navigator.clipboard.writeText(md)
  emit('copied')
}
async function acceptAssoc(id: string) { await store.reviewAssociation(id, 'accepted') }
async function rejectAssoc(id: string) { await store.reviewAssociation(id, 'rejected') }

// Format date
function fmtDate(iso?: string): string {
  if (!iso) return ''
  return iso.slice(0, 10)
}

// Field names per kind
function isDetailField(fn: string): boolean {
  return fn === 'detail' || fn === 'content' || fn === 'decision' || fn === 'context' || fn === 'reasoning' || fn === 'expected_outcome'
}
</script>

<template>
  <div v-if="entity" class="node-detail-card">
    <!-- 头部 -->
    <div class="card-header">
      <span class="kind-badge">{{ kindLabel(entity.kind) }}</span>
      <input
        v-if="editingTitle"
        ref="editInput"
        v-model="editValue"
        class="title-input"
        @blur="saveTitle"
        @keydown="onEditKeydown"
      />
      <span v-else class="entity-name" @dblclick="startEditTitle">{{ entity.title.slice(0, 40) }}</span>
    </div>

    <!-- 实体 ID + 复制 -->
    <div class="entity-id-row">
      <span class="entity-id" @click="copyId(entity.id)" :title="'点击复制 ' + entity.id">{{ entity.id }}</span>
      <button class="btn-copy-md" @click="copyMarkdown(entity)" title="复制为 Markdown">⎘</button>
    </div>

    <!-- lifeline 路径 -->
    <div class="lifeline-path">
      <span v-if="lifelineInfo" class="lifeline-link" @click="zoomToLifeline(lifelineInfo.id)">{{ lifelineInfo.name }}</span>
      <span v-else class="no-lifeline">未归类</span>
    </div>

    <!-- Detail loading -->
    <div v-if="detailLoading" class="detail-loading">加载详情…</div>
    <div v-else-if="detailError" class="detail-error">
      加载详情失败 <button class="btn-retry" @click="loadDetail">重试</button>
    </div>

    <!-- Detail fields -->
    <div v-else-if="detail" class="detail-section">
      <div class="section-title">详情</div>

      <!-- Field: title (for non-item) -->
      <template v-for="fn in Object.keys(detail).filter(k => !['id','created_at','updated_at','completed_at','due_date','estimated_minutes'].includes(k))" :key="fn">
        <div v-if="fn === 'title' && entity.kind !== 'item'" class="field-row">
          <span class="field-label">标题</span>
          <template v-if="editingField === fn">
            <input
              ref="fieldEl"
              v-model="fieldValue"
              class="field-input"
              @keydown="onFieldKeydown"
              @blur="saveField"
            />
          </template>
          <template v-else>
            <span class="field-value" @dblclick="startEditField(fn)">{{ (detail[fn] as string)?.slice(0, 80) || '—' }}</span>
            <button class="field-edit-btn" @click="startEditField(fn)">✎</button>
          </template>
        </div>

        <!-- Field: content (memory/item) -->
        <div v-else-if="fn === 'content' && (entity.kind === 'memory' || entity.kind === 'item')" class="field-row">
          <span class="field-label">内容</span>
          <template v-if="editingField === fn">
            <textarea
              ref="fieldEl"
              v-model="fieldValue"
              class="field-textarea"
              rows="3"
              @keydown="onFieldKeydown"
            />
            <div class="field-actions">
              <button class="btn-save" @click="saveField">保存</button>
              <button class="btn-cancel" @click="cancelField">取消</button>
            </div>
          </template>
          <template v-else>
            <span class="field-value multiline" @dblclick="startEditField(fn)">{{ (detail[fn] as string)?.slice(0, 200) || '—' }}</span>
            <button class="field-edit-btn" @click="startEditField(fn)">✎</button>
          </template>
        </div>

        <!-- Field: detail (task) -->
        <div v-else-if="fn === 'detail' && entity.kind === 'task'" class="field-row">
          <span class="field-label">描述</span>
          <template v-if="editingField === fn">
            <textarea
              ref="fieldEl"
              v-model="fieldValue"
              class="field-textarea"
              rows="3"
              @keydown="onFieldKeydown"
            />
            <div class="field-actions">
              <button class="btn-save" @click="saveField">保存</button>
              <button class="btn-cancel" @click="cancelField">取消</button>
            </div>
          </template>
          <template v-else>
            <span class="field-value multiline" @dblclick="startEditField(fn)">{{ (detail[fn] as string)?.slice(0, 200) || '—' }}</span>
            <button class="field-edit-btn" @click="startEditField(fn)">✎</button>
          </template>
        </div>

        <!-- Field: decision (decisions) -->
        <div v-else-if="fn === 'decision' && entity.kind === 'decision'" class="field-row">
          <span class="field-label">决策</span>
          <template v-if="editingField === fn">
            <textarea ref="fieldEl" v-model="fieldValue" class="field-textarea" rows="3" @keydown="onFieldKeydown" />
            <div class="field-actions">
              <button class="btn-save" @click="saveField">保存</button>
              <button class="btn-cancel" @click="cancelField">取消</button>
            </div>
          </template>
          <template v-else>
            <span class="field-value multiline" @dblclick="startEditField(fn)">{{ (detail[fn] as string)?.slice(0, 200) || '—' }}</span>
            <button class="field-edit-btn" @click="startEditField(fn)">✎</button>
          </template>
        </div>

        <!-- Field: context (decisions) -->
        <div v-else-if="fn === 'context' && entity.kind === 'decision'" class="field-row">
          <span class="field-label">背景</span>
          <template v-if="editingField === fn">
            <textarea ref="fieldEl" v-model="fieldValue" class="field-textarea" rows="2" @keydown="onFieldKeydown" />
            <div class="field-actions">
              <button class="btn-save" @click="saveField">保存</button>
              <button class="btn-cancel" @click="cancelField">取消</button>
            </div>
          </template>
          <template v-else>
            <span class="field-value multiline" @dblclick="startEditField(fn)">{{ (detail[fn] as string)?.slice(0, 120) || '—' }}</span>
            <button class="field-edit-btn" @click="startEditField(fn)">✎</button>
          </template>
        </div>

        <!-- Field: reasoning (decisions) -->
        <div v-else-if="fn === 'reasoning' && entity.kind === 'decision'" class="field-row">
          <span class="field-label">推理</span>
          <template v-if="editingField === fn">
            <textarea ref="fieldEl" v-model="fieldValue" class="field-textarea" rows="2" @keydown="onFieldKeydown" />
            <div class="field-actions">
              <button class="btn-save" @click="saveField">保存</button>
              <button class="btn-cancel" @click="cancelField">取消</button>
            </div>
          </template>
          <template v-else>
            <span class="field-value multiline" @dblclick="startEditField(fn)">{{ (detail[fn] as string)?.slice(0, 120) || '—' }}</span>
            <button class="field-edit-btn" @click="startEditField(fn)">✎</button>
          </template>
        </div>

        <!-- Field: expected_outcome (decisions) -->
        <div v-else-if="fn === 'expected_outcome' && entity.kind === 'decision'" class="field-row">
          <span class="field-label">预期</span>
          <template v-if="editingField === fn">
            <textarea ref="fieldEl" v-model="fieldValue" class="field-textarea" rows="2" @keydown="onFieldKeydown" />
            <div class="field-actions">
              <button class="btn-save" @click="saveField">保存</button>
              <button class="btn-cancel" @click="cancelField">取消</button>
            </div>
          </template>
          <template v-else>
            <span class="field-value multiline" @dblclick="startEditField(fn)">{{ (detail[fn] as string)?.slice(0, 120) || '—' }}</span>
            <button class="field-edit-btn" @click="startEditField(fn)">✎</button>
          </template>
        </div>

        <!-- Field: priority (task) -->
        <div v-else-if="fn === 'priority' && entity.kind === 'task'" class="field-row">
          <span class="field-label">优先级</span>
          <template v-if="editingField === fn">
            <select ref="fieldEl" v-model="fieldValue" class="field-select" @blur="saveField" @keydown.enter="saveField" @keydown.escape="cancelField">
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </template>
          <template v-else>
            <span class="field-value" @dblclick="startEditField(fn)">{{ detail[fn] || 'medium' }}</span>
            <button class="field-edit-btn" @click="startEditField(fn)">✎</button>
          </template>
        </div>

        <!-- Field: status (task/memory/decision) -->
        <div v-else-if="fn === 'status' && entity.kind !== 'item'" class="field-row">
          <span class="field-label">状态</span>
          <template v-if="editingField === fn">
            <select ref="fieldEl" v-model="fieldValue" class="field-select" @blur="saveField" @keydown.enter="saveField" @keydown.escape="cancelField">
              <template v-if="entity.kind === 'task'">
                <option value="todo">待办</option>
                <option value="done">完成</option>
                <option value="cancelled">取消</option>
              </template>
              <template v-else-if="entity.kind === 'memory'">
                <option value="candidate">候选</option>
                <option value="confirmed">已确认</option>
                <option value="archived">归档</option>
              </template>
              <template v-else>
                <option value="pending">待回顾</option>
                <option value="reviewed">已回顾</option>
              </template>
            </select>
          </template>
          <template v-else>
            <span class="field-value">{{ detail[fn] }}</span>
            <button class="field-edit-btn" @click="startEditField(fn)">✎</button>
          </template>
        </div>

        <!-- Field: category (memory) -->
        <div v-else-if="fn === 'category' && entity.kind === 'memory'" class="field-row">
          <span class="field-label">分类</span>
          <template v-if="editingField === fn">
            <select ref="fieldEl" v-model="fieldValue" class="field-select" @blur="saveField" @keydown.enter="saveField" @keydown.escape="cancelField">
              <option value="fact">事实</option>
              <option value="preference">偏好</option>
              <option value="goal">目标</option>
              <option value="relationship">关系</option>
              <option value="event">事件</option>
            </select>
          </template>
          <template v-else>
            <span class="field-value">{{ detail[fn] }}</span>
            <button class="field-edit-btn" @click="startEditField(fn)">✎</button>
          </template>
        </div>

        <!-- Field: source (item) - readonly -->
        <div v-else-if="fn === 'source' || fn === 'type'" class="field-row">
          <span class="field-label">{{ fn === 'source' ? '来源' : '类型' }}</span>
          <span class="field-value readonly">{{ detail[fn] || '—' }}</span>
        </div>

        <!-- Other fields - generic inline edit -->
        <div v-else-if="!isDetailField(fn) && fn !== 'title'" class="field-row">
          <span class="field-label">{{ fn }}</span>
          <template v-if="editingField === fn">
            <input ref="fieldEl" v-model="fieldValue" class="field-input" @keydown="onFieldKeydown" @blur="saveField" />
          </template>
          <template v-else>
            <span class="field-value" @dblclick="startEditField(fn)">{{ (detail[fn] as string)?.slice(0, 60) || '—' }}</span>
          </template>
        </div>
      </template>

      <!-- Dates (read-only) -->
      <div v-if="detail.created_at" class="field-row">
        <span class="field-label">创建时间</span>
        <span class="field-value readonly">{{ fmtDate(detail.created_at as string) }}</span>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="actions-section" v-if="detail">
      <template v-if="entity.kind === 'task' && detail.status !== 'cancelled'">
        <button class="btn-action" @click="toggleTaskDone">
          {{ detail.status === 'todo' ? '标记完成' : '重开任务' }}
        </button>
      </template>
      <template v-if="entity.kind === 'memory' && detail.status !== 'archived'">
        <button class="btn-action" @click="confirmOrArchiveMemory">
          {{ detail.status === 'candidate' ? '确认' : '归档' }}
        </button>
      </template>
    </div>

    <!-- 关联摘要 -->
    <div v-if="assocSummaries.length > 0" class="assoc-summary">
      <div class="assoc-title" @click="assocExpanded = !assocExpanded">
        关联 ({{ assocSummaries.length }})
        <span class="assoc-type-counts">
          <template v-for="(cnt, rt) in assocTypeCounts" :key="rt">
            <span class="assoc-type-cnt">{{ relLabelShort(rt) }}:{{ cnt }}</span>
          </template>
        </span>
        <button class="btn-r" @click.stop="emit('enter-relation')" title="查看关联 (R)">R</button>
      </div>
      <div v-if="assocExpanded" class="assoc-summary-list">
        <div
          v-for="item in topAssociations"
          :key="item.assoc.id"
          class="assoc-summary-row"
          :class="{ pending: item.assoc.status === 'pending' }"
          @click="navigateAssoc(item.target.id)"
        >
          <span class="assoc-summary-type">{{ relLabelShort(item.assoc.relation_type) }}</span>
          <span class="assoc-summary-conf">{{ Math.round(item.assoc.confidence * 100) }}%</span>
          <span class="assoc-summary-arrow">{{ item.isFrom ? '→' : '←' }}</span>
          <span class="assoc-summary-kind">{{ kindLabel(item.target.kind) }}</span>
          <span class="assoc-summary-title">{{ item.target.title.slice(0, 25) }}</span>
        </div>
        <div v-if="assocSummaries.length > 5" class="assoc-summary-more">
          … 查看全部 (共 {{ assocSummaries.length }} 条)
        </div>
      </div>
    </div>

    <!-- 关联列表（relation_reveal 详情） -->
    <div class="assoc-section">
      <div class="assoc-title">关联 ({{ entityAssociations.length }})</div>
      <div v-if="entityAssociations.length === 0" class="empty-text">暂无关联</div>
      <div v-for="a in entityAssociations" :key="a.id" class="assoc-wrapper">
        <div class="assoc-row" :class="{ pending: a.status === 'pending', expanded: store.selectedAssocId === a.id }">
          <span class="rel-badge" :style="{ color: relColor(a.relation_type) }">[{{ relLabel(a.relation_type) }}]</span>
          <span class="assoc-target" @click.stop="switchFocus(a)">{{ oppositeEntity(a).title.slice(0, 30) }}</span>
          <span class="confidence">{{ Math.round(a.confidence * 100) }}%</span>
          <span class="status-badge" :class="a.status">{{ a.status === 'accepted' ? '已确认' : '待定' }}</span>
          <span v-if="a.status === 'pending'" class="assoc-actions">
            <button class="btn-accept" @click="acceptAssoc(a.id)">✓</button>
            <button class="btn-reject" @click="rejectAssoc(a.id)">✗</button>
          </span>
          <span class="assoc-edit-actions">
            <button class="btn-edit-assoc" @click.stop="emit('edit-assoc', a)">✎</button>
            <button class="btn-del-assoc" @click.stop="emit('delete-assoc', a.id)">✕</button>
          </span>
          <button class="btn-expand" @click.stop="store.selectedAssocId === a.id ? store.selectAssociation(null) : store.selectAssociation(a.id)">{{ store.selectedAssocId === a.id ? '▾' : '▸' }}</button>
        </div>
        <div v-if="store.selectedAssocId === a.id" class="evidence-block">
          <div class="evidence-title">证据 ({{ a.evidence?.length || 0 }} 条)</div>
          <div v-if="!a.evidence || a.evidence.length === 0" class="no-evidence">暂无证据详情</div>
          <div v-for="(ev, i) in a.evidence" :key="i" class="evidence-item">
            <div class="evidence-excerpt">"{{ ev.excerpt.slice(0, 120) }}{{ ev.excerpt.length > 120 ? '…' : '' }}"</div>
            <div class="evidence-meta">
              <span class="evidence-type">{{ ev.type }}</span>
              <span class="evidence-weight">权重: {{ Math.round(ev.weight * 100) }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.node-detail-card {
  position: fixed;
  top: var(--s-4);
  right: var(--s-4);
  width: 320px;
  max-height: 70vh;
  overflow-y: auto;
  background: var(--surface-1);
  border-radius: var(--r-2);
  padding: var(--s-3);
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
}

.card-header { display: flex; align-items: center; gap: var(--s-1); }

.kind-badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 18px; height: 18px; font-size: 11px;
  color: var(--accent); border: 1px solid var(--accent); border-radius: var(--r-1); flex-shrink: 0;
}

.entity-name {
  font-weight: 600; color: var(--text-1); font-size: var(--fs-3);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; cursor: default;
}

.entity-id-row {
  display: flex; align-items: center; gap: var(--s-1);
}

.entity-id {
  font-size: 10px; color: var(--text-4); cursor: pointer; font-family: var(--font-mono);
}

.entity-id:hover { color: var(--accent); }

.btn-copy-md {
  background: none; border: none; color: var(--text-4); cursor: pointer; font-size: var(--fs-1); padding: 0 2px;
}
.btn-copy-md:hover { color: var(--accent); }

.title-input {
  flex: 1; background: var(--surface-2); border: 1px solid var(--accent); border-radius: var(--r-1);
  color: var(--text-1); font-size: var(--fs-3); font-weight: 600; padding: 2px var(--s-1); outline: none; min-width: 0;
}

.lifeline-path { font-size: var(--fs-1); }
.lifeline-link { color: var(--accent); cursor: pointer; }
.lifeline-link:hover { text-decoration: underline; }
.no-lifeline { color: var(--text-3); }

/* Detail section */
.detail-loading, .detail-error { font-size: var(--fs-2); color: var(--text-4); padding: var(--s-2); }
.btn-retry { background: none; border: 1px solid var(--accent); border-radius: var(--r-1); color: var(--accent); cursor: pointer; font-size: var(--fs-1); margin-left: var(--s-1); }

.section-title { font-size: var(--fs-1); color: var(--text-3); text-transform: uppercase; letter-spacing: 0.5px; }

.field-row {
  display: flex; align-items: flex-start; gap: var(--s-1); padding: 3px 0; position: relative;
}
.field-row:hover { background: var(--surface-2); }

.field-label {
  font-size: var(--fs-1); color: var(--text-4); min-width: 48px; padding-top: 2px; flex-shrink: 0;
}

.field-value {
  flex: 1; font-size: var(--fs-2); color: var(--text-2); min-height: 20px; cursor: default; word-break: break-word;
}
.field-value.multiline { font-size: var(--fs-1); line-height: 1.4; }
.field-value.readonly { color: var(--text-4); }

.field-edit-btn {
  display: none; background: none; border: none; color: var(--text-4); cursor: pointer; font-size: 10px; flex-shrink: 0; padding: 2px;
}
.field-row:hover .field-edit-btn { display: block; }

.field-input {
  flex: 1; background: var(--surface-2); border: 1px solid var(--accent); border-radius: var(--r-1);
  color: var(--text-1); font-size: var(--fs-2); padding: 2px var(--s-1); outline: none;
}

.field-textarea {
  flex: 1; background: var(--surface-2); border: 1px solid var(--accent); border-radius: var(--r-1);
  color: var(--text-1); font-size: var(--fs-1); padding: var(--s-1); outline: none; resize: vertical; font-family: inherit;
}

.field-select {
  background: var(--surface-2); border: 1px solid var(--accent); border-radius: var(--r-1);
  color: var(--text-1); font-size: var(--fs-2); padding: 2px var(--s-1);
}

.field-actions { display: flex; gap: var(--s-1); margin-top: 2px; flex-basis: 100%; }
.btn-save { background: var(--accent); border: none; border-radius: var(--r-1); color: var(--surface-0); font-size: var(--fs-1); padding: 2px var(--s-2); cursor: pointer; }
.btn-cancel { background: var(--surface-2); border: 1px solid var(--line-1); border-radius: var(--r-1); color: var(--text-2); font-size: var(--fs-1); padding: 2px var(--s-2); cursor: pointer; }

/* Quick actions */
.actions-section { display: flex; gap: var(--s-1); }
.btn-action {
  background: var(--surface-2); border: 1px solid var(--accent); border-radius: var(--r-1);
  color: var(--accent); font-size: var(--fs-1); padding: var(--s-1) var(--s-2); cursor: pointer;
}
.btn-action:hover { background: var(--accent); color: var(--surface-0); }

/* 关联摘要 */
.assoc-summary {
  display: flex; flex-direction: column; gap: var(--s-1);
  padding-top: var(--s-1); border-top: 1px solid var(--line-1);
}

.assoc-summary .assoc-title {
  cursor: pointer; display: flex; align-items: center; gap: var(--s-1); flex-wrap: wrap;
}

.assoc-type-counts {
  display: flex; gap: var(--s-1); font-size: var(--fs-1); font-weight: 400; color: var(--text-4);
}

.btn-r {
  background: var(--surface-2); border: 1px solid var(--accent); border-radius: var(--r-1);
  color: var(--accent); font-size: 10px; cursor: pointer; padding: 1px 6px; margin-left: auto;
}

.btn-r:hover { background: var(--accent); color: var(--surface-0); }

.assoc-summary-list {
  display: flex; flex-direction: column; gap: 2px;
}

.assoc-summary-row {
  display: flex; align-items: center; gap: 4px; padding: 3px 4px; cursor: pointer; border-radius: var(--r-1);
  font-size: var(--fs-1);
}

.assoc-summary-row:hover { background: var(--surface-2); }
.assoc-summary-row.pending { opacity: 0.55; }

.assoc-summary-type { color: var(--accent); font-size: 10px; flex-shrink: 0; }
.assoc-summary-conf { color: var(--text-4); font-size: 10px; flex-shrink: 0; }
.assoc-summary-arrow { color: var(--text-4); flex-shrink: 0; }
.assoc-summary-kind {
  width: 14px; height: 14px; display: flex; align-items: center; justify-content: center;
  font-size: 8px; color: var(--accent); border: 1px solid var(--accent); border-radius: var(--r-1);
  flex-shrink: 0;
}
.assoc-summary-title {
  flex: 1; color: var(--text-2); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

.assoc-summary-more {
  font-size: var(--fs-1); color: var(--text-4); padding: 2px 4px; cursor: pointer;
}

.assoc-summary-more:hover { color: var(--accent); }

/* Associations (keeping existing styles) */
.assoc-section { display: flex; flex-direction: column; gap: var(--s-1); }
.assoc-title { font-size: var(--fs-2); color: var(--text-2); font-weight: 500; }
.empty-text { color: var(--text-3); font-size: var(--fs-1); }
.assoc-row { display: flex; align-items: center; gap: 4px; padding: 2px 0; font-size: var(--fs-1); }
.assoc-row.pending { border-left: 2px solid var(--text-4); padding-left: 6px; }
.rel-badge { font-size: 10px; flex-shrink: 0; }
.assoc-target { flex: 1; color: var(--text-2); cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.assoc-target:hover { color: var(--accent); }
.confidence { color: var(--text-4); font-size: 10px; flex-shrink: 0; }
.status-badge { font-size: 10px; flex-shrink: 0; }
.status-badge.accepted { color: var(--accent); }
.status-badge.pending { color: var(--text-4); border: 1px dashed var(--text-4); border-radius: var(--r-1); padding: 0 2px; }
.assoc-actions { display: flex; gap: 2px; flex-shrink: 0; }
.btn-accept, .btn-reject { background: none; border: none; cursor: pointer; font-size: var(--fs-2); padding: 0 2px; line-height: 1; }
.btn-accept { color: var(--accent); }
.btn-reject { color: var(--text-5); }
.assoc-row.expanded { border-left: 2px solid var(--accent) !important; background: var(--surface-2); }
.btn-expand { background: none; border: none; color: var(--text-4); cursor: pointer; font-size: 10px; padding: 0 2px; flex-shrink: 0; }
.assoc-wrapper { display: flex; flex-direction: column; }
.evidence-block { padding: var(--s-1) var(--s-2); margin-top: 2px; background: var(--surface-0); border-radius: var(--r-1); display: flex; flex-direction: column; gap: var(--s-1); }
.evidence-title { font-size: var(--fs-1); color: var(--text-4); }
.no-evidence { font-size: var(--fs-1); color: var(--text-4); font-style: italic; }
.evidence-item { display: flex; flex-direction: column; gap: 2px; }
.evidence-excerpt { font-size: var(--fs-1); color: var(--text-2); line-height: 1.4; }
.evidence-meta { display: flex; gap: var(--s-2); font-size: 10px; color: var(--text-4); }
.evidence-type { border: 1px solid var(--text-4); border-radius: var(--r-1); padding: 0 3px; }
.evidence-weight { color: var(--text-4); }
.assoc-edit-actions { display: none; flex-shrink: 0; gap: 2px; }
.assoc-row:hover .assoc-edit-actions { display: flex; }
.btn-edit-assoc, .btn-del-assoc { background: none; border: none; cursor: pointer; font-size: 10px; padding: 0 2px; color: var(--text-4); }
.btn-edit-assoc:hover { color: var(--accent); }
.btn-del-assoc:hover { color: var(--text-5); }
</style>
