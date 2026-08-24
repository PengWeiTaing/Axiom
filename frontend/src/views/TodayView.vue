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
const weeklyPlan = ref<WeeklyPlanPayload | null>(null);
const candidateMemories = ref<Memory[]>([]);
const pendingDecisions = ref<Decision[]>([]);
const selectedItemId = ref<number | null>(null);
const selectedObject = ref<ObjectTarget | null>(null);
const selectedObjectIntent = ref<'view' | 'add-goal-action' | 'edit-goal'>('view');
const completingId = ref<number | null>(null);
const feedbackOutcome = ref<ContextOutcome | null>(null);
const feedbackEffect = ref<string | null>(null);
const feedbackSubmitting = ref(false);
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
const nextActions = computed(() => nowContext.value?.alternatives.slice(0, 4) ?? []);
const weeklySelected = computed(() => weeklyPlan.value?.selected ?? []);
const weeklyCandidates = computed(() => weeklyPlan.value?.candidates ?? []);
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
const weekRangeLabel = computed(() => {
  if (!weeklyPlan.value) return '';
  return `${shortDate(weeklyPlan.value.week_start)} — ${shortDate(weeklyPlan.value.week_end)}`;
});

function compact(value: string | null | undefined, fallback: string, limit = 92): string {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text) return fallback;
  return text.length > limit ? `${text.slice(0, limit - 1)}…` : text;
}

function shortDate(value: string): string {
  const [, month, day] = value.split('-').map(Number);
  return `${month}月${day}日`;
}

