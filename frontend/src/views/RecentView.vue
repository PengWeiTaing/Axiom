<script setup lang="ts">
/*
 * RecentView — Vue 主线近况页。
 *
 * 第一阶段只迁移只读状态面板，避免继续依赖旧 vanilla JS 驾驶舱。
 */

import { computed, onMounted, ref } from 'vue';
import { getOverview, listLearningBoards, markProcessingPending, markProcessingReady } from '@/api/endpoints';
import type {
  ArtifactSummary,
  Item,
  LearningBoardSummary,
  OverviewPayload,
  ProcessingBacklogGroup,
} from '@/api/types';
import { ApiError } from '@/api/client';
import { formatRelative } from '@/composables/useRelativeTime';
import { typeAccent } from '@/composables/useTypeAccent';
import ItemDrawer from '@/components/ItemDrawer.vue';

const overview = ref<OverviewPayload | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);
const selectedItemId = ref<number | null>(null);
const actionBusyId = ref<number | null>(null);
const boards = ref<LearningBoardSummary[]>([]);
const boardError = ref<string | null>(null);

const stats = computed(() => overview.value?.stats ?? null);
const backlog = computed(() => overview.value?.processing_backlog ?? null);
const recentItems = computed(() => overview.value?.recent.items ?? []);
const recentBoards = computed(() => boards.value.slice(0, 3));
const totalBoardWidgets = computed(() => boards.value.reduce((total, board) => total + board.widget_count, 0));

const metricCards = computed(() => {
  const s = stats.value;
  if (!s) return [];
  return [
    { label: '总记录', value: s.total, hint: `连续 ${s.streak} 天` },
    { label: '待处理', value: s.by_processing_state.pending ?? 0, hint: `${s.by_processing_state.ready ?? 0} 已就绪` },
    { label: '记忆', value: s.memory_confirmed, hint: `${s.memory_candidate} 待确认` },
    { label: '任务', value: s.task_todo, hint: `${s.task_done} 已完成` },
  ];
});

const artifactCards = computed(() => {
  const latest = overview.value?.artifacts.latest;
  if (!latest) return [];
  return [
    { label: '日报', artifact: latest.review.daily },
    { label: '周报', artifact: latest.review.weekly },
    { label: 'Inbox', artifact: latest.inbox },
    { label: '状态快照', artifact: latest['system-status'] },
    { label: '音频转写', artifact: latest['audio-transcripts'] },
    { label: '图片描述', artifact: latest['image-descriptions'] },
  ].filter((entry) => entry.artifact);
});

async function loadOverview() {
  loading.value = true;
  error.value = null;
  boardError.value = null;
  try {
    const [overviewPayload, boardPayload] = await Promise.all([
      getOverview({ recent_limit: 8, preview_chars: 180 }),
      listLearningBoards(),
    ]);
    overview.value = overviewPayload;
    boards.value = boardPayload.boards;
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '近况加载失败';
  } finally {
    loading.value = false;
  }
}

function itemTitle(item: Item): string {
  return compactText(item.content)
    || compactText(item.derived_text)
    || compactText(item.transcript_text)
    || item.original_name
    || `#${item.id}`;
}

function compactText(value: string | null | undefined, limit = 84): string {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  return text.length > limit ? `${text.slice(0, limit - 1)}…` : text;
}

function typeLabel(type: Item['type']): string {
  const labels: Record<Item['type'], string> = {
    text: '文本',
    image: '图片',
    document: '文档',
    audio: '音频',
  };
  return labels[type] ?? type;
}

function groupPreview(group: ProcessingBacklogGroup): string {
  const first = group.items[0] || group.next_item;
  if (!first) return group.description;
  return itemTitle(first);
}

function groupActionItem(group: ProcessingBacklogGroup): Item | null {
  return group.next_item || group.items[0] || null;
}

function processingLabel(item: Item): string {
  return item.processing_override === 'ready' ? '已就绪' : '待处理';
}

function artifactTitle(artifact: ArtifactSummary | null): string {
  if (!artifact) return '';
  return artifact.report_date || artifact.generated_name || artifact.relative_path;
}

function boardStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    ready: '就绪',
    draft: '草稿',
    archived: '归档',
  };
  return labels[status] ?? status;
}

function openBoard(board?: LearningBoardSummary) {
  if (board) {
    localStorage.setItem('axiom_board_recent', board.id);
    window.location.href = `/board/${board.id}`;
    return;
  }
  window.location.href = '/board';
}

function onChanged(options?: { nextItemId?: number }) {
  selectedItemId.value = options?.nextItemId ?? null;
  loadOverview();
}

function openBacklogItem(group: ProcessingBacklogGroup) {
  const item = groupActionItem(group);
  if (!item) return;
  selectedItemId.value = item.id;
}

