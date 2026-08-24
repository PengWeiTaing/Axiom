<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { ArrowRight, FolderTree, Search, SlidersHorizontal, X } from '@lucide/vue';
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
type SearchResult =
  | { kind: 'item'; data: Item; relevance?: number }
  | { kind: 'task'; data: Task }
  | { kind: 'memory'; data: Memory }
  | { kind: 'decision'; data: Decision };
type ItemSearchResult = Extract<SearchResult, { kind: 'item' }>;

const query = ref('');
const queryInput = ref<HTMLInputElement | null>(null);
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

let searchTimer = 0;
let searchRequest = 0;

const groupedResults = computed(() => {
  const groups: Record<ResultKind, SearchResult[]> = { item: [], task: [], memory: [], decision: [] };
  for (const result of results.value) groups[result.kind].push(result);
  return groups;
});

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
  if (searchMode.value === 'vector') chips.push('语义找回');
  if (itemTypeFilter.value) chips.push(itemTypeLabel(itemTypeFilter.value));
  if (processingStateFilter.value) chips.push(processingStateFilter.value === 'pending' ? '待处理' : '已就绪');
  if (processingOverrideFilter.value) chips.push('手动完成');
  if (sourceFilter.value.trim()) chips.push(`来自 ${sourceFilter.value.trim()}`);
  return chips;
});
const groups = computed(() => [
  { kind: 'item' as const, label: '原始记录', index: 'A', items: groupedResults.value.item },
  { kind: 'task' as const, label: '行动', index: 'B', items: groupedResults.value.task },
  { kind: 'memory' as const, label: '记忆', index: 'C', items: groupedResults.value.memory },
  { kind: 'decision' as const, label: '决定', index: 'D', items: groupedResults.value.decision },
].filter((group) => group.items.length > 0));

function syncSearchUrl(value: string) {
  const useRecordFilters = searchMode.value === 'all';
  replaceRouteQuery('library', {
    view: '',
    lifeline: '',
    q: value,
    search_mode: searchMode.value === 'vector' ? 'vector' : '',
    type: useRecordFilters ? itemTypeFilter.value : '',
    source: useRecordFilters ? sourceFilter.value.trim() : '',
    processing_state: useRecordFilters ? processingStateFilter.value : '',
    processing_override: useRecordFilters ? processingOverrideFilter.value : '',
  });
}

async function runSearch(options: { clearFeedback?: boolean } = {}) {
  const q = query.value.trim();
  if (!q) return;
  const request = ++searchRequest;
  loading.value = true;
  error.value = null;
  if (options.clearFeedback ?? true) feedback.value = null;
  hasSearched.value = true;
  syncSearchUrl(q);
  try {
    if (searchMode.value === 'vector') {
      const payload = await searchVector(q, 24);
      if (request === searchRequest) {
        results.value = payload.items.map((item) => ({ kind: 'item', data: item, relevance: item.relevance }));
      }
      return;
    }
    const payload = await searchAll(q, 18, {
      type: itemTypeFilter.value,
      source: sourceFilter.value.trim(),
      processing_state: processingStateFilter.value,
      processing_override: processingOverrideFilter.value,
    });
    if (request === searchRequest) {
      results.value = [
        ...payload.items.map((item) => ({ kind: 'item' as const, data: item })),
        ...payload.tasks.map((task) => ({ kind: 'task' as const, data: task })),
        ...payload.memories.map((memory) => ({ kind: 'memory' as const, data: memory })),
        ...payload.decisions.map((decision) => ({ kind: 'decision' as const, data: decision })),
      ];
    }
  } catch (err) {
    if (request === searchRequest) {
      error.value = err instanceof ApiError ? err.message : '搜索失败';
      results.value = [];
    }
  } finally {
    if (request === searchRequest) loading.value = false;
  }
}

