<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ApiError } from '@/api/client';
import ItemDrawer from '@/components/ItemDrawer.vue';
import ObjectDrawer from '@/components/ObjectDrawer.vue';
import {
  archiveMemory,
  confirmMemory,
  createMemory,
  listMemories,
  memoriesStats,
} from '@/api/endpoints';
import type {
  Memory,
  MemoryCategory,
  MemoryList,
  MemoryStatsPayload,
  MemoryStatus,
  ObjectTarget,
} from '@/api/types';
import { formatRelative } from '@/composables/useRelativeTime';

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
  const url = new URL(window.location.href);
  url.searchParams.set('mode', 'memories');
  if (categoryFilter.value) url.searchParams.set('category', categoryFilter.value);
  else url.searchParams.delete('category');
  if (statusFilter.value) url.searchParams.set('status', statusFilter.value);
  else url.searchParams.delete('status');
  window.history.replaceState(null, '', `${url.pathname}?${url.searchParams.toString()}`);
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
  const params = new URLSearchParams(window.location.search);
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
        <p class="eyebrow">Memories</p>
        <h1>记忆库</h1>
      </div>
      <button class="refresh-btn" type="button" :disabled="loading" @click="refreshAll">
        <span>{{ loading ? '刷新中' : '刷新' }}</span>
      </button>
    </header>

    <div v-if="error" class="notice error-row">
      <span>{{ error }}</span>
      <button type="button" @click="refreshAll">重试</button>
    </div>
    <div v-else-if="feedback" class="notice feedback-row">
      <span>{{ feedback }}</span>
    </div>

    <section class="metrics" aria-label="记忆指标">
      <article>
        <span>总量</span>
        <strong>{{ stats?.total ?? total }}</strong>
        <small>全部长期记忆</small>
      </article>
      <article>
        <span>候选</span>
        <strong>{{ candidateCount }}</strong>
        <small>需要人工确认</small>
      </article>
      <article>
        <span>已确认</span>
        <strong>{{ confirmedCount }}</strong>
        <small>{{ archivedCount }} 已归档</small>
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
            {{ saving ? '添加中' : '添加记忆' }}
          </button>
        </form>
      </div>

      <section class="panel list-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Memory List</p>
            <h2>记忆列表</h2>
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
              <button type="button" @click="openMemoryDetail(memory.id)">详情</button>
              <button
                v-if="memory.status !== 'confirmed'"
                type="button"
                :disabled="busyMemoryId === memory.id"
                @click="updateMemoryStatus(memory, 'confirm')"
              >确认</button>
              <button
                v-if="memory.status !== 'archived'"
                type="button"
                :disabled="busyMemoryId === memory.id"
                @click="updateMemoryStatus(memory, 'archive')"
              >归档</button>
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
  min-height: 100vh;
  padding: var(--s-8) var(--s-6) calc(var(--s-8) + 72px);
  color: var(--text-1);
  background:
    radial-gradient(circle at 12% 0%, rgba(141, 164, 198, 0.10), transparent 32%),
    linear-gradient(180deg, rgba(12, 16, 24, 0.96), rgba(9, 12, 18, 1));
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

.eyebrow {
  margin: 0 0 var(--s-1);
  color: var(--text-3);
  font-size: var(--fs-1);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.refresh-btn,
.primary-action,
.memory-actions button,
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
  background: rgba(141, 164, 198, 0.16);
  border-color: rgba(141, 164, 198, 0.34);
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
.memory-meta {
  color: var(--text-3);
}

.metrics strong {
  display: block;
  margin: var(--s-1) 0;
  font-size: 1.9rem;
}

.workspace-grid {
  display: grid;
  grid-template-columns: minmax(280px, 0.74fr) minmax(420px, 1.26fr);
  gap: var(--s-4);
}

.panel {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.045);
  backdrop-filter: blur(18px);
}

.create-panel,
.list-panel {
  padding: var(--s-5);
}

.panel-head {
  justify-content: space-between;
  gap: var(--s-4);
  margin-bottom: var(--s-4);
}

.memory-form {
  display: grid;
  gap: var(--s-3);
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
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 8px;
  background: rgba(7, 10, 15, 0.64);
  color: var(--text-1);
  font: inherit;
}

.memory-form select,
.filters select {
  min-height: 40px;
  padding: 0 var(--s-3);
}

.memory-form textarea {
  resize: vertical;
  padding: var(--s-3);
}

.filters {
  gap: var(--s-3);
}

.filter-summary {
  --filter-summary-accent: rgb(141, 164, 198);
  --filter-summary-button-border: rgba(255, 255, 255, 0.12);
  --filter-summary-button-bg: rgba(255, 255, 255, 0.06);
  --filter-summary-button-color: var(--text-1);
  --filter-summary-button-hover-border: rgba(255, 255, 255, 0.22);
  --filter-summary-button-hover-bg: rgba(255, 255, 255, 0.10);
  margin: calc(-1 * var(--s-2)) 0 var(--s-4);
}

.memory-list {
  display: grid;
  gap: var(--s-3);
}

.memory-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: var(--s-3);
  align-items: center;
  padding: var(--s-3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: rgba(8, 11, 17, 0.46);
}

.memory-row.confirmed {
  border-color: rgba(109, 181, 168, 0.20);
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
  border-radius: 999px;
}

.memory-meta span {
  padding: 2px var(--s-2);
  background: rgba(255, 255, 255, 0.055);
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #d3b36f;
  box-shadow: 0 0 14px rgba(211, 179, 111, 0.34);
}

.status-dot.confirmed {
  background: #6db5a8;
  box-shadow: 0 0 14px rgba(109, 181, 168, 0.34);
}

.status-dot.archived {
  background: #8f7f7c;
  box-shadow: none;
}

.memory-actions {
  justify-content: flex-end;
  gap: var(--s-2);
  flex-wrap: wrap;
}

.memory-actions button {
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
  .memories-view {
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
  .memory-row {
    align-items: stretch;
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
}
</style>