async function markReadyFromGroup(group: ProcessingBacklogGroup) {
  const item = groupActionItem(group);
  if (!item || actionBusyId.value) return;
  actionBusyId.value = item.id;
  error.value = null;
  try {
    await markProcessingReady([item.id]);
    await loadOverview();
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '标记已就绪失败';
  } finally {
    actionBusyId.value = null;
  }
}

async function markItemPending(item: Item) {
  if (actionBusyId.value) return;
  actionBusyId.value = item.id;
  error.value = null;
  try {
    await markProcessingPending([item.id]);
    await loadOverview();
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '退回待处理失败';
  } finally {
    actionBusyId.value = null;
  }
}

onMounted(loadOverview);
</script>

<template>
  <main class="recent-view">
    <header class="topbar">
      <div>
        <p class="eyebrow">Recent</p>
        <h1>近况</h1>
      </div>
      <button class="refresh-btn" type="button" :disabled="loading" @click="loadOverview">
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M13 8a5 5 0 1 1-1.46-3.54" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
          <path d="M13 3.2v3.2h-3.2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>{{ loading ? '刷新中' : '刷新' }}</span>
      </button>
    </header>

    <div v-if="error" class="error-row">
      <span>{{ error }}</span>
      <button type="button" @click="loadOverview">重试</button>
    </div>

    <section class="metrics" aria-label="系统指标">
      <article v-for="card in metricCards" :key="card.label" class="metric-card">
        <span>{{ card.label }}</span>
        <strong>{{ card.value }}</strong>
        <small>{{ card.hint }}</small>
      </article>
      <article v-if="!metricCards.length" class="metric-card muted-card">
        <span>状态</span>
        <strong>{{ loading ? '…' : '无数据' }}</strong>
        <small>等待 overview 返回</small>
      </article>
    </section>

    <section class="content-grid">
      <div class="panel backlog-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Backlog</p>
            <h2>处理积压</h2>
          </div>
          <strong>{{ backlog?.total ?? 0 }}</strong>
        </div>

        <div v-if="backlog && backlog.groups.length" class="backlog-list">
          <article v-for="group in backlog.groups" :key="group.type" class="backlog-row">
            <div>
              <div class="row-title">
                <span class="type-dot" :style="{ background: typeAccent(group.type) }" />
                <strong>{{ group.title }}</strong>
              </div>
              <p>{{ groupPreview(group) }}</p>
            </div>
            <span class="count-pill">{{ group.count }}</span>
            <div class="row-actions">
              <button
                type="button"
                :disabled="!groupActionItem(group)"
                @click="openBacklogItem(group)"
              >
                打开
              </button>
              <button
                type="button"
                :disabled="!groupActionItem(group) || actionBusyId === groupActionItem(group)?.id"
                @click="markReadyFromGroup(group)"
              >
                {{ actionBusyId === groupActionItem(group)?.id ? '处理中' : '标记就绪' }}
              </button>
            </div>
          </article>
        </div>
        <p v-else class="empty-line">当前没有待处理项</p>
      </div>

      <div class="panel artifacts-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Artifacts</p>
            <h2>自动化产物</h2>
          </div>
          <strong>{{ overview?.artifacts.total ?? 0 }}</strong>
        </div>

        <div v-if="artifactCards.length" class="artifact-list">
          <article v-for="entry in artifactCards" :key="entry.label" class="artifact-row">
            <span>{{ entry.label }}</span>
            <div>
              <strong>{{ artifactTitle(entry.artifact) }}</strong>
              <p>{{ compactText(entry.artifact?.preview, 96) || '无预览' }}</p>
            </div>
          </article>
        </div>
        <p v-else class="empty-line">暂无自动化产物</p>
      </div>
    </section>

    <section class="panel board-panel">
      <div class="panel-head">
        <div>
          <p class="eyebrow">Learning Board</p>
          <h2>学习白板</h2>
        </div>
        <div class="board-summary">
          <strong>{{ boards.length }}</strong>
          <span>{{ totalBoardWidgets }} widgets</span>
        </div>
      </div>

      <div class="board-layout">
        <button class="board-launch" type="button" @click="openBoard()">
          <span>打开白板工作区</span>
          <small>进入 /board 的 tldraw 画布</small>
        </button>

        <div v-if="recentBoards.length" class="board-list">
          <button
            v-for="board in recentBoards"
            :key="board.id"
            class="board-row"
            type="button"
            @click="openBoard(board)"
          >
            <span>
              <strong>{{ board.title }}</strong>
              <small>{{ boardStatusLabel(board.status) }} · {{ board.widget_count }} widgets · {{ formatRelative(board.created_at) }}</small>
            </span>
            <span class="board-arrow">打开</span>
          </button>
        </div>
        <p v-else class="empty-line">暂无白板，打开工作区后可创建第一块学习白板</p>
      </div>
      <p v-if="boardError" class="board-error">{{ boardError }}</p>
    </section>

    <section class="panel recent-panel">
      <div class="panel-head">
        <div>
          <p class="eyebrow">Timeline</p>
          <h2>最近记录</h2>
        </div>
        <span class="updated-at" v-if="overview">
          {{ formatRelative(overview.generated_at) }}
        </span>
      </div>

      <div v-if="recentItems.length" class="recent-list">
        <article
          v-for="item in recentItems"
          :key="item.id"
          class="recent-row"
        >
          <button type="button" class="recent-main" @click="selectedItemId = item.id">
            <span class="type-dot" :style="{ background: typeAccent(item.type) }" />
            <div>
              <strong>{{ itemTitle(item) }}</strong>
              <small>{{ typeLabel(item.type) }} · {{ item.source || 'unknown' }} · {{ formatRelative(item.created_at) }}</small>
            </div>
          </button>
          <div class="recent-actions">
            <span class="state-pill" :class="{ ready: item.processing_override === 'ready' }">
              {{ processingLabel(item) }}
            </span>
            <button
              v-if="item.processing_override === 'ready'"
              type="button"
              :disabled="actionBusyId === item.id"
              @click="markItemPending(item)"
            >
              {{ actionBusyId === item.id ? '处理中' : '退回待处理' }}
            </button>
          </div>
        </article>
      </div>
      <p v-else class="empty-line">暂无记录</p>
    </section>

    <ItemDrawer
      :item-id="selectedItemId"
      @close="selectedItemId = null"
      @changed="onChanged"
    />
  </main>
