<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { ApiError } from '@/api/client';
import { getDecision, getMemory, getTask } from '@/api/endpoints';
import { formatRelative } from '@/composables/useRelativeTime';
import { useModeStore } from '@/stores/mode';
import type { Decision, MemoryDetail, ObjectKind, ObjectTarget, Task } from '@/api/types';

const props = defineProps<{ target: ObjectTarget | null }>();
const emit = defineEmits<{ close: []; openItem: [id: number] }>();

const mode = useModeStore();
const loading = ref(false);
const error = ref<string | null>(null);
const task = ref<Task | null>(null);
const memory = ref<MemoryDetail | null>(null);
const decision = ref<Decision | null>(null);

watch(
  () => props.target,
  async (target) => {
    task.value = null;
    memory.value = null;
    decision.value = null;
    error.value = null;
    if (!target) return;

    loading.value = true;
    try {
      if (target.kind === 'task') {
        task.value = (await getTask(target.id)).task;
      } else if (target.kind === 'memory') {
        memory.value = (await getMemory(target.id)).memory;
      } else {
        decision.value = (await getDecision(target.id)).decision;
      }
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : '对象加载失败';
    } finally {
      loading.value = false;
    }
  },
  { immediate: true },
);

const kind = computed<ObjectKind | null>(() => props.target?.kind ?? null);

const title = computed(() => {
  if (task.value) return task.value.title;
  if (memory.value) return memory.value.content;
  if (decision.value) return decision.value.title;
  return kind.value ? `${kindLabel(kind.value)} #${props.target?.id ?? '-'}` : '';
});

const subtitle = computed(() => {
  if (task.value) return `${taskStatusLabel(task.value.status)} · ${priorityLabel(task.value.priority)}`;
  if (memory.value) return `${memoryCategoryLabel(memory.value.category)} · ${memoryStatusLabel(memory.value.status)}`;
  if (decision.value) return decisionStatusLabel(decision.value.status);
  return '加载中';
});

const createdAt = computed(() => task.value?.created_at || memory.value?.created_at || decision.value?.created_at || '');

function kindLabel(value: ObjectKind): string {
  return { task: '任务', memory: '记忆', decision: '决策' }[value];
}

function taskStatusLabel(status: Task['status']): string {
  return { todo: '待办', done: '已完成', cancelled: '已取消' }[status];
}

function priorityLabel(priority: Task['priority']): string {
  return { high: '高优先级', medium: '中优先级', low: '低优先级' }[priority];
}

function memoryCategoryLabel(category: MemoryDetail['category']): string {
  return { fact: '事实', preference: '偏好', goal: '目标', relationship: '关系', event: '事件' }[category];
}

function memoryStatusLabel(status: MemoryDetail['status']): string {
  return { candidate: '候选', confirmed: '已确认', archived: '已归档' }[status];
}

function decisionStatusLabel(status: Decision['status']): string {
  return { pending: '待回顾', reviewed: '已回顾' }[status];
}

function openWorkspace() {
  if (kind.value === 'task') mode.set('tasks');
  if (kind.value === 'memory') mode.set('memories');
  if (kind.value === 'decision') mode.set('decisions');
  emit('close');
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.target) {
    e.preventDefault();
    emit('close');
  }
}

onMounted(() => window.addEventListener('keydown', onKey));
onBeforeUnmount(() => window.removeEventListener('keydown', onKey));
</script>

<template>
  <Transition name="object-drawer">
    <aside v-if="target" class="object-drawer" @click.self="emit('close')">
      <div class="object-panel">
        <div v-if="loading" class="progress-bar" />

        <header class="object-head">
          <div>
            <p class="eyebrow">{{ kind ? kindLabel(kind) : 'Object' }}</p>
            <h2>{{ title }}</h2>
            <span>{{ subtitle }}<template v-if="createdAt"> · {{ formatRelative(createdAt) }}</template></span>
          </div>
          <button class="close-btn" type="button" aria-label="关闭" @click="emit('close')">&times;</button>
        </header>

        <section class="object-body">
          <p v-if="loading" class="empty-line">加载中</p>
          <p v-else-if="error" class="error-line">{{ error }}</p>

          <template v-else-if="task">
            <article class="detail-block">
              <span>详情</span>
              <p>{{ task.detail || '没有补充说明' }}</p>
            </article>
            <div class="meta-grid">
              <div><span>截止</span><strong>{{ task.due_date || '未设置' }}</strong></div>
              <div><span>预计</span><strong>{{ task.estimated_minutes ? `${task.estimated_minutes} 分钟` : '未设置' }}</strong></div>
              <div><span>完成</span><strong>{{ task.completed_at ? formatRelative(task.completed_at) : '未完成' }}</strong></div>
            </div>
          </template>

          <template v-else-if="memory">
            <article v-if="memory.detail" class="detail-block">
              <span>详情</span>
              <p>{{ memory.detail }}</p>
            </article>
            <article v-if="memory.source_text" class="detail-block">
              <span>来源摘录</span>
              <p>{{ memory.source_text }}</p>
            </article>
            <button v-if="memory.source_item" class="source-card" type="button" @click="emit('openItem', memory.source_item.id)">
              <span>源记录 · {{ memory.source_item.type_label }}</span>
              <strong>{{ memory.source_item.snippet || `#${memory.source_item.id}` }}</strong>
              <small>{{ formatRelative(memory.source_item.created_at) }}</small>
            </button>
            <section v-if="memory.linked_tasks.length" class="linked-list">
              <span>关联任务</span>
              <article v-for="linked in memory.linked_tasks" :key="linked.id">
                <strong>{{ linked.title }}</strong>
                <small>{{ taskStatusLabel(linked.status) }} · {{ priorityLabel(linked.priority) }}</small>
              </article>
            </section>
          </template>

          <template v-else-if="decision">
            <article v-if="decision.context" class="detail-block">
              <span>背景</span>
              <p>{{ decision.context }}</p>
            </article>
            <article class="detail-block">
              <span>决策</span>
              <p>{{ decision.decision }}</p>
            </article>
            <article v-if="decision.reasoning" class="detail-block">
              <span>理由</span>
              <p>{{ decision.reasoning }}</p>
            </article>
            <article v-if="decision.expected_outcome || decision.actual_outcome" class="detail-block">
              <span>结果</span>
              <p v-if="decision.expected_outcome">预期：{{ decision.expected_outcome }}</p>
              <p v-if="decision.actual_outcome">实际：{{ decision.actual_outcome }}</p>
            </article>
          </template>
        </section>

        <footer class="object-actions">
          <button type="button" @click="openWorkspace">打开工作台</button>
        </footer>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.object-drawer {
  position: fixed;
  inset: 0;
  z-index: 52;
  background: rgba(7, 9, 13, 0.35);
  backdrop-filter: blur(4px);
}