function scheduleSearch() {
  window.clearTimeout(searchTimer);
  const q = query.value.trim();
  if (!q) {
    searchRequest += 1;
    hasSearched.value = false;
    results.value = [];
    loading.value = false;
    syncSearchUrl('');
    return;
  }
  if (q.length < 2) return;
  searchTimer = window.setTimeout(() => runSearch(), 280);
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

function selectLibraryPane(next: LibraryPane) {
  libraryPane.value = next;
  if (next === 'search') {
    replaceRouteQuery('library', { view: '', lifeline: '' });
    nextTick(() => queryInput.value?.focus());
    return;
  }
  replaceRouteQuery('library', {
    view: 'context', q: '', search_mode: '', type: '', source: '', processing_state: '', processing_override: '',
  });
}

function selectLifeline(id: string) {
  selectedLifelineId.value = id;
  replaceRouteQuery('library', { view: 'context', lifeline: id });
}

function focusSearch() {
  libraryPane.value = 'search';
  nextTick(() => queryInput.value?.focus());
}

function clearQuery() {
  query.value = '';
  focusSearch();
}

function openResult(result: SearchResult) {
  if (result.kind === 'item') selectedItemId.value = result.data.id;
  else selectedObject.value = { kind: result.kind, id: result.data.id };
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
  const normalized = summary.replace(/\s+/g, ' ').trim();
  return normalized === resultTitle(result).replace(/\s+/g, ' ').trim() ? '' : normalized;
}

function resultMeta(result: SearchResult): string {
  if (result.kind === 'item') {
    const relevance = result.relevance === undefined ? '' : ` · ${Math.round(result.relevance * 100)}%`;
    return `${itemTypeLabel(result.data.type)} · ${formatRelative(result.data.created_at)}${relevance}`;
  }
  if (result.kind === 'task') return `${taskStatusLabel(result.data.status)} · ${taskPriorityLabel(result.data.priority)}`;
  if (result.kind === 'memory') return `${memoryCategoryLabel(result.data.category)} · ${memoryStatusLabel(result.data.status)}`;
  return `${decisionStatusLabel(result.data.status)} · ${formatRelative(result.data.created_at)}`;
}

function itemTitle(item: Item): string {
  return item.original_name || item.content || item.derived_text || item.transcript_text || `记录 #${item.id}`;
}

function itemSummary(item: Item): string {
  const text = String(item.content || item.derived_text || item.transcript_text || item.original_name || '').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  return text.length > 180 ? `${text.slice(0, 179)}…` : text;
}

function itemTypeLabel(type: Item['type']): string {
  return { text: '文字', image: '图片', document: '文档', audio: '音频' }[type];
}

function itemProcessingLabel(item: Item): string {
  return item.processing_note || item.processing_label || (item.processing_state === 'pending' ? '待处理' : '已就绪');
}

function resultAccent(result: SearchResult): string {
  if (result.kind === 'item') return typeAccent(result.data.type);
  if (result.kind === 'task') return result.data.priority === 'high' ? 'var(--warn)' : 'var(--accent)';
  if (result.kind === 'memory') return 'var(--accent)';
  return 'var(--violet)';
}

function initialResult(item: Item): SearchResult {
  return { kind: 'item', data: item };
}

async function loadInitialItems() {
  try {
    const payload = await getRecent({ page: 1 });
    initialItems.value = payload.items.slice(0, 9);
  } catch {
    initialItems.value = [];
  }
}

async function markVisibleReady() {
  const ids = pendingItemIds.value;
  if (!ids.length || actionBusy.value) return;
  actionBusy.value = 'ready';
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

async function refreshContent() {
  if (libraryPane.value === 'context') contextRevision.value += 1;
  else if (query.value.trim()) await runSearch();
  else await loadInitialItems();
}

watch(query, scheduleSearch);

onMounted(() => {
  const params = currentRouteParams();
  libraryPane.value = params.get('view') === 'context' || Boolean(params.get('lifeline')) ? 'context' : 'search';
  selectedLifelineId.value = params.get('lifeline');
  searchMode.value = params.get('search_mode') === 'vector' ? 'vector' : 'all';
  const initialType = params.get('type');
  if (['text', 'image', 'document', 'audio'].includes(initialType || '')) itemTypeFilter.value = initialType as ItemType;
  const state = params.get('processing_state');
  if (state === 'pending' || state === 'ready') processingStateFilter.value = state;
  if (params.get('processing_override') === 'ready') processingOverrideFilter.value = 'ready';
  sourceFilter.value = params.get('source') || '';
  filtersOpen.value = recordFiltersActive.value;
  if (libraryPane.value === 'search') loadInitialItems();
  query.value = params.get('q') || '';
  window.addEventListener('axiom:focus-search', focusSearch);
});

onBeforeUnmount(() => {
  window.clearTimeout(searchTimer);
  window.removeEventListener('axiom:focus-search', focusSearch);
});
</script>

<template>
  <main class="library-view">
    <header class="library-head">
      <div class="library-title">
        <span>02 / LIBRARY</span>
        <h1>资料库</h1>
        <p>RECORDS / OBJECTS / CONTEXT</p>
      </div>
      <nav aria-label="资料库视图">
        <button type="button" :class="{ active: libraryPane === 'search' }" @click="selectLibraryPane('search')">
          <Search :size="15" /> 查找
        </button>
        <button type="button" :class="{ active: libraryPane === 'context' }" @click="selectLibraryPane('context')">
          <FolderTree :size="15" /> 项目脉络
        </button>
      </nav>
    </header>

    <template v-if="libraryPane === 'search'">
      <section class="recall-line" aria-label="找回内容">
        <Search :size="24" :stroke-width="1.4" />
        <form @submit.prevent="runSearch()">
          <input
            ref="queryInput"
            v-model="query"
            class="library-query"
            aria-label="搜索查询"
            type="search"
            autocomplete="off"
            placeholder="写下你还记得的任何片段"
          />
        </form>
        <button v-if="query" type="button" title="清空" aria-label="清空搜索" @click="clearQuery"><X :size="17" /></button>
        <span v-else class="search-shortcut">/</span>
      </section>

      <section class="recall-controls">
        <div class="mode-switch" aria-label="搜索模式">
          <button type="button" :class="{ active: searchMode === 'all' }" @click="selectMode('all')">精确</button>
          <button type="button" :class="{ active: searchMode === 'vector' }" @click="selectMode('vector')">相近含义</button>
        </div>
        <button class="filter-trigger" type="button" :class="{ active: filtersOpen }" @click="filtersOpen = !filtersOpen">
          <SlidersHorizontal :size="14" />
          <span>{{ filtersOpen ? '收起条件' : '细化条件' }}</span>
        </button>
        <div class="result-summary">
          <span v-if="loading">正在翻找</span>
          <span v-else-if="hasSearched">{{ totalCount }} 个结果</span>
          <span v-else>{{ initialItems.length }} 条最近记录</span>
        </div>
      </section>

      <section v-if="filtersOpen" class="filter-sheet" aria-label="记录筛选">
        <label><span>记录类型</span><select v-model="itemTypeFilter" :disabled="searchMode === 'vector'"><option value="">全部</option><option value="text">文字</option><option value="image">图片</option><option value="document">文档</option><option value="audio">音频</option></select></label>
        <label><span>处理状态</span><select v-model="processingStateFilter" :disabled="searchMode === 'vector'"><option value="">全部</option><option value="pending">待处理</option><option value="ready">已就绪</option></select></label>
        <label><span>人工覆盖</span><select v-model="processingOverrideFilter" :disabled="searchMode === 'vector'"><option value="">全部</option><option value="ready">手动完成</option></select></label>
        <label><span>来源</span><input v-model="sourceFilter" type="text" autocomplete="off" :disabled="searchMode === 'vector'" placeholder="来源名称" /></label>
        <button type="button" :disabled="!recordFiltersActive" @click="resetFilters">清空条件</button>
        <button type="button" :disabled="!query.trim()" @click="runSearch()">应用</button>
      </section>

      <div v-if="activeFilterChips.length" class="filter-summary">
        <span v-for="chip in activeFilterChips" :key="chip">{{ chip }}</span>
      </div>

      <p v-if="feedback" class="library-notice">{{ feedback }}</p>
      <p v-if="error" class="library-notice is-error">{{ error }} <button type="button" @click="runSearch()">重试</button></p>

      <section v-if="hasSearched && itemResults.length && searchMode === 'all'" class="batch-line">
        <span>{{ itemResults.length }} 条原始记录</span>
        <i />
        <button type="button" :disabled="!pendingItemIds.length || actionBusy === 'ready'" @click="markVisibleReady">标记待处理为就绪 · {{ pendingItemIds.length }}</button>
        <button type="button" :disabled="!overriddenReadyItemIds.length || actionBusy === 'pending'" @click="markVisiblePending">退回手动完成 · {{ overriddenReadyItemIds.length }}</button>
      </section>

      <section v-if="!hasSearched && initialItems.length" class="result-section">
        <header class="result-index"><span>A</span><div><h2>最近进入外脑</h2></div><strong>{{ initialItems.length }}</strong></header>
        <div class="result-list">
          <button
            v-for="(item, index) in initialItems"
            :key="item.id"
            type="button"
            :style="{ '--result-accent': typeAccent(item.type) }"
            @click="selectedItemId = item.id"
          >
            <span class="result-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <i />
            <span class="result-copy"><strong>{{ resultTitle(initialResult(item)) }}</strong><small v-if="resultSummary(initialResult(item))">{{ resultSummary(initialResult(item)) }}</small></span>
            <span class="result-meta">{{ resultMeta(initialResult(item)) }}</span>
            <ArrowRight :size="15" />
          </button>
        </div>
      </section>

      <div v-else-if="loading && !results.length" class="library-empty">正在沿记录、对象与关系翻找。</div>
      <div v-else-if="hasSearched && !results.length && !error" class="library-empty">没有直接匹配。可以试试“相近含义”。</div>

      <section v-for="group in groups" v-else :key="group.kind" class="result-section">
        <header class="result-index"><span>{{ group.index }}</span><div><h2>{{ group.label }}</h2></div><strong>{{ group.items.length }}</strong></header>
        <div class="result-list">
          <button
            v-for="(result, index) in group.items"
            :key="`${result.kind}-${result.data.id}`"
            type="button"
            :style="{ '--result-accent': resultAccent(result) }"
            @click="openResult(result)"
          >
            <span class="result-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <i />
            <span class="result-copy"><strong>{{ resultTitle(result) }}</strong><small v-if="resultSummary(result)">{{ resultSummary(result) }}</small></span>
            <span class="result-meta"><em v-if="result.kind === 'item'">{{ itemProcessingLabel(result.data) }}</em>{{ resultMeta(result) }}</span>
            <ArrowRight :size="15" />
          </button>
        </div>
      </section>
    </template>

    <LibraryContextView
      v-else
      :key="contextRevision"
      :selected-id="selectedLifelineId"
      @select-lifeline="selectLifeline"
      @open-item="selectedItemId = $event"
      @open-object="selectedObject = $event"
    />

    <ItemDrawer :item-id="selectedItemId" @close="selectedItemId = null" @changed="refreshContent" />
    <ObjectDrawer :target="selectedObject" @close="selectedObject = null" @changed="refreshContent" @open-item="openSourceItem" @open-object="selectedObject = $event" />
  </main>
</template>

<style scoped>
.library-view {
  width: min(1380px, calc(100% - 76px));
  margin: 0 auto;
  padding: 34px 0 96px;
}

.library-head {
  min-height: 150px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 34px;
  border-bottom: 1px solid var(--line-2);
}

.library-title > span {
  color: var(--cobalt);
  font-family: var(--font-mono);
  font-size: 9px;
}

.library-title h1 {
  margin-top: 12px;
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 400;
}

.library-title p {
  margin-top: 8px;
  color: var(--text-4);
  font-size: 11px;
}

.library-head nav {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-top: 4px;
}

.library-head nav button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding-bottom: 5px;
  color: var(--text-4);
  font-size: 11px;
  border-bottom: 1px solid transparent;
}

.library-head nav button:hover,
.library-head nav button.active {
  color: var(--text-1);
  border-bottom-color: var(--text-1);
}

.recall-line {
  min-height: 190px;
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) 34px;
  align-items: center;
  gap: 24px;
  color: var(--cobalt);
  border-bottom: 1px solid var(--line-2);
}

