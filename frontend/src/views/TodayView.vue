<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import {
  ArrowRight,
  Brain,
  CalendarDays,
  Check,
  Circle,
  CircleCheck,
  Clock,
  FileText,
  GitFork,
  History,
  Inbox,
  Plus,
  RefreshCw,
  Save,
  Target,
  X,
} from '@lucide/vue';
import { ApiError } from '@/api/client';
import {
  completeContextAction,
  dismissContextNudge,
  getNowContext,
  submitContextFeedback,
} from '@/api/context';
import { listDecisions, listMemories } from '@/api/knowledge';
import {
  addWeeklyPlanTask,
  getWeeklyPlan,
  removeWeeklyPlanSelection,
  saveWeeklyReview,
} from '@/api/planning';
import { getOverview } from '@/api/records';
import type {
  ContextAction,
  ContextCommitmentAttention,
  ContextFitFeedback,
  ContextGoal,
  ContextNudge,
  ContextCommitmentGoal,
  ContextOutcome,
  Decision,
  Item,
  Memory,
  NowContextPayload,
  ObjectTarget,
  OverviewPayload,
  Task,
  WeeklyPlanItem,
  WeeklyPlanPayload,
  WeeklyDecompositionFit,
} from '@/api/types';
import ItemDrawer from '@/components/ItemDrawer.vue';
import ObjectDrawer from '@/components/ObjectDrawer.vue';
import { formatRelative } from '@/composables/useRelativeTime';
import { useModeStore } from '@/stores/mode';

const props = defineProps<{ revision?: number }>();
const emit = defineEmits<{ capture: [] }>();

const mode = useModeStore();
const loading = ref(false);
const error = ref<string | null>(null);
const overview = ref<OverviewPayload | null>(null);
const nowContext = ref<NowContextPayload | null>(null);
const candidateMemories = ref<Memory[]>([]);
const pendingDecisions = ref<Decision[]>([]);
const selectedItemId = ref<number | null>(null);
const selectedObject = ref<ObjectTarget | null>(null);
const selectedObjectIntent = ref<'view' | 'add-goal-action' | 'edit-goal'>('view');
const completingId = ref<number | null>(null);
const feedbackOutcome = ref<ContextOutcome | null>(null);
const feedbackEffect = ref<string | null>(null);
const feedbackSubmitting = ref(false);
const weeklyPlan = ref<WeeklyPlanPayload | null>(null);
const weekEditing = ref(false);
const weekMutatingId = ref<number | null>(null);
const weekReviewOpen = ref(false);
const weekReviewSaving = ref(false);
const weekReviewSaved = ref(false);
const dismissingNudgeId = ref<string | null>(null);
const weekReviewDraft = ref({
  decomposition_fit: 'right' as WeeklyDecompositionFit,
  reflection: '',
});

const feedbackOptions: { value: ContextFitFeedback; label: string }[] = [
  { value: 'right', label: '正合适' },
  { value: 'too_heavy', label: '有点重' },
  { value: 'wrong_time', label: '时机不对' },
];

const weekReviewOptions: { value: WeeklyDecompositionFit; label: string }[] = [
  { value: 'right', label: '粒度合适' },
  { value: 'too_coarse', label: '步骤偏大' },
  { value: 'too_fine', label: '步骤偏碎' },
];

const dateLabel = new Intl.DateTimeFormat('zh-CN', {
  month: 'long',
  day: 'numeric',
  weekday: 'long',
}).format(new Date());

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 6) return '夜深了';
  if (hour < 11) return '早上好';
  if (hour < 14) return '中午好';
  if (hour < 18) return '下午好';
  return '晚上好';
});

const primaryAction = computed(() => nowContext.value?.focus ?? null);
const primaryTask = computed(() => primaryAction.value?.task ?? null);
const primaryCues = computed(() => {
  const action = primaryAction.value;
  if (!action) return [];
  return action.cues.filter((cue) => cue !== action.reason.label);
});
const nextActions = computed(() => nowContext.value?.alternatives ?? []);
const weeklySelected = computed(() => weeklyPlan.value?.selected ?? []);
const weeklyCandidates = computed(() => weeklyPlan.value?.candidates ?? []);
const weekRangeLabel = computed(() => {
  if (!weeklyPlan.value) return '';
  return `${shortDate(weeklyPlan.value.week_start)} - ${shortDate(weeklyPlan.value.week_end)}`;
});
const goalAttention = computed(() => nowContext.value?.commitments.attention ?? []);
const contextNudges = computed(() => nowContext.value?.nudges ?? []);
const firstGoalAttention = computed(() => goalAttention.value[0] ?? null);
const recentItems = computed(() => overview.value?.recent.items.slice(0, 5) ?? []);
const backlogTotal = computed(() => overview.value?.processing_backlog.total ?? 0);
const judgementTotal = computed(() => (
  (nowContext.value?.commitments.attention_total ?? 0)
  + contextNudges.value.length
  + candidateMemories.value.length
  + pendingDecisions.value.length
));

function actionMeta(action: ContextAction): string {
  return action.cues.slice(0, 3).join(' · ');
}

function compact(value: string | null | undefined, fallback: string, limit = 92): string {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text) return fallback;
  return text.length > limit ? `${text.slice(0, limit - 1)}…` : text;
}

