<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { FolderTree, Search, SlidersHorizontal } from '@lucide/vue';
import { getRecent, markProcessingPending, markProcessingReady } from '@/api/records';
import { searchAll, searchVector } from '@/api/search';
import { ApiError } from '@/api/client';
import ItemDrawer from '@/components/ItemDrawer.vue';
import LibraryContextView from '@/components/LibraryContextView.vue';
import ObjectDrawer from '@/components/ObjectDrawer.vue';
import {
  decisionStatusLabel,
  memoryCategoryLabel,
  memoryStatusLabel,
  taskPriorityLabel,
  taskStatusLabel,
} from '@/composables/useObjectLabels';
import { formatRelative } from '@/composables/useRelativeTime';
import { currentRouteParams, replaceRouteQuery } from '@/composables/useRouteQuery';
import { typeAccent } from '@/composables/useTypeAccent';
import type { Decision, Item, ItemType, Memory, ObjectTarget, Task } from '@/api/types';

type SearchMode = 'all' | 'vector';
type LibraryPane = 'search' | 'context';
type ResultKind = 'item' | 'task' | 'memory' | 'decision';
type ProcessingStateFilter = '' | 'ready' | 'pending';
type ProcessingOverrideFilter = '' | 'ready';
type ItemSearchResult = Extract<SearchResult, { kind: 'item' }>;

type SearchResult =
  | { kind: 'item'; data: Item; relevance?: number }
  | { kind: 'task'; data: Task }
  | { kind: 'memory'; data: Memory }
  | { kind: 'decision'; data: Decision };

const query = ref('');
const libraryPane = ref<LibraryPane>('search');
const selectedLifelineId = ref<string | null>(null);
const contextRevision = ref(0);
const searchMode = ref<SearchMode>('all');
const itemTypeFilter = ref<ItemType | ''>('');
const sourceFilter = ref('');
const processingStateFilter = ref<ProcessingStateFilter>('');
const processingOverrideFilter = ref<ProcessingOverrideFilter>('');
const loading = ref(false);
const error = ref<string | null>(null);
const feedback = ref<string | null>(null);
const actionBusy = ref<'ready' | 'pending' | null>(null);
const hasSearched = ref(false);
const selectedItemId = ref<number | null>(null);
const selectedObject = ref<ObjectTarget | null>(null);
const results = ref<SearchResult[]>([]);
const initialItems = ref<Item[]>([]);
const filtersOpen = ref(false);

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
const itemResults = computed(() => groupedResults.value.item as ItemSearchResult[]);
const pendingItemIds = computed(() => itemResults.value
  .filter((result) => result.data.processing_state === 'pending')
  .map((result) => result.data.id));
const overriddenReadyItemIds = computed(() => itemResults.value
  .filter((result) => result.data.processing_override === 'ready' || result.data.processing_is_overridden)
  .map((result) => result.data.id));
const recordFiltersActive = computed(() => Boolean(
  itemTypeFilter.value
  || sourceFilter.value.trim()
  || processingStateFilter.value
  || processingOverrideFilter.value,
));
const activeFilterChips = computed(() => {
  const chips: string[] = [];
  if (searchMode.value === 'vector') chips.push('语义搜索');
  if (itemTypeFilter.value) chips.push(`类型 ${itemTypeLabel(itemTypeFilter.value)}`);
  if (processingStateFilter.value) chips.push(`状态 ${processingStateFilter.value === 'pending' ? '待处理' : '已就绪'}`);
  if (processingOverrideFilter.value) chips.push('手动完成');
  if (sourceFilter.value.trim()) chips.push(`来源 ${sourceFilter.value.trim()}`);
  return chips;
});

const groups = computed(() => [
  { kind: 'item' as const, label: '记录', items: groupedResults.value.item },
  { kind: 'task' as const, label: '任务', items: groupedResults.value.task },
  { kind: 'memory' as const, label: '记忆', items: groupedResults.value.memory },
  { kind: 'decision' as const, label: '决策', items: groupedResults.value.decision },
].filter((group) => group.items.length > 0));