.recall-line form {
  min-width: 0;
}

.library-query {
  width: 100%;
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 34px;
  line-height: 1.35;
}

.library-query::placeholder {
  color: var(--text-5);
}

.library-query:focus-visible {
  outline: none;
}

.library-query::-webkit-search-cancel-button {
  display: none;
}

.recall-line:focus-within {
  border-bottom-color: var(--cobalt);
}

.recall-line > button,
.search-shortcut {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  color: var(--text-4);
  border: 1px solid var(--line-1);
}

.search-shortcut {
  font-family: var(--font-mono);
  font-size: 10px;
}

.recall-controls {
  min-height: 64px;
  display: flex;
  align-items: center;
  gap: 28px;
  border-bottom: 1px solid var(--line-1);
}

.mode-switch {
  display: flex;
  gap: 18px;
}

.mode-switch button,
.filter-trigger {
  color: var(--text-4);
  font-size: 10px;
  border-bottom: 1px solid transparent;
}

.mode-switch button.active,
.mode-switch button:hover {
  color: var(--cobalt);
  border-bottom-color: var(--cobalt);
}

.filter-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.filter-trigger.active,
.filter-trigger:hover {
  color: var(--text-1);
}

.result-summary {
  margin-left: auto;
  color: var(--text-4);
  font-family: var(--font-mono);
  font-size: 9px;
}

