<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useCosmosStore } from '@/stores/cosmos'

const props = defineProps<{ defaultLifelineId?: string }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const store = useCosmosStore()

const kind = ref<'task' | 'memory' | 'decision' | 'item'>('task')
const title = ref('')
const content = ref('')
const decision = ref('')
const category = ref('fact')
const selectedLifelineId = ref(props.defaultLifelineId || '')
const submitting = ref(false)

const canSubmit = computed(() => {
  if (kind.value === 'task') return title.value.trim()
  if (kind.value === 'memory') return content.value.trim()
  if (kind.value === 'decision') return title.value.trim()
  if (kind.value === 'item') return content.value.trim()
  return false
})

const lifelines = computed(() => {
  const list: Array<{ id: string; name: string; depth: number }> = []
  if (!store.data) return list
  const r1List = store.data.lifelines.filter(l => l.parent_id === 'ROOT')
  for (const r1 of r1List) {
    list.push({ id: r1.id, name: r1.name, depth: 0 })
    const r2List = store.data.lifelines.filter(l => l.parent_id === r1.id)
    for (const r2 of r2List) {
      list.push({ id: r2.id, name: '  ' + r2.name, depth: 1 })
    }
  }
  return list
})

async function submit() {
  if (!canSubmit.value || submitting.value) return
  submitting.value = true
  try {
    let entityId: number
    let entityKind: string = kind.value
    if (kind.value === 'task') {
      const { createTask } = await import('@/api/endpoints')
      const r = await createTask({ title: title.value.trim() })
      entityId = r.task.id
    } else if (kind.value === 'memory') {
      const { createMemory: apiMem } = await import('@/api/endpoints')
      const r = await apiMem({ category: category.value as any, content: content.value.trim() })
      entityId = r.memory.id
    } else if (kind.value === 'decision') {
      const { createDecision: apiDec } = await import('@/api/endpoints')
      const r = await apiDec({ title: title.value.trim(), decision: decision.value.trim() })
      entityId = r.decision.id
    } else {
      const { addNote } = await import('@/api/endpoints')
      const r = await addNote(content.value.trim())
      entityId = r.id
      entityKind = 'item'
    }
    if (selectedLifelineId.value) {
      await store.mountEntity(entityKind, entityId, selectedLifelineId.value)
    }
    await store.reload()
    emit('close')
  } finally {
    submitting.value = false
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => { document.addEventListener('keydown', onKeydown) })
onBeforeUnmount(() => { document.removeEventListener('keydown', onKeydown) })
</script>

<template>
  <div class="qcd-overlay" @click.self="emit('close')">
    <div class="qcd-dialog">
      <div class="qcd-header">
        <span class="qcd-title">快速创建</span>
        <button class="qcd-close" @click="emit('close')">✕</button>
      </div>

      <div class="qcd-field">
        <label class="qcd-label">类型</label>
        <select v-model="kind" class="qcd-select">
          <option value="task">任务</option>
          <option value="memory">记忆</option>
          <option value="decision">决策</option>
          <option value="item">条目</option>
        </select>
      </div>

      <div v-if="kind === 'task' || kind === 'decision'" class="qcd-field">
        <label class="qcd-label">标题</label>
        <input v-model="title" class="qcd-input" placeholder="输入标题…" />
      </div>

      <div v-if="kind === 'memory' || kind === 'item'" class="qcd-field">
        <label class="qcd-label">内容</label>
        <input v-model="content" class="qcd-input" placeholder="输入内容…" />
      </div>

      <div v-if="kind === 'decision'" class="qcd-field">
        <label class="qcd-label">决策</label>
        <input v-model="decision" class="qcd-input" placeholder="决策描述（选填）" />
      </div>

      <div v-if="kind === 'memory'" class="qcd-field">
        <label class="qcd-label">分类</label>
        <select v-model="category" class="qcd-select">
          <option value="fact">事实</option>
          <option value="preference">偏好</option>
          <option value="goal">目标</option>
          <option value="relationship">关系</option>
          <option value="event">事件</option>
        </select>
      </div>

      <div class="qcd-field">
        <label class="qcd-label">归类</label>
        <select v-model="selectedLifelineId" class="qcd-select">
          <option value="">不挂载</option>
          <option v-for="ll in lifelines" :key="ll.id" :value="ll.id">{{ ll.name }}</option>
        </select>
      </div>

      <div class="qcd-actions">
        <button class="qcd-btn cancel" @click="emit('close')">取消</button>
        <button class="qcd-btn submit" :disabled="!canSubmit || submitting" @click="submit">
          {{ submitting ? '创建中…' : '创建' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.qcd-overlay {
  position: fixed; inset: 0; z-index: 120;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
}

.qcd-dialog {
  background: var(--surface-1);
  border-radius: var(--r-2);
  padding: var(--s-4);
  width: 340px;
  display: flex; flex-direction: column; gap: var(--s-2);
}

.qcd-header {
  display: flex; justify-content: space-between; align-items: center;
}

.qcd-title {
  font-size: var(--fs-3); color: var(--text-1); font-weight: 600;
}

.qcd-close {
  background: none; border: none; color: var(--text-3); font-size: var(--fs-3); cursor: pointer;
}

.qcd-field {
  display: flex; flex-direction: column; gap: 4px;
}

.qcd-label {
  font-size: var(--fs-1); color: var(--text-3);
}

.qcd-input {
  background: var(--surface-2); border: 1px solid var(--line-1); border-radius: var(--r-1);
  color: var(--text-1); font-size: var(--fs-2); padding: var(--s-1);
}

.qcd-select {
  background: var(--surface-2); border: 1px solid var(--line-1); border-radius: var(--r-1);
  color: var(--text-1); font-size: var(--fs-2); padding: var(--s-1); cursor: pointer;
}

.qcd-actions {
  display: flex; justify-content: flex-end; gap: var(--s-2); margin-top: var(--s-1);
}

.qcd-btn {
  font-size: var(--fs-2); padding: var(--s-1) var(--s-3); border-radius: var(--r-1); cursor: pointer;
}

.qcd-btn.cancel {
  background: var(--surface-2); border: 1px solid var(--line-1); color: var(--text-2);
}

.qcd-btn.submit {
  background: var(--accent); border: none; color: var(--surface-0); font-weight: 500;
}

.qcd-btn.submit:disabled {
  opacity: 0.4; cursor: default;
}
</style>