function shortDate(value: string): string {
  const [, month, day] = value.split('-').map(Number);
  return `${month}月${day}日`;
}

function weeklyItemMeta(item: WeeklyPlanItem): string {
  if (!item.task) return '原行动已删除';
  if (item.state === 'completed') return '已完成';
  if (item.state === 'unavailable') return '当前不可推进';
  if (item.subtask_progress?.total) {
    return `${item.subtask_progress.done} / ${item.subtask_progress.total} 个步骤已完成`;
  }
  if (item.task.goal) return `推进「${compact(item.task.goal.title, '已确认目标', 28)}」`;
  if (item.task.lifeline_name) return item.task.lifeline_name;
  return item.task.estimated_minutes ? `预计 ${item.task.estimated_minutes} 分钟` : '本周已承诺';
}

function syncWeekReviewDraft(plan: WeeklyPlanPayload | null) {
  const saved = plan?.review.saved_feedback;
  weekReviewDraft.value = {
    decomposition_fit: saved?.decomposition_fit ?? 'right',
    reflection: saved?.reflection ?? '',
  };
  weekReviewSaved.value = false;
}

function itemTitle(item: Item): string {
  return compact(item.content || item.derived_text || item.transcript_text || item.original_name, `记录 #${item.id}`);
}

function itemTypeLabel(item: Item): string {
  return { text: '文字', image: '图片', document: '文档', audio: '音频' }[item.type];
}

async function load() {
  loading.value = true;
  error.value = null;
  feedbackOutcome.value = null;
  feedbackEffect.value = null;
  try {
    const [overviewPayload, contextPayload, weeklyPayload, memoryPayload, decisionPayload] = await Promise.all([
      getOverview({ recent_limit: 6, preview_chars: 140 }),
      getNowContext(5),
      getWeeklyPlan(),
      listMemories({ status: 'candidate', page: 1, page_size: 4 }),
      listDecisions({ status: 'pending', page: 1, page_size: 4 }),
    ]);
    overview.value = overviewPayload;
    nowContext.value = contextPayload;
    weeklyPlan.value = weeklyPayload;
    syncWeekReviewDraft(weeklyPayload);
    candidateMemories.value = memoryPayload.memories;
    pendingDecisions.value = decisionPayload.decisions;
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '此刻状态加载失败';
  } finally {
    loading.value = false;
  }
}

async function finishTask(task: Task) {
  if (completingId.value !== null) return;
  completingId.value = task.id;
  error.value = null;
  try {
    const result = await completeContextAction(task.id);
    nowContext.value = result.now_context;
    feedbackOutcome.value = result.outcome;
    feedbackEffect.value = null;
    try {
      weeklyPlan.value = await getWeeklyPlan();
    } catch {
      error.value = '行动已完成，本周进度暂未刷新';
    }
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '任务完成失败';
  } finally {
    completingId.value = null;
  }
}

async function addToWeek(task: Task) {
  if (weekMutatingId.value !== null) return;
  weekMutatingId.value = task.id;
  error.value = null;
  try {
    const result = await addWeeklyPlanTask(task.id);
    weeklyPlan.value = result.week_plan;
    nowContext.value = result.now_context;
    if (result.week_plan.summary.capacity_remaining === 0) weekEditing.value = false;
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '加入本周失败';
  } finally {
    weekMutatingId.value = null;
  }
}

async function removeFromWeek(item: WeeklyPlanItem) {
  if (weekMutatingId.value !== null || item.state === 'completed') return;
  weekMutatingId.value = item.id;
  error.value = null;
  try {
    const result = await removeWeeklyPlanSelection(item.id);
    weeklyPlan.value = result.week_plan;
    nowContext.value = result.now_context;
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '移出本周失败';
  } finally {
    weekMutatingId.value = null;
  }
}

function toggleWeekReview() {
  weekReviewOpen.value = !weekReviewOpen.value;
  if (weekReviewOpen.value) syncWeekReviewDraft(weeklyPlan.value);
}

async function submitWeekReview() {
  if (!weeklyPlan.value || weekReviewSaving.value) return;
  weekReviewSaving.value = true;
  weekReviewSaved.value = false;
  error.value = null;
  try {
    const plan = await saveWeeklyReview(
      weekReviewDraft.value.decomposition_fit,
      weekReviewDraft.value.reflection.trim(),
    );
    weeklyPlan.value = plan;
    syncWeekReviewDraft(plan);
    weekReviewSaved.value = true;
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '本周复盘保存失败';
  } finally {
    weekReviewSaving.value = false;
  }
}

async function sendFeedback(fitFeedback: ContextFitFeedback) {
  if (!feedbackOutcome.value || feedbackSubmitting.value) return;
  feedbackSubmitting.value = true;
  error.value = null;
  try {
    const result = await submitContextFeedback(feedbackOutcome.value.id, fitFeedback);
    feedbackOutcome.value = result.outcome;
    feedbackEffect.value = result.effect;
    nowContext.value = result.now_context;
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '反馈记录失败';
  } finally {
    feedbackSubmitting.value = false;
  }
}

function dismissFeedback() {
  feedbackOutcome.value = null;
  feedbackEffect.value = null;
}

function openTask(task: Task) {
  selectedObjectIntent.value = 'view';
  selectedObject.value = { kind: 'task', id: task.id };
}

