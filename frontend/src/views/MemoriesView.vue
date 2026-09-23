<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Archive, ArrowUpRight, Check, Plus, RefreshCw } from '@lucide/vue';
import { ApiError } from '@/api/client';
import ItemDrawer from '@/components/ItemDrawer.vue';
import ObjectDrawer from '@/components/ObjectDrawer.vue';
import {
  archiveMemory,
  confirmMemory,
  createMemory,
  listMemories,
  memoriesStats,
} from '@/api/knowledge';
import type {
  Memory,
  MemoryCategory,
  MemoryList,
  MemoryStatsPayload,
  MemoryStatus,
  ObjectTarget,
} from '@/api/types';
import { formatRelative } from '@/composables/useRelativeTime';
import { currentRouteParams, replaceRouteQuery } from '@/composables/useRouteQuery';

const PAGE_SIZE = 12;

const memories = ref<Memory[]>([]);
const stats = ref<MemoryStatsPayload | null>(null);
const page = ref(1);
const totalPages = ref(1);
const total = ref(0);
const loading = ref(false);
const saving = ref(false);
const busyMemoryId = ref<number | null>(null);
const selectedItemId = ref<number | null>(null);
const selectedObject = ref<ObjectTarget | null>(null);
const error = ref<string | null>(null);
const feedback = ref<string | null>(null);
const categoryFilter = ref<MemoryCategory | ''>('');
const statusFilter = ref<MemoryStatus | ''>('');
const draft = ref({
  category: 'fact' as MemoryCategory,
  content: '',
  detail: '',
});

const canLoadMore = computed(() => page.value < totalPages.value);
const categoryStats = computed(() => stats.value?.by_category || {});
const candidateCount = computed(() => sumStatus('candidate'));
const confirmedCount = computed(() => sumStatus('confirmed'));
const archivedCount = computed(() => sumStatus('archived'));
const memoryFiltersActive = computed(() => Boolean(categoryFilter.value || statusFilter.value));
const activeMemoryFilterChips = computed(() => {
  const chips: string[] = [];
  if (categoryFilter.value) chips.push(categoryLabel(categoryFilter.value));
  if (statusFilter.value) chips.push(statusLabel(statusFilter.value));
  return chips;
});

const categories: Array<{ key: MemoryCategory; label: string }> = [
  { key: 'fact', label: '事实' },
  { key: 'preference', label: '偏好' },
  { key: 'goal', label: '目标' },
  { key: 'relationship', label: '关系' },
  { key: 'event', label: '事件' },
];

async function loadStats() {
  stats.value = await memoriesStats();
}

async function loadMemoryList(reset = true) {
  loading.value = true;
  error.value = null;
  if (reset) syncMemoryListUrl();
  try {
    const nextPage = reset ? 1 : page.value + 1;
    const payload: MemoryList = await listMemories({
      category: categoryFilter.value,
      status: statusFilter.value,
      page: nextPage,
      page_size: PAGE_SIZE,
    });
    page.value = payload.page;
    totalPages.value = payload.total_pages || 1;
    total.value = payload.total || 0;
    memories.value = reset ? payload.memories : [...memories.value, ...payload.memories];
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '记忆列表加载失败';
  } finally {
    loading.value = false;
  }
}

async function refreshAll() {
  await Promise.all([loadStats(), loadMemoryList(true)]);
}

function applyMemoryFilters() {
  loadMemoryList(true);
}

function resetMemoryFilters() {
  categoryFilter.value = '';
  statusFilter.value = '';
  loadMemoryList(true);
}

function syncMemoryListUrl() {
  replaceRouteQuery('memories', {
    category: categoryFilter.value,
    status: statusFilter.value,
  });
}

async function submitMemory() {
  const content = draft.value.content.trim();
  if (!content || saving.value) return;
  saving.value = true;
  error.value = null;
  feedback.value = null;
  try {
    await createMemory({
      category: draft.value.category,
      content,
      detail: draft.value.detail.trim() || undefined,
    });
    draft.value = { category: 'fact', content: '', detail: '' };
    feedback.value = '记忆已添加，等待确认';
    await refreshAll();
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '记忆添加失败';
  } finally {
    saving.value = false;
  }
}