.filter-sheet {
  display: grid;
  grid-template-columns: repeat(4, minmax(120px, 1fr)) auto auto;
  gap: 22px;
  padding: 24px 0;
  border-bottom: 1px solid var(--cobalt);
}

.filter-sheet label {
  display: grid;
  gap: 7px;
}

.filter-sheet label > span {
  color: var(--text-4);
  font-family: var(--font-mono);
  font-size: 8px;
}

.filter-sheet select,
.filter-sheet input {
  width: 100%;
  min-height: 32px;
  color: var(--text-2);
  font-size: 11px;
  border-bottom: 1px solid var(--line-2);
}

.filter-sheet > button {
  align-self: end;
  min-height: 32px;
  padding: 0 8px;
  color: var(--text-3);
  font-size: 10px;
  border-bottom: 1px solid var(--line-2);
}

.filter-sheet > button:last-child {
  color: var(--surface-1);
  background: var(--cobalt);
  border: 0;
}

.filter-summary {
  min-height: 48px;
  border-bottom: 1px solid var(--line-1);
}

.library-notice {
  padding: 12px 0;
  color: var(--accent);
  font-size: 11px;
  border-bottom: 1px solid currentColor;
}

.library-notice.is-error {
  color: var(--error);
}

.library-notice button {
  margin-left: 12px;
  text-decoration: underline;
}

