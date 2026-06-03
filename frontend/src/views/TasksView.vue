<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {
  cancelTask,
  createTask,
  listTasks,
  markTaskDone,
  markTaskTodo,
  rescheduleTask,
  tasksToday,
} from '@/api/endpoints';
import { ApiError } from '@/api/client';
import ObjectDrawer from '@/components/ObjectDrawer.vue';
import type { Task, TaskList, TaskPriority, TaskStatus } from '@/api/types';
import type { ObjectTarget } from '@/api/types';
import { formatRelative } from '@/composables/useRelativeTime';

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

onMounted(refreshAll);
</script>

<template>
  <main class="tasks-view">
    <header class="topbar">
      <div>
        <p class="eyebrow">Tasks</p>
        <h1>任务台</h1>
      </div>
      <button class="refresh-btn" type="button" :disabled="loadingToday || loadingList" @click="refreshAll">
        <span>{{ loadingToday || loadingList ? '刷新中' : '刷新' }}</span>
      </button>
    </header>

    <div v-if="error" class="notice error-row">
      <span>{{ error }}</span>
      <button type="button" @click="refreshAll">重试</button>
    </div>
    <div v-else-if="feedback" class="notice feedback-row">
      <span>{{ feedback }}</span>
    </div>

    <section class="metrics" aria-label="任务指标">
      <article>
        <span>今日</span>
        <strong>{{ todayTasks.length }}</strong>
        <small>当前需要推进</small>
      </article>
      <article :class="{ urgent: overdueTasks.length > 0 }">
        <span>逾期</span>
        <strong>{{ overdueTasks.length }}</strong>
        <small>需要重新安排</small>
      </article>
      <article>
        <span>列表</span>
        <strong>{{ total }}</strong>
        <small>{{ todoCount }} 待办 / {{ doneCount }} 完成</small>
      </article>
    </section>

    <section class="workspace-grid">
      <div class="panel create-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Create</p>
            <h2>快速新增</h2>
          </div>
        </div>

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
            {{ saving ? '添加中' : '添加任务' }}
          </button>
        </form>
      </div>

      <div class="panel today-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Today</p>
            <h2>今日任务</h2>
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
              <button type="button" @click="openTaskDetail(task.id)">详情</button>
              <button type="button" :disabled="busyTaskId === task.id" @click="updateTaskStatus(task, 'done')">完成</button>
              <button type="button" :disabled="busyTaskId === task.id" @click="updateTaskStatus(task, 'today')">今天做</button>
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
              <button type="button" @click="openTaskDetail(task.id)">详情</button>
              <button type="button" :disabled="busyTaskId === task.id" @click="updateTaskStatus(task, 'done')">完成</button>
              <button type="button" :disabled="busyTaskId === task.id" @click="updateTaskStatus(task, 'cancel')">取消</button>
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
          <p class="eyebrow">All Tasks</p>
          <h2>全部任务</h2>
        </div>
        <div class="filters">
          <label>
            <span>状态</span>
            <select v-model="statusFilter" aria-label="任务状态筛选" @change="loadTaskList(true)">
              <option value="">全部</option>
              <option value="todo">待办</option>
              <option value="done">已完成</option>
              <option value="cancelled">已取消</option>
            </select>
          </label>
          <label>
            <span>优先级</span>
            <select v-model="priorityFilter" aria-label="优先级筛选" @change="loadTaskList(true)">
              <option value="">全部</option>
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </label>
        </div>
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
            <button type="button" @click="openTaskDetail(task.id)">详情</button>
            <button
              v-if="task.status !== 'done'"
              type="button"
              :disabled="busyTaskId === task.id"
              @click="updateTaskStatus(task, 'done')"
            >完成</button>
            <button
              v-if="task.status !== 'todo'"
              type="button"
              :disabled="busyTaskId === task.id"
              @click="updateTaskStatus(task, 'todo')"
            >恢复</button>
            <button
              v-if="task.status !== 'cancelled'"
              type="button"
              :disabled="busyTaskId === task.id"
              @click="updateTaskStatus(task, 'cancel')"
            >取消</button>
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
  min-height: 100vh;
  padding: var(--s-8) var(--s-6) calc(var(--s-8) + 72px);
  color: var(--text-1);
  background:
    radial-gradient(circle at 10% 0%, rgba(109, 181, 168, 0.10), transparent 32%),
    linear-gradient(180deg, rgba(12, 16, 24, 0.96), rgba(9, 12, 18, 1));
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
  justify-content: space-between;
  gap: var(--s-4);
  margin-bottom: var(--s-5);
}