function actionMeta(action: ContextAction): string {
  return action.cues.slice(0, 3).join(' · ');
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

function itemTitle(item: Item): string {
  return compact(item.content || item.derived_text || item.transcript_text || item.original_name, `记录 #${item.id}`);
}

function itemTypeLabel(item: Item): string {
  return { text: '文字', image: '图片', document: '文档', audio: '音频' }[item.type];
}

function syncWeekReviewDraft(plan: WeeklyPlanPayload | null) {
  const saved = plan?.review.saved_feedback;
  weekReviewDraft.value = {
    decomposition_fit: saved?.decomposition_fit ?? 'right',
    reflection: saved?.reflection ?? '',
  };
  weekReviewSaved.value = false;
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
      listMemories({ status: 'candidate', page: 1, page_size: 3 }),
      listDecisions({ status: 'pending', page: 1, page_size: 3 }),
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

function openTask(task: Task) {
  selectedObjectIntent.value = 'view';
  selectedObject.value = { kind: 'task', id: task.id };
}

function openTaskById(id: number) {
  selectedObjectIntent.value = 'view';
  selectedObject.value = { kind: 'task', id };
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
  document.getElementById('week-review')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function openMemory(memory: Memory) {
  selectedObjectIntent.value = 'view';
  selectedObject.value = { kind: 'memory', id: memory.id };
}

function openDecision(decision: Decision) {
  selectedObjectIntent.value = 'view';
  selectedObject.value = { kind: 'decision', id: decision.id };
}

function openObject(target: ObjectTarget) {
  selectedObjectIntent.value = 'view';
  selectedObject.value = target;
}

onMounted(load);
watch(() => props.revision, load);
</script>

<template>
  <main class="now-view">
    <header class="folio-head">
      <div class="folio-identity">
        <span>01 / NOW</span>
        <strong>{{ greeting }}</strong>
      </div>
      <p>{{ dateLabel }}</p>
      <button type="button" title="刷新" aria-label="刷新此刻" :disabled="loading" @click="load">
        <RefreshCw :size="17" :class="{ spinning: loading }" />
      </button>
    </header>

    <p v-if="error" class="notice" role="alert">{{ error }}</p>

    <section class="focus-spread" aria-labelledby="focus-title">
      <aside class="focus-margin">
        <span class="margin-label"><i /> 当前焦点</span>
        <p v-if="primaryCues.length">{{ primaryCues.join(' / ') }}</p>
        <p v-else>只留下现在真正需要发生的事。</p>
      </aside>

      <div class="focus-body">
        <template v-if="primaryTask && primaryAction">
          <button class="focus-copy" type="button" @click="openTask(primaryTask)">
            <span>{{ primaryAction.reason.label }}</span>
            <h1 id="focus-title">{{ primaryTask.title }}</h1>
            <p>{{ primaryAction.reason.detail }}</p>
          </button>

          <div class="focus-context">
            <button v-if="primaryTask.goal" type="button" @click="openGoal(primaryTask.goal)">
              <Target :size="14" />
              <span>{{ primaryAction.reason.code === 'goal_progress' ? '查看目标与进展' : compact(primaryTask.goal.title, '已确认目标', 42) }}</span>
              <ArrowRight :size="13" />
            </button>
            <button
              v-if="primaryTask.parent_task?.available && primaryTask.parent_task.id"
              type="button"
              @click="openTaskById(primaryTask.parent_task.id)"
            >
              <GitFork :size="14" />
              <span>来自「{{ compact(primaryTask.parent_task.title, '上层行动', 38) }}」</span>
              <ArrowRight :size="13" />
            </button>
          </div>
        </template>

        <div v-else-if="!loading" class="empty-focus">
          <template v-if="firstGoalAttention">
            <span>承诺仍在等待下一步</span>
            <h1 id="focus-title">{{ compact(firstGoalAttention.title, '一项已确认目标', 64) }}</h1>
            <p>{{ firstGoalAttention.attention_detail }}</p>
            <button type="button" @click="openGoalAttention(firstGoalAttention)">
              {{ firstGoalAttention.attention_action === 'add_action' ? '补下一步' : '重新确认' }}
              <ArrowRight :size="14" />
            </button>
          </template>
          <template v-else>
            <span>注意力尚未落定</span>
            <h1 id="focus-title">先把脑海里的事情放下来。</h1>
            <p>不必先想分类，也不必整理成完整句子。</p>
            <button type="button" @click="emit('capture')">记录此刻 <ArrowRight :size="14" /></button>
          </template>
        </div>

        <div v-else class="focus-loading">正在读取此刻的上下文</div>
      </div>

      <aside class="focus-action">
        <div class="action-score" aria-hidden="true">
          <i v-for="index in 5" :key="index" :class="{ active: index <= Math.max(1, Math.min(primaryCues.length + 1, 5)) }" />
        </div>
        <button
          v-if="primaryTask"
          type="button"
          :disabled="completingId !== null"
          :title="completingId === primaryTask.id ? '完成中' : '标记完成'"
          @click="finishTask(primaryTask)"
        >
          <Check :size="22" :stroke-width="1.65" />
          <span>{{ completingId === primaryTask.id ? '完成中' : '完成' }}</span>
        </button>
      </aside>
    </section>

    <Transition name="feedback">
      <section v-if="feedbackOutcome" class="feedback-line" aria-live="polite">
        <Check :size="16" />
        <div>
          <strong>已完成「{{ compact(feedbackOutcome.task_title, '刚才的行动', 44) }}」</strong>
          <span>{{ feedbackEffect || '刚才把它放在“此刻”，合适吗？' }}</span>
        </div>
        <div v-if="!feedbackEffect" class="feedback-options">
          <button
            v-for="option in feedbackOptions"
            :key="option.value"
            type="button"
            :disabled="feedbackSubmitting"
            @click="sendFeedback(option.value)"
          >{{ option.label }}</button>
        </div>
        <button type="button" title="关闭反馈" aria-label="关闭反馈" @click="feedbackOutcome = null; feedbackEffect = null">
          <X :size="15" />
        </button>
      </section>
    </Transition>

    <section class="week-score" aria-labelledby="week-title">
      <header class="section-margin">
        <span>本周 / {{ weekRangeLabel || '尚未形成' }}</span>
        <h2 id="week-title">明确承诺</h2>
        <p>最多五件。它们不是另一张任务清单，而是这周主动保留的方向。</p>
        <div class="section-actions">
          <button type="button" :disabled="!weeklyPlan?.summary.selected" @click="toggleWeekReview">
            <History :size="14" />
            <span>{{ weekReviewOpen ? '收起回看' : '回看' }}</span>
          </button>
          <button type="button" :disabled="weeklyPlan?.summary.capacity_remaining === 0" @click="weekEditing = !weekEditing">
            <CalendarDays :size="14" />
            <span>{{ weekEditing ? '完成调整' : '调整' }}</span>
          </button>
        </div>
      </header>

      <div class="week-body">
        <div class="week-progress">
          <span>{{ weeklyPlan?.summary.completed ?? 0 }} / {{ weeklyPlan?.summary.selected ?? 0 }}</span>
          <div><i :style="{ width: `${weeklyPlan?.summary.selected ? (weeklyPlan.summary.completed / weeklyPlan.summary.selected) * 100 : 0}%` }" /></div>
          <small>本周已处理</small>
        </div>

        <div v-if="weeklySelected.length" class="commitment-list">
          <article v-for="(item, index) in weeklySelected" :key="item.id" :class="`is-${item.state}`">
            <span class="commitment-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <button type="button" :disabled="!item.task" @click="item.task && openTask(item.task)">
              <strong>{{ item.title }}</strong>
              <small>{{ weeklyItemMeta(item) }}</small>
            </button>
            <span class="commitment-state" aria-hidden="true">
              <CircleCheck v-if="item.state === 'completed'" :size="17" />
              <Circle v-else :size="16" />
            </span>
            <button
              v-if="weekEditing && item.state !== 'completed'"
              class="commitment-remove"
              type="button"
              :title="`将「${item.title}」移出本周`"
              :aria-label="`将「${item.title}」移出本周`"
              :disabled="weekMutatingId !== null"
              @click="removeFromWeek(item)"
            ><X :size="14" /></button>
          </article>
        </div>
        <p v-else class="empty-line">本周还没有明确承诺。系统不会替你自动填满。</p>

        <div v-if="weekEditing" class="week-candidates">
          <header>
            <span>可以加入</span>
            <small>还可选择 {{ weeklyPlan?.summary.capacity_remaining ?? 0 }} 项</small>
          </header>
          <article v-for="action in weeklyCandidates" :key="action.task.id">
            <button type="button" @click="openTask(action.task)">
              <strong>{{ action.task.title }}</strong>
              <small>{{ actionMeta(action) }}</small>
            </button>
            <button
              type="button"
              :title="`将「${action.task.title}」加入本周`"
              :disabled="weekMutatingId !== null"
              @click="addToWeek(action.task)"
            ><Plus :size="15" /></button>
          </article>
          <p v-if="!weeklyCandidates.length" class="empty-line">当前没有其他可加入的行动。</p>
        </div>

        <div v-if="weekReviewOpen && weeklyPlan" id="week-review" class="week-review">
          <header>
            <div><span>本周回看</span><small>{{ weeklyPlan.review.recommendation }}</small></div>
            <p>{{ weeklyPlan.review.commitments.resolved }}/{{ weeklyPlan.review.commitments.selected }} 承诺 · {{ weeklyPlan.review.steps.done }}/{{ weeklyPlan.review.steps.total }} 步骤</p>
          </header>
          <form @submit.prevent="submitWeekReview">
            <div class="review-fit" role="group" aria-label="评价本周拆解粒度">
              <button
                v-for="option in weekReviewOptions"
                :key="option.value"
                type="button"
                :class="{ active: weekReviewDraft.decomposition_fit === option.value }"
                :aria-pressed="weekReviewDraft.decomposition_fit === option.value"
                @click="weekReviewDraft.decomposition_fit = option.value; weekReviewSaved = false"
              >{{ option.label }}</button>
            </div>
            <textarea v-model="weekReviewDraft.reflection" rows="3" maxlength="1000" placeholder="哪一步最容易开始，哪一步仍然卡住？" />
            <footer>
              <span>{{ weekReviewSaved ? '本周判断已保存' : weeklyPlan.review.saved_feedback ? `上次保存：${formatRelative(weeklyPlan.review.saved_feedback.reviewed_at)}` : '' }}</span>
              <button type="submit" :disabled="weekReviewSaving"><Save :size="14" /> {{ weekReviewSaving ? '保存中' : '保存判断' }}</button>
            </footer>
          </form>
        </div>
      </div>
    </section>

    <section class="context-field">
      <div class="next-field">
        <header class="field-head">
          <div><span>如果当前一步不合适</span><h2>还可以从这里开始</h2></div>
          <button type="button" title="查看全部行动" aria-label="查看全部行动" @click="mode.set('tasks')"><ArrowRight :size="17" /></button>
        </header>
        <div v-if="nextActions.length" class="next-list">
          <button v-for="(action, index) in nextActions" :key="action.task.id" type="button" @click="openTask(action.task)">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <strong>{{ action.task.title }}</strong>
            <small>{{ actionMeta(action) }}</small>
            <Clock :size="14" />
          </button>
        </div>
        <p v-else class="empty-line">当前没有其他可执行行动。</p>
      </div>

      <aside class="judgement-field">
        <header class="field-head">
          <div><span>需要人的判断</span><h2>{{ judgementTotal }} 项边注</h2></div>
        </header>
        <div v-if="contextNudges.length || goalAttention.length || candidateMemories.length || pendingDecisions.length" class="judgement-list">
          <article v-for="nudge in contextNudges" :key="`nudge-${nudge.id}`" class="tone-focus">
            <button type="button" @click="openContextNudge(nudge)"><History :size="15" /><span><strong>{{ nudge.title }}</strong><small>{{ nudge.evidence.join(' · ') }}</small></span></button>
            <button type="button" :title="nudge.dismiss_label" :disabled="dismissingNudgeId === nudge.id" @click="dismissNudge(nudge)"><X :size="13" /></button>
          </article>
          <article v-for="goal in goalAttention" :key="`goal-${goal.id}`" class="tone-goal">
            <button type="button" @click="openGoalAttention(goal)"><Target :size="15" /><span><strong>{{ goal.title }}</strong><small>{{ goal.attention_label }}</small></span></button>
          </article>
          <article v-for="memory in candidateMemories" :key="`memory-${memory.id}`" class="tone-memory">
            <button type="button" @click="openMemory(memory)"><Brain :size="15" /><span><strong>{{ compact(memory.content, `记忆 #${memory.id}`, 56) }}</strong><small>候选记忆 · 等待确认</small></span></button>
          </article>
          <article v-for="decision in pendingDecisions" :key="`decision-${decision.id}`" class="tone-decision">
            <button type="button" @click="openDecision(decision)"><GitFork :size="15" /><span><strong>{{ decision.title }}</strong><small>等待结果回顾</small></span></button>
          </article>
        </div>
        <p v-else class="empty-line">目前没有需要确认的判断。</p>
      </aside>
    </section>

    <section class="recent-trace" aria-labelledby="recent-title">
      <header class="field-head">
        <div><span>刚刚进入外脑</span><h2 id="recent-title">最近痕迹</h2></div>
        <button type="button" title="打开资料库" aria-label="打开资料库" @click="mode.set('library')"><ArrowRight :size="17" /></button>
      </header>
      <div v-if="recentItems.length" class="trace-list">
        <button v-for="(item, index) in recentItems" :key="item.id" type="button" @click="selectedItemId = item.id">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
          <FileText v-if="item.type !== 'audio'" :size="15" /><Inbox v-else :size="15" />
          <strong>{{ itemTitle(item) }}</strong>
          <small>{{ itemTypeLabel(item) }} · {{ formatRelative(item.created_at) }}</small>
        </button>
      </div>
      <p v-else class="empty-line">还没有记录。想到什么，直接记下来。</p>
    </section>

    <footer class="now-foot">
      <span><strong>{{ nowContext?.signals.open_tasks ?? 0 }}</strong> 开放行动</span>
      <span v-if="nowContext?.signals.overdue_tasks"><strong>{{ nowContext.signals.overdue_tasks }}</strong> 已逾期</span>
      <button type="button" @click="mode.set('processing')"><strong>{{ backlogTotal }}</strong> 待整理</button>
      <span v-if="overview?.stats.streak"><strong>{{ overview.stats.streak }}</strong> 天连续记录</span>
      <i />
      <button type="button" @click="emit('capture')"><Plus :size="13" /> 记录此刻</button>
    </footer>

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
.now-view {
  width: min(1380px, calc(100% - 76px));
  margin: 0 auto;
  padding: 34px 0 86px;
}

.folio-head {
  min-height: 86px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto 36px;
  align-items: start;
  gap: 24px;
  border-bottom: 1px solid var(--line-2);
}

.folio-identity {
  display: flex;
  align-items: baseline;
  gap: 18px;
}

.folio-identity span,
.folio-head > p,
.section-margin > span,
.field-head span {
  color: var(--text-4);
  font-family: var(--font-mono);
  font-size: 9px;
}

.folio-identity span {
  color: var(--focus);
}

.folio-identity strong {
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 400;
}

.folio-head > p {
  padding-top: 4px;
}

.folio-head > button {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  color: var(--text-4);
  border: 1px solid var(--line-1);
}

.folio-head > button:hover {
  color: var(--text-1);
  border-color: var(--line-3);
}

.notice {
  padding: 13px 0;
  color: var(--error);
  font-size: 12px;
  border-bottom: 1px solid var(--error);
}

.focus-spread {
  min-height: min(690px, calc(100vh - 160px));
  display: grid;
  grid-template-columns: minmax(150px, 0.75fr) minmax(400px, 3.4fr) minmax(120px, 0.72fr);
  align-items: stretch;
  border-bottom: 1px solid var(--line-2);
}

.focus-margin {
  position: relative;
  padding: 70px 36px 48px 0;
  border-right: 1px solid var(--line-1);
}

.margin-label {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-3);
  font-size: 11px;
}

.margin-label i {
  width: 8px;
  height: 8px;
  background: var(--focus);
  transform: rotate(45deg);
}

.focus-margin > p {
  max-width: 160px;
  margin-top: 36px;
  color: var(--text-4);
  font-family: var(--font-display);
  font-size: 13px;
  line-height: 1.8;
}

.focus-body {
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 70px clamp(36px, 5vw, 86px) 58px;
}

.focus-copy {
  width: 100%;
  max-width: 860px;
  text-align: left;
}

.focus-copy > span,
.empty-focus > span {
  display: block;
  margin-bottom: 18px;
  color: var(--focus);
  font-family: var(--font-mono);
  font-size: 10px;
}

.focus-copy h1,
.empty-focus h1 {
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 46px;
  font-weight: 400;
  line-height: 1.34;
  overflow-wrap: anywhere;
}

.focus-copy > p,
.empty-focus > p {
  max-width: 680px;
  margin-top: 24px;
  color: var(--text-3);
  font-size: 14px;
  line-height: 1.8;
}

.focus-copy:hover h1 {
  color: var(--focus-bright);
}

.focus-context {
  display: grid;
  gap: 9px;
  margin-top: 34px;
}

.focus-context button,
.empty-focus > button {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 4px;
  color: var(--text-3);
  font-size: 11px;
  border-bottom: 1px solid var(--line-2);
}

.focus-context button:hover,
.empty-focus > button:hover {
  color: var(--text-1);
  border-bottom-color: var(--text-1);
}

.empty-focus > button {
  margin-top: 32px;
}

.focus-loading {
  color: var(--text-4);
  font-family: var(--font-display);
  font-size: 24px;
}

.focus-action {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 70px 0 48px 28px;
  border-left: 1px solid var(--line-1);
}

.action-score {
  width: 100%;
  display: grid;
  gap: 8px;
}

.action-score i {
  display: block;
  height: 1px;
  background: var(--line-1);
}

.action-score i.active {
  background: var(--focus);
}

.focus-action > button {
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: var(--success);
  font-size: 10px;
  border: 1px solid var(--success);
  border-radius: 50%;
}

.focus-action > button:hover:not(:disabled) {
  color: var(--surface-1);
  background: var(--success);
}

.feedback-line {
  min-height: 70px;
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr) auto 28px;
  align-items: center;
  gap: 14px;
  color: var(--success);
  border-bottom: 1px solid var(--success);
}

.feedback-line > div:nth-child(2) {
  display: grid;
  gap: 2px;
}

.feedback-line strong {
  color: var(--text-1);
  font-size: 12px;
  font-weight: 560;
}

.feedback-line span {
  color: var(--text-4);
  font-size: 10px;
}

.feedback-options {
  display: flex;
  align-items: center;
}

.feedback-options button {
  min-height: 32px;
  padding: 0 12px;
  color: var(--text-3);
  font-size: 10px;
  border-left: 1px solid var(--line-1);
}

.feedback-options button:hover {
  color: var(--text-1);
}

.week-score {
  display: grid;
  grid-template-columns: minmax(190px, 0.92fr) minmax(0, 3.9fr);
  gap: clamp(36px, 6vw, 94px);
  padding: 74px 0 70px;
  border-bottom: 1px solid var(--line-2);
}

.section-margin {
  align-self: start;
}

.section-margin > span {
  color: var(--accent);
}

.section-margin h2,
.field-head h2 {
  margin-top: 11px;
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 25px;
  font-weight: 400;
}

.section-margin > p {
  max-width: 230px;
  margin-top: 20px;
  color: var(--text-4);
  font-size: 11px;
  line-height: 1.75;
}

.section-actions {
  display: flex;
  gap: 18px;
  margin-top: 30px;
}

.section-actions button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-3);
  font-size: 10px;
  border-bottom: 1px solid var(--line-2);
}

