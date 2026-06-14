<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { ApiError } from '@/api/client';
import { cancelTask, reviewDecision } from '@/api/knowledge';
import {
  decisionStatusLabel,
  memoryCategoryLabel,
  memoryStatusLabel,
  objectKindLabel,
  taskPriorityLabel,
  taskStatusLabel,
} from '@/composables/useObjectLabels';
import { useObjectDetail, type ObjectDetail } from '@/composables/useObjectDetail';
import { formatRelative } from '@/composables/useRelativeTime';
import { useWindowEventListener } from '@/composables/useEventListener';
import { useModeStore } from '@/stores/mode';
import type { Decision, MemoryDetail, ObjectKind, ObjectTarget, Task } from '@/api/types';

const props = defineProps<{ target: ObjectTarget | null }>();
const emit = defineEmits<{
  close: [];
  openItem: [id: number];
  openObject: [target: ObjectTarget];
  changed: [];
}>();

const mode = useModeStore();
const acting = ref(false);
const error = ref<string | null>(null);
const feedback = ref<string | null>(null);
const decisionReviewDraft = ref('');

const detailTarget = computed(() => (
  props.target ? { id: `${props.target.kind}:${props.target.id}` } : null
));

const {
  detail,
  detailLoading: loading,
  detailError,
  setDetail,
  updateTaskStatus,
  updateMemoryStatus,
} = useObjectDetail(detailTarget, {
  afterEntityChanged: async () => emit('changed'),
});

watch(
  () => props.target,
  () => {
    decisionReviewDraft.value = '';
    error.value = null;
    feedback.value = null;
  },
  { immediate: true },
);

const kind = computed<ObjectKind | null>(() => props.target?.kind ?? null);
const task = computed(() => (props.target?.kind === 'task' ? detail.value as Task | null : null));
const memory = computed(() => (props.target?.kind === 'memory' ? detail.value as MemoryDetail | null : null));
const decision = computed(() => (props.target?.kind === 'decision' ? detail.value as Decision | null : null));
const displayError = computed(() => error.value || (detailError.value ? '对象加载失败' : null));

watch(
  decision,
  (nextDecision) => {
    decisionReviewDraft.value = nextDecision?.actual_outcome || '';
  },
);

const title = computed(() => {
  if (task.value) return task.value.title;
  if (memory.value) return memory.value.content;
  if (decision.value) return decision.value.title;
  return kind.value ? `${objectKindLabel(kind.value)} #${props.target?.id ?? '-'}` : '';
});

const subtitle = computed(() => {
  if (task.value) return `${taskStatusLabel(task.value.status)} · ${taskPriorityLabel(task.value.priority)}`;
  if (memory.value) return `${memoryCategoryLabel(memory.value.category)} · ${memoryStatusLabel(memory.value.status)}`;
  if (decision.value) return decisionStatusLabel(decision.value.status);
  return '加载中';
});

const createdAt = computed(() => task.value?.created_at || memory.value?.created_at || decision.value?.created_at || '');

function openWorkspace() {
  if (kind.value === 'task') mode.set('tasks');
  if (kind.value === 'memory') mode.set('memories');
  if (kind.value === 'decision') mode.set('decisions');
  emit('close');
}

function openLinkedTask(id: number) {
  emit('openObject', { kind: 'task', id });
}

async function updateTask(action: 'done' | 'todo' | 'cancel') {
  if (!task.value || acting.value) return;
  acting.value = true;
  error.value = null;
  feedback.value = null;
  try {
    const id = task.value.id;
    if (action === 'cancel') {
      const payload = await cancelTask(id);
      setDetail(payload.task as unknown as ObjectDetail);
      emit('changed');
    } else {
      const ok = await updateTaskStatus(action);
      if (!ok) {
        error.value = '任务操作失败';
        return;
      }
    }
    feedback.value = taskActionLabel(action);
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '任务操作失败';
  } finally {
    acting.value = false;
  }
}

function taskActionLabel(action: 'done' | 'todo' | 'cancel'): string {
  return { done: '任务已完成', todo: '任务已恢复', cancel: '任务已取消' }[action];
}

async function updateMemory(action: 'confirm' | 'archive') {
  if (!memory.value || acting.value) return;
  acting.value = true;
  error.value = null;
  feedback.value = null;
  try {
    const ok = await updateMemoryStatus(action === 'confirm' ? 'confirmed' : 'archived');
    if (!ok) {
      error.value = '记忆操作失败';
      return;
    }
    feedback.value = memoryActionLabel(action);
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '记忆操作失败';
  } finally {
    acting.value = false;
  }
}