.topbar h1,
.panel-head h2 {
  margin: 0;
  letter-spacing: 0;
}

.topbar h1 {
  font-size: clamp(2rem, 3vw, 3rem);
}

.eyebrow,
.section-label {
  margin: 0 0 var(--s-1);
  color: var(--text-3);
  font-size: var(--fs-1);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.refresh-btn,
.primary-action,
.task-actions button,
.load-more,
.notice button {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-1);
  cursor: pointer;
  transition: background var(--t-base) var(--ease), border-color var(--t-base) var(--ease);
}

.refresh-btn,
.load-more {
  padding: var(--s-2) var(--s-4);
}

.primary-action {
  width: 100%;
  padding: var(--s-3) var(--s-4);
  background: rgba(109, 181, 168, 0.16);
  border-color: rgba(109, 181, 168, 0.34);
}

button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.10);
  border-color: rgba(255, 255, 255, 0.22);
}

button:disabled {
  opacity: 0.48;
  cursor: not-allowed;
}

.notice {
  display: flex;
  justify-content: space-between;
  gap: var(--s-3);
  margin-bottom: var(--s-4);
  padding: var(--s-3) var(--s-4);
  border-radius: 8px;
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
  gap: var(--s-3);
  margin-bottom: var(--s-5);
}

.metrics article {
  flex: 1;
  min-width: 0;
  padding: var(--s-4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.045);
}

.metrics span,
.metrics small,
.task-meta {
  color: var(--text-3);
}

.metrics strong {
  display: block;
  margin: var(--s-1) 0;
  font-size: 1.9rem;
}

.metrics .urgent strong {
  color: #e1a39b;
}

.workspace-grid {
  display: grid;
  grid-template-columns: minmax(280px, 0.8fr) minmax(360px, 1.2fr);
  gap: var(--s-4);
  margin-bottom: var(--s-4);
}

.panel {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.045);
  backdrop-filter: blur(18px);
}

.create-panel,
.today-panel,
.list-panel {
  padding: var(--s-5);
}

.panel-head {
  justify-content: space-between;
  gap: var(--s-4);
  margin-bottom: var(--s-4);
}

.task-form {
  display: grid;
  gap: var(--s-3);
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
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 8px;
  background: rgba(7, 10, 15, 0.64);
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
  resize: vertical;
  padding: var(--s-3);
}

.form-row,
.filters {
  gap: var(--s-3);
}

.form-row label,
.filters label {
  flex: 1;
}

.task-stack,
.task-list {
  display: grid;
  gap: var(--s-3);
}

.task-stack + .task-stack {
  margin-top: var(--s-4);
}

.task-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: var(--s-3);
  align-items: center;
  padding: var(--s-3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: rgba(8, 11, 17, 0.46);
}

.today-panel .task-row {
  grid-template-columns: minmax(0, 1fr) auto;
}

.task-row.overdue {
  border-color: rgba(180, 106, 99, 0.22);
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
  border-radius: 999px;
}

.task-meta span {
  padding: 2px var(--s-2);
  background: rgba(255, 255, 255, 0.055);
}

.status-dot {
  width: 9px;
  height: 9px;
  background: #6db5a8;
  box-shadow: 0 0 16px rgba(109, 181, 168, 0.38);
}

.status-dot.done {
  background: #a6b4c8;
  box-shadow: none;
}

.status-dot.cancelled {
  background: #8f7f7c;
  box-shadow: none;
}

.task-actions {
  justify-content: flex-end;
  gap: var(--s-2);
  flex-wrap: wrap;
}

.task-actions button {
  min-height: 32px;
  padding: 0 var(--s-3);
  font-size: var(--fs-1);
}

.empty-line {
  margin: 0;
  color: var(--text-3);
}

.load-more {
  margin-top: var(--s-4);
}

@media (max-width: 900px) {
  .tasks-view {
    padding: var(--s-7) var(--s-4) calc(var(--s-8) + 72px);
  }

  .workspace-grid,
  .metrics {
    grid-template-columns: 1fr;
  }

  .metrics {
    display: grid;
  }

  .topbar,
  .panel-head,
  .task-row,
  .today-panel .task-row {
    align-items: stretch;
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
}
</style>
