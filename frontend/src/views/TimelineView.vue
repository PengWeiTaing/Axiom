<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ApiError } from '@/api/client';
import { getTimeline } from '@/api/endpoints';
import ItemDrawer from '@/components/ItemDrawer.vue';
import ObjectDrawer from '@/components/ObjectDrawer.vue';
import { formatRelative } from '@/composables/useRelativeTime';
import type { ObjectTarget, TimelineEntry, TimelineKind, TimelinePayload } from '@/api/types';

const PAGE_SIZE = 28;

const entries = ref<TimelineEntry[]>([]);
const page = ref(1);
const totalPages = ref(1);
const total = ref(0);
const loading = ref(false);
const error = ref<string | null>(null);
const selectedItemId = ref<number | null>(null);
const selectedObject = ref<ObjectTarget | null>(null);
const selectedEntry = ref<TimelineEntry | null>(null);
const dateFrom = ref('');
const dateTo = ref('');
const selectedKinds = ref<Record<TimelineKind, boolean>>({
  item: true,
  task: true,
  memory: true,
  decision: true,
});

const enabledKinds = computed(() =>
  (Object.entries(selectedKinds.value) as Array<[TimelineKind, boolean]>)
    .filter(([, enabled]) => enabled)
    .map(([kind]) => kind),
);

const canLoadMore = computed(() => page.value < totalPages.value);
const dateFilterActive = computed(() => Boolean(dateFrom.value || dateTo.value));
const activeEntry = computed(() => selectedEntry.value || entries.value[0] || null);

const counts = computed(() => {
  const next: Record<TimelineKind, number> = { item: 0, task: 0, memory: 0, decision: 0 };
  for (const entry of entries.value) next[entry.kind] += 1;
  return next;
});

async function loadTimeline(reset = true) {
  loading.value = true;
  error.value = null;
  try {
    const nextPage = reset ? 1 : page.value + 1;
    const payload: TimelinePayload = await getTimeline({
      kinds: enabledKinds.value,
      date_from: dateFrom.value,
      date_to: dateTo.value,
      page: nextPage,
      page_size: PAGE_SIZE,
    });
    page.value = payload.page;
    totalPages.value = payload.total_pages || 1;
    total.value = payload.total || 0;
    entries.value = reset ? payload.entries : [...entries.value, ...payload.entries];
    if (reset || !selectedEntry.value) {
      selectedEntry.value = entries.value[0] || null;
    } else if (!entries.value.some((entry) => entryKey(entry) === entryKey(selectedEntry.value as TimelineEntry))) {
      selectedEntry.value = entries.value[0] || null;
    }
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '时间流加载失败';
    if (reset) {
      entries.value = [];
      selectedEntry.value = null;
    }
  } finally {
    loading.value = false;
  }
}

function toggleKind(kind: TimelineKind) {
  selectedKinds.value[kind] = !selectedKinds.value[kind];
  if (!enabledKinds.value.length) selectedKinds.value[kind] = true;
  loadTimeline(true);
}

function setDateWindow(days: number) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days + 1);
  dateFrom.value = toDateInputValue(start);
  dateTo.value = toDateInputValue(end);
  loadTimeline(true);
}

function clearDateWindow() {
  dateFrom.value = '';
  dateTo.value = '';
  loadTimeline(true);
}

function openEntry(entry: TimelineEntry) {
  if (!entry.id) return;
  selectedEntry.value = entry;
  if (entry.kind === 'item') {
    selectedItemId.value = entry.id;
    return;
  }
  selectedObject.value = { kind: entry.kind, id: entry.id };
}

function selectEntry(entry: TimelineEntry) {
  selectedEntry.value = entry;
}

function openSelectedEntry() {
  if (!activeEntry.value) return;
  openEntry(activeEntry.value);
}

function openSourceItem(id: number) {
  selectedObject.value = null;
  selectedItemId.value = id;
}

function kindLabel(kind: TimelineKind): string {
  return { item: '记录', task: '任务', memory: '记忆', decision: '决策' }[kind];
}

function eventLabel(event: string): string {
  const labels: Record<string, string> = {
    created: '创建',
    archived: '归档',
    restored: '恢复',
    deleted: '删除',
    completed: '完成',
    cancelled: '取消',
    confirmed: '确认',
    reviewed: '回顾',
  };
  return labels[event] || event;
}

function entryTitle(entry: TimelineEntry): string {
  return entry.title || `${kindLabel(entry.kind)} #${entry.id ?? '-'}`;
}