function openTaskById(id: number) {
  selectedObjectIntent.value = 'view';
  selectedObject.value = { kind: 'task', id };
}

function openMemory(memory: Memory) {
  selectedObjectIntent.value = 'view';
  selectedObject.value = { kind: 'memory', id: memory.id };
}

function openDecision(decision: Decision) {
  selectedObjectIntent.value = 'view';
  selectedObject.value = { kind: 'decision', id: decision.id };
}

function openGoal(
  goal: ContextGoal | ContextCommitmentGoal,
  intent: 'view' | 'add-goal-action' | 'edit-goal' = 'view',
) {
  selectedObjectIntent.value = intent;
  selectedObject.value = { kind: 'memory', id: goal.id };
}

function openGoalAttention(goal: ContextCommitmentAttention) {
  if (goal.attention_action === 'add_action') {
    openGoal(goal, 'add-goal-action');
    return;
  }
  openGoal(goal, goal.attention_action === 'edit_commitment' ? 'edit-goal' : 'view');
}

async function openContextNudge(nudge: ContextNudge) {
  if (nudge.target.kind === 'task') {
    openTaskById(nudge.target.id);
    return;
  }
  weekReviewOpen.value = true;
  syncWeekReviewDraft(weeklyPlan.value);
  await nextTick();
  document.getElementById('week-review')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function dismissNudge(nudge: ContextNudge) {
  if (dismissingNudgeId.value) return;
  dismissingNudgeId.value = nudge.id;
  error.value = null;
  try {
    const result = await dismissContextNudge(nudge.id);
    nowContext.value = result.now_context;
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '提示暂时无法忽略';
  } finally {
    dismissingNudgeId.value = null;
  }
}

function openObject(target: ObjectTarget) {
  selectedObjectIntent.value = 'view';
  selectedObject.value = target;
}

onMounted(load);
watch(() => props.revision, load);
</script>

<template>
  <main class="today-view">
    <header class="today-header">
      <div>
        <p class="date">{{ dateLabel }}</p>
        <h1>{{ greeting }}</h1>
      </div>
      <button class="icon-button" type="button" title="刷新" aria-label="刷新此刻" :disabled="loading" @click="load">
        <RefreshCw :size="18" :class="{ spinning: loading }" />
      </button>
    </header>

    <p v-if="error" class="notice" role="alert">{{ error }}</p>

    <section class="focus-section" aria-labelledby="focus-title">
      <div class="section-kicker">
        <span class="focus-dot" />
        <span>当前焦点</span>
      </div>

      <template v-if="primaryTask && primaryAction">
        <button class="focus-copy" type="button" @click="openTask(primaryTask)">
          <span class="focus-reason">{{ primaryAction.reason.label }}</span>
          <h2 id="focus-title">{{ primaryTask.title }}</h2>
          <p>{{ primaryAction.reason.detail }}</p>
        </button>
        <button v-if="primaryTask.goal" class="focus-goal" type="button" @click="openGoal(primaryTask.goal)">
          <Target :size="15" />
          <span v-if="primaryAction.reason.code === 'goal_progress'">查看目标与进展</span>
          <span v-else>同时推进「{{ compact(primaryTask.goal.title, '已确认目标', 40) }}」</span>
          <ArrowRight :size="14" />
        </button>
        <button
          v-if="primaryTask.parent_task?.available && primaryTask.parent_task.id"
          class="focus-goal focus-source"
          type="button"
          @click="openTaskById(primaryTask.parent_task.id)"
        >
          <GitFork :size="15" />
          <span>来自「{{ compact(primaryTask.parent_task.title, '上层行动', 40) }}」</span>
          <ArrowRight :size="14" />
        </button>
        <div class="focus-footer">
          <div class="task-meta">
            <span v-for="entry in primaryCues" :key="entry">{{ entry }}</span>
          </div>
          <button class="complete-button" type="button" :disabled="completingId !== null" @click="finishTask(primaryTask)">
            <Check :size="18" :stroke-width="2" />
            <span>{{ completingId === primaryTask.id ? '完成中' : '完成' }}</span>
          </button>
        </div>
      </template>

      <div v-else-if="!loading" class="empty-focus">
        <template v-if="firstGoalAttention">
          <h2 id="focus-title">
            {{ firstGoalAttention.attention_code === 'missing_action' ? '目标还在，下一步还没落下来' : '有一项承诺需要重新确认' }}
          </h2>
          <p>「{{ compact(firstGoalAttention.title, '已确认目标', 40) }}」{{ firstGoalAttention.attention_detail }}</p>
          <button class="capture-button" type="button" @click="openGoalAttention(firstGoalAttention)">
            <Target :size="18" />
            <span>{{ firstGoalAttention.attention_action === 'add_action' ? '补下一步' : '查看承诺' }}</span>
          </button>
        </template>
        <template v-else>
          <h2 id="focus-title">今天还没有明确的下一步</h2>
          <p>先记下正在占据你注意力的事情。</p>
          <button class="capture-button" type="button" @click="emit('capture')">
            <Plus :size="18" />
            <span>记录此刻</span>
          </button>
        </template>
      </div>

      <div v-else class="focus-loading">正在整理此刻</div>
    </section>

    <Transition name="feedback">
      <section v-if="feedbackOutcome" class="feedback-strip" aria-live="polite">
        <div class="feedback-copy">
          <span>已完成「{{ compact(feedbackOutcome.task_title, '刚才的行动', 42) }}」</span>
          <p>{{ feedbackEffect || '刚才把它放在“此刻”，合适吗？' }}</p>
        </div>
        <div v-if="!feedbackEffect" class="feedback-options" role="group" aria-label="评价刚才的推荐">
          <button
            v-for="option in feedbackOptions"
            :key="option.value"
            type="button"
            :disabled="feedbackSubmitting"
            @click="sendFeedback(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
        <button class="feedback-dismiss" type="button" aria-label="关闭反馈" @click="dismissFeedback">
          <X :size="16" />
        </button>
      </section>
    </Transition>

    <section class="week-section" aria-labelledby="week-title">
      <header class="week-header">
        <div class="week-heading">
          <p class="eyebrow">Week</p>
          <div class="week-title-row">
            <h2 id="week-title">本周承诺</h2>
            <span v-if="weekRangeLabel">{{ weekRangeLabel }}</span>
          </div>
        </div>
        <div class="week-header-actions">
          <span v-if="weeklyPlan?.summary.selected">
            {{ weeklyPlan.summary.completed }} / {{ weeklyPlan.summary.selected }} 已完成
          </span>
          <span v-else>尚未选择</span>
          <div class="week-button-group">
            <button
              class="week-edit-button"
              type="button"
              :disabled="loading || !weeklyPlan?.summary.selected"
              @click="toggleWeekReview"
            >
              <History :size="15" />
              <span>{{ weekReviewOpen ? '收起回看' : '回看' }}</span>
            </button>
            <button
              class="week-edit-button"
              type="button"
              :disabled="loading || weeklyPlan?.summary.capacity_remaining === 0"
              @click="weekEditing = !weekEditing"
            >
              <CalendarDays :size="15" />
              <span>{{ weekEditing ? '收起' : weeklySelected.length ? '调整' : '选择' }}</span>
            </button>
          </div>
        </div>
      </header>

      <div v-if="weeklySelected.length" class="week-list">
        <div
          v-for="item in weeklySelected"
          :key="item.id"
          class="week-row"
          :class="`is-${item.state}`"
        >
          <button
            class="week-task"
            type="button"
            :disabled="!item.task"
            @click="item.task && openTask(item.task)"
          >
            <span class="week-state" aria-hidden="true">
              <CircleCheck v-if="item.state === 'completed'" :size="17" />
              <Circle v-else :size="16" />
            </span>
            <span class="row-copy">
              <strong>{{ item.title }}</strong>
              <small>{{ weeklyItemMeta(item) }}</small>
            </span>
          </button>
          <button
            v-if="item.state !== 'completed'"
            class="week-remove"
            type="button"
            :title="`将「${item.title}」移出本周`"
            :aria-label="`将「${item.title}」移出本周`"
            :disabled="weekMutatingId !== null"
            @click="removeFromWeek(item)"
          >
            <X :size="15" />
          </button>
        </div>
      </div>
      <p v-else-if="!weekEditing" class="week-empty">本周还没有明确承诺。</p>

      <div v-if="weekEditing" class="week-candidates">
        <div class="week-candidate-header">
          <span>从当前脉络中选择</span>
          <small>还可选择 {{ weeklyPlan?.summary.capacity_remaining ?? 0 }} 项</small>
        </div>
        <div v-if="weeklyCandidates.length" class="week-candidate-list">
          <div v-for="action in weeklyCandidates" :key="action.task.id" class="week-candidate-row">
            <button class="week-candidate-task" type="button" @click="openTask(action.task)">
              <span class="row-copy">
                <strong>{{ action.task.title }}</strong>
                <small>{{ actionMeta(action) }}</small>
              </span>
            </button>
            <button
              class="week-add"
              type="button"
              :title="`将「${action.task.title}」加入本周`"
              :aria-label="`将「${action.task.title}」加入本周`"
              :disabled="weekMutatingId !== null"
              @click="addToWeek(action.task)"
            >
              <Plus :size="16" />
            </button>
          </div>
        </div>
        <p v-else class="week-empty">当前没有其他可加入的行动。</p>
      </div>

      <div v-if="weekReviewOpen && weeklyPlan" id="week-review" class="week-review">
        <header class="week-review-header">
          <div>
            <span>本周回看</span>
            <small>{{ weeklyPlan.review.state === 'saved' ? '已形成可供下次拆解使用的判断' : '基于这周真实行动证据' }}</small>
          </div>
          <small>{{ weeklyPlan.review.review_window_open ? '适合完成复盘' : '可以先记下阶段判断' }}</small>
        </header>
        <div class="week-review-stats">
          <div>
            <strong>{{ weeklyPlan.review.commitments.resolved }} / {{ weeklyPlan.review.commitments.selected }}</strong>
            <span>承诺已处理</span>
          </div>
          <div>
            <strong>{{ weeklyPlan.review.steps.done }} / {{ weeklyPlan.review.steps.total }}</strong>
            <span>步骤已完成</span>
          </div>
          <div>
            <strong>{{ weeklyPlan.review.outcomes.rated }} / {{ weeklyPlan.review.outcomes.completed }}</strong>
            <span>完成后有反馈</span>
          </div>
        </div>
        <p class="week-review-recommendation">{{ weeklyPlan.review.recommendation }}</p>
        <form class="week-review-form" @submit.prevent="submitWeekReview">
          <div class="week-review-fit" role="group" aria-label="评价本周拆解粒度">
            <button
              v-for="option in weekReviewOptions"
              :key="option.value"
              type="button"
              :class="{ active: weekReviewDraft.decomposition_fit === option.value }"
              :aria-pressed="weekReviewDraft.decomposition_fit === option.value"
              :disabled="weekReviewSaving"
              @click="weekReviewDraft.decomposition_fit = option.value; weekReviewSaved = false"
            >{{ option.label }}</button>
          </div>
          <textarea
            v-model="weekReviewDraft.reflection"
            maxlength="1000"
            rows="3"
            placeholder="这周哪一步最容易开始，哪一步仍然卡住？"
            @input="weekReviewSaved = false"
          />
          <div class="week-review-save">
            <span v-if="weekReviewSaved">本周判断已保存</span>
            <span v-else-if="weeklyPlan.review.saved_feedback">
              上次保存：{{ formatRelative(weeklyPlan.review.saved_feedback.reviewed_at) }}
            </span>
            <span v-else />
            <button type="submit" :disabled="weekReviewSaving">
              <Save :size="15" />
              <span>{{ weekReviewSaving ? '保存中' : '保存本周判断' }}</span>
            </button>
          </div>
        </form>
      </div>
    </section>

    <div class="status-strip" aria-label="当前状态摘要">
      <span><strong>{{ nowContext?.signals.open_tasks ?? 0 }}</strong> 个开放行动</span>
      <span v-if="nowContext?.signals.overdue_tasks"><strong>{{ nowContext.signals.overdue_tasks }}</strong> 个已逾期</span>
      <button type="button" @click="mode.set('processing')"><strong>{{ backlogTotal }}</strong> 条待整理</button>
      <span><strong>{{ judgementTotal }}</strong> 项待判断</span>
      <span v-if="overview?.stats.streak"><strong>{{ overview.stats.streak }}</strong> 天连续记录</span>
    </div>

    <div class="today-columns">
      <section class="column-section" aria-labelledby="next-title">
        <header class="section-header">
          <div>
            <p class="eyebrow">Next</p>
            <h2 id="next-title">接下来</h2>
          </div>
          <button class="text-link" type="button" @click="mode.set('tasks')">
            <span>查看任务</span><ArrowRight :size="15" />
          </button>
        </header>

        <div v-if="nextActions.length" class="row-list">
          <button v-for="action in nextActions" :key="action.task.id" class="content-row" type="button" @click="openTask(action.task)">
            <span class="row-icon task-icon"><Clock :size="16" /></span>
            <span class="row-copy">
              <strong>{{ action.task.title }}</strong>
              <small>{{ actionMeta(action) }}</small>
            </span>
            <ArrowRight class="row-arrow" :size="15" />
          </button>
        </div>
        <p v-else class="section-empty">当前没有其他今日行动。</p>
      </section>

      <section class="column-section" aria-labelledby="judgement-title">
        <header class="section-header">
          <div>
            <p class="eyebrow">Review</p>
            <h2 id="judgement-title">待你判断</h2>
          </div>
        </header>

        <div v-if="contextNudges.length || goalAttention.length || candidateMemories.length || pendingDecisions.length" class="row-list">
          <div v-for="nudge in contextNudges" :key="`nudge-${nudge.id}`" class="content-row nudge-row">
            <button class="nudge-main" type="button" @click="openContextNudge(nudge)">
              <span class="row-icon nudge-icon"><History :size="16" /></span>
              <span class="row-copy">
                <strong>{{ nudge.title }}</strong>
                <small>{{ nudge.evidence.join(' · ') }}</small>
              </span>
              <ArrowRight class="row-arrow" :size="15" />
            </button>
            <button
              class="nudge-dismiss"
              type="button"
              :title="nudge.dismiss_label"
              :aria-label="`${nudge.dismiss_label}：${nudge.title}`"
              :disabled="dismissingNudgeId === nudge.id"
              @click="dismissNudge(nudge)"
            >
              <X :size="14" />
            </button>
          </div>
          <button v-for="goal in goalAttention" :key="`goal-${goal.id}`" class="content-row" type="button" @click="openGoalAttention(goal)">
            <span class="row-icon goal-icon"><Target :size="16" /></span>
            <span class="row-copy">
              <strong>{{ goal.title }}</strong>
              <small>当前承诺 · {{ goal.attention_label }}</small>
            </span>
            <ArrowRight class="row-arrow" :size="15" />
          </button>
          <button v-for="memory in candidateMemories" :key="`memory-${memory.id}`" class="content-row" type="button" @click="openMemory(memory)">
            <span class="row-icon memory-icon"><Brain :size="16" /></span>
            <span class="row-copy">
              <strong>{{ compact(memory.content, `记忆 #${memory.id}`) }}</strong>
              <small>候选记忆 · 等待确认</small>
            </span>
            <ArrowRight class="row-arrow" :size="15" />
          </button>
          <button v-for="decision in pendingDecisions" :key="`decision-${decision.id}`" class="content-row" type="button" @click="openDecision(decision)">
            <span class="row-icon decision-icon"><GitFork :size="16" /></span>
            <span class="row-copy">
              <strong>{{ decision.title }}</strong>
              <small>决策 · 等待结果回顾</small>
            </span>
            <ArrowRight class="row-arrow" :size="15" />
          </button>
        </div>
        <p v-else class="section-empty">目前没有需要确认的判断。</p>
      </section>
    </div>

    <section class="recent-section" aria-labelledby="recent-title">
      <header class="section-header">
        <div>
          <p class="eyebrow">Recent</p>
          <h2 id="recent-title">最近进入外脑</h2>
        </div>
        <button class="text-link" type="button" @click="mode.set('library')">
          <span>打开资料库</span><ArrowRight :size="15" />
        </button>
      </header>

      <div v-if="recentItems.length" class="recent-list">
        <button v-for="item in recentItems" :key="item.id" class="recent-row" type="button" @click="selectedItemId = item.id">
          <span class="row-icon"><FileText v-if="item.type !== 'audio'" :size="16" /><Inbox v-else :size="16" /></span>
          <span class="row-copy">
            <strong>{{ itemTitle(item) }}</strong>
            <small>{{ itemTypeLabel(item) }} · {{ formatRelative(item.created_at) }}</small>
          </span>
          <ArrowRight class="row-arrow" :size="15" />
        </button>
      </div>
      <p v-else class="section-empty">还没有记录。想到什么，直接记下来。</p>
    </section>

    <ItemDrawer :item-id="selectedItemId" @close="selectedItemId = null" @changed="load" />
    <ObjectDrawer
      :target="selectedObject"
      :intent="selectedObjectIntent"
      @close="selectedObject = null"
      @changed="load"
      @open-item="selectedItemId = $event"
      @open-object="openObject"
    />
  </main>
</template>

<style scoped>
.today-view {
  width: min(980px, calc(100% - 48px));
  margin: 0 auto;
  padding: 54px 0 88px;
}

.today-header,
.section-header,
.focus-footer,
.status-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.today-header {
  margin-bottom: 38px;
}

.date {
  color: var(--text-4);
  font-size: var(--fs-2);
  margin-bottom: 3px;
}

h1,
h2 {
  color: var(--text-1);
  font-weight: 560;
  letter-spacing: 0;
}

h1 {
  font-size: 22px;
}

h2 {
  font-size: var(--fs-6);
}

.icon-button {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  color: var(--text-3);
  border: 1px solid var(--line-1);
  border-radius: 6px;
}

.icon-button:hover:not(:disabled) {
  color: var(--text-1);
  border-color: var(--line-2);
}

.spinning {
  animation: spin 900ms linear infinite;
}

.notice {
  padding: 10px 12px;
  margin-bottom: 14px;
  border-left: 2px solid var(--error);
  background: rgba(232, 120, 120, 0.06);
  color: var(--error);
  font-size: var(--fs-3);
}

.focus-section {
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 34px 0 30px;
  border-top: 1px solid var(--line-1);
  border-bottom: 1px solid var(--line-2);
}

.section-kicker {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-3);
  font-size: var(--fs-2);
  margin-bottom: 20px;
}

