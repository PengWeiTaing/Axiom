<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

export interface AssocEvidence {
  type: string
  excerpt: string
  weight: number
}

const props = defineProps<{
  fromId: string
  fromTitle: string
  toId: string
  toTitle: string
  existing?: {
    id: string
    relation_type: string
    confidence: number
    status: string
    evidence: AssocEvidence[]
  }
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'create', data: {
    from: string; to: string; relation_type: string; confidence: number; evidence: AssocEvidence[]
  }): void
  (e: 'update', data: {
    association_id: string; relation_type?: string; confidence?: number; evidence?: AssocEvidence[]
  }): void
  (e: 'delete', assocId: string): void
}>()

const relationType = ref(props.existing?.relation_type || 'manual')
const confidence = ref(props.existing?.confidence ?? 0.7)
const evidence = reactive<AssocEvidence[]>(
  props.existing?.evidence?.length
    ? props.existing.evidence.map(e => ({ ...e }))
    : [{ type: 'manual', excerpt: '', weight: 0.8 }]
)
const isNew = !props.existing
const showDeleteConfirm = ref(false)

const relationOptions = [
  { value: 'co_occurrence', label: '共现' },
  { value: 'causal', label: '因果' },
  { value: 'tension', label: '张力' },
  { value: 'derived_from', label: '衍生' },
  { value: 'manual', label: '人工标注' },
]

function addEvidence() {
  if (evidence.length < 5) {
    evidence.push({ type: 'manual', excerpt: '', weight: 0.5 })
  }
}

function removeEvidence(idx: number) {
  if (evidence.length > 1) {
    evidence.splice(idx, 1)
  }
}

function onSubmit() {
  if (isNew) {
    emit('create', {
      from: props.fromId,
      to: props.toId,
      relation_type: relationType.value,
      confidence: confidence.value,
      evidence: evidence.filter(e => e.excerpt.trim()),
    })
  } else {
    emit('update', {
      association_id: props.existing!.id,
      relation_type: relationType.value,
      confidence: confidence.value,
      evidence: evidence.filter(e => e.excerpt.trim()),
    })
  }
}

function onDelete() {
  emit('delete', props.existing!.id)
}

// Esc to close
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('cancel')
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="dialog-overlay" @click.self="emit('cancel')">
    <div class="dialog">
      <div class="dialog-title">{{ isNew ? '新建关联' : '编辑关联' }}</div>

      <div class="field-row">
        <span class="label">从</span>
        <span class="entity-ref">{{ fromTitle.slice(0, 30) }}</span>
      </div>
      <div class="field-row">
        <span class="label">到</span>
        <span class="entity-ref">{{ toTitle.slice(0, 30) }}</span>
      </div>

      <div v-if="!isNew" class="status-row">
        <span class="label">状态</span>
        <span class="status-badge" :class="props.existing!.status">
          {{ props.existing!.status === 'accepted' ? '已确认' : props.existing!.status === 'rejected' ? '已拒绝' : '待定' }}
        </span>
      </div>

      <div class="field-row">
        <label class="label" for="rel-type">关系类型</label>
        <select id="rel-type" v-model="relationType" class="field">
          <option v-for="opt in relationOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
      </div>

      <div class="field-row">
        <label class="label">
          信心度
          <span class="conf-value">{{ confidence.toFixed(2) }}</span>
        </label>
        <input v-model.number="confidence" type="range" min="0.3" max="1.0" step="0.01" class="slider" />
      </div>

      <div class="evidence-section">
        <span class="label">证据</span>
        <div v-for="(ev, i) in evidence" :key="i" class="evidence-edit-row">
          <select v-model="ev.type" class="field evidence-type-sel">
            <option value="manual">人工标注</option>
            <option value="semantic">语义相似</option>
            <option value="co_occurrence">共现统计</option>
            <option value="temporal">时间序列</option>
            <option value="causal_hint">因果模式</option>
          </select>
          <input v-model="ev.excerpt" class="field evidence-excerpt" placeholder="证据摘要（10-120 字）" />
          <button v-if="evidence.length > 1" class="btn-icon" @click="removeEvidence(i)">×</button>
        </div>
        <button v-if="evidence.length < 5" class="btn-text" @click="addEvidence">+ 添加证据</button>
      </div>

      <div class="dialog-actions">
        <button class="btn-cancel" @click="emit('cancel')">取消</button>
        <button class="btn-submit" @click="onSubmit">{{ isNew ? '创建关联' : '保存修改' }}</button>
      </div>

      <div v-if="!isNew && !showDeleteConfirm" class="delete-area">
        <button class="btn-delete" @click="showDeleteConfirm = true">删除关联</button>
      </div>
      <div v-if="showDeleteConfirm" class="delete-confirm">
        确定删除此关联？
        <button class="btn-delete" @click="onDelete">确认删除</button>
        <button class="btn-text" @click="showDeleteConfirm = false">取消</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 120;
}

