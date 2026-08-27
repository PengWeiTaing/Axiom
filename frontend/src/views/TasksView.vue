<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {
  ArrowUpRight,
  Check,
  Plus,
  RefreshCw,
  RotateCcw,
  X,
} from '@lucide/vue';
import {
  cancelTask,
  createTask,
  listTasks,
  markTaskDone,
  markTaskTodo,
  rescheduleTask,
  tasksToday,
} from '@/api/knowledge';
import { ApiError } from '@/api/client';
import ObjectDrawer from '@/components/ObjectDrawer.vue';
import type { Task, TaskList, TaskPriority, TaskStatus } from '@/api/types';
import type { ObjectTarget } from '@/api/types';
import { formatRelative } from '@/composables/useRelativeTime';
import { currentRouteParams, replaceRouteQuery } from '@/composables/useRouteQuery';

const PAGE_SIZE = 10;

const todayTasks = ref<Task[]>([]);
const overdueTasks = ref<Task[]>([]);
const tasks = ref<Task[]>([]);
const page = ref(1);
const totalPages = ref(1);
const total = ref(0);
const loadingToday = ref(false);
const loadingList = ref(false);
const saving = ref(false);
const busyTaskId = ref<number | null>(null);
const selectedObject = ref<ObjectTarget | null>(null);
const error = ref<string | null>(null);
const feedback = ref<string | null>(null);
const statusFilter = ref<TaskStatus | ''>('');
const priorityFilter = ref<TaskPriority | ''>('');
const draft = ref({
  title: '',
  detail: '',
  priority: 'medium' as TaskPriority,
  due_date: '',
});

const canLoadMore = computed(() => page.value < totalPages.value);
const todoCount = computed(() => tasks.value.filter((task) => task.status === 'todo').length);
const doneCount = computed(() => tasks.value.filter((task) => task.status === 'done').length);
const taskFiltersActive = computed(() => Boolean(statusFilter.value || priorityFilter.value));
const activeTaskFilterChips = computed(() => {
  const chips: string[] = [];
  if (statusFilter.value) chips.push(`${statusLabel(statusFilter.value)}`);
  if (priorityFilter.value) chips.push(`${priorityLabel(priorityFilter.value)}优先级`);
  return chips;
});

async function loadToday() {
  loadingToday.value = true;
  error.value = null;
  try {
    const payload = await tasksToday();
    todayTasks.value = payload.today || [];
    overdueTasks.value = payload.overdue || [];
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '今日任务加载失败';
  } finally {
    loadingToday.value = false;
  }
}

async function loadTaskList(reset = true) {
  loadingList.value = true;
  error.value = null;
  if (reset) syncTaskListUrl();
  try {
    const nextPage = reset ? 1 : page.value + 1;
    const payload: TaskList = await listTasks({
      status: statusFilter.value,
      priority: priorityFilter.value,
      page: nextPage,
      page_size: PAGE_SIZE,
    });
    page.value = payload.page;
    totalPages.value = payload.total_pages || 1;
    total.value = payload.total || 0;
    tasks.value = reset ? payload.tasks : [...tasks.value, ...payload.tasks];
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '任务列表加载失败';
  } finally {
    loadingList.value = false;
  }
}

async function refreshAll() {
  await Promise.all([loadToday(), loadTaskList(true)]);
}

function applyTaskFilters() {
  loadTaskList(true);
}

function resetTaskFilters() {
  statusFilter.value = '';
  priorityFilter.value = '';
  loadTaskList(true);
}

function syncTaskListUrl() {
  replaceRouteQuery('tasks', {
    status: statusFilter.value,
    priority: priorityFilter.value,
  });
}

async function submitTask() {
  const title = draft.value.title.trim();
  if (!title || saving.value) return;
  saving.value = true;
  error.value = null;
  feedback.value = null;
  try {
    await createTask({
      title,
      detail: draft.value.detail.trim() || undefined,
      priority: draft.value.priority,
      due_date: draft.value.due_date || undefined,
    });
    draft.value = { title: '', detail: '', priority: 'medium', due_date: '' };
    feedback.value = '任务已添加';
    await refreshAll();
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '任务添加失败';
  } finally {
    saving.value = false;
  }
}