.focus-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--focus);
  box-shadow: 0 0 12px rgba(222, 170, 95, 0.34);
}

.focus-copy {
  max-width: 760px;
  text-align: left;
}

.focus-reason {
  display: block;
  color: var(--focus);
  font-size: var(--fs-2);
  margin-bottom: 8px;
}

.focus-copy h2,
.empty-focus h2 {
  font-size: clamp(25px, 4vw, 38px);
  line-height: 1.22;
  overflow-wrap: anywhere;
}

.focus-copy p,
.empty-focus p {
  max-width: 640px;
  color: var(--text-3);
  margin-top: 12px;
}

.focus-footer {
  gap: 18px;
  margin-top: 30px;
}

.task-meta {
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  color: var(--text-4);
  font-size: var(--fs-2);
}

.complete-button,
.capture-button {
  flex: 0 0 auto;
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 15px;
  border: 1px solid color-mix(in srgb, var(--success) 40%, transparent);
  border-radius: 6px;
  color: var(--success);
  white-space: nowrap;
}

.complete-button:hover:not(:disabled),
.capture-button:hover {
  background: color-mix(in srgb, var(--success) 10%, transparent);
  color: var(--text-1);
}

.capture-button {
  margin-top: 24px;
  border-color: color-mix(in srgb, var(--focus) 42%, transparent);
  color: var(--focus);
}