.dialog {
  background: var(--surface-1);
  border-radius: var(--r-2);
  padding: var(--s-4);
  width: 380px;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
}

.dialog-title {
  font-size: var(--fs-3);
  color: var(--text-1);
  font-weight: 600;
}

.field-row {
  display: flex;
  align-items: center;
  gap: var(--s-2);
}

.label {
  font-size: var(--fs-2);
  color: var(--text-3);
  min-width: 60px;
  display: flex;
  align-items: center;
  gap: var(--s-1);
}

.conf-value {
  color: var(--accent);
  font-size: var(--fs-1);
}

.entity-ref {
  font-size: var(--fs-2);
  color: var(--text-1);
}

.field {
  background: var(--surface-2);
  border: 1px solid var(--line-1);
  border-radius: var(--r-1);
  color: var(--text-1);
  padding: var(--s-1);
  font-size: var(--fs-2);
  flex: 1;
}

select.field {
  cursor: pointer;
}

.slider {
  flex: 1;
  accent-color: var(--accent);
}

.evidence-section {
  display: flex;
  flex-direction: column;
  gap: var(--s-1);
}

.evidence-edit-row {
  display: flex;
  gap: var(--s-1);
  align-items: center;
}

.evidence-type-sel {
  min-width: 90px;
  flex: none;
}

.evidence-excerpt {
  min-width: 0;
}

.btn-icon {
  background: none;
  border: none;
  color: var(--text-4);
  cursor: pointer;
  font-size: var(--fs-3);
  flex-shrink: 0;
}

.btn-text {
  background: none;
  border: none;
  color: var(--accent);
  cursor: pointer;
  font-size: var(--fs-2);
  padding: 2px 0;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--s-2);
}

.btn-cancel {
  background: var(--surface-2);
  border: 1px solid var(--line-1);
  border-radius: var(--r-1);
  color: var(--text-2);
  font-size: var(--fs-2);
  padding: var(--s-1) var(--s-3);
  cursor: pointer;
}

.btn-submit {
  background: var(--accent);
  border: none;
  border-radius: var(--r-1);
  color: var(--surface-0);
  font-size: var(--fs-2);
  padding: var(--s-1) var(--s-3);
  cursor: pointer;
  font-weight: 500;
}

.delete-area {
  margin-top: var(--s-2);
  padding-top: var(--s-2);
  border-top: 1px solid var(--line-1);
  display: flex;
  justify-content: flex-end;
}

.btn-delete {
  background: none;
  border: 1px solid #f87171;
  border-radius: var(--r-1);
  color: #f87171;
  font-size: var(--fs-2);
  padding: var(--s-1) var(--s-3);
  cursor: pointer;
}

.delete-confirm {
  display: flex;
  align-items: center;
  gap: var(--s-2);
  color: var(--text-3);
  font-size: var(--fs-2);
}

.status-badge {
  font-size: 10px;
  padding: 0 4px;
  border-radius: var(--r-1);
}

.status-badge.accepted {
  color: var(--accent);
  border: 1px solid var(--accent);
}

.status-badge.pending {
  color: var(--text-4);
  border: 1px dashed var(--text-4);
}

.status-badge.rejected {
  color: var(--text-5);
  text-decoration: line-through;
}
</style>