async function updateTaskStatus(task: Task, action: 'done' | 'todo' | 'cancel' | 'today') {
  if (busyTaskId.value) return;
  busyTaskId.value = task.id;
  error.value = null;
  feedback.value = null;
  try {
    if (action === 'done') await markTaskDone(task.id);
    if (action === 'todo') await markTaskTodo(task.id);
    if (action === 'cancel') await cancelTask(task.id);
    if (action === 'today') await rescheduleTask(task.id, todayIso());
    feedback.value = actionFeedback(action);
    await refreshAll();
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '任务操作失败';
  } finally {
    busyTaskId.value = null;
  }
}

function todayIso(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function actionFeedback(action: 'done' | 'todo' | 'cancel' | 'today'): string {
  const labels = {
    done: '任务已完成',
    todo: '任务已恢复',
    cancel: '任务已取消',
    today: '任务已安排到今天',
  };
  return labels[action];
}

function statusLabel(status: TaskStatus): string {
  const labels: Record<TaskStatus, string> = {
    todo: '待办',
    done: '已完成',
    cancelled: '已取消',
  };
  return labels[status];
}

function priorityLabel(priority: TaskPriority): string {
  const labels: Record<TaskPriority, string> = {
    high: '高',
    medium: '中',
    low: '低',
  };
  return labels[priority];
}

function dueLabel(task: Task): string {
  if (!task.due_date) return '无截止';
  const overdue = task.overdue_days && task.overdue_days > 0 ? ` · 已过 ${task.overdue_days} 天` : '';
  return `${task.due_date}${overdue}`;
}

function taskDetail(task: Task): string {
  const detail = String(task.detail || '').replace(/\s+/g, ' ').trim();
  if (!detail) return '没有补充说明';
  return detail.length > 110 ? `${detail.slice(0, 109)}…` : detail;
}

function openTaskDetail(id: number) {
  selectedObject.value = { kind: 'task', id };
}

onMounted(() => {
  const params = currentRouteParams();
  const initialStatus = params.get('status');
  const initialPriority = params.get('priority');
  if (initialStatus === 'todo' || initialStatus === 'done' || initialStatus === 'cancelled') {
    statusFilter.value = initialStatus;
  }
  if (initialPriority === 'high' || initialPriority === 'medium' || initialPriority === 'low') {
    priorityFilter.value = initialPriority;
  }
  refreshAll();
});
</script>

<template>
  <main class="tasks-view">
    <header class="topbar">
      <div>
        <p class="eyebrow">04 / ACTION</p>
        <h1>行动索引</h1>
        <span>COMMITMENTS / NEXT STEPS / HISTORY</span>
      </div>
      <button class="refresh-btn" type="button" title="刷新行动" aria-label="刷新行动" :disabled="loadingToday || loadingList" @click="refreshAll">
        <RefreshCw :size="17" :class="{ spinning: loadingToday || loadingList }" />
      </button>
    </header>

    <div v-if="error" class="notice error-row">
      <span>{{ error }}</span>
      <button type="button" @click="refreshAll">重试</button>
    </div>
    <div v-else-if="feedback" class="notice feedback-row">
      <span>{{ feedback }}</span>
    </div>

    <section class="metrics" aria-label="行动计数">
      <article>
        <span>NOW</span>
        <strong>{{ todayTasks.length }}</strong>
        <small>今天</small>
      </article>
      <article :class="{ urgent: overdueTasks.length > 0 }">
        <span>OVERDUE</span>
        <strong>{{ overdueTasks.length }}</strong>
        <small>需要重排</small>
      </article>
      <article>
        <span>LEDGER</span>
        <strong>{{ total }}</strong>
        <small>{{ todoCount }} 推进中 / {{ doneCount }} 已完成</small>
      </article>
    </section>

    <section class="workspace-grid">
      <details class="panel create-panel">
        <summary class="panel-head">
          <div>
            <p class="eyebrow">NEW / 01</p>
            <h2>记下一步</h2>
          </div>
          <Plus :size="18" />
        </summary>

        <form class="task-form" @submit.prevent="submitTask">
          <label>
            <span>标题</span>
            <input
              v-model="draft.title"
              aria-label="任务标题"
              type="text"
              autocomplete="off"
              placeholder="下一步要完成什么"
            />
          </label>
          <label>
            <span>详情</span>
            <textarea
              v-model="draft.detail"
              aria-label="任务详情"
              rows="4"
              placeholder="背景、约束或验收口径"
            />
          </label>
          <div class="form-row">
            <label>
              <span>优先级</span>
              <select v-model="draft.priority" aria-label="任务优先级">
                <option value="high">高</option>
                <option value="medium">中</option>
                <option value="low">低</option>
              </select>
            </label>
            <label>
              <span>截止日期</span>
              <input v-model="draft.due_date" aria-label="截止日期" type="date" />
            </label>
          </div>
          <button class="primary-action" type="submit" :disabled="saving || !draft.title.trim()">
            <Plus :size="15" />
            <span>{{ saving ? '添加中' : '加入行动账册' }}</span>
          </button>
        </form>
      </details>

      <div class="panel today-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">CURRENT / 02</p>
            <h2>今天与逾期</h2>
          </div>
          <small>{{ overdueTasks.length + todayTasks.length }} 项</small>
        </div>

        <div v-if="overdueTasks.length" class="task-stack">
          <p class="section-label">逾期</p>
          <article v-for="task in overdueTasks" :key="`overdue-${task.id}`" class="task-row overdue">
            <div class="task-main">
              <strong>{{ task.title }}</strong>
              <p>{{ taskDetail(task) }}</p>
              <div class="task-meta">
                <span>{{ priorityLabel(task.priority) }}</span>
                <span>{{ dueLabel(task) }}</span>
              </div>
            </div>
            <div class="task-actions">
              <button type="button" title="打开详情" aria-label="打开行动详情" @click="openTaskDetail(task.id)"><ArrowUpRight :size="14" /></button>
              <button type="button" :disabled="busyTaskId === task.id" @click="updateTaskStatus(task, 'done')"><Check :size="14" /><span>完成</span></button>
              <button type="button" :disabled="busyTaskId === task.id" @click="updateTaskStatus(task, 'today')"><RotateCcw :size="14" /><span>今天做</span></button>
            </div>
          </article>
        </div>

        <div v-if="todayTasks.length" class="task-stack">
          <p class="section-label">今天</p>
          <article v-for="task in todayTasks" :key="`today-${task.id}`" class="task-row">
            <div class="task-main">
              <strong>{{ task.title }}</strong>
              <p>{{ taskDetail(task) }}</p>
              <div class="task-meta">
                <span>{{ priorityLabel(task.priority) }}</span>
                <span>{{ dueLabel(task) }}</span>
              </div>
            </div>
            <div class="task-actions">
              <button type="button" title="打开详情" aria-label="打开行动详情" @click="openTaskDetail(task.id)"><ArrowUpRight :size="14" /></button>
              <button type="button" :disabled="busyTaskId === task.id" @click="updateTaskStatus(task, 'done')"><Check :size="14" /><span>完成</span></button>
              <button type="button" :disabled="busyTaskId === task.id" @click="updateTaskStatus(task, 'cancel')"><X :size="14" /><span>取消</span></button>
            </div>
          </article>
        </div>

        <p v-if="!loadingToday && !overdueTasks.length && !todayTasks.length" class="empty-line">今天没有待办任务</p>
        <p v-else-if="loadingToday" class="empty-line">加载今日任务中...</p>
      </div>
    </section>

    <section class="panel list-panel">
      <div class="panel-head">
        <div>
          <p class="eyebrow">ARCHIVE / 03</p>
          <h2>行动档案</h2>
        </div>
        <div class="filters">
          <label>
            <span>状态</span>
            <select v-model="statusFilter" aria-label="任务状态筛选" @change="applyTaskFilters">
              <option value="">全部</option>
              <option value="todo">待办</option>
              <option value="done">已完成</option>
              <option value="cancelled">已取消</option>
            </select>
          </label>
          <label>
            <span>优先级</span>
            <select v-model="priorityFilter" aria-label="优先级筛选" @change="applyTaskFilters">
              <option value="">全部</option>
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </label>
        </div>
      </div>

      <div v-if="taskFiltersActive" class="filter-summary" aria-label="当前任务筛选">
        <span v-for="chip in activeTaskFilterChips" :key="chip">{{ chip }}</span>
        <button type="button" :disabled="loadingList" @click="resetTaskFilters">重置筛选</button>
      </div>

      <div v-if="tasks.length" class="task-list">
        <article v-for="task in tasks" :key="task.id" class="task-row" :class="task.status">
          <div class="status-dot" :class="task.status" aria-hidden="true" />
          <div class="task-main">
            <strong>{{ task.title }}</strong>
            <p>{{ taskDetail(task) }}</p>
            <div class="task-meta">
              <span>{{ statusLabel(task.status) }}</span>
              <span>{{ priorityLabel(task.priority) }}</span>
              <span>{{ dueLabel(task) }}</span>
              <span>{{ formatRelative(task.updated_at) }}</span>
            </div>
          </div>
          <div class="task-actions">
            <button type="button" title="打开详情" aria-label="打开行动详情" @click="openTaskDetail(task.id)"><ArrowUpRight :size="14" /></button>
            <button
              v-if="task.status !== 'done'"
              type="button"
              :disabled="busyTaskId === task.id"
              @click="updateTaskStatus(task, 'done')"
            ><Check :size="14" /><span>完成</span></button>
            <button
              v-if="task.status !== 'todo'"
              type="button"
              :disabled="busyTaskId === task.id"
              @click="updateTaskStatus(task, 'todo')"
            ><RotateCcw :size="14" /><span>恢复</span></button>
            <button
              v-if="task.status !== 'cancelled'"
              type="button"
              :disabled="busyTaskId === task.id"
              @click="updateTaskStatus(task, 'cancel')"
            ><X :size="14" /><span>取消</span></button>
          </div>
        </article>
      </div>
      <p v-else class="empty-line">{{ loadingList ? '加载任务中...' : '暂无任务' }}</p>
      <button v-if="canLoadMore" class="load-more" type="button" :disabled="loadingList" @click="loadTaskList(false)">
        {{ loadingList ? '加载中' : '加载更多' }}
      </button>
    </section>

    <ObjectDrawer
      :target="selectedObject"
      @close="selectedObject = null"
      @changed="refreshAll"
      @open-object="selectedObject = $event"
    />
  </main>
</template>

<style scoped>
.tasks-view {
  width: min(1240px, 100%);
  min-height: 100vh;
  margin: 0 auto;
  padding: 46px 42px 110px;
  color: var(--text-1);
  background: transparent;
}

.topbar,
.panel-head,
.form-row,
.filters,
.task-actions,
.task-meta,
.metrics {
  display: flex;
  align-items: center;
}

.topbar {
  min-height: 168px;
  justify-content: space-between;
  gap: 32px;
  border-bottom: 1px solid var(--line-2);
}

.topbar h1,
.panel-head h2 {
  margin: 0;
  letter-spacing: 0;
}

.topbar h1 {
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 44px;
  font-weight: 640;
  line-height: 1.18;
}

.topbar > div > span {
  display: block;
  margin-top: 12px;
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 11px;
}

.eyebrow,
.section-label {
  margin: 0 0 var(--s-1);
  color: var(--text-3);
  font-family: var(--font-mono);
  font-size: var(--fs-1);
  text-transform: uppercase;
  letter-spacing: 0;
}

.refresh-btn,
.primary-action,
.task-actions button,
.load-more,
.notice button {
  border: 1px solid var(--line-2);
  border-radius: 0;
  background: transparent;
  color: var(--text-3);
  cursor: pointer;
  transition: background var(--t-base) var(--ease), border-color var(--t-base) var(--ease);
}

.refresh-btn,
.load-more {
  min-width: 42px;
  min-height: 42px;
  display: grid;
  place-items: center;
  padding: 0 14px;
  border-color: var(--line-2);
}

.primary-action {
  width: 100%;
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 var(--s-4);
  color: var(--surface-1);
  background: var(--text-1);
  border-color: var(--text-1);
}

button:hover:not(:disabled) {
  color: var(--text-1);
  background: var(--surface-2);
  border-color: var(--line-3);
}

.primary-action:hover:not(:disabled) {
  color: var(--surface-1);
  background: var(--focus);
  border-color: var(--focus);
}

button:disabled {
  opacity: 0.48;
  cursor: not-allowed;
}

.notice {
  display: flex;
  justify-content: space-between;
  gap: var(--s-3);
  margin: 14px 0;
  padding: 10px 14px;
  border-radius: 0;
}

.error-row {
  background: rgba(180, 106, 99, 0.14);
  border: 1px solid rgba(180, 106, 99, 0.24);
}

.feedback-row {
  background: rgba(109, 181, 168, 0.12);
  border: 1px solid rgba(109, 181, 168, 0.22);
}

.metrics {
  gap: 0;
  border-bottom: 1px solid var(--line-2);
}

.metrics article {
  flex: 1;
  min-width: 0;
  min-height: 92px;
  display: grid;
  grid-template-columns: minmax(56px, auto) 1fr;
  grid-template-rows: auto auto;
  align-content: center;
  gap: 2px 14px;
  padding: 16px 24px;
  border-right: 1px solid var(--line-1);
  background: transparent;
}

.metrics article:last-child {
  border-right: 0;
}

.metrics span,
.metrics small,
.task-meta {
  color: var(--text-3);
}

.metrics strong {
  grid-row: 1 / 3;
  color: var(--accent-bright);
  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 580;
  line-height: 1;
}

.metrics .urgent strong {
  color: var(--focus);
}

.workspace-grid {
  display: grid;
  grid-template-columns: minmax(280px, 0.72fr) minmax(420px, 1.28fr);
  gap: 0;
  border-bottom: 1px solid var(--line-2);
}

.panel {
  border: 0;
  border-radius: 0;
  background: transparent;
  backdrop-filter: none;
}

.create-panel {
  border-right: 1px solid var(--line-1);
}

.create-panel,
.today-panel {
  padding: 30px 32px;
}

.list-panel {
  padding: 44px 0 0;
}

.create-panel > summary {
  cursor: pointer;
  list-style: none;
}

.create-panel > summary::-webkit-details-marker {
  display: none;
}

.create-panel > summary > svg {
  color: var(--focus);
  transition: transform var(--t-base) var(--ease);
}

.create-panel[open] > summary > svg {
  transform: rotate(45deg);
}

.panel-head {
  justify-content: space-between;
  gap: var(--s-4);
  margin-bottom: 0;
}

.create-panel[open] .panel-head,
.today-panel .panel-head,
.list-panel .panel-head {
  margin-bottom: 24px;
}

.task-form {
  display: grid;
  gap: 18px;
  padding-top: 4px;
}

.task-form label,
.filters label {
  display: grid;
  gap: var(--s-1);
  color: var(--text-3);
  font-size: var(--fs-1);
}

.task-form input,
.task-form textarea,
.task-form select,
.filters select {
  width: 100%;
  border: 0;
  border-bottom: 1px solid var(--line-2);
  border-radius: 0;
  background: transparent;
  color: var(--text-1);
  font: inherit;
}

.task-form input,
.task-form select,
.filters select {
  min-height: 40px;
  padding: 0 var(--s-3);
}

.task-form textarea {
  min-height: 88px;
  border: 1px solid var(--line-1);
  resize: vertical;
  padding: var(--s-3);
}

.task-form input:focus,
.task-form select:focus,
.task-form textarea:focus,
.filters select:focus {
  border-color: var(--cobalt);
  outline: none;
}

.form-row,
.filters {
  gap: var(--s-3);
}

.form-row label,
.filters label {
  flex: 1;
}

.filter-summary {
  --filter-summary-accent: var(--accent);
  --filter-summary-button-border: var(--line-2);
  --filter-summary-button-bg: transparent;
  --filter-summary-button-color: var(--text-1);
  --filter-summary-button-hover-border: var(--line-3);
  --filter-summary-button-hover-bg: var(--surface-2);
  margin: -8px 0 16px;
}

.task-stack,
.task-list {
  display: grid;
  gap: 0;
}

.task-stack + .task-stack {
  margin-top: var(--s-4);
}

.task-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: var(--s-3);
  align-items: center;
  min-height: 82px;
  padding: 16px 0;
  border-top: 1px solid var(--line-1);
  border-radius: 0;
  background: transparent;
}