.empty-focus,
.focus-loading {
  color: var(--text-3);
}

.focus-goal {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  max-width: min(100%, 520px);
  margin-top: 17px;
  color: var(--text-3);
  font-size: var(--fs-2);
  text-align: left;
}

.focus-goal span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.focus-goal:hover {
  color: var(--text-1);
}

.focus-source {
  display: flex;
  margin-top: 9px;
}

.feedback-strip {
  min-height: 68px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto 32px;
  align-items: center;
  gap: 14px;
  padding: 11px 0;
  border-bottom: 1px solid var(--line-1);
}

.feedback-copy {
  min-width: 0;
}

.feedback-copy span {
  display: block;
  color: var(--success);
  font-size: var(--fs-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.feedback-copy p {
  color: var(--text-2);
  font-size: var(--fs-3);
  margin-top: 3px;
}

.feedback-options {
  display: inline-grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  border: 1px solid var(--line-2);
  border-radius: 6px;
  overflow: hidden;
}

.feedback-options button {
  min-height: 34px;
  padding: 0 12px;
  color: var(--text-3);
  font-size: var(--fs-2);
  border-left: 1px solid var(--line-1);
  white-space: nowrap;
}

.feedback-options button:first-child {
  border-left: 0;
}

.feedback-options button:hover:not(:disabled) {
  color: var(--text-1);
  background: rgba(255, 255, 255, 0.035);
}

.feedback-dismiss {
  grid-column: 3;
  grid-row: 1;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  color: var(--text-4);
  border-radius: 6px;
}

.feedback-dismiss:hover {
  color: var(--text-1);
  background: rgba(255, 255, 255, 0.035);
}

.feedback-enter-active,
.feedback-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}

.feedback-enter-from,
.feedback-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.week-section {
  padding: 32px 0 28px;
  border-bottom: 1px solid var(--line-1);
}

.week-header,
.week-title-row,
.week-header-actions,
.week-candidate-header {
  display: flex;
  align-items: center;
}

.week-header {
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 14px;
}

.week-heading .eyebrow {
  margin-bottom: 3px;
  letter-spacing: 0;
  text-transform: none;
}

.week-title-row {
  min-width: 0;
  gap: 12px;
}

.week-title-row span,
.week-header-actions > span {
  color: var(--text-4);
  font-size: var(--fs-2);
  white-space: nowrap;
}

.week-header-actions {
  flex: 0 0 auto;
  gap: 14px;
}

.week-button-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.week-edit-button {
  min-height: 32px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 9px;
  color: var(--text-3);
  font-size: var(--fs-2);
  border: 1px solid var(--line-1);
  border-radius: 6px;
}

.week-edit-button:hover:not(:disabled) {
  color: var(--text-1);
  border-color: var(--line-2);
}

.week-list,
.week-candidate-list {
  border-top: 1px solid var(--line-1);
}

.week-row,
.week-candidate-row {
  min-height: 58px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 34px;
  align-items: center;
  border-bottom: 1px solid var(--line-1);
}

.week-task {
  min-width: 0;
  min-height: 58px;
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  text-align: left;
}

.week-state {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  color: var(--text-4);
}

.week-row.is-completed .week-state {
  color: var(--success);
}

.week-row.is-completed .row-copy strong {
  color: var(--text-3);
}

.week-row.is-unavailable .week-task {
  opacity: 0.55;
}

.week-task:hover:not(:disabled) .row-copy strong,
.week-candidate-task:hover .row-copy strong {
  color: var(--text-1);
}

.week-remove,
.week-add {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  justify-self: end;
  color: var(--text-5);
  border-radius: 5px;
}

.week-remove:hover:not(:disabled) {
  color: var(--error);
  background: color-mix(in srgb, var(--error) 8%, transparent);
}

.week-empty {
  min-height: 58px;
  display: flex;
  align-items: center;
  color: var(--text-4);
  font-size: var(--fs-3);
  border-top: 1px solid var(--line-1);
}

.week-candidates {
  margin-top: 20px;
}

.week-candidate-header {
  justify-content: space-between;
  gap: 14px;
  min-height: 36px;
  color: var(--text-3);
  font-size: var(--fs-2);
}

.week-candidate-header small {
  color: var(--text-5);
  font-size: var(--fs-1);
}

.week-candidate-task {
  min-width: 0;
  min-height: 58px;
  display: flex;
  align-items: center;
  text-align: left;
}

.week-add {
  color: var(--focus);
}

.week-add:hover:not(:disabled) {
  color: var(--text-1);
  background: color-mix(in srgb, var(--focus) 10%, transparent);
}

.week-review {
  display: grid;
  gap: 18px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--line-1);
}

