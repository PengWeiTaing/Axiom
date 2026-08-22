<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Check, Pencil, Plus, X } from '@lucide/vue';
import { ApiError } from '@/api/client';
import {
  cancelTask,
  createTask,
  listMemories,
  reviewDecision,
  reviewGoalCommitment,
  updateGoalCommitment,
} from '@/api/knowledge';
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
import { navigateToPath } from '@/composables/useAppNavigation';
import { useModeStore } from '@/stores/mode';
import type {
  Decision,
  GoalCommitmentState,
  GoalProfile,
  Memory,
  MemoryDetail,
  ObjectKind,
  ObjectTarget,
  Task,
} from '@/api/types';

const props = withDefaults(defineProps<{
  target: ObjectTarget | null;
  intent?: 'view' | 'add-goal-action' | 'edit-goal';
}>(), {
  intent: 'view',
});
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
const goalActionOpen = ref(false);
const goalActionDraft = ref({ title: '', estimated_minutes: 25 });
const goalProfileEditing = ref(false);
const goalOptions = ref<Memory[]>([]);
const goalProfileDraft = ref({
  success_criteria: '',
  target_date: '',
  review_cadence_days: 14,
  parent_goal_id: null as number | null,
  state: 'active' as GoalCommitmentState,
});

const goalStateOptions: { value: GoalCommitmentState; label: string }[] = [
  { value: 'active', label: '推进中' },
  { value: 'paused', label: '暂停' },
  { value: 'achieved', label: '已达成' },
  { value: 'released', label: '已放下' },
];

const reviewCadenceOptions = [
  { value: 7, label: '每周' },
  { value: 14, label: '每两周' },
  { value: 30, label: '每月' },
  { value: 90, label: '每季度' },
];

const detailTarget = computed(() => (
  props.target ? { id: `${props.target.kind}:${props.target.id}` } : null
));

const {
  detail,
  detailLoading: loading,
  detailError,
  setDetail,
  loadDetail,
  updateTaskStatus,
  updateMemoryStatus,
} = useObjectDetail(detailTarget, {
  afterEntityChanged: async () => emit('changed'),
});