function entrySummary(entry: TimelineEntry): string {
  const text = String(entry.summary || '').replace(/\s+/g, ' ').trim();
  return text || '没有可读摘要';
}

function entryKey(entry: TimelineEntry): string {
  return `${entry.kind}-${entry.id}-${entry.event}-${entry.occurred_at}`;
}

function metaText(entry: TimelineEntry): string {
  const pairs = Object.entries(entry.meta || {})
    .filter(([, value]) => value !== '' && value !== null && value !== undefined)
    .slice(0, 4)
    .map(([key, value]) => `${metaLabel(key)} ${value}`);
  return pairs.join(' · ');
}

function metaLabel(key: string): string {
  const labels: Record<string, string> = {
    type: '类型',
    source: '来源',
    storage: '位置',
    status: '状态',
    priority: '优先级',
    due_date: '截止',
    category: '分类',
  };
  return labels[key] || key;
}

function kindAccent(kind: TimelineKind): string {
  return {
    item: 'var(--accent-bright)',
    task: 'var(--warn)',
    memory: 'var(--accent)',
    decision: 'var(--warm)',
  }[kind];
}

function fullTime(value: string): string {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('zh-CN', { hour12: false });
}

function toDateInputValue(value: Date): string {
  return value.toISOString().slice(0, 10);
}

onMounted(() => loadTimeline(true));
</script>

<template>
  <main class="timeline-view">
    <header class="topbar">
      <div>
        <p class="eyebrow">Timeline</p>
        <h1>时间流</h1>
      </div>
      <button class="refresh-btn" type="button" :disabled="loading" @click="loadTimeline(true)">
        <span>{{ loading ? '刷新中' : '刷新' }}</span>
      </button>
    </header>

    <section class="summary-strip">
      <article>
        <span>总事件</span>
        <strong>{{ total }}</strong>
      </article>
      <article>
        <span>记录</span>
        <strong>{{ counts.item }}</strong>
      </article>
      <article>
        <span>任务</span>
        <strong>{{ counts.task }}</strong>
      </article>
      <article>
        <span>认知对象</span>
        <strong>{{ counts.memory + counts.decision }}</strong>
      </article>
    </section>

    <section class="timeline-shell">
      <aside class="panel filter-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Scope</p>
            <h2>范围</h2>
          </div>
        </div>
        <div class="kind-list" aria-label="时间流类型筛选">
          <button
            v-for="kind in (['item', 'task', 'memory', 'decision'] as TimelineKind[])"
            :key="kind"
            type="button"
            :class="{ active: selectedKinds[kind] }"
            :style="{ '--kind-accent': kindAccent(kind) }"
            @click="toggleKind(kind)"
          >
            <span />
            {{ kindLabel(kind) }}
          </button>
        </div>
        <div class="date-panel">
          <div>
            <label>
              <span>起始日期</span>
              <input v-model="dateFrom" aria-label="起始日期" type="date" @change="loadTimeline(true)" />
            </label>
            <label>
              <span>结束日期</span>
              <input v-model="dateTo" aria-label="结束日期" type="date" @change="loadTimeline(true)" />
            </label>
          </div>
          <div class="date-actions">
            <button type="button" @click="setDateWindow(7)">近 7 天</button>
            <button type="button" @click="setDateWindow(30)">近 30 天</button>
            <button type="button" :disabled="!dateFilterActive" @click="clearDateWindow">全部时间</button>
          </div>
        </div>

        <div class="event-panel" aria-label="时间事件详情">
          <template v-if="activeEntry">
            <p class="eyebrow">Selected</p>
            <h3>{{ entryTitle(activeEntry) }}</h3>
            <dl>
              <div>
                <dt>类型</dt>
                <dd>{{ kindLabel(activeEntry.kind) }}</dd>
              </div>
              <div>
                <dt>事件</dt>
                <dd>{{ eventLabel(activeEntry.event) }}</dd>
              </div>
              <div>
                <dt>时间</dt>
                <dd>{{ fullTime(activeEntry.occurred_at) }}</dd>
              </div>
              <div v-if="metaText(activeEntry)">
                <dt>属性</dt>
                <dd>{{ metaText(activeEntry) }}</dd>
              </div>
            </dl>
            <p>{{ entrySummary(activeEntry) }}</p>
            <button class="primary-action" type="button" :disabled="!activeEntry.id" @click="openSelectedEntry">
              打开详情
            </button>
          </template>
          <p v-else class="empty-line compact">选择一条事件查看详情</p>
        </div>
      </aside>

      <section class="panel activity-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Activity</p>
            <h2>活动</h2>
          </div>
          <small>第 {{ page }} / {{ totalPages }} 页</small>
        </div>

        <div v-if="error" class="notice error-row">
          <span>{{ error }}</span>
          <button type="button" @click="loadTimeline(true)">重试</button>
        </div>
        <p v-else-if="loading && !entries.length" class="empty-line">加载时间流中</p>
        <p v-else-if="!entries.length" class="empty-line">暂无时间事件</p>

        <div v-else class="entry-list">
          <button
            v-for="entry in entries"
            :key="entryKey(entry)"
            class="entry-row"
            type="button"
            :class="{ active: activeEntry ? entryKey(entry) === entryKey(activeEntry) : false }"
            :style="{ '--kind-accent': kindAccent(entry.kind) }"
            :aria-pressed="activeEntry ? entryKey(entry) === entryKey(activeEntry) : false"
            @click="selectEntry(entry)"
          >
            <span class="entry-dot" />
            <span class="entry-copy">
              <strong>{{ entryTitle(entry) }}</strong>
              <small>{{ kindLabel(entry.kind) }} · {{ eventLabel(entry.event) }} · {{ formatRelative(entry.occurred_at) }}</small>
              <span>{{ entrySummary(entry) }}</span>
              <em v-if="metaText(entry)">{{ metaText(entry) }}</em>
            </span>
          </button>
        </div>

        <button v-if="canLoadMore" class="load-more" type="button" :disabled="loading" @click="loadTimeline(false)">
          {{ loading ? '加载中' : '加载更多' }}
        </button>
      </section>
    </section>

    <ItemDrawer :item-id="selectedItemId" @close="selectedItemId = null" @changed="loadTimeline(true)" />
    <ObjectDrawer
      :target="selectedObject"
      @close="selectedObject = null"
      @changed="loadTimeline(true)"
      @open-item="openSourceItem"
      @open-object="selectedObject = $event"
    />
  </main>