.week-review-header,
.week-review-header > div,
.week-review-save {
  display: flex;
  align-items: center;
}

.week-review-header {
  justify-content: space-between;
  gap: 18px;
}

.week-review-header > div {
  min-width: 0;
  gap: 10px;
}

.week-review-header span {
  color: var(--text-2);
  font-size: var(--fs-3);
  font-weight: 560;
}

.week-review-header small,
.week-review-save > span {
  color: var(--text-5);
  font-size: var(--fs-1);
}

.week-review-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid var(--line-1);
  border-bottom: 1px solid var(--line-1);
}

.week-review-stats > div {
  display: grid;
  gap: 3px;
  min-width: 0;
  padding: 14px 16px;
  border-left: 1px solid var(--line-1);
}

.week-review-stats > div:first-child {
  padding-left: 0;
  border-left: 0;
}

.week-review-stats strong {
  color: var(--text-1);
  font-size: var(--fs-4);
  font-weight: 560;
}

.week-review-stats span {
  color: var(--text-4);
  font-size: var(--fs-1);
}

.week-review-recommendation {
  margin: 0;
  padding-left: 12px;
  color: var(--text-3);
  font-size: var(--fs-3);
  line-height: 1.65;
  border-left: 2px solid rgba(224, 170, 93, 0.35);
}