watch(
  [() => props.target, () => props.intent],
  () => {
    decisionReviewDraft.value = '';
    goalActionOpen.value = props.intent === 'add-goal-action';
    goalProfileEditing.value = props.intent === 'edit-goal';
    goalActionDraft.value = { title: '', estimated_minutes: 25 };
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
const isConfirmedGoal = computed(() => (
  memory.value?.category === 'goal' && memory.value.status === 'confirmed'
));
const goalProfile = computed(() => memory.value?.goal_profile ?? null);
const goalIsActive = computed(() => goalProfile.value?.state === 'active');
const canAddGoalAction = computed(() => isConfirmedGoal.value && goalIsActive.value);
const availableParentGoals = computed(() => goalOptions.value.filter((goal) => goal.id !== memory.value?.id));
const goalProgress = computed(() => {
  const linked = memory.value?.linked_tasks || [];
  return {
    total: linked.length,
    done: linked.filter((task) => task.status === 'done').length,
    open: linked.filter((task) => task.status === 'todo').length,
  };
});

watch(
  decision,
  (nextDecision) => {
    decisionReviewDraft.value = nextDecision?.actual_outcome || '';
  },
);

watch(
  goalProfile,
  (profile) => {
    if (!profile) return;
    goalProfileDraft.value = {
      success_criteria: profile.success_criteria || '',
      target_date: profile.target_date || '',
      review_cadence_days: profile.review_cadence_days,
      parent_goal_id: profile.parent_goal?.id ?? null,
      state: profile.state,
    };
  },
  { immediate: true },
);

watch(
  [isConfirmedGoal, () => memory.value?.id],
  async ([confirmed]) => {
    if (!confirmed) {
      goalOptions.value = [];
      return;
    }
    try {
      const payload = await listMemories({
        category: 'goal',
        status: 'confirmed',
        page: 1,
        page_size: 100,
      });
      goalOptions.value = payload.memories;
    } catch {
      goalOptions.value = [];
    }
  },
  { immediate: true },
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
const objectLifelineId = computed(() => (
  task.value?.lifeline_id
  || memory.value?.lifeline_id
  || decision.value?.lifeline_id
  || null
));
const collectionLabel = computed(() => {
  if (objectLifelineId.value) return '打开所属项目 / 生活线';
  return '在资料库中打开';
});

function openWorkspace() {
  if (objectLifelineId.value) {
    const raw = String(objectLifelineId.value).replace(/^lifeline:/, '');
    navigateToPath(`/app?mode=library&view=context&lifeline=${encodeURIComponent(`lifeline:${raw}`)}`);
    return;
  }
  mode.set('library');
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

async function submitGoalAction() {
  if (!memory.value || !canAddGoalAction.value || acting.value) return;
  const title = goalActionDraft.value.title.trim();
  const estimatedMinutes = Number(goalActionDraft.value.estimated_minutes);
  if (!title || !Number.isFinite(estimatedMinutes) || estimatedMinutes < 5) return;

  acting.value = true;
  error.value = null;
  feedback.value = null;
  try {
    await createTask({
      title,
      priority: 'medium',
      estimated_minutes: Math.round(estimatedMinutes),
      memory_id: memory.value.id,
    });
    goalActionDraft.value = { title: '', estimated_minutes: 25 };
    goalActionOpen.value = false;
    await loadDetail();
    feedback.value = '下一步已加入“此刻”的判断范围';
    emit('changed');
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '下一步添加失败';
  } finally {
    acting.value = false;
  }
}

function applyGoalProfile(profile: GoalProfile) {
  if (!memory.value) return;
  setDetail({ ...memory.value, goal_profile: profile } as unknown as ObjectDetail);
}

async function saveGoalProfile() {
  if (!memory.value || !goalProfile.value || acting.value) return;
  acting.value = true;
  error.value = null;
  feedback.value = null;
  try {
    const payload = await updateGoalCommitment(memory.value.id, {
      success_criteria: goalProfileDraft.value.success_criteria.trim() || null,
      target_date: goalProfileDraft.value.target_date || null,
      review_cadence_days: Number(goalProfileDraft.value.review_cadence_days),
      parent_goal_id: goalProfileDraft.value.parent_goal_id,
      state: goalProfileDraft.value.state,
    });
    applyGoalProfile(payload.goal_profile);
    goalProfileEditing.value = false;
    goalActionOpen.value = false;
    feedback.value = '承诺已更新';
    emit('changed');
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '承诺更新失败';
  } finally {
    acting.value = false;
  }
}

async function confirmGoalReview() {
  if (!memory.value || !goalProfile.value || acting.value) return;
  acting.value = true;
  error.value = null;
  feedback.value = null;
  try {
    const payload = await reviewGoalCommitment(memory.value.id);
    applyGoalProfile(payload.goal_profile);
    feedback.value = '已确认继续推进';
    emit('changed');
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '目标复盘失败';
  } finally {
    acting.value = false;
  }
}

function cancelGoalProfileEdit() {
  const profile = goalProfile.value;
  if (profile) {
    goalProfileDraft.value = {
      success_criteria: profile.success_criteria || '',
      target_date: profile.target_date || '',
      review_cadence_days: profile.review_cadence_days,
      parent_goal_id: profile.parent_goal?.id ?? null,
      state: profile.state,
    };
  }
  goalProfileEditing.value = false;
}

function startGoalProfileEdit() {
  goalActionOpen.value = false;
  goalProfileEditing.value = true;
}

function startGoalAction() {
  goalProfileEditing.value = false;
  goalActionOpen.value = true;
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
          <button class="close-btn" type="button" title="关闭" aria-label="关闭" @click="emit('close')">
            <X :size="17" />
          </button>
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
            <section v-if="isConfirmedGoal && goalProfile" class="goal-commitment">
              <header class="goal-commitment-head">
                <div>
                  <span>当前承诺</span>
                  <strong :class="`goal-state goal-state-${goalProfile.state}`">{{ goalProfile.state_label }}</strong>
                </div>
                <button
                  v-if="!goalProfileEditing"
                  class="small-icon-button"
                  type="button"
                  title="编辑承诺"
                  aria-label="编辑承诺"
                  @click="startGoalProfileEdit"
                >
                  <Pencil :size="15" />
                </button>
              </header>

              <form v-if="goalProfileEditing" class="goal-profile-form" @submit.prevent="saveGoalProfile">
                <label class="goal-profile-wide">
                  <span>怎样算完成</span>
                  <textarea
                    v-model="goalProfileDraft.success_criteria"
                    rows="3"
                    maxlength="2000"
                    placeholder="写下一个可以判断是否完成的结果"
                  />
                </label>
                <label>
                  <span>目标日期</span>
                  <input v-model="goalProfileDraft.target_date" type="date" />
                </label>
                <label>
                  <span>复盘节奏</span>
                  <select v-model.number="goalProfileDraft.review_cadence_days">
                    <option v-for="option in reviewCadenceOptions" :key="option.value" :value="option.value">
                      {{ option.label }}
                    </option>
                  </select>
                </label>
                <label>
                  <span>上层目标</span>
                  <select v-model="goalProfileDraft.parent_goal_id">
                    <option :value="null">无上层目标</option>
                    <option v-for="option in availableParentGoals" :key="option.id" :value="option.id">
                      {{ option.content }}
                    </option>
                  </select>
                </label>
                <label>
                  <span>推进状态</span>
                  <select v-model="goalProfileDraft.state">
                    <option v-for="option in goalStateOptions" :key="option.value" :value="option.value">
                      {{ option.label }}
                    </option>
                  </select>
                </label>
                <div class="goal-profile-actions goal-profile-wide">
                  <button type="submit" :disabled="acting">
                    <Check :size="15" />
                    <span>{{ acting ? '保存中' : '保存' }}</span>
                  </button>
                  <button type="button" :disabled="acting" @click="cancelGoalProfileEdit">
                    <X :size="15" />
                    <span>取消</span>
                  </button>
                </div>
              </form>

              <div v-else class="goal-profile-readout">
                <div class="goal-criteria">
                  <span>怎样算完成</span>
                  <p>{{ goalProfile.success_criteria || '尚未定义' }}</p>
                </div>
                <div class="goal-profile-meta">
                  <div>
                    <span>目标日期</span>
                    <strong>{{ goalProfile.target_date || '不设期限' }}</strong>
                  </div>
                  <div>
                    <span>复盘节奏</span>
                    <strong>每 {{ goalProfile.review_cadence_days }} 天</strong>
                  </div>
                </div>
                <button
                  v-if="goalProfile.parent_goal"
                  class="goal-parent-link"
                  type="button"
                  @click="emit('openObject', { kind: 'memory', id: goalProfile.parent_goal.id })"
                >
                  <span>上层目标</span>
                  <strong>{{ goalProfile.parent_goal.title }}</strong>
                </button>
                <div class="goal-review-line" :class="{ due: goalProfile.review_due }">
                  <div>
                    <span>{{ goalProfile.review_due ? '复盘已到期' : '最近确认' }}</span>
                    <strong>{{ formatRelative(goalProfile.last_reviewed_at || goalProfile.updated_at) }}</strong>
                  </div>
                  <button
                    v-if="goalProfile.state === 'active' || goalProfile.state === 'paused'"
                    type="button"
                    :disabled="acting"
                    @click="confirmGoalReview"
                  >
                    <Check :size="14" />
                    <span>{{ goalProfile.state === 'paused' ? '确认暂停' : '确认继续' }}</span>
                  </button>
                </div>
              </div>
            </section>
            <article v-if="isConfirmedGoal" class="goal-progress">
              <span>承诺进展</span>
              <strong v-if="goalProgress.total">
                {{ goalProgress.done }} / {{ goalProgress.total }} 已完成
              </strong>
              <strong v-else>还没有下一步</strong>
              <p v-if="goalProfile?.state !== 'active'">行动仍被保留，但不会进入“此刻”。</p>
              <p v-else-if="goalProgress.open">{{ goalProgress.open }} 个行动仍在推进</p>
              <p v-else>目标仍然有效，需要补一个可以开始的动作。</p>
            </article>
            <form v-if="canAddGoalAction && goalActionOpen" class="goal-action-form" @submit.prevent="submitGoalAction">
              <label>
                <span>下一步</span>
                <input
                  v-model="goalActionDraft.title"
                  type="text"
                  maxlength="160"
                  placeholder="写下一个可以直接开始的动作"
                  aria-label="目标的下一步"
                />
              </label>
              <label class="goal-duration-field">
                <span>预计分钟</span>
                <input
                  v-model.number="goalActionDraft.estimated_minutes"
                  type="number"
                  min="5"
                  max="480"
                  step="5"
                  aria-label="预计分钟"
                />
              </label>
              <div class="goal-action-buttons">
                <button type="submit" :disabled="acting || !goalActionDraft.title.trim()">
                  <Plus :size="15" />
                  <span>{{ acting ? '添加中' : '添加下一步' }}</span>
                </button>
                <button type="button" :disabled="acting" @click="goalActionOpen = false">取消</button>
              </div>
            </form>
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
              v-if="canAddGoalAction && !goalActionOpen"
              type="button"
              :disabled="acting"
              @click="startGoalAction"
            >补下一步</button>
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
          <button type="button" @click="openWorkspace">{{ collectionLabel }}</button>
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
.goal-progress,
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

.goal-progress {
  display: grid;
  gap: var(--s-1);
}

.goal-commitment {
  display: grid;
  gap: var(--s-3);
  padding: var(--s-3) 0;
  border-top: 1px solid var(--line-1);
  border-bottom: 1px solid var(--line-1);
}

.goal-commitment-head,
.goal-commitment-head > div,
.goal-review-line,
.goal-profile-actions button,
.goal-action-buttons button {
  display: flex;
  align-items: center;
}

.goal-commitment-head,
.goal-review-line {
  justify-content: space-between;
  gap: var(--s-3);
}

.goal-commitment-head > div {
  gap: var(--s-2);
}

.goal-commitment-head span,
.goal-profile-form label > span,
.goal-criteria > span,
.goal-profile-meta span,
.goal-parent-link span,
.goal-review-line span {
  color: var(--text-3);
  font-size: var(--fs-2);
}

.goal-state {
  padding-left: var(--s-2);
  border-left: 2px solid var(--line-2);
  color: var(--text-2);
  font-size: var(--fs-2);
  font-weight: 560;
}

.goal-state-active { border-color: var(--accent); color: var(--accent-bright); }
.goal-state-paused { border-color: var(--focus); color: var(--focus); }
.goal-state-achieved { border-color: var(--success); color: var(--success); }
.goal-state-released { border-color: var(--text-4); color: var(--text-3); }

.small-icon-button {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  color: var(--text-3);
}

.small-icon-button:hover {
  border-color: var(--line-2);
  color: var(--text-1);
}

.goal-profile-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s-3);
}

.goal-profile-form label,
.goal-criteria,
.goal-profile-meta > div,
.goal-review-line > div {
  display: grid;
  gap: var(--s-1);
}

.goal-profile-wide {
  grid-column: 1 / -1;
}

.goal-profile-form input,
.goal-profile-form select,
.goal-profile-form textarea {
  width: 100%;
  min-height: 38px;
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  background: rgba(7, 10, 15, 0.52);
  color: var(--text-1);
  font: inherit;
  padding: 0 var(--s-3);
}

.goal-profile-form textarea {
  min-height: 82px;
  resize: vertical;
  line-height: var(--lh-base);
  padding-block: var(--s-2);
}

.goal-profile-form input:focus,
.goal-profile-form select:focus,
.goal-profile-form textarea:focus {
  border-color: rgba(110, 231, 208, 0.3);
  outline: none;
}

.goal-profile-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s-2);
}

.goal-profile-actions button,
.goal-review-line button {
  justify-content: center;
  gap: var(--s-2);
  min-height: 36px;
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  color: var(--text-2);
}

.goal-profile-readout {
  display: grid;
  gap: var(--s-3);
}

.goal-criteria p,
.goal-profile-meta strong,
.goal-parent-link strong,
.goal-review-line strong {
  color: var(--text-1);
  font-size: var(--fs-3);
  font-weight: 500;
  line-height: var(--lh-base);
  overflow-wrap: anywhere;
}

.goal-profile-meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s-3);
}