</template>

<style scoped>
.recent-view {
  width: 100%;
  max-width: var(--content-wide);
  margin: 0 auto;
  padding: var(--s-6) var(--s-4) 120px;
  flex: 1;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-4);
  margin-bottom: var(--s-5);
}

h1,
h2 {
  color: var(--text-1);
  font-weight: 560;
  line-height: var(--lh-tight);
}

h1 {
  margin-top: var(--s-1);
  font-size: var(--fs-7);
}

h2 {
  margin-top: var(--s-1);
  font-size: var(--fs-5);
}

.refresh-btn,
.error-row button {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  min-height: 34px;
  padding: 0 var(--s-3);
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-2);
  color: var(--text-2);
  transition: border-color var(--t-fast) var(--ease), background var(--t-fast) var(--ease);
}

.refresh-btn:hover,
.error-row button:hover {
  border-color: var(--line-2);
  background: var(--surface-3);
}

.refresh-btn:disabled {
  cursor: wait;
  color: var(--text-4);
}

.error-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-3);
  margin-bottom: var(--s-4);
  padding: var(--s-3);
  border: 1px solid rgba(232, 120, 120, 0.22);
  border-radius: var(--r-2);
  color: var(--error);
  background: rgba(232, 120, 120, 0.06);
}

.metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--s-3);
  margin-bottom: var(--s-4);
}

.metric-card,
.panel {
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: rgba(13, 17, 22, 0.78);
  box-shadow: var(--shadow-1);
}

.metric-card {
  min-height: 96px;
  padding: var(--s-4);
}

.metric-card span,
.metric-card small,
.empty-line,
.artifact-row p,
.backlog-row p,
.recent-row small,
.updated-at {
  color: var(--text-3);
  font-size: var(--fs-2);
}

.metric-card strong {
  display: block;
  margin: var(--s-2) 0 var(--s-1);
  color: var(--text-1);
  font-size: 26px;
  line-height: 1;
  font-weight: 580;
}

.muted-card strong {
  color: var(--text-3);
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--s-4);
  margin-bottom: var(--s-4);
}

.panel {
  min-width: 0;
  padding: var(--s-4);
}

.panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--s-4);
  margin-bottom: var(--s-4);
}

.panel-head > strong {
  color: var(--accent-bright);
  font-family: var(--font-mono);
  font-size: var(--fs-6);
  font-weight: 520;
}

.backlog-list,
.artifact-list,
.recent-list {
  display: grid;
  gap: var(--s-2);
}

.backlog-row,
.artifact-row,
.recent-row {
  min-width: 0;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-1);
}

.backlog-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--s-3);
  align-items: center;
  padding: var(--s-3);
}

.row-title,
.recent-main {
  display: flex;
  align-items: center;
  gap: var(--s-2);
}

.row-title strong,
.recent-main strong,
.artifact-row strong {
  color: var(--text-1);
  font-size: var(--fs-3);
  font-weight: 520;
}