async function runSearch(options: { clearFeedback?: boolean } = {}) {
  const clearFeedback = options.clearFeedback ?? true;
  const q = query.value.trim();
  if (!q || loading.value) return;
  loading.value = true;
  error.value = null;
  if (clearFeedback) feedback.value = null;
  hasSearched.value = true;
  syncSearchUrl(q);
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
    const payload = await searchAll(q, 18, {
      type: itemTypeFilter.value,
      source: sourceFilter.value.trim(),
      processing_state: processingStateFilter.value,
      processing_override: processingOverrideFilter.value,
    });
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

function resetFilters() {
  itemTypeFilter.value = '';
  sourceFilter.value = '';
  processingStateFilter.value = '';
  processingOverrideFilter.value = '';
  if (query.value.trim()) runSearch();
}

function selectMode(next: SearchMode) {
  searchMode.value = next;
  if (query.value.trim()) runSearch();
}

function syncSearchUrl(q: string) {
  const canUseRecordFilters = searchMode.value === 'all';
  replaceRouteQuery('library', {
    view: '',
    lifeline: '',
    q,
    search_mode: searchMode.value === 'vector' ? 'vector' : '',
    type: canUseRecordFilters ? itemTypeFilter.value : '',
    source: canUseRecordFilters ? sourceFilter.value.trim() : '',
    processing_state: canUseRecordFilters ? processingStateFilter.value : '',
    processing_override: canUseRecordFilters ? processingOverrideFilter.value : '',
  });
}

function selectLibraryPane(next: LibraryPane) {
  libraryPane.value = next;
  if (next === 'search') {
    replaceRouteQuery('library', { view: '', lifeline: '' });
    return;
  }
  replaceRouteQuery('library', {
    view: 'context',
    q: '',
    search_mode: '',
    type: '',
    source: '',
    processing_state: '',
    processing_override: '',
  });
}

function selectLifeline(id: string) {
  selectedLifelineId.value = id;
  replaceRouteQuery('library', { view: 'context', lifeline: id });
}

function openResult(result: SearchResult) {
  if (result.kind === 'item') {
    selectedItemId.value = result.data.id;
    return;
  }
  selectedObject.value = { kind: result.kind, id: result.data.id };
}

function openSourceItem(id: number) {
  selectedObject.value = null;
  selectedItemId.value = id;
}

function resultTitle(result: SearchResult): string {
  if (result.kind === 'item') return itemTitle(result.data);
  if (result.kind === 'task') return result.data.title;
  if (result.kind === 'memory') return result.data.content;
  return result.data.title;
}

function resultSummary(result: SearchResult): string {
  let summary = '';
  if (result.kind === 'item') summary = itemSummary(result.data);
  else if (result.kind === 'task') summary = result.data.detail || '';
  else if (result.kind === 'memory') summary = result.data.detail || result.data.source_text || '';
  else summary = result.data.decision || result.data.context || '';

  const normalizedSummary = summary.replace(/\s+/g, ' ').trim();
  const normalizedTitle = resultTitle(result).replace(/\s+/g, ' ').trim();
  return normalizedSummary === normalizedTitle ? '' : normalizedSummary;
}

function resultMeta(result: SearchResult): string {
  if (result.kind === 'item') {
    const relevance = result.relevance === undefined ? '' : ` · 相关度 ${Math.round(result.relevance * 100)}%`;
    return `${itemTypeLabel(result.data.type)} · ${formatRelative(result.data.created_at)}${relevance}`;
  }
  if (result.kind === 'task') return `${taskStatusLabel(result.data.status)} · ${taskPriorityLabel(result.data.priority)}`;
  if (result.kind === 'memory') return `${memoryCategoryLabel(result.data.category)} · ${memoryStatusLabel(result.data.status)}`;
  return `${decisionStatusLabel(result.data.status)} · ${formatRelative(result.data.created_at)}`;
}

async function markVisibleReady() {
  const ids = pendingItemIds.value;
  if (!ids.length || actionBusy.value) return;
  actionBusy.value = 'ready';
  error.value = null;
  feedback.value = null;
  try {
    const payload = await markProcessingReady(ids);
    feedback.value = `已标记 ${payload.count} 条记录为就绪`;
    await runSearch({ clearFeedback: false });
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '批量标记就绪失败';
  } finally {
    actionBusy.value = null;
  }
}

async function markVisiblePending() {
  const ids = overriddenReadyItemIds.value;
  if (!ids.length || actionBusy.value) return;
  actionBusy.value = 'pending';
  error.value = null;
  feedback.value = null;
  try {
    const payload = await markProcessingPending(ids);
    feedback.value = `已退回 ${payload.count} 条记录到待处理`;
    await runSearch({ clearFeedback: false });
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '批量退回待处理失败';
  } finally {
    actionBusy.value = null;
  }
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

function itemProcessingLabel(item: Item): string {
  return item.processing_note || item.processing_label || (item.processing_state === 'pending' ? '待处理' : '已就绪');
}

function resultAccent(result: SearchResult): string {
  if (result.kind === 'item') return typeAccent(result.data.type);
  if (result.kind === 'task') return result.data.priority === 'high' ? 'var(--warn)' : 'var(--accent)';
  if (result.kind === 'memory') return 'var(--accent-bright)';
  return 'var(--warm)';
}

function initialResult(item: Item): SearchResult {
  return { kind: 'item', data: item };
}

async function loadInitialItems() {
  try {
    const payload = await getRecent({ page: 1 });
    initialItems.value = payload.items.slice(0, 8);
  } catch {
    initialItems.value = [];
  }
}

async function refreshContent() {
  if (libraryPane.value === 'context') {
    contextRevision.value += 1;
    return;
  }
  if (query.value.trim()) {
    await runSearch();
    return;
  }
  await loadInitialItems();
}

onMounted(() => {
  const params = currentRouteParams();
  libraryPane.value = params.get('view') === 'context' || Boolean(params.get('lifeline'))
    ? 'context'
    : 'search';
  selectedLifelineId.value = params.get('lifeline');
  const initialMode = params.get('search_mode');
  const initialType = params.get('type');
  const initialProcessingState = params.get('processing_state');
  const initialProcessingOverride = params.get('processing_override');

  searchMode.value = initialMode === 'vector' ? 'vector' : 'all';
  if (['text', 'image', 'document', 'audio'].includes(initialType || '')) {
    itemTypeFilter.value = initialType as ItemType;
  }
  if (initialProcessingState === 'pending' || initialProcessingState === 'ready') {
    processingStateFilter.value = initialProcessingState;
  }
  if (initialProcessingOverride === 'ready') {
    processingOverrideFilter.value = initialProcessingOverride;
  }
  sourceFilter.value = params.get('source') || '';
  filtersOpen.value = Boolean(
    itemTypeFilter.value
    || processingStateFilter.value
    || processingOverrideFilter.value
    || sourceFilter.value,
  );
  if (libraryPane.value === 'search') loadInitialItems();

  const initial = params.get('q');
  if (initial && libraryPane.value === 'search') {
    query.value = initial;
    runSearch();
  }
});
</script>

<template>
  <main class="search-view">
    <header class="topbar">
      <div>
        <p class="eyebrow">Library</p>
        <h1>资料库</h1>
      </div>
      <span class="library-index" aria-hidden="true">ARCHIVE / 02</span>
      <div class="topbar-actions">
        <div class="library-pane-switch" aria-label="资料库视图">
          <button
            type="button"
            :class="{ active: libraryPane === 'search' }"
            @click="selectLibraryPane('search')"
          >
            <Search :size="15" />
            <span>查找</span>
          </button>
          <button
            type="button"
            :class="{ active: libraryPane === 'context' }"
            @click="selectLibraryPane('context')"
          >
            <FolderTree :size="15" />
            <span>项目脉络</span>
          </button>
        </div>
        <button
          v-if="libraryPane === 'search'"
          class="refresh-btn"
          type="button"
          :disabled="loading || !query.trim()"
          @click="runSearch()"
        >
          <Search :size="16" />
          <span>{{ loading ? '搜索中' : '搜索' }}</span>
        </button>
      </div>
    </header>

    <section v-if="libraryPane === 'search'" class="search-shell">
      <aside class="panel query-panel">
        <form class="query-form" @submit.prevent="runSearch()">
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
            <button type="button" :class="{ active: filtersOpen }" @click="filtersOpen = !filtersOpen">
              <SlidersHorizontal :size="15" />
              <span>筛选</span>
            </button>
          </div>
          <div v-if="filtersOpen" class="filter-grid" aria-label="记录筛选">
            <label>
              <span>记录类型</span>
              <select v-model="itemTypeFilter" aria-label="记录类型" :disabled="searchMode === 'vector'">
                <option value="">全部</option>
                <option value="text">文本</option>
                <option value="image">图片</option>
                <option value="document">文档</option>
                <option value="audio">音频</option>
              </select>
            </label>
            <label>
              <span>处理状态</span>
              <select v-model="processingStateFilter" aria-label="处理状态" :disabled="searchMode === 'vector'">
                <option value="">全部</option>
                <option value="pending">待处理</option>
                <option value="ready">已就绪</option>
              </select>
            </label>
            <label>
              <span>处理覆盖</span>
              <select v-model="processingOverrideFilter" aria-label="处理覆盖" :disabled="searchMode === 'vector'">
                <option value="">全部</option>
                <option value="ready">手动完成</option>
              </select>
            </label>
            <label>
              <span>来源</span>
              <input
                v-model="sourceFilter"
                aria-label="来源"
                type="text"
                autocomplete="off"
                :disabled="searchMode === 'vector'"
                placeholder="source"
              />
            </label>
          </div>
          <button
            v-if="filtersOpen"
            class="reset-filter-btn"
            type="button"
            :disabled="!recordFiltersActive || loading"
            @click="resetFilters"
          >
            重置记录筛选
          </button>
          <div v-if="activeFilterChips.length" class="filter-summary" aria-label="当前搜索条件">
            <span v-for="chip in activeFilterChips" :key="chip">{{ chip }}</span>
          </div>
        </form>

        <div v-if="hasSearched" class="metrics" aria-label="搜索结果统计">
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
            <p class="eyebrow">Recall</p>
            <h2>找到的内容</h2>
          </div>
          <span class="result-mode">{{ searchMode === 'all' ? '关键词' : '语义' }}</span>
        </div>

        <div v-if="feedback" class="notice feedback-row">{{ feedback }}</div>
        <div v-if="error" class="notice error-row">
          <span>{{ error }}</span>
          <button type="button" @click="runSearch()">重试</button>
        </div>
        <div v-else-if="loading" class="empty-state">搜索中</div>
        <div v-else-if="!hasSearched && initialItems.length" class="result-groups initial-results">
          <section class="result-group">
            <header>
              <h3>最近进入外脑</h3>
              <span>{{ initialItems.length }}</span>
            </header>
            <button
              v-for="item in initialItems"
              :key="item.id"
              class="result-row"
              type="button"
              :style="{ '--result-accent': typeAccent(item.type) }"
              @click="selectedItemId = item.id"
            >
              <span class="result-dot" />
              <span class="result-copy">
                <strong>{{ resultTitle(initialResult(item)) }}</strong>
                <small v-if="resultSummary(initialResult(item))">{{ resultSummary(initialResult(item)) }}</small>
              </span>
              <span class="result-meta">{{ resultMeta(initialResult(item)) }}</span>
            </button>
          </section>
        </div>
        <div v-else-if="!hasSearched" class="empty-state">输入一个主题、人物、项目或记得的片段。</div>
        <div v-else-if="!results.length" class="empty-state">没有匹配</div>

        <div v-else class="result-groups">
          <div v-if="searchMode === 'all' && itemResults.length" class="batch-actions">
            <div>
              <strong>{{ itemResults.length }} 条记录</strong>
              <span>{{ recordFiltersActive ? '记录筛选已启用' : '可继续细化筛选后批量处理' }}</span>
            </div>
            <button
              type="button"
              :disabled="!pendingItemIds.length || actionBusy === 'ready'"
              @click="markVisibleReady"
            >
              {{ actionBusy === 'ready' ? '处理中' : `标记待处理为就绪 (${pendingItemIds.length})` }}
            </button>
            <button
              type="button"
              :disabled="!overriddenReadyItemIds.length || actionBusy === 'pending'"
              @click="markVisiblePending"
            >
              {{ actionBusy === 'pending' ? '处理中' : `退回手动完成 (${overriddenReadyItemIds.length})` }}
            </button>
          </div>
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
                <small v-if="resultSummary(result)">{{ resultSummary(result) }}</small>
              </span>
              <span class="result-meta">
                <span
                  v-if="result.kind === 'item'"
                  class="state-chip"
                  :class="{ pending: result.data.processing_state === 'pending' }"
                >
                  {{ itemProcessingLabel(result.data) }}
                </span>
                {{ resultMeta(result) }}
              </span>
            </button>
          </section>
        </div>
      </section>
    </section>

    <LibraryContextView
      v-else
      :key="contextRevision"
      :selected-id="selectedLifelineId"
      @select-lifeline="selectLifeline"
      @open-item="selectedItemId = $event"
      @open-object="selectedObject = $event"
    />

    <ItemDrawer :item-id="selectedItemId" @close="selectedItemId = null" @changed="refreshContent" />
    <ObjectDrawer
      :target="selectedObject"
      @close="selectedObject = null"
      @changed="refreshContent"
      @open-item="openSourceItem"
      @open-object="selectedObject = $event"
    />
  </main>
</template>

<style scoped>
.search-view {
  width: min(1180px, calc(100% - var(--s-8)));
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

.topbar-actions,
.library-pane-switch {
  display: flex;
  align-items: center;
  gap: var(--s-2);
}

.library-pane-switch {
  padding: 3px;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-1);
}

.library-pane-switch button {
  min-height: 32px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0 var(--s-3);
  border-radius: var(--r-1);
  color: var(--text-3);
  font-size: var(--fs-2);
}

.library-pane-switch button:hover,
.library-pane-switch button.active {
  background: var(--surface-2);
  color: var(--text-1);
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
.result-row,
.reset-filter-btn,
.batch-actions button {
  transition: border-color var(--t-fast) var(--ease), background var(--t-fast) var(--ease), color var(--t-fast) var(--ease);
}

.refresh-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
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
  display: block;
}

.panel {
  border: 0;
  border-radius: 0;
  background: transparent;
}

.query-panel,
.result-panel {
  padding: 0;
}

.query-panel {
  position: static;
  padding-bottom: var(--s-5);
  border-bottom: 1px solid var(--line-1);
}

.query-form {
  display: grid;
  gap: var(--s-3);
}

.query-form > label:first-child input {
  min-height: 54px;
  font-size: var(--fs-5);
  background: var(--surface-1);
}

label {
  display: grid;
  gap: var(--s-2);
}

label span {
  color: var(--text-3);
  font-size: var(--fs-2);
}

input,
select {
  width: 100%;
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  background: var(--surface-1);
  color: var(--text-1);
  padding: var(--s-3);
}

select {
  min-height: 40px;
}

input::placeholder {
  color: var(--text-4);
}

.mode-pills {
  display: flex;
  align-items: center;
  gap: var(--s-2);
}

.mode-pills button {
  min-height: 36px;
  min-width: 96px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
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

.filter-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--s-3);
  padding-top: var(--s-2);
}

.reset-filter-btn {
  min-height: 34px;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-1);
  color: var(--text-3);
}