function memoryActionLabel(action: 'confirm' | 'archive'): string {
  return { confirm: '记忆已确认', archive: '记忆已归档' }[action];
}

async function submitDecisionReview() {
  if (!decision.value || acting.value) return;
  const actualOutcome = decisionReviewDraft.value.trim();
  if (!actualOutcome) return;
  acting.value = true;
  error.value = null;
  feedback.value = null;
  try {
    const payload = await reviewDecision(decision.value.id, actualOutcome);
    setDetail(payload.decision as unknown as ObjectDetail);
    decisionReviewDraft.value = payload.decision.actual_outcome || actualOutcome;
    feedback.value = '决策已回顾';
    emit('changed');
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '决策回顾失败';
  } finally {
    acting.value = false;
  }
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.target) {
    e.preventDefault();
    emit('close');
  }
}

useWindowEventListener('keydown', onKey);
</script>

<template>
  <Transition name="object-drawer">
    <aside v-if="target" class="object-drawer" @click.self="emit('close')">
      <div class="object-panel">
        <div v-if="loading" class="progress-bar" />

        <header class="object-head">
          <div>
            <p class="eyebrow">{{ kind ? objectKindLabel(kind) : 'Object' }}</p>
            <h2>{{ title }}</h2>
            <span>{{ subtitle }}<template v-if="createdAt"> · {{ formatRelative(createdAt) }}</template></span>
          </div>
          <button class="close-btn" type="button" aria-label="关闭" @click="emit('close')">&times;</button>
        </header>

        <section class="object-body">
          <p v-if="feedback" class="feedback-line">{{ feedback }}</p>
          <p v-if="loading" class="empty-line">加载中</p>
          <p v-else-if="displayError" class="error-line">{{ displayError }}</p>

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
              <button
                v-for="linked in memory.linked_tasks"
                :key="linked.id"
                class="linked-row"
                type="button"
                @click="openLinkedTask(linked.id)"
              >
                <strong>{{ linked.title }}</strong>
                <small>{{ taskStatusLabel(linked.status) }} · {{ taskPriorityLabel(linked.priority) }}</small>
              </button>
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
            <article v-if="decision.status === 'pending'" class="detail-block review-block">
              <span>回顾</span>
              <textarea
                v-model="decisionReviewDraft"
                aria-label="实际结果"
                rows="4"
                placeholder="实际发生了什么，是否符合预期"
              />
            </article>
          </template>
        </section>

        <footer class="object-actions">
          <template v-if="task">
            <button
              v-if="task.status !== 'done'"
              type="button"
              :disabled="acting"
              @click="updateTask('done')"
            >完成</button>
            <button
              v-if="task.status !== 'todo'"
              type="button"
              :disabled="acting"
              @click="updateTask('todo')"
            >恢复</button>
            <button
              v-if="task.status !== 'cancelled'"
              type="button"
              :disabled="acting"
              @click="updateTask('cancel')"
            >取消</button>
          </template>
          <template v-if="memory">
            <button
              v-if="memory.status === 'candidate'"
              type="button"
              :disabled="acting"
              @click="updateMemory('confirm')"
            >确认</button>
            <button
              v-if="memory.status !== 'archived'"
              type="button"
              :disabled="acting"
              @click="updateMemory('archive')"
            >归档</button>
          </template>
          <template v-if="decision?.status === 'pending'">
            <button
              type="button"
              :disabled="acting || !decisionReviewDraft.trim()"
              @click="submitDecisionReview"
            >标记已回顾</button>
          </template>
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
  z-index: 76;
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
.linked-row,
.meta-grid div,
.empty-line,
.feedback-line,
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

.review-block textarea {
  width: 100%;
  min-height: 96px;
  resize: vertical;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: rgba(7, 10, 15, 0.52);
  color: var(--text-1);
  font: inherit;
  line-height: var(--lh-base);
  padding: var(--s-3);
}

.review-block textarea:focus {
  border-color: rgba(110, 231, 208, 0.28);
  outline: none;
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

.linked-row {
  display: grid;
  gap: var(--s-1);
  width: 100%;
  text-align: left;
  transition: border-color var(--t-fast) var(--ease), background var(--t-fast) var(--ease);
}

.linked-row:hover {
  border-color: rgba(110, 231, 208, 0.25);
  background: var(--surface-2);
}

.empty-line {
  color: var(--text-3);
}

.feedback-line {
  color: var(--accent-bright);
  border-color: rgba(110, 231, 208, 0.22);
}

.error-line {
  color: var(--error);
  border-color: rgba(232, 120, 120, 0.22);
}

.object-actions {
  display: grid;
  gap: var(--s-2);
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
