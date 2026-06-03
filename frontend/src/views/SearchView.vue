<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { searchAll, searchVector } from '@/api/endpoints';
import { ApiError } from '@/api/client';
import ItemDrawer from '@/components/ItemDrawer.vue';
import { formatRelative } from '@/composables/useRelativeTime';
import { typeAccent } from '@/composables/useTypeAccent';
import { useModeStore } from '@/stores/mode';
import type { Decision, Item, Memory, Task } from '@/api/types';

type SearchMode = 'all' | 'vector';
type ResultKind = 'item' | 'task' | 'memory' | 'decision';

type SearchResult =
  | { kind: 'item'; data: Item; relevance?: number }
  | { kind: 'task'; data: Task }
  | { kind: 'memory'; data: Memory }
  | { kind: 'decision'; data: Decision };

const mode = useModeStore();

const query = ref('');
const searchMode = ref<SearchMode>('all');
const loading = ref(false);
const error = ref<string | null>(null);
const hasSearched = ref(false);
const selectedItemId = ref<number | null>(null);
const results = ref<SearchResult[]>([]);

const groupedResults = computed(() => {
  const groups: Record<ResultKind, SearchResult[]> = {
    item: [],
    task: [],
    memory: [],
    decision: [],
  };
  for (const result of results.value) {
    groups[result.kind].push(result);
  }
  return groups;
});

const resultCounts = computed(() => ({
  item: groupedResults.value.item.length,
  task: groupedResults.value.task.length,
  memory: groupedResults.value.memory.length,
  decision: groupedResults.value.decision.length,
}));

const totalCount = computed(() => results.value.length);

const groups = computed(() => [
  { kind: 'item' as const, label: '记录', items: groupedResults.value.item },
  { kind: 'task' as const, label: '任务', items: groupedResults.value.task },
  { kind: 'memory' as const, label: '记忆', items: groupedResults.value.memory },
  { kind: 'decision' as const, label: '决策', items: groupedResults.value.decision },
].filter((group) => group.items.length > 0));

async function runSearch() {
  const q = query.value.trim();
  if (!q || loading.value) return;
  loading.value = true;
  error.value = null;
  hasSearched.value = true;
  try {
    if (searchMode.value === 'vector') {
      const payload = await searchVector(q, 24);
      results.value = payload.items.map((item) => ({
        kind: 'item',
        data: item,
        relevance: item.relevance,
      }));
      return;
    }
    const payload = await searchAll(q, 18);
    results.value = [
      ...payload.items.map((item) => ({ kind: 'item' as const, data: item })),
      ...payload.tasks.map((task) => ({ kind: 'task' as const, data: task })),
      ...payload.memories.map((memory) => ({ kind: 'memory' as const, data: memory })),
      ...payload.decisions.map((decision) => ({ kind: 'decision' as const, data: decision })),
    ];
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '搜索失败';
    results.value = [];
  } finally {
    loading.value = false;
  }
}

function selectMode(next: SearchMode) {
  searchMode.value = next;
  if (query.value.trim()) runSearch();
}

function openResult(result: SearchResult) {
  if (result.kind === 'item') {
    selectedItemId.value = result.data.id;
    return;
  }
  if (result.kind === 'task') mode.set('tasks');
  if (result.kind === 'memory') mode.set('memories');
  if (result.kind === 'decision') mode.set('decisions');
}

function resultTitle(result: SearchResult): string {
  if (result.kind === 'item') return itemTitle(result.data);
  if (result.kind === 'task') return result.data.title;
  if (result.kind === 'memory') return result.data.content;
  return result.data.title;
}

function resultSummary(result: SearchResult): string {
  if (result.kind === 'item') return itemSummary(result.data);
  if (result.kind === 'task') return result.data.detail || '没有补充说明';
  if (result.kind === 'memory') return result.data.detail || result.data.source_text || '没有补充说明';
  return result.data.decision || result.data.context || '没有补充说明';
}

function resultMeta(result: SearchResult): string {
  if (result.kind === 'item') {
    const relevance = result.relevance === undefined ? '' : ` · 相关度 ${Math.round(result.relevance * 100)}%`;
    return `${itemTypeLabel(result.data.type)} · ${formatRelative(result.data.created_at)}${relevance}`;
  }
  if (result.kind === 'task') return `${taskStatusLabel(result.data.status)} · ${priorityLabel(result.data.priority)}`;
  if (result.kind === 'memory') return `${memoryCategoryLabel(result.data.category)} · ${memoryStatusLabel(result.data.status)}`;
  return `${decisionStatusLabel(result.data.status)} · ${formatRelative(result.data.created_at)}`;
}