</template>

<style scoped>
.timeline-view {
  width: min(1180px, calc(100vw - var(--s-8)));
  margin: 0 auto;
  padding: calc(var(--s-8) + var(--s-5)) 0 var(--s-8);
}

.topbar,
.panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--s-4);
}

.topbar {
  margin-bottom: var(--s-5);
}

h1,
h2 {
  color: var(--text-1);
  font-weight: 560;
  letter-spacing: 0;
}

h1 {
  font-size: var(--fs-7);
  line-height: var(--lh-tight);
}

h2 {
  font-size: var(--fs-6);
}

.refresh-btn,
.kind-list button,
.date-actions button,
.entry-row,
.load-more,
.primary-action {
  transition: border-color var(--t-fast) var(--ease), background var(--t-fast) var(--ease), color var(--t-fast) var(--ease);
}

.refresh-btn,
.load-more {
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  color: var(--text-2);
  padding: var(--s-2) var(--s-3);
}

.refresh-btn:hover:not(:disabled),
.load-more:hover:not(:disabled) {
  border-color: rgba(110, 231, 208, 0.25);
  color: var(--text-1);
}

.summary-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--s-3);
  margin-bottom: var(--s-4);
}

.summary-strip article,
.panel {
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: rgba(13, 17, 22, 0.74);
}

.summary-strip article {
  padding: var(--s-4);
}

.summary-strip span,
.panel-head small,
.entry-copy small,
.entry-copy em {
  color: var(--text-3);
  font-size: var(--fs-2);
}

.summary-strip strong {
  display: block;
  color: var(--accent-bright);
  font-family: var(--font-mono);
  font-size: var(--fs-6);
  font-weight: 520;
  line-height: 1.2;
  margin-top: var(--s-2);
}

.timeline-shell {
  display: grid;
  grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
  gap: var(--s-4);
  align-items: start;
}

.panel {
  padding: var(--s-4);
}

.filter-panel {
  position: sticky;
  top: calc(var(--s-8) + var(--s-4));
}

.kind-list {
  display: grid;
  gap: var(--s-2);
  margin-top: var(--s-4);
}

.kind-list button {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  min-height: 42px;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  color: var(--text-3);
  background: var(--surface-1);
  padding: var(--s-2) var(--s-3);
  text-align: left;
}

.kind-list button.active {
  border-color: color-mix(in srgb, var(--kind-accent) 35%, transparent);
  color: var(--text-1);
  background: var(--surface-2);
}