.week-review-form {
  display: grid;
  gap: 12px;
}

.week-review-fit {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border: 1px solid var(--line-1);
  border-radius: 6px;
  overflow: hidden;
}

.week-review-fit button {
  min-height: 36px;
  padding: 0 10px;
  color: var(--text-4);
  font-size: var(--fs-2);
  border-left: 1px solid var(--line-1);
}

.week-review-fit button:first-child {
  border-left: 0;
}

.week-review-fit button.active {
  color: var(--text-1);
  background: rgba(224, 170, 93, 0.09);
}

.week-review-form textarea {
  width: 100%;
  min-height: 84px;
  resize: vertical;
  padding: 12px;
  color: var(--text-1);
  font: inherit;
  line-height: 1.6;
  border: 1px solid var(--line-1);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.012);
}

.week-review-form textarea:focus {
  border-color: var(--line-2);
  outline: none;
}

.week-review-save {
  justify-content: space-between;
  gap: 16px;
}

.week-review-save button {
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0 11px;
  color: var(--text-2);
  font-size: var(--fs-2);
  border: 1px solid var(--line-2);
  border-radius: 6px;
}

.week-review-save button:hover:not(:disabled) {
  color: var(--text-1);
}

.status-strip {
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px 28px;
  min-height: 54px;
  color: var(--text-4);
  font-size: var(--fs-2);
  border-bottom: 1px solid var(--line-1);
}