.backlog-row p,
.artifact-row p {
  margin-top: var(--s-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.type-dot {
  width: 7px;
  height: 7px;
  flex: 0 0 auto;
  border-radius: 50%;
  box-shadow: 0 0 10px currentColor;
}

.count-pill {
  min-width: 32px;
  padding: 2px var(--s-2);
  border-radius: var(--r-pill);
  color: var(--text-2);
  background: var(--surface-3);
  text-align: center;
  font-family: var(--font-mono);
  font-size: var(--fs-2);
}

.row-actions {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
}

.row-actions button,
.recent-actions button {
  min-height: 28px;
  padding: 0 var(--s-3);
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-2);
  color: var(--text-3);
  font-size: var(--fs-2);
  transition: border-color var(--t-fast) var(--ease), background var(--t-fast) var(--ease), color var(--t-fast) var(--ease);
}

.row-actions button:hover,
.recent-actions button:hover {
  border-color: var(--line-2);
  background: var(--surface-3);
  color: var(--text-1);
}

.row-actions button:disabled,
.recent-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.artifact-row {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: var(--s-3);
  padding: var(--s-3);
}

.artifact-row > span {
  color: var(--text-4);
  font-size: var(--fs-2);
}

.recent-panel {
  margin-bottom: var(--s-4);
}

.board-panel {
  margin-bottom: var(--s-4);
}

.board-summary {
  display: grid;
  justify-items: end;
  gap: 2px;
  color: var(--text-3);
  font-size: var(--fs-2);
}

.board-summary strong {
  color: var(--accent-bright);
  font-family: var(--font-mono);
  font-size: var(--fs-6);
  font-weight: 520;
  line-height: 1;
}

.board-layout {
  display: grid;
  grid-template-columns: minmax(180px, 240px) minmax(0, 1fr);
  gap: var(--s-3);
  align-items: stretch;
}

.board-launch,
.board-row {
  min-width: 0;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-1);
  color: var(--text-2);
  text-align: left;
  transition: border-color var(--t-fast) var(--ease), background var(--t-fast) var(--ease), color var(--t-fast) var(--ease);
}

.board-launch:hover,
.board-row:hover {
  border-color: rgba(110, 231, 208, 0.24);
  background: var(--surface-2);
  color: var(--text-1);
}

.board-launch {
  display: grid;
  align-content: center;
  gap: var(--s-2);
  min-height: 116px;
  padding: var(--s-4);
}

.board-launch span {
  color: var(--text-1);
  font-size: var(--fs-4);
  font-weight: 540;
}

.board-launch small,
.board-row small,
.board-error {
  color: var(--text-3);
  font-size: var(--fs-2);
}

.board-list {
  display: grid;
  gap: var(--s-2);
}

.board-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-3);
  min-height: 56px;
  padding: var(--s-3);
}

.board-row span:first-child {
  min-width: 0;
}

.board-row strong,
.board-row small {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.board-row strong {
  color: var(--text-1);
  font-size: var(--fs-3);
  font-weight: 520;
}

.board-arrow {
  flex: 0 0 auto;
  color: var(--accent-bright);
  font-size: var(--fs-2);
}

.board-error {
  margin-top: var(--s-2);
}

.recent-row {
  width: 100%;
  padding: var(--s-3);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--s-3);
  align-items: center;
  transition: border-color var(--t-fast) var(--ease), background var(--t-fast) var(--ease);
}

.recent-row:hover {
  border-color: var(--line-2);
  background: var(--surface-2);
}

.recent-main {
  min-width: 0;
  text-align: left;
}

.recent-main > div {
  min-width: 0;
}

.recent-main strong,
.recent-main small {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent-actions {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--s-2);
}

.state-pill {
  min-width: 52px;
  padding: 2px var(--s-2);
  border: 1px solid var(--line-1);
  border-radius: var(--r-pill);
  color: var(--text-4);
  text-align: center;
  font-size: var(--fs-2);
}

.state-pill.ready {
  border-color: rgba(110, 231, 208, 0.18);
  color: var(--accent-bright);
  background: var(--accent-glow);
}

.empty-line {
  padding: var(--s-3) 0 var(--s-1);
}

@media (max-width: 820px) {
  .recent-view {
    padding: var(--s-4) var(--s-3) 120px;
  }

  .metrics,
  .content-grid,
  .board-layout {
    grid-template-columns: 1fr;
  }

  .topbar {
    align-items: flex-start;
  }

  .recent-row {
    grid-template-columns: 1fr;
  }

  .recent-actions {
    justify-content: flex-start;
    padding-left: calc(7px + var(--s-2));
  }
}
</style>