function itemTitle(item: Item): string {
  return item.original_name || item.content || item.derived_text || item.transcript_text || `记录 #${item.id}`;
}

function itemSummary(item: Item): string {
  const text = String(item.content || item.derived_text || item.transcript_text || item.original_name || '').replace(/\s+/g, ' ').trim();
  if (!text) return '没有可读摘要';
  return text.length > 180 ? `${text.slice(0, 179)}...` : text;
}

function itemTypeLabel(type: Item['type']): string {
  const labels: Record<Item['type'], string> = {
    text: '文本',
    image: '图片',
    document: '文档',
    audio: '音频',
  };
  return labels[type];
}

function taskStatusLabel(status: Task['status']): string {
  return { todo: '待办', done: '已完成', cancelled: '已取消' }[status];
}

function priorityLabel(priority: Task['priority']): string {
  return { high: '高优先级', medium: '中优先级', low: '低优先级' }[priority];
}

function memoryCategoryLabel(category: Memory['category']): string {
  return { fact: '事实', preference: '偏好', goal: '目标', relationship: '关系', event: '事件' }[category];
}

function memoryStatusLabel(status: Memory['status']): string {
  return { candidate: '候选', confirmed: '已确认', archived: '已归档' }[status];
}

function decisionStatusLabel(status: Decision['status']): string {
  return { pending: '待回顾', reviewed: '已回顾' }[status];
}

function resultAccent(result: SearchResult): string {
  if (result.kind === 'item') return typeAccent(result.data.type);
  if (result.kind === 'task') return result.data.priority === 'high' ? 'var(--warn)' : 'var(--accent)';
  if (result.kind === 'memory') return 'var(--accent-bright)';
  return 'var(--warm)';
}

onMounted(() => {
  const initial = new URLSearchParams(window.location.search).get('q');
  if (initial) {
    query.value = initial;
    runSearch();
  }
});
</script>

<template>
  <main class="search-view">
    <header class="topbar">
      <div>
        <p class="eyebrow">Search</p>
        <h1>搜索</h1>
      </div>
      <button class="refresh-btn" type="button" :disabled="loading || !query.trim()" @click="runSearch">
        <span>{{ loading ? '搜索中' : '搜索' }}</span>
      </button>
    </header>

    <section class="search-shell">
      <aside class="panel query-panel">
        <form class="query-form" @submit.prevent="runSearch">
          <label>
            <span>查询</span>
            <input
              v-model="query"
              aria-label="搜索查询"
              type="search"
              autocomplete="off"
              placeholder="关键词、主题、文件名或一句话"
            />
          </label>
          <div class="mode-pills" aria-label="搜索模式">
            <button type="button" :class="{ active: searchMode === 'all' }" @click="selectMode('all')">
              关键词
            </button>
            <button type="button" :class="{ active: searchMode === 'vector' }" @click="selectMode('vector')">
              语义
            </button>
          </div>
        </form>

        <div class="metrics" aria-label="搜索结果统计">
          <article>
            <span>总计</span>
            <strong>{{ totalCount }}</strong>
          </article>
          <article>
            <span>记录</span>
            <strong>{{ resultCounts.item }}</strong>
          </article>
          <article>
            <span>对象</span>
            <strong>{{ resultCounts.task + resultCounts.memory + resultCounts.decision }}</strong>
          </article>
        </div>
      </aside>

      <section class="panel result-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Results</p>
            <h2>结果</h2>
          </div>
          <span class="result-mode">{{ searchMode === 'all' ? '关键词' : '语义' }}</span>
        </div>

        <div v-if="error" class="notice error-row">
          <span>{{ error }}</span>
          <button type="button" @click="runSearch">重试</button>
        </div>
        <div v-else-if="loading" class="empty-state">搜索中</div>
        <div v-else-if="!hasSearched" class="empty-state">等待查询</div>
        <div v-else-if="!results.length" class="empty-state">没有匹配</div>

        <div v-else class="result-groups">
          <section v-for="group in groups" :key="group.kind" class="result-group">
            <header>
              <h3>{{ group.label }}</h3>
              <span>{{ group.items.length }}</span>
            </header>
            <button
              v-for="result in group.items"
              :key="`${result.kind}-${result.data.id}`"
              class="result-row"
              type="button"
              :style="{ '--result-accent': resultAccent(result) }"
              @click="openResult(result)"
            >
              <span class="result-dot" />
              <span class="result-copy">
                <strong>{{ resultTitle(result) }}</strong>
                <small>{{ resultSummary(result) }}</small>
              </span>
              <span class="result-meta">{{ resultMeta(result) }}</span>
            </button>
          </section>
        </div>
      </section>
    </section>

    <ItemDrawer :item-id="selectedItemId" @close="selectedItemId = null" @changed="runSearch" />
  </main>
