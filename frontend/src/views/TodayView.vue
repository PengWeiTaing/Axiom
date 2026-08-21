<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import {
  ArrowRight,
  Brain,
  Check,
  Clock,
  FileText,
  GitFork,
  Inbox,
  Plus,
  RefreshCw,
  Target,
  X,
} from '@lucide/vue';
import { ApiError } from '@/api/client';
import { completeContextAction, getNowContext, submitContextFeedback } from '@/api/context';
import { listDecisions, listMemories } from '@/api/knowledge';
import { getOverview } from '@/api/records';
import type {
  ContextAction,
  ContextFitFeedback,
  ContextGoal,
  ContextCommitmentGoal,
  ContextOutcome,
  Decision,
  Item,
  Memory,
  NowContextPayload,
  ObjectTarget,
  OverviewPayload,
  Task,
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
const selectedObjectIntent = ref<'view' | 'add-goal-action'>('view');
const completingId = ref<number | null>(null);
const feedbackOutcome = ref<ContextOutcome | null>(null);
const feedbackEffect = ref<string | null>(null);
const feedbackSubmitting = ref(false);

const feedbackOptions: { value: ContextFitFeedback; label: string }[] = [
  { value: 'right', label: '正合适' },
  { value: 'too_heavy', label: '有点重' },
  { value: 'wrong_time', label: '时机不对' },
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
const goalGaps = computed(() => nowContext.value?.commitments.gaps ?? []);
const firstGoalGap = computed(() => goalGaps.value[0] ?? null);
const recentItems = computed(() => overview.value?.recent.items.slice(0, 5) ?? []);
const backlogTotal = computed(() => overview.value?.processing_backlog.total ?? 0);
const judgementTotal = computed(() => (
  goalGaps.value.length + candidateMemories.value.length + pendingDecisions.value.length
));

function actionMeta(action: ContextAction): string {
  return action.cues.slice(0, 3).join(' · ');
}

function compact(value: string | null | undefined, fallback: string, limit = 92): string {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text) return fallback;
  return text.length > limit ? `${text.slice(0, limit - 1)}…` : text;
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
    const [overviewPayload, contextPayload, memoryPayload, decisionPayload] = await Promise.all([
      getOverview({ recent_limit: 6, preview_chars: 140 }),
      getNowContext(5),
      listMemories({ status: 'candidate', page: 1, page_size: 4 }),
      listDecisions({ status: 'pending', page: 1, page_size: 4 }),
    ]);
    overview.value = overviewPayload;
    nowContext.value = contextPayload;
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

function dismissFeedback() {
  feedbackOutcome.value = null;
  feedbackEffect.value = null;
}

function openTask(task: Task) {
  selectedObjectIntent.value = 'view';
  selectedObject.value = { kind: 'task', id: task.id };
}

function openMemory(memory: Memory) {
  selectedObjectIntent.value = 'view';
  selectedObject.value = { kind: 'memory', id: memory.id };
}

function openDecision(decision: Decision) {
  selectedObjectIntent.value = 'view';
  selectedObject.value = { kind: 'decision', id: decision.id };
}

function openGoal(goal: ContextGoal | ContextCommitmentGoal, addAction = false) {
  selectedObjectIntent.value = addAction ? 'add-goal-action' : 'view';
  selectedObject.value = { kind: 'memory', id: goal.id };
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
        <template v-if="firstGoalGap">
          <h2 id="focus-title">目标还在，下一步还没落下来</h2>
          <p>先为「{{ compact(firstGoalGap.title, '已确认目标', 40) }}」补一个可以开始的动作。</p>
          <button class="capture-button" type="button" @click="openGoal(firstGoalGap, true)">
            <Target :size="18" />
            <span>补下一步</span>
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

        <div v-if="goalGaps.length || candidateMemories.length || pendingDecisions.length" class="row-list">
          <button v-for="goal in goalGaps" :key="`goal-${goal.id}`" class="content-row" type="button" @click="openGoal(goal, true)">
            <span class="row-icon goal-icon"><Target :size="16" /></span>
            <span class="row-copy">
              <strong>{{ goal.title }}</strong>
              <small>已确认目标 · 还没有下一步</small>
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
      @open-object="selectedObject = $event"
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

.row-icon {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  color: var(--text-4);
}

.task-icon { color: var(--info); }
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

  .today-columns {
    padding-top: 32px;
  }
}
</style>