.week-body {
  min-width: 0;
}

.week-progress {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;
  min-height: 36px;
  margin-bottom: 20px;
}

.week-progress > span {
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 20px;
}

.week-progress > div {
  height: 2px;
  background: var(--line-1);
}

.week-progress i {
  display: block;
  height: 100%;
  background: var(--success);
}

.week-progress small {
  color: var(--text-4);
  font-size: 9px;
}

.commitment-list {
  border-top: 1px solid var(--line-2);
}

.commitment-list article {
  min-height: 70px;
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr) 28px 28px;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--line-1);
}

.commitment-index {
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 9px;
}

.commitment-list article > button:nth-child(2),
.week-candidates article > button:first-child {
  min-width: 0;
  display: grid;
  gap: 4px;
  text-align: left;
}

.commitment-list strong,
.week-candidates strong {
  color: var(--text-1);
  font-size: 14px;
  font-weight: 520;
}

.commitment-list small,
.week-candidates small {
  color: var(--text-4);
  font-size: 10px;
}

.commitment-state {
  display: grid;
  place-items: center;
  color: var(--accent);
}

.commitment-list .is-completed strong {
  color: var(--text-4);
  text-decoration: line-through;
  text-decoration-thickness: 1px;
}

.commitment-list .is-completed .commitment-state {
  color: var(--success);
}