async function updateMemoryStatus(memory: Memory, action: 'confirm' | 'archive') {
  if (busyMemoryId.value) return;
  busyMemoryId.value = memory.id;
  error.value = null;
  feedback.value = null;
  try {
    if (action === 'confirm') await confirmMemory(memory.id);
    if (action === 'archive') await archiveMemory(memory.id);
    feedback.value = action === 'confirm' ? '记忆已确认' : '记忆已归档';
    await refreshAll();
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '记忆操作失败';
  } finally {
    busyMemoryId.value = null;
  }
}

function sumStatus(status: MemoryStatus): number {
  return Object.values(categoryStats.value).reduce((sum, item) => sum + (item[status] || 0), 0);
}

function categoryLabel(category: MemoryCategory): string {
  return categories.find((item) => item.key === category)?.label || category;
}

function statusLabel(status: MemoryStatus): string {
  const labels: Record<MemoryStatus, string> = {
    candidate: '候选',
    confirmed: '已确认',
    archived: '已归档',
  };
  return labels[status];
}

function memoryDetail(memory: Memory): string {
  const detail = String(memory.detail || memory.source_text || '').replace(/\s+/g, ' ').trim();
  if (!detail) return '没有补充说明';
  return detail.length > 130 ? `${detail.slice(0, 129)}...` : detail;
}

function openMemoryDetail(id: number) {
  selectedObject.value = { kind: 'memory', id };
}

function openSourceItem(id: number) {
  selectedObject.value = null;
  selectedItemId.value = id;
}

onMounted(() => {
  const params = currentRouteParams();
  const initialCategory = params.get('category');
  const initialStatus = params.get('status');
  if (
    initialCategory === 'fact' ||
    initialCategory === 'preference' ||
    initialCategory === 'goal' ||
    initialCategory === 'relationship' ||
    initialCategory === 'event'
  ) {
    categoryFilter.value = initialCategory;
  }
  if (initialStatus === 'candidate' || initialStatus === 'confirmed' || initialStatus === 'archived') {
    statusFilter.value = initialStatus;
  }
  refreshAll();
});
</script>