.batch-line {
  min-height: 54px;
  display: flex;
  align-items: center;
  gap: 20px;
  color: var(--text-4);
  font-size: 9px;
  border-bottom: 1px solid var(--line-2);
}

.batch-line i {
  flex: 1;
  height: 1px;
  background: var(--line-1);
}

.batch-line button {
  color: var(--text-3);
  border-bottom: 1px solid var(--line-2);
}

.result-section {
  display: grid;
  grid-template-columns: minmax(170px, 0.82fr) minmax(0, 3.8fr);
  gap: clamp(36px, 6vw, 92px);
  padding: 62px 0;
  border-bottom: 1px solid var(--line-2);
}

.result-index {
  align-self: start;
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr) auto;
  gap: 10px;
}

.result-index > span {
  color: var(--cobalt);
  font-family: var(--font-display);
  font-size: 24px;
}

.result-index h2 {
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 400;
}

.result-index > strong {
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 500;
}

.result-list {
  min-width: 0;
  border-top: 1px solid var(--line-2);
}

.result-list > button {
  --result-accent: var(--cobalt);
  width: 100%;
  min-height: 84px;
  display: grid;
  grid-template-columns: 30px 3px minmax(180px, 1fr) minmax(120px, auto) 18px;
  align-items: center;
  gap: 14px;
  text-align: left;
  border-bottom: 1px solid var(--line-1);
}