.task-list .task-row:last-child,
.task-stack .task-row:last-child {
  border-bottom: 1px solid var(--line-1);
}

.today-panel .task-row {
  grid-template-columns: minmax(0, 1fr) auto;
}

.task-row.overdue {
  box-shadow: inset 3px 0 0 var(--focus);
}

.task-row.done {
  opacity: 0.72;
}

.task-row.cancelled {
  opacity: 0.52;
}

.task-main {
  min-width: 0;
}

.task-main strong,
.task-main p {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-main strong {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 520;
}

.task-main p {
  margin: var(--s-1) 0 var(--s-2);
  color: var(--text-2);
  white-space: nowrap;
}

.task-meta {
  flex-wrap: wrap;
  gap: var(--s-2);
  font-size: var(--fs-1);
}

.task-meta span,
.status-dot {
  border-radius: 0;
}

.task-meta span {
  padding-right: var(--s-2);
  background: transparent;
}

.status-dot {
  width: 3px;
  height: 34px;
  background: var(--accent);
  box-shadow: none;
}

.status-dot.done {
  background: var(--cobalt);
}

.status-dot.cancelled {
  background: var(--text-5);
}

.task-actions {
  justify-content: flex-end;
  gap: var(--s-2);
  flex-wrap: wrap;
}

.task-actions button {
  min-height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0 var(--s-3);
  font-size: var(--fs-1);
  border-color: transparent;
}

.task-actions button:first-child {
  width: 32px;
  padding: 0;
  border-color: var(--line-1);
}

.empty-line {
  margin: 0;
  color: var(--text-3);
}

.load-more {
  width: 100%;
  margin-top: 20px;
}

.spinning {
  animation: ledger-spin 0.8s linear infinite;
}

@keyframes ledger-spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 900px) {
  .tasks-view {
    padding: 28px 18px calc(var(--app-mobile-nav-height) + 34px);
  }

  .workspace-grid,
  .metrics {
    grid-template-columns: 1fr;
  }

  .metrics {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .metrics article {
    min-height: 82px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 14px 10px;
  }

  .metrics strong {
    order: -1;
    font-size: 27px;
  }

  .metrics small {
    display: none;
  }

  .topbar {
    min-height: 140px;
  }

  .topbar h1 {
    font-size: 34px;
  }

  .create-panel {
    border-right: 0;
    border-bottom: 1px solid var(--line-1);
  }

  .create-panel,
  .today-panel {
    padding: 24px 0;
  }

  .list-panel {
    padding-top: 34px;
  }

  .task-row,
  .today-panel .task-row {
    align-items: stretch;
  }

  .topbar,
  .panel-head {
    align-items: center;
  }

  .task-row,
  .today-panel .task-row {
    grid-template-columns: 1fr;
  }

  .status-dot {
    display: none;
  }

  .filters,
  .form-row {
    flex-direction: column;
  }

  .task-actions {
    justify-content: flex-start;
  }
}
</style>