.reset-filter-btn:hover:not(:disabled) {
  border-color: var(--line-2);
  background: var(--surface-2);
  color: var(--text-1);
}

.reset-filter-btn:disabled,
.batch-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.filter-summary {
  --filter-summary-accent: var(--accent-bright);
}

.metrics {
  display: flex;
  gap: var(--s-5);
  margin-top: var(--s-4);
}

.metrics article {
  display: inline-flex;
  align-items: baseline;
  gap: 7px;
}

.metrics span,
.result-meta,
.result-group header span,
.result-mode {
  color: var(--text-3);
  font-size: var(--fs-2);
}

.metrics strong {
  color: var(--text-2);
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

.panel-head {
  margin-top: 42px;
  padding-bottom: var(--s-3);
  border-bottom: 1px solid var(--line-1);
}

.result-mode {
  border: 1px solid var(--line-1);
  border-radius: var(--r-pill);
  padding: 3px 9px;
}

.notice,
.empty-state {
  margin-top: var(--s-4);
  border: 0;
  border-radius: 0;
  background: transparent;
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

.feedback-row {
  border-color: rgba(110, 231, 208, 0.18);
  color: var(--accent-bright);
}

.result-groups {
  display: grid;
  gap: var(--s-5);
  margin-top: var(--s-4);
}

.batch-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--s-2);
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-1);
  padding: var(--s-3);
}