.status-strip button {
  color: inherit;
}

.status-strip button:hover {
  color: var(--text-2);
}

.status-strip strong {
  color: var(--text-2);
  font-weight: 560;
}

.today-columns {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 52px;
  padding: 42px 0 10px;
}

.column-section,
.recent-section {
  min-width: 0;
}

.section-header {
  min-height: 46px;
  margin-bottom: 10px;
}

.section-header .eyebrow {
  margin-bottom: 2px;
  letter-spacing: 0;
  text-transform: none;
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--text-4);
  font-size: var(--fs-2);
}

.text-link:hover {
  color: var(--text-1);
}

.row-list,
.recent-list {
  border-top: 1px solid var(--line-1);
}

.content-row,
.recent-row {
  width: 100%;
  min-height: 62px;
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) 18px;
  align-items: center;
  gap: 10px;
  text-align: left;
  border-bottom: 1px solid var(--line-1);
}

.content-row:hover,
.recent-row:hover {
  background: rgba(255, 255, 255, 0.022);
}

.nudge-row {
  grid-template-columns: minmax(0, 1fr) 32px;
  gap: 4px;
}

.nudge-main {
  min-width: 0;
  min-height: 61px;
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) 18px;
  align-items: center;
  gap: 10px;
  text-align: left;
}

.nudge-dismiss {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  color: var(--text-5);
  border-radius: 6px;
}

.nudge-dismiss:hover:not(:disabled) {
  color: var(--text-2);
  background: rgba(255, 255, 255, 0.035);
}

.row-icon {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  color: var(--text-4);
}

.task-icon { color: var(--info); }
.nudge-icon { color: var(--focus); }
.memory-icon { color: var(--success); }
.decision-icon { color: var(--focus); }

.row-copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.row-copy strong {
  color: var(--text-2);
  font-size: var(--fs-3);
  font-weight: 520;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row-copy small {
  color: var(--text-4);
  font-size: var(--fs-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row-arrow {
  color: var(--text-5);
}

.section-empty {
  min-height: 76px;
  display: flex;
  align-items: center;
  border-top: 1px solid var(--line-1);
  color: var(--text-4);
  font-size: var(--fs-3);
}

.recent-section {
  margin-top: 38px;
  padding-top: 38px;
  border-top: 1px solid var(--line-1);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 800px) {
  .today-columns {
    grid-template-columns: 1fr;
    gap: 38px;
  }
}

@media (max-width: 760px) {
  .today-view {
    width: calc(100% - 28px);
    padding: 26px 0 calc(var(--app-mobile-nav-height) + 38px);
  }

  .today-header {
    margin-bottom: 24px;
  }

  .focus-section {
    min-height: 235px;
    padding: 28px 0 24px;
  }

  .focus-copy h2,
  .empty-focus h2 {
    font-size: 27px;
  }

  .focus-footer {
    align-items: flex-end;
  }

  .status-strip {
    gap: 8px 18px;
    padding: 10px 0;
  }

  .feedback-strip {
    grid-template-columns: minmax(0, 1fr) 32px;
    gap: 9px;
    padding: 13px 0;
  }

  .feedback-options {
    width: 100%;
    grid-column: 1 / -1;
    grid-row: 2;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
  }

  .feedback-dismiss {
    grid-column: 2;
    grid-row: 1;
  }

  .feedback-options button {
    padding: 0 8px;
  }

  .week-header {
    align-items: flex-end;
  }

  .week-title-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 2px;
  }

  .week-header-actions {
    align-items: flex-end;
    flex-direction: column-reverse;
    gap: 5px;
  }

  .week-button-group {
    gap: 6px;
  }

  .week-edit-button {
    padding: 0 7px;
  }

  .week-review-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
  }

  .week-review-header > div {
    align-items: flex-start;
    flex-direction: column;
    gap: 3px;
  }

  .week-review-stats > div {
    padding: 12px 9px;
  }

  .week-review-stats > div:first-child {
    padding-left: 0;
  }

  .week-review-fit button {
    min-height: 42px;
    padding: 0 6px;
  }

  .week-review-save {
    align-items: stretch;
    flex-direction: column;
  }

  .week-review-save button {
    justify-content: center;
  }

  .today-columns {
    padding-top: 32px;
  }
}
</style>