.goal-parent-link {
  display: grid;
  gap: var(--s-1);
  text-align: left;
}

.goal-parent-link:hover strong {
  color: var(--accent-bright);
}

.goal-review-line {
  min-height: 44px;
  padding-top: var(--s-2);
  border-top: 1px solid var(--line-1);
}

.goal-review-line.due strong {
  color: var(--focus);
}

.goal-review-line button {
  display: inline-flex;
  padding: 0 var(--s-3);
}

.goal-progress > span,
.goal-action-form label > span {
  color: var(--text-3);
  font-size: var(--fs-2);
}

.goal-progress strong {
  color: var(--text-1);
  font-size: var(--fs-4);
  font-weight: 560;
}

.goal-progress p {
  color: var(--text-2);
  font-size: var(--fs-3);
  line-height: var(--lh-base);
}

.goal-action-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 108px;
  gap: var(--s-3);
  padding: var(--s-3) 0;
  border-top: 1px solid var(--line-1);
  border-bottom: 1px solid var(--line-1);
}

.goal-action-form label {
  display: grid;
  gap: var(--s-2);
}

.goal-action-form input {
  width: 100%;
  min-height: 38px;
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  background: rgba(7, 10, 15, 0.52);
  color: var(--text-1);
  font: inherit;
  padding: 0 var(--s-3);
}

.goal-action-form input:focus {
  border-color: rgba(110, 231, 208, 0.3);
  outline: none;
}

.goal-action-buttons {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s-2);
}

.goal-action-buttons button {
  justify-content: center;
  gap: var(--s-2);
  min-height: 38px;
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  color: var(--text-2);
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

  .goal-profile-form,
  .goal-profile-meta {
    grid-template-columns: 1fr;
  }

  .goal-profile-wide {
    grid-column: 1;
  }
}
</style>