<template>
  <main class="memories-view">
    <header class="topbar">
      <div>
        <p class="eyebrow">05 / MEMORY</p>
        <h1>记忆索引</h1>
        <span>FACTS / PREFERENCES / GOALS / EVENTS</span>
      </div>
      <button class="refresh-btn" type="button" title="刷新记忆" aria-label="刷新记忆" :disabled="loading" @click="refreshAll">
        <RefreshCw :size="17" :class="{ spinning: loading }" />
      </button>
    </header>

    <div v-if="error" class="notice error-row">
      <span>{{ error }}</span>
      <button type="button" @click="refreshAll">重试</button>
    </div>
    <div v-else-if="feedback" class="notice feedback-row">
      <span>{{ feedback }}</span>
    </div>

    <section class="metrics" aria-label="记忆计数">
      <article>
        <span>LEDGER</span>
        <strong>{{ stats?.total ?? total }}</strong>
        <small>全部</small>
      </article>
      <article>
        <span>PENDING</span>
        <strong>{{ candidateCount }}</strong>
        <small>待确认</small>
      </article>
      <article>
        <span>KEPT</span>
        <strong>{{ confirmedCount }}</strong>
        <small>{{ archivedCount }} 已归档</small>
      </article>
    </section>

    <section class="workspace-grid">
      <details class="panel create-panel">
        <summary class="panel-head">
          <div>
            <p class="eyebrow">NEW / 01</p>
            <h2>保留一条记忆</h2>
          </div>
          <Plus :size="18" />
        </summary>

        <form class="memory-form" @submit.prevent="submitMemory">
          <label>
            <span>分类</span>
            <select v-model="draft.category" aria-label="记忆分类">
              <option v-for="category in categories" :key="category.key" :value="category.key">
                {{ category.label }}
              </option>
            </select>
          </label>
          <label>
            <span>内容</span>
            <textarea
              v-model="draft.content"
              aria-label="记忆内容"
              rows="5"
              placeholder="值得长期保存的事实、偏好、目标或关系"
            />
          </label>
          <label>
            <span>详情</span>
            <textarea
              v-model="draft.detail"
              aria-label="记忆详情"
              rows="4"
              placeholder="来源、边界、为什么重要"
            />
          </label>
          <button class="primary-action" type="submit" :disabled="saving || !draft.content.trim()">
            <Plus :size="15" />
            <span>{{ saving ? '添加中' : '加入记忆账册' }}</span>
          </button>
        </form>
      </details>

      <section class="panel list-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">ARCHIVE / 02</p>
            <h2>长期记忆</h2>
          </div>
          <div class="filters">
            <label>
              <span>分类</span>
              <select v-model="categoryFilter" aria-label="记忆分类筛选" @change="applyMemoryFilters">
                <option value="">全部</option>
                <option v-for="category in categories" :key="category.key" :value="category.key">
                  {{ category.label }}
                </option>
              </select>
            </label>
            <label>
              <span>状态</span>
              <select v-model="statusFilter" aria-label="记忆状态筛选" @change="applyMemoryFilters">
                <option value="">全部</option>
                <option value="candidate">候选</option>
                <option value="confirmed">已确认</option>
                <option value="archived">已归档</option>
              </select>
            </label>
          </div>
        </div>

        <div v-if="memoryFiltersActive" class="filter-summary" aria-label="当前记忆筛选">
          <span v-for="chip in activeMemoryFilterChips" :key="chip">{{ chip }}</span>
          <button type="button" :disabled="loading" @click="resetMemoryFilters">重置筛选</button>
        </div>

        <div v-if="memories.length" class="memory-list">
          <article v-for="memory in memories" :key="memory.id" class="memory-row" :class="memory.status">
            <div class="status-dot" :class="memory.status" aria-hidden="true" />
            <div class="memory-main">
              <strong>{{ memory.content }}</strong>
              <p>{{ memoryDetail(memory) }}</p>
              <div class="memory-meta">
                <span>{{ categoryLabel(memory.category) }}</span>
                <span>{{ statusLabel(memory.status) }}</span>
                <span>{{ formatRelative(memory.updated_at) }}</span>
              </div>
            </div>
            <div class="memory-actions">
              <button type="button" title="打开详情" aria-label="打开记忆详情" @click="openMemoryDetail(memory.id)"><ArrowUpRight :size="14" /></button>
              <button
                v-if="memory.status !== 'confirmed'"
                type="button"
                :disabled="busyMemoryId === memory.id"
                @click="updateMemoryStatus(memory, 'confirm')"
              ><Check :size="14" /><span>确认</span></button>
              <button
                v-if="memory.status !== 'archived'"
                type="button"
                :disabled="busyMemoryId === memory.id"
                @click="updateMemoryStatus(memory, 'archive')"
              ><Archive :size="14" /><span>归档</span></button>
            </div>
          </article>
        </div>
        <p v-else class="empty-line">{{ loading ? '加载记忆中...' : '暂无记忆' }}</p>
        <button v-if="canLoadMore" class="load-more" type="button" :disabled="loading" @click="loadMemoryList(false)">
          {{ loading ? '加载中' : '加载更多' }}
        </button>
      </section>
    </section>

    <ObjectDrawer
      :target="selectedObject"
      @close="selectedObject = null"
      @changed="refreshAll"
      @open-item="openSourceItem"
      @open-object="selectedObject = $event"
    />
    <ItemDrawer :item-id="selectedItemId" @close="selectedItemId = null" @changed="refreshAll" />
  </main>
</template>

<style scoped>
.memories-view {
  width: min(1240px, 100%);
  min-height: 100vh;
  margin: 0 auto;
  padding: 46px 42px 110px;
  color: var(--text-1);
  background: transparent;
}

.topbar,
.panel-head,
.filters,
.memory-actions,
.memory-meta,
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

.eyebrow {
  margin: 0 0 var(--s-1);
  color: var(--text-3);
  font-family: var(--font-mono);
  font-size: var(--fs-1);
  text-transform: uppercase;
  letter-spacing: 0;
}

.refresh-btn,
.primary-action,
.memory-actions button,
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
  background: var(--cobalt);
  border-color: var(--cobalt);
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
.memory-meta {
  color: var(--text-3);
}