</template>

<style scoped>
.search-view {
  width: min(1180px, calc(100vw - var(--s-8)));
  margin: 0 auto;
  padding: calc(var(--s-8) + var(--s-5)) 0 var(--s-8);
}

.topbar {
  display: flex;
  justify-content: space-between;
  gap: var(--s-4);
  align-items: flex-start;
  margin-bottom: var(--s-5);
}

h1,
h2,
h3 {
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

h3 {
  font-size: var(--fs-4);
}

.refresh-btn,
.mode-pills button,
.result-row {
  transition: border-color var(--t-fast) var(--ease), background var(--t-fast) var(--ease), color var(--t-fast) var(--ease);
}

.refresh-btn {
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  color: var(--text-2);
  padding: var(--s-2) var(--s-3);
}

.refresh-btn:hover:not(:disabled) {
  border-color: rgba(110, 231, 208, 0.25);
  color: var(--text-1);
}

.refresh-btn:disabled {
  color: var(--text-4);
  cursor: default;
}

.search-shell {
  display: grid;
  grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
  gap: var(--s-4);
  align-items: start;
}

.panel {
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: rgba(13, 17, 22, 0.74);
}

.query-panel,
.result-panel {
  padding: var(--s-4);
}

.query-panel {
  position: sticky;
  top: calc(var(--s-8) + var(--s-4));
}

.query-form {
  display: grid;
  gap: var(--s-3);
}

label {
  display: grid;
  gap: var(--s-2);
}

label span {
  color: var(--text-3);
  font-size: var(--fs-2);
}

input {
  width: 100%;
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  background: var(--surface-1);
  color: var(--text-1);
  padding: var(--s-3);
}

input::placeholder {
  color: var(--text-4);
}

.mode-pills {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s-2);
}

.mode-pills button {
  min-height: 36px;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  color: var(--text-3);
  background: var(--surface-1);
}

.mode-pills button.active,
.mode-pills button:hover {
  border-color: rgba(110, 231, 208, 0.24);
  color: var(--text-1);
  background: var(--surface-2);
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--s-2);
  margin-top: var(--s-4);
}

.metrics article {
  min-width: 0;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-1);
  padding: var(--s-3);
}

.metrics span,
.result-meta,
.result-group header span,
.result-mode {
  color: var(--text-3);
  font-size: var(--fs-2);
}

.metrics strong {
  display: block;
  color: var(--accent-bright);
  font-family: var(--font-mono);
  font-size: var(--fs-6);
  font-weight: 520;
  line-height: 1.15;
}

.panel-head,
.result-group header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-3);
}

.result-mode {
  border: 1px solid var(--line-1);
  border-radius: var(--r-pill);
  padding: 3px 9px;
}

.notice,
.empty-state {
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

.result-groups {
  display: grid;
  gap: var(--s-5);
  margin-top: var(--s-4);
}

.result-group {
  display: grid;
  gap: var(--s-2);
}

.result-row {
  display: grid;
  grid-template-columns: 8px minmax(0, 1fr) max-content;
  gap: var(--s-3);
  align-items: center;
  min-height: 64px;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-1);
  padding: var(--s-3);
  text-align: left;
}

.result-row:hover {
  border-color: rgba(110, 231, 208, 0.22);
  background: var(--surface-2);
}

.result-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--result-accent);
  box-shadow: 0 0 12px color-mix(in srgb, var(--result-accent) 45%, transparent);
}

.result-copy {
  min-width: 0;
  display: grid;
  gap: 2px;
}

.result-copy strong,
.result-copy small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result-copy strong {
  color: var(--text-1);
  font-weight: 520;
}

.result-copy small {
  color: var(--text-3);
  font-size: var(--fs-3);
}

@media (max-width: 820px) {
  .search-view {
    width: min(100vw - var(--s-4), 640px);
    padding-top: calc(var(--s-8) + var(--s-7));
  }

  .search-shell {
    grid-template-columns: 1fr;
  }

  .query-panel {
    position: static;
  }

  .result-row {
    grid-template-columns: 8px minmax(0, 1fr);
  }

  .result-meta {
    grid-column: 2;
  }
}
</style>