.kind-list span,
.entry-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--kind-accent);
  box-shadow: 0 0 12px color-mix(in srgb, var(--kind-accent) 45%, transparent);
}

.date-panel {
  display: grid;
  gap: var(--s-3);
  margin-top: var(--s-4);
  padding-top: var(--s-4);
  border-top: 1px solid var(--line-1);
}

.date-panel > div:first-child {
  display: grid;
  gap: var(--s-3);
}

.date-panel label {
  display: grid;
  gap: var(--s-2);
}

.date-panel label span {
  color: var(--text-3);
  font-size: var(--fs-2);
}

.date-panel input {
  width: 100%;
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  background: var(--surface-1);
  color: var(--text-1);
  padding: var(--s-3);
}

.date-actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--s-2);
}

.date-actions button {
  min-height: 34px;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-1);
  color: var(--text-3);
}

.date-actions button:hover:not(:disabled) {
  border-color: var(--line-2);
  background: var(--surface-2);
  color: var(--text-1);
}

.date-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.event-panel {
  display: grid;
  gap: var(--s-3);
  margin-top: var(--s-4);
  padding-top: var(--s-4);
  border-top: 1px solid var(--line-1);
}

.event-panel h3 {
  color: var(--text-1);
  font-size: var(--fs-4);
  font-weight: 560;
  line-height: var(--lh-snug);
  overflow-wrap: anywhere;
}

.event-panel dl {
  display: grid;
  gap: var(--s-2);
  margin: 0;
}

.event-panel dl div {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: var(--s-2);
  align-items: start;
}

.event-panel dt {
  color: var(--text-3);
  font-size: var(--fs-2);
}

.event-panel dd {
  min-width: 0;
  margin: 0;
  color: var(--text-2);
  font-size: var(--fs-2);
  overflow-wrap: anywhere;
}

.event-panel p:not(.eyebrow) {
  margin: 0;
  color: var(--text-3);
  font-size: var(--fs-3);
  line-height: var(--lh-relaxed);
  overflow-wrap: anywhere;
}

.primary-action {
  min-height: 36px;
  border: 1px solid rgba(110, 231, 208, 0.24);
  border-radius: var(--r-2);
  background: rgba(110, 231, 208, 0.08);
  color: var(--accent-bright);
}

.primary-action:hover:not(:disabled) {
  border-color: rgba(110, 231, 208, 0.38);
  background: rgba(110, 231, 208, 0.12);
  color: var(--text-1);
}

.primary-action:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.notice,
.empty-line {
  margin-top: var(--s-4);
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-1);
  color: var(--text-3);
  padding: var(--s-4);
}

.notice {
  display: flex;
  justify-content: space-between;
  gap: var(--s-3);
  align-items: center;
}

.error-row {
  border-color: rgba(232, 120, 120, 0.22);
  color: var(--error);
}

.compact {
  margin-top: 0;
  padding: var(--s-3);
}

.entry-list {
  display: grid;
  gap: var(--s-2);
  margin-top: var(--s-4);
}

.entry-row {
  display: grid;
  grid-template-columns: 8px minmax(0, 1fr);
  gap: var(--s-3);
  align-items: start;
  min-height: 78px;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-1);
  padding: var(--s-3);
  text-align: left;
}

.entry-row:hover {
  border-color: color-mix(in srgb, var(--kind-accent) 28%, transparent);
  background: var(--surface-2);
}

.entry-row.active {
  border-color: color-mix(in srgb, var(--kind-accent) 42%, transparent);
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--kind-accent) 10%, transparent), transparent 54%),
    var(--surface-2);
}

.entry-dot {
  margin-top: 8px;
}

.entry-copy {
  display: grid;
  gap: 3px;
  min-width: 0;
}

.entry-copy strong,
.entry-copy span,
.entry-copy em {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.entry-copy strong {
  color: var(--text-1);
  font-weight: 520;
}

.entry-copy span {
  color: var(--text-3);
  font-size: var(--fs-3);
}

.entry-copy em {
  font-style: normal;
}

.load-more {
  width: 100%;
  margin-top: var(--s-4);
}

@media (max-width: 860px) {
  .timeline-view {
    width: min(100vw - var(--s-4), 640px);
    padding-top: calc(var(--s-8) + var(--s-7));
  }

  .summary-strip,
  .timeline-shell {
    grid-template-columns: 1fr;
  }

  .filter-panel {
    position: static;
  }
}
</style>