.result-list > button:hover {
  padding-left: 7px;
}

.result-number {
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 9px;
}

.result-list > button > i {
  width: 3px;
  height: 20px;
  background: var(--result-accent);
}

.result-copy {
  min-width: 0;
  display: grid;
  gap: 4px;
}

.result-copy strong {
  color: var(--text-1);
  font-size: 13px;
  font-weight: 520;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result-copy small {
  max-width: 680px;
  color: var(--text-4);
  font-size: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result-meta {
  display: grid;
  justify-items: end;
  gap: 3px;
  color: var(--text-4);
  font-family: var(--font-mono);
  font-size: 8px;
  white-space: nowrap;
}

.result-meta em {
  color: var(--result-accent);
  font-style: normal;
}

.result-list svg {
  color: var(--text-5);
}

.library-empty {
  min-height: 340px;
  display: grid;
  place-items: center;
  color: var(--text-4);
  font-family: var(--font-display);
  font-size: 17px;
  border-bottom: 1px solid var(--line-2);
}

@media (max-width: 900px) {
  .filter-sheet {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .result-section {
    grid-template-columns: 160px minmax(0, 1fr);
    gap: 34px;
  }

  .result-list > button {
    grid-template-columns: 26px 3px minmax(0, 1fr) 16px;
  }

  .result-meta {
    display: none;
  }
}

@media (max-width: 760px) {
  .library-view {
    width: calc(100% - 32px);
    padding: 22px 0 calc(var(--app-mobile-nav-height) + 34px);
  }

  .library-head {
    min-height: 126px;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 18px;
  }

  .library-title h1 {
    font-size: 27px;
  }

  .library-head nav {
    padding: 0;
  }

  .recall-line {
    min-height: 148px;
    grid-template-columns: 24px minmax(0, 1fr) 30px;
    gap: 12px;
  }

  .library-query {
    font-size: 25px;
  }

  .recall-controls {
    gap: 18px;
  }

  .result-summary {
    margin-left: auto;
  }

  .filter-sheet {
    grid-template-columns: 1fr 1fr;
    gap: 18px 12px;
  }

  .batch-line {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    padding: 16px 0;
  }

  .batch-line i {
    width: 100%;
    flex: 0 0 1px;
  }

  .result-section {
    grid-template-columns: 1fr;
    gap: 26px;
    padding: 46px 0;
  }

  .result-index {
    grid-template-columns: 24px minmax(0, 1fr) auto;
  }

  .result-list > button {
    min-height: 74px;
    grid-template-columns: 22px 3px minmax(0, 1fr) 15px;
    gap: 10px;
  }

  .result-copy strong,
  .result-copy small {
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .result-copy strong { -webkit-line-clamp: 2; }
  .result-copy small { -webkit-line-clamp: 1; }
}
</style>