.commitment-remove {
  color: var(--text-5);
}

.commitment-remove:hover {
  color: var(--error);
}

.empty-line {
  min-height: 64px;
  display: flex;
  align-items: center;
  color: var(--text-4);
  font-family: var(--font-display);
  font-size: 14px;
  border-top: 1px solid var(--line-1);
}

.week-candidates,
.week-review {
  margin-top: 34px;
  padding-top: 24px;
  border-top: 2px solid var(--cobalt);
}

.week-candidates > header,
.week-review > header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 12px;
  color: var(--text-3);
  font-size: 11px;
}

.week-candidates article {
  min-height: 58px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 34px;
  align-items: center;
  border-top: 1px solid var(--line-1);
}

.week-review > header div {
  display: grid;
  gap: 4px;
}

.week-review > header small,
.week-review > header p {
  color: var(--text-4);
  font-size: 10px;
}

.week-review form {
  display: grid;
  gap: 16px;
}

.review-fit {
  display: flex;
  border-top: 1px solid var(--line-1);
  border-bottom: 1px solid var(--line-1);
}

.review-fit button {
  min-height: 38px;
  padding: 0 16px;
  color: var(--text-4);
  font-size: 10px;
  border-right: 1px solid var(--line-1);
}

.review-fit button.active {
  color: var(--surface-1);
  background: var(--cobalt);
}