.object-panel {
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  width: min(420px, 92vw);
  height: 100vh;
  overflow: hidden;
  border-left: 1px solid var(--line-2);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  box-shadow: var(--shadow-2);
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--accent);
  opacity: 0.7;
  animation: progressPulse 0.8s ease-in-out infinite;
}

@keyframes progressPulse {
  0%, 100% { opacity: 0.28; }
  50% { opacity: 0.84; }
}

.object-head {
  display: flex;
  justify-content: space-between;
  gap: var(--s-4);
  padding: var(--s-4);
  border-bottom: 1px solid var(--line-1);
}

.object-head h2 {
  max-width: 320px;
  margin: var(--s-1) 0;
  overflow-wrap: anywhere;
  color: var(--text-1);
  font-size: var(--fs-6);
  font-weight: 560;
  line-height: var(--lh-tight);
  letter-spacing: 0;
}

.object-head span,
.detail-block span,
.linked-list > span,
.source-card span,
.source-card small,
.linked-list small,
.meta-grid span {
  color: var(--text-3);
  font-size: var(--fs-2);
}

.close-btn {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: var(--r-2);
  color: var(--text-3);
  font-size: 18px;
}

.close-btn:hover {
  background: var(--surface-2);
  color: var(--text-1);
}

.object-body {
  display: grid;
  flex: 1;
  align-content: start;
  gap: var(--s-3);
  overflow-y: auto;
  padding: var(--s-4);
}

.detail-block,
.source-card,
.linked-list article,
.meta-grid div,
.empty-line,
.error-line {
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-1);
  padding: var(--s-3);
}

.detail-block {
  display: grid;
  gap: var(--s-2);
}

.detail-block p,
.source-card strong,
.linked-list strong,
.meta-grid strong {
  color: var(--text-1);
  font-size: var(--fs-3);
  font-weight: 500;
  line-height: var(--lh-base);
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--s-2);
}

.meta-grid div {
  display: grid;
  gap: var(--s-1);
}

.source-card {
  display: grid;
  gap: var(--s-1);
  text-align: left;
  transition: border-color var(--t-fast) var(--ease), background var(--t-fast) var(--ease);
}

.source-card:hover {
  border-color: rgba(110, 231, 208, 0.25);
  background: var(--surface-2);
}

.linked-list {
  display: grid;
  gap: var(--s-2);
}

.linked-list article {
  display: grid;
  gap: var(--s-1);
}

.empty-line {
  color: var(--text-3);
}

.error-line {
  color: var(--error);
  border-color: rgba(232, 120, 120, 0.22);
}

.object-actions {
  padding: var(--s-3) var(--s-4);
  border-top: 1px solid var(--line-1);
}

.object-actions button {
  width: 100%;
  min-height: 38px;
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  color: var(--text-2);
  transition: border-color var(--t-fast) var(--ease), color var(--t-fast) var(--ease);
}

.object-actions button:hover {
  border-color: rgba(110, 231, 208, 0.25);
  color: var(--text-1);
}

.object-drawer-enter-active,
.object-drawer-leave-active {
  transition: opacity var(--t-drawer) var(--ease);
}

.object-drawer-enter-active .object-panel,
.object-drawer-leave-active .object-panel {
  transition: transform var(--t-drawer) var(--ease);
}

.object-drawer-enter-from,
.object-drawer-leave-to {
  opacity: 0;
}

.object-drawer-enter-from .object-panel,
.object-drawer-leave-to .object-panel {
  transform: translateX(100%);
}

@media (max-width: 560px) {
  .meta-grid {
    grid-template-columns: 1fr;
  }
}
</style>