.batch-actions > div {
  min-width: min(220px, 100%);
  margin-right: auto;
}

.batch-actions strong,
.batch-actions span {
  display: block;
}

.batch-actions strong {
  color: var(--text-1);
  font-weight: 520;
}

.batch-actions span {
  color: var(--text-3);
  font-size: var(--fs-2);
}

.batch-actions button {
  min-height: 30px;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-2);
  color: var(--text-3);
  padding: 0 var(--s-3);
}

.batch-actions button:hover:not(:disabled) {
  border-color: var(--line-2);
  background: var(--surface-3);
  color: var(--text-1);
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
  border: 0;
  border-bottom: 1px solid var(--line-1);
  border-radius: 0;
  background: transparent;
  padding: var(--s-3);
  text-align: left;
}

.result-row:hover {
  border-color: var(--line-2);
  background: rgba(255, 255, 255, 0.022);
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

.state-chip {
  display: inline-flex;
  align-items: center;
  min-height: 20px;
  margin-right: var(--s-2);
  padding: 0 var(--s-2);
  border: 1px solid rgba(110, 231, 208, 0.16);
  border-radius: var(--r-pill);
  color: var(--accent-bright);
  background: var(--accent-glow);
}

.state-chip.pending {
  border-color: rgba(232, 174, 120, 0.22);
  color: var(--warm);
  background: rgba(232, 174, 120, 0.06);
}

@media (max-width: 820px) {
  .search-view {
    width: min(100vw - var(--s-4), 640px);
    padding-top: calc(var(--s-8) + var(--s-7));
  }

  .search-shell {
    grid-template-columns: 1fr;
  }

  .filter-grid {
    grid-template-columns: 1fr 1fr;
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

  .topbar {
    display: grid;
  }

  .topbar-actions {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 560px) {
  .topbar-actions {
    align-items: stretch;
  }

  .library-pane-switch {
    flex: 1;
  }

  .library-pane-switch button {
    flex: 1;
    justify-content: center;
    padding: 0 var(--s-2);
  }

  .refresh-btn span {
    display: none;
  }

  .mode-pills button {
    min-width: 0;
    flex: 1;
  }

  .filter-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<style scoped>
/* Ink & Light: recall is treated as an index room, not a form dashboard. */
.search-view {
  width: min(1240px, calc(100% - 96px));
  margin: 0 auto;
  padding: 58px 0 120px;
}

.topbar {
  min-height: 116px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: start;
  gap: 30px;
  margin-bottom: 0;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--line-1);
}

.topbar .eyebrow {
  margin-bottom: 8px;
  color: var(--accent);
}

.topbar h1 {
  font-family: var(--font-display);
  font-size: 38px;
  font-weight: 400;
}

.library-index {
  align-self: center;
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 9px;
  writing-mode: vertical-rl;
}

.topbar-actions {
  align-self: center;
}

.library-pane-switch {
  gap: 0;
  padding: 0;
  border: 0;
  border-bottom: 1px solid var(--line-2);
  border-radius: 0;
  background: transparent;
}

.library-pane-switch button {
  min-height: 39px;
  padding: 0 14px;
  border-bottom: 2px solid transparent;
  border-radius: 0;
}

.library-pane-switch button:hover,
.library-pane-switch button.active {
  color: var(--text-1);
  background: transparent;
  border-bottom-color: var(--accent);
}

.refresh-btn {
  min-height: 40px;
  border: 1px solid var(--line-2);
  border-radius: 50%;
  padding: 0;
  width: 40px;
  justify-content: center;
}

.refresh-btn span {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.query-panel {
  position: relative;
  padding: 54px 0 38px;
  border-bottom-color: var(--line-2);
}

.query-panel::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: -1px;
  width: 31%;
  height: 3px;
  background: var(--accent);
}

.query-form {
  gap: 22px;
}

.query-form > label:first-child {
  gap: 12px;
}

.query-form > label:first-child > span {
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 9px;
}

.query-form > label:first-child input {
  min-height: 78px;
  padding: 0 2px 10px;
  border: 0;
  border-bottom: 1px solid var(--line-3);
  border-radius: 0;
  background: transparent;
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 30px;
}

.query-form > label:first-child input:focus {
  border-bottom-color: var(--accent-bright);
}

.mode-pills {
  gap: 0;
}

.mode-pills button {
  min-width: 102px;
  min-height: 36px;
  border-color: var(--line-1);
  border-radius: 0;
  background: rgba(242, 237, 225, 0.014);
}

.mode-pills button + button {
  border-left: 0;
}

.mode-pills button.active,
.mode-pills button:hover {
  border-color: var(--line-2);
  color: var(--text-1);
  background: var(--accent-dim);
}

.filter-grid {
  padding-top: 18px;
  border-top: 1px solid var(--line-1);
}

.filter-grid input,
.filter-grid select {
  min-height: 42px;
  border-radius: 0;
  background: rgba(242, 237, 225, 0.018);
}

.reset-filter-btn {
  justify-self: start;
  padding: 0 12px;
  border-radius: 0;
  background: transparent;
}

.metrics {
  gap: 0;
  margin-top: 30px;
  border-top: 1px solid var(--line-1);
}

.metrics article {
  min-width: 130px;
  min-height: 58px;
  justify-content: space-between;
  padding: 14px 18px;
  border-right: 1px solid var(--line-1);
}

.metrics article:first-child {
  padding-left: 0;
}

.metrics strong {
  color: var(--accent-bright);
  font-size: 20px;
}

.panel-head {
  min-height: 94px;
  margin-top: 0;
  padding: 30px 0 18px;
  border-bottom-color: var(--line-2);
}

.panel-head .eyebrow {
  margin-bottom: 6px;
  color: var(--cobalt);
}

.panel-head h2 {
  font-family: var(--font-display);
  font-size: 25px;
  font-weight: 400;
}

.result-mode {
  border: 0;
  border-bottom: 1px solid var(--line-2);
  border-radius: 0;
  padding: 3px 0;
  font-family: var(--font-mono);
  font-size: 9px;
}

.result-groups {
  gap: 42px;
  margin-top: 30px;
}

.result-group header {
  min-height: 38px;
  border-bottom: 1px solid var(--line-1);
}

.result-group h3 {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 400;
}

.result-row {
  min-height: 78px;
  border-radius: 0;
  border-bottom-color: var(--line-1);
  transition: padding var(--t-base) var(--ease), background var(--t-base) var(--ease);
}

.result-row:hover {
  padding-right: 10px;
  padding-left: 10px;
  background: rgba(242, 237, 225, 0.02);
}

.result-dot {
  width: 6px;
  height: 6px;
  border-radius: 0;
  transform: rotate(45deg);
  box-shadow: none;
}

.result-copy strong {
  color: var(--text-2);
  font-size: 14px;
  font-weight: 480;
}

.batch-actions {
  padding: 16px 0;
  border-top: 1px solid var(--line-1);
  border-bottom: 1px solid var(--line-1);
  background: transparent;
}

.batch-actions button {
  border-radius: 0;
  background: rgba(242, 237, 225, 0.018);
}

.empty-state {
  min-height: 220px;
  display: grid;
  place-items: center start;
  padding: 0;
  color: var(--text-4);
  font-family: var(--font-display);
  font-size: 20px;
}

@media (max-width: 900px) {
  .search-view {
    width: min(100% - 56px, 840px);
  }

  .filter-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .search-view {
    width: calc(100% - 36px);
    padding: 28px 0 calc(var(--app-mobile-nav-height) + 44px);
  }

  .topbar {
    min-height: 146px;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 14px;
    padding-bottom: 22px;
  }

  .topbar h1 {
    font-size: 31px;
  }

  .library-index {
    display: none;
  }

  .topbar-actions {
    grid-column: 1 / -1;
    width: 100%;
    justify-content: space-between;
  }

  .library-pane-switch {
    flex: 1;
  }

  .library-pane-switch button {
    flex: 1;
  }

  .query-panel {
    padding-top: 38px;
  }

  .query-form > label:first-child input {
    min-height: 66px;
    font-size: 23px;
  }

  .mode-pills button {
    min-width: 0;
  }

  .filter-grid {
    grid-template-columns: 1fr;
  }

  .metrics {
    width: 100%;
  }

  .metrics article {
    min-width: 0;
    flex: 1;
    padding: 12px 10px;
  }

  .metrics article:first-child {
    padding-left: 0;
  }

  .result-row {
    min-height: 86px;
  }
}
</style>