.week-review textarea {
  width: 100%;
  min-height: 86px;
  padding: 12px 0;
  color: var(--text-1);
  line-height: 1.7;
  border-bottom: 1px solid var(--line-2);
}

.week-review form footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-4);
  font-size: 10px;
}

.week-review form footer button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-2);
}

.context-field {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(300px, 0.8fr);
  gap: 0;
  padding: 72px 0;
  border-bottom: 1px solid var(--line-2);
}

.next-field {
  min-width: 0;
  padding-right: clamp(36px, 6vw, 86px);
}

.judgement-field {
  min-width: 0;
  padding-left: clamp(30px, 4vw, 58px);
  border-left: 1px solid var(--line-2);
}

.field-head {
  min-height: 68px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.field-head > button {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  color: var(--text-4);
  border: 1px solid var(--line-1);
}

.field-head > button:hover {
  color: var(--surface-1);
  background: var(--text-1);
}

.next-list,
.judgement-list {
  border-top: 1px solid var(--line-2);
}

.next-list > button {
  width: 100%;
  min-height: 78px;
  display: grid;
  grid-template-columns: 32px minmax(120px, 0.85fr) minmax(180px, 1fr) 18px;
  align-items: center;
  gap: 14px;
  text-align: left;
  border-bottom: 1px solid var(--line-1);
}

.next-list > button:hover {
  padding-left: 7px;
}

.next-list span {
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 9px;
}

.next-list strong {
  color: var(--text-1);
  font-size: 13px;
  font-weight: 520;
}

.next-list small {
  color: var(--text-4);
  font-size: 10px;
}

.judgement-list article {
  position: relative;
  min-height: 64px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 26px;
  align-items: center;
  border-bottom: 1px solid var(--line-1);
}

.judgement-list article::before {
  content: '';
  position: absolute;
  top: 18px;
  bottom: 18px;
  left: 0;
  width: 2px;
  background: var(--note-tone, var(--text-4));
}

.judgement-list article > button:first-child {
  min-width: 0;
  min-height: 64px;
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  align-items: center;
  gap: 9px;
  padding-left: 14px;
  text-align: left;
}

.judgement-list article > button:first-child > span {
  min-width: 0;
  display: grid;
  gap: 2px;
}

.judgement-list strong {
  color: var(--text-1);
  font-size: 12px;
  font-weight: 520;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.judgement-list small {
  color: var(--text-4);
  font-size: 9px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tone-focus { --note-tone: var(--focus); }
.tone-goal { --note-tone: var(--yellow); }
.tone-memory { --note-tone: var(--accent); }
.tone-decision { --note-tone: var(--violet); }

.recent-trace {
  padding: 66px 0 52px;
}

.trace-list {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  border-top: 1px solid var(--line-2);
  border-bottom: 1px solid var(--line-2);
}

.trace-list button {
  min-width: 0;
  min-height: 154px;
  display: grid;
  grid-template-columns: 24px 1fr;
  grid-template-rows: 28px minmax(0, 1fr) auto;
  align-items: start;
  gap: 8px;
  padding: 20px 18px;
  text-align: left;
  border-left: 1px solid var(--line-1);
}

.trace-list button:first-child {
  border-left: 0;
}

.trace-list button:hover {
  background: rgba(49, 93, 130, 0.05);
}

.trace-list span {
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 9px;
}

.trace-list svg {
  color: var(--cobalt);
}

.trace-list strong {
  grid-column: 1 / -1;
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.55;
  overflow: hidden;
}

.trace-list small {
  grid-column: 1 / -1;
  color: var(--text-4);
  font-size: 9px;
}

.now-foot {
  min-height: 54px;
  display: flex;
  align-items: center;
  gap: 26px;
  color: var(--text-4);
  font-family: var(--font-mono);
  font-size: 9px;
}

.now-foot strong {
  color: var(--text-2);
  font-weight: 600;
}

.now-foot i {
  flex: 1;
  height: 1px;
  background: var(--line-1);
}

.now-foot button {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.spinning {
  animation: spin 900ms linear infinite;
}

.feedback-enter-active,
.feedback-leave-active {
  transition: opacity var(--t-base) var(--ease), transform var(--t-base) var(--ease);
}

.feedback-enter-from,
.feedback-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 980px) {
  .now-view {
    width: min(100% - 48px, 920px);
  }

  .focus-spread {
    grid-template-columns: 120px minmax(0, 1fr) 92px;
  }

  .focus-body {
    padding-right: 42px;
    padding-left: 42px;
  }

  .focus-copy h1,
  .empty-focus h1 {
    font-size: 39px;
  }

  .context-field {
    grid-template-columns: 1fr;
    gap: 58px;
  }

  .next-field,
  .judgement-field {
    padding: 0;
    border-left: 0;
  }

  .trace-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .trace-list button:nth-child(4) {
    border-left: 0;
    border-top: 1px solid var(--line-1);
  }

  .trace-list button:nth-child(n + 4) {
    border-top: 1px solid var(--line-1);
  }
}

@media (max-width: 760px) {
  .now-view {
    width: calc(100% - 32px);
    padding: 22px 0 calc(var(--app-mobile-nav-height) + 30px);
  }

  .folio-head {
    min-height: 72px;
    grid-template-columns: minmax(0, 1fr) 34px;
  }

  .folio-head > p {
    display: none;
  }

  .folio-identity {
    gap: 12px;
  }

  .folio-identity strong {
    font-size: 19px;
  }

  .focus-spread {
    min-height: 570px;
    grid-template-columns: 20px minmax(0, 1fr);
    grid-template-rows: auto 1fr auto;
  }

  .focus-margin {
    grid-column: 1 / -1;
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 30px 0 18px;
    border-right: 0;
  }

  .focus-margin > p {
    max-width: 48%;
    margin: 0;
    text-align: right;
    font-size: 10px;
  }

  .focus-body {
    grid-column: 2;
    grid-row: 2;
    padding: 30px 0 34px 18px;
    border-left: 1px solid var(--line-1);
  }

  .focus-copy h1,
  .empty-focus h1 {
    font-size: 31px;
    line-height: 1.38;
  }

  .focus-copy > p,
  .empty-focus > p {
    font-size: 13px;
  }

  .focus-action {
    grid-column: 1 / -1;
    grid-row: 3;
    flex-direction: row;
    align-items: center;
    padding: 20px 0 26px;
    border-top: 1px solid var(--line-1);
    border-left: 0;
  }

  .action-score {
    width: min(55%, 180px);
  }

  .focus-action > button {
    width: 64px;
    height: 64px;
  }

  .feedback-line {
    grid-template-columns: 20px minmax(0, 1fr) 24px;
    padding: 12px 0;
  }

  .feedback-options {
    grid-column: 1 / -1;
    grid-row: 2;
    border-top: 1px solid var(--line-1);
  }

  .week-score {
    grid-template-columns: 1fr;
    gap: 36px;
    padding: 56px 0 52px;
  }

  .section-margin > p {
    max-width: 320px;
  }

  .commitment-list article {
    grid-template-columns: 28px minmax(0, 1fr) 24px 24px;
  }

  .week-review > header {
    flex-direction: column;
  }

  .review-fit button {
    flex: 1;
    padding: 0 6px;
  }

  .context-field {
    padding: 54px 0;
  }

  .next-list > button {
    grid-template-columns: 28px minmax(0, 1fr) 16px;
    gap: 10px;
  }

  .next-list small {
    display: none;
  }

  .trace-list {
    grid-template-columns: 1fr;
  }

  .trace-list button,
  .trace-list button:nth-child(n) {
    min-height: 104px;
    border-top: 1px solid var(--line-1);
    border-left: 0;
  }

  .trace-list button:first-child {
    border-top: 0;
  }

  .now-foot {
    flex-wrap: wrap;
    gap: 12px 20px;
  }

  .now-foot i {
    flex-basis: 100%;
    order: 1;
  }

  .now-foot button:last-child {
    order: 2;
  }
}
</style>