.metrics strong {
  grid-row: 1 / 3;
  color: var(--cobalt);
  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 580;
  line-height: 1;
}

.workspace-grid {
  display: grid;
  grid-template-columns: minmax(280px, 0.68fr) minmax(440px, 1.32fr);
  gap: 0;
}

.panel {
  border: 0;
  border-radius: 0;
  background: transparent;
  backdrop-filter: none;
}

.create-panel {
  padding: 30px 32px 30px 0;
  border-right: 1px solid var(--line-1);
}

.list-panel {
  padding: 30px 0 0 40px;
}

.create-panel > summary {
  cursor: pointer;
  list-style: none;
}

.create-panel > summary::-webkit-details-marker {
  display: none;
}

.create-panel > summary > svg {
  color: var(--cobalt);
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
.list-panel .panel-head {
  margin-bottom: 24px;
}

.memory-form {
  display: grid;
  gap: 18px;
  padding-top: 4px;
}

.memory-form label,
.filters label {
  display: grid;
  gap: var(--s-1);
  color: var(--text-3);
  font-size: var(--fs-1);
}

.memory-form textarea,
.memory-form select,
.filters select {
  width: 100%;
  border: 0;
  border-bottom: 1px solid var(--line-2);
  border-radius: 0;
  background: transparent;
  color: var(--text-1);
  font: inherit;
}

.memory-form select,
.filters select {
  min-height: 40px;
  padding: 0 var(--s-3);
}

.memory-form textarea {
  min-height: 90px;
  border: 1px solid var(--line-1);
  resize: vertical;
  padding: var(--s-3);
}

.memory-form textarea:focus,
.memory-form select:focus,
.filters select:focus {
  border-color: var(--cobalt);
  outline: none;
}

.filters {
  gap: var(--s-3);
}

.filter-summary {
  --filter-summary-accent: var(--cobalt);
  --filter-summary-button-border: var(--line-2);
  --filter-summary-button-bg: transparent;
  --filter-summary-button-color: var(--text-1);
  --filter-summary-button-hover-border: var(--line-3);
  --filter-summary-button-hover-bg: var(--surface-2);
  margin: -8px 0 16px;
}

.memory-list {
  display: grid;
  gap: 0;
}

.memory-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: var(--s-3);
  align-items: center;
  min-height: 88px;
  padding: 17px 0;
  border-top: 1px solid var(--line-1);
  border-radius: 0;
  background: transparent;
}

.memory-row:last-child {
  border-bottom: 1px solid var(--line-1);
}

.memory-row.confirmed {
  border-top-color: var(--line-1);
}

.memory-row.archived {
  opacity: 0.58;
}

.memory-main {
  min-width: 0;
}

.memory-main strong,
.memory-main p {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.memory-main strong {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 520;
}

.memory-main p {
  margin: var(--s-1) 0 var(--s-2);
  color: var(--text-2);
  white-space: nowrap;
}

.memory-meta {
  flex-wrap: wrap;
  gap: var(--s-2);
  font-size: var(--fs-1);
}

.memory-meta span,
.status-dot {
  border-radius: 0;
}

.memory-meta span {
  padding-right: var(--s-2);
  background: transparent;
}

.status-dot {
  width: 3px;
  height: 36px;
  background: var(--yellow);
  box-shadow: none;
}

.status-dot.confirmed {
  background: var(--accent);
}

.status-dot.archived {
  background: var(--text-5);
}

.memory-actions {
  justify-content: flex-end;
  gap: var(--s-2);
  flex-wrap: wrap;
}

.memory-actions button {
  min-height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0 var(--s-3);
  font-size: var(--fs-1);
  border-color: transparent;
}

.memory-actions button:first-child {
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
  .memories-view {
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
    padding: 24px 0;
    border-right: 0;
    border-bottom: 1px solid var(--line-1);
  }

  .list-panel {
    padding: 32px 0 0;
  }

  .memory-row {
    align-items: stretch;
  }

  .topbar,
  .panel-head {
    align-items: center;
  }

  .memory-row {
    grid-template-columns: 1fr;
  }

  .status-dot {
    display: none;
  }

  .filters {
    flex-direction: column;
  }

  .memory-actions {
    justify-content: flex-start;
  }
}
</style>
