<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ArrowUpRight, Check, Plus, RefreshCw } from '@lucide/vue';
import { ApiError } from '@/api/client';
import { createDecision, listDecisions, reviewDecision } from '@/api/knowledge';
import ObjectDrawer from '@/components/ObjectDrawer.vue';
import type { Decision, DecisionList, DecisionStatus, ObjectTarget } from '@/api/types';
import { formatRelative } from '@/composables/useRelativeTime';
import { currentRouteParams, replaceRouteQuery } from '@/composables/useRouteQuery';

const PAGE_SIZE = 12;

const decisions = ref<Decision[]>([]);
const page = ref(1);
const totalPages = ref(1);
const total = ref(0);
const pendingTotal = ref(0);
const reviewedTotal = ref(0);
const loading = ref(false);
const saving = ref(false);
const busyDecisionId = ref<number | null>(null);
const selectedObject = ref<ObjectTarget | null>(null);
const error = ref<string | null>(null);
const feedback = ref<string | null>(null);
const statusFilter = ref<DecisionStatus | ''>('');
const reviewDrafts = ref<Record<number, string>>({});
const draft = ref({
  title: '',
  decision: '',
  context: '',
  expected_outcome: '',
});

const canLoadMore = computed(() => page.value < totalPages.value);
const decisionFiltersActive = computed(() => Boolean(statusFilter.value));
const activeDecisionFilterChips = computed(() => {
  const chips: string[] = [];
  if (statusFilter.value) chips.push(statusLabel(statusFilter.value));
  return chips;
});

async function loadMetrics() {
  const [pending, reviewed] = await Promise.all([
    listDecisions({ status: 'pending', page: 1, page_size: 1 }),
    listDecisions({ status: 'reviewed', page: 1, page_size: 1 }),
  ]);
  pendingTotal.value = pending.total || 0;
  reviewedTotal.value = reviewed.total || 0;
}

async function loadDecisionList(reset = true) {
  loading.value = true;
  error.value = null;
  if (reset) syncDecisionListUrl();
  try {
    const nextPage = reset ? 1 : page.value + 1;
    const payload: DecisionList = await listDecisions({
      status: statusFilter.value,
      page: nextPage,
      page_size: PAGE_SIZE,
    });
    page.value = payload.page;
    totalPages.value = payload.total_pages || 1;
    total.value = payload.total || 0;
    decisions.value = reset ? payload.decisions : [...decisions.value, ...payload.decisions];
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '决策列表加载失败';
  } finally {
    loading.value = false;
  }
}

async function refreshAll() {
  await Promise.all([loadMetrics(), loadDecisionList(true)]);
}

function applyDecisionFilters() {
  loadDecisionList(true);
}

function resetDecisionFilters() {
  statusFilter.value = '';
  loadDecisionList(true);
}

function syncDecisionListUrl() {
  replaceRouteQuery('decisions', { status: statusFilter.value });
}

async function submitDecision() {
  const title = draft.value.title.trim();
  const decision = draft.value.decision.trim();
  if (!title || !decision || saving.value) return;
  saving.value = true;
  error.value = null;
  feedback.value = null;
  try {
    await createDecision({
      title,
      decision,
      context: draft.value.context.trim() || undefined,
      expected_outcome: draft.value.expected_outcome.trim() || undefined,
    });
    draft.value = { title: '', decision: '', context: '', expected_outcome: '' };
    feedback.value = '决策已添加，等待回顾';
    await refreshAll();
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '决策添加失败';
  } finally {
    saving.value = false;
  }
}

async function submitReview(decision: Decision) {
  const actualOutcome = (reviewDrafts.value[decision.id] || '').trim();
  if (!actualOutcome || busyDecisionId.value) return;
  busyDecisionId.value = decision.id;
  error.value = null;
  feedback.value = null;
  try {
    await reviewDecision(decision.id, actualOutcome);
    delete reviewDrafts.value[decision.id];
    feedback.value = '决策已回顾';
    await refreshAll();
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '决策回顾失败';
  } finally {
    busyDecisionId.value = null;
  }
}

function statusLabel(status: DecisionStatus): string {
  const labels: Record<DecisionStatus, string> = {
    pending: '待回顾',
    reviewed: '已回顾',
  };
  return labels[status];
}

function compactText(value: string | null | undefined, fallback: string): string {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text) return fallback;
  return text.length > 130 ? `${text.slice(0, 129)}...` : text;
}

function decisionSummary(decision: Decision): string {
  return compactText(decision.decision, '没有决策描述');
}

function contextSummary(decision: Decision): string {
  return compactText(decision.context || decision.expected_outcome, '没有背景或预期结果');
}

function openDecisionDetail(id: number) {
  selectedObject.value = { kind: 'decision', id };
}

onMounted(() => {
  const params = currentRouteParams();
  const initialStatus = params.get('status');
  if (initialStatus === 'pending' || initialStatus === 'reviewed') {
    statusFilter.value = initialStatus;
  }
  refreshAll();
});
</script>

<template>
  <main class="decisions-view">
    <header class="topbar">
      <div>
        <p class="eyebrow">06 / DECISION</p>
        <h1>决定索引</h1>
        <span>CONTEXT / CHOICE / EXPECTATION / OUTCOME</span>
      </div>
      <button class="refresh-btn" type="button" title="刷新决定" aria-label="刷新决定" :disabled="loading" @click="refreshAll">
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

    <section class="metrics" aria-label="决定计数">
      <article>
        <span>LEDGER</span>
        <strong>{{ pendingTotal + reviewedTotal }}</strong>
        <small>全部</small>
      </article>
      <article :class="{ urgent: pendingTotal > 0 }">
        <span>OPEN</span>
        <strong>{{ pendingTotal }}</strong>
        <small>待回顾</small>
      </article>
      <article>
        <span>REVIEWED</span>
        <strong>{{ reviewedTotal }}</strong>
        <small>已有结果</small>
      </article>
    </section>

    <section class="workspace-grid">
      <details class="panel create-panel">
        <summary class="panel-head">
          <div>
            <p class="eyebrow">NEW / 01</p>
            <h2>记下一次选择</h2>
          </div>
          <Plus :size="18" />
        </summary>

        <form class="decision-form" @submit.prevent="submitDecision">
          <label>
            <span>标题</span>
            <input
              v-model="draft.title"
              aria-label="决策标题"
              type="text"
              autocomplete="off"
              placeholder="这次选择是什么"
            />
          </label>
          <label>
            <span>决策</span>
            <textarea
              v-model="draft.decision"
              aria-label="决策内容"
              rows="4"
              placeholder="做了什么决定，暂时放弃了什么"
            />
          </label>
          <label>
            <span>背景</span>
            <textarea
              v-model="draft.context"
              aria-label="决策背景"
              rows="3"
              placeholder="当时的约束、证据和判断依据"
            />
          </label>
          <label>
            <span>预期结果</span>
            <textarea
              v-model="draft.expected_outcome"
              aria-label="预期结果"
              rows="3"
              placeholder="希望它带来什么变化"
            />
          </label>
          <button class="primary-action" type="submit" :disabled="saving || !draft.title.trim() || !draft.decision.trim()">
            <Plus :size="15" />
            <span>{{ saving ? '添加中' : '加入决定账册' }}</span>
          </button>
        </form>
      </details>

      <section class="panel list-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">ARCHIVE / 02</p>
            <h2>选择与结果</h2>
          </div>
          <div class="filters">
            <label>
              <span>状态</span>
              <select v-model="statusFilter" aria-label="决策状态筛选" @change="applyDecisionFilters">
                <option value="">全部</option>
                <option value="pending">待回顾</option>
                <option value="reviewed">已回顾</option>
              </select>
            </label>
          </div>
        </div>

        <div v-if="decisionFiltersActive" class="filter-summary" aria-label="当前决策筛选">
          <span v-for="chip in activeDecisionFilterChips" :key="chip">{{ chip }}</span>
          <button type="button" :disabled="loading" @click="resetDecisionFilters">重置筛选</button>
        </div>

        <div v-if="decisions.length" class="decision-list">
          <article v-for="item in decisions" :key="item.id" class="decision-row" :class="item.status">
            <div class="status-dot" :class="item.status" aria-hidden="true" />
            <div class="decision-main">
              <strong>{{ item.title }}</strong>
              <p>{{ decisionSummary(item) }}</p>
              <p class="context-line">{{ contextSummary(item) }}</p>
              <div class="decision-meta">
                <button type="button" title="打开详情" aria-label="打开决定详情" @click="openDecisionDetail(item.id)"><ArrowUpRight :size="14" /></button>
                <span>{{ statusLabel(item.status) }}</span>
                <span>{{ formatRelative(item.updated_at) }}</span>
                <span v-if="item.actual_outcome">结果：{{ compactText(item.actual_outcome, '') }}</span>
              </div>
              <div v-if="item.status === 'pending'" class="review-box">
                <textarea
                  v-model="reviewDrafts[item.id]"
                  aria-label="实际结果"
                  rows="2"
                  placeholder="实际发生了什么，是否符合预期"
                />
                <button
                  type="button"
                  :disabled="busyDecisionId === item.id || !String(reviewDrafts[item.id] || '').trim()"
                  @click="submitReview(item)"
                ><Check :size="14" /><span>标记已回顾</span></button>
              </div>
            </div>
          </article>
        </div>
        <p v-else class="empty-line">{{ loading ? '加载决策中...' : '暂无决策' }}</p>
        <button v-if="canLoadMore" class="load-more" type="button" :disabled="loading" @click="loadDecisionList(false)">
          {{ loading ? '加载中' : '加载更多' }}
        </button>
      </section>
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
.decisions-view {
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
.review-box,
.decision-meta,
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
  font-weight: 400;
  line-height: 1.18;
}

.topbar > div > span {
  display: block;
  margin-top: 12px;
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 8px;
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
.decision-meta button,
.review-box button,
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
  background: rgba(23, 26, 22, 0.045);
  border-color: var(--line-3);
}

.primary-action:hover:not(:disabled) {
  color: var(--surface-1);
  background: var(--violet);
  border-color: var(--violet);
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
.decision-meta {
  color: var(--text-3);
}

.metrics strong {
  grid-row: 1 / 3;
  color: var(--violet);
  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 400;
  line-height: 1;
}

.metrics .urgent strong {
  color: var(--focus);
}

.workspace-grid {
  display: grid;
  grid-template-columns: minmax(290px, 0.7fr) minmax(460px, 1.3fr);
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
  color: var(--violet);
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

.decision-form {
  display: grid;
  gap: 18px;
  padding-top: 4px;
}

.decision-form label,
.filters label {
  display: grid;
  gap: var(--s-1);
  color: var(--text-3);
  font-size: var(--fs-1);
}

.decision-form input,
.decision-form textarea,
.filters select,
.review-box textarea {
  width: 100%;
  border: 0;
  border-bottom: 1px solid var(--line-2);
  border-radius: 0;
  background: transparent;
  color: var(--text-1);
  font: inherit;
}

.decision-form input,
.filters select {
  min-height: 40px;
  padding: 0 var(--s-3);
}

.decision-form textarea,
.review-box textarea {
  border: 1px solid var(--line-1);
  resize: vertical;
  padding: var(--s-3);
}

.decision-form input:focus,
.decision-form textarea:focus,
.filters select:focus,
.review-box textarea:focus {
  border-color: var(--violet);
  outline: none;
}

.filter-summary {
  --filter-summary-accent: var(--violet);
  --filter-summary-button-border: var(--line-2);
  --filter-summary-button-bg: transparent;
  --filter-summary-button-color: var(--text-1);
  --filter-summary-button-hover-border: var(--line-3);
  --filter-summary-button-hover-bg: rgba(23, 26, 22, 0.04);
  margin: -8px 0 16px;
}

.decision-list {
  display: grid;
  gap: 0;
}

.decision-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--s-3);
  align-items: start;
  min-height: 104px;
  padding: 18px 0;
  border-top: 1px solid var(--line-1);
  border-radius: 0;
  background: transparent;
}

.decision-row:last-child {
  border-bottom: 1px solid var(--line-1);
}

.decision-row.reviewed {
  opacity: 0.76;
  border-top-color: var(--line-1);
}

.decision-main {
  min-width: 0;
}

.decision-main strong,
.decision-main p {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.decision-main strong {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 520;
}

.decision-main p {
  margin: var(--s-1) 0;
  color: var(--text-2);
  white-space: nowrap;
}

.decision-main .context-line {
  color: var(--text-3);
}

.decision-meta {
  flex-wrap: wrap;
  gap: var(--s-2);
  margin-top: var(--s-2);
  font-size: var(--fs-1);
}

.decision-meta span,
.decision-meta button,
.status-dot {
  border-radius: 0;
}

.decision-meta span,
.decision-meta button {
  padding: 2px var(--s-2) 2px 0;
  background: transparent;
}

.decision-meta button {
  width: 30px;
  min-height: 30px;
  display: grid;
  place-items: center;
  padding: 0;
  border-color: var(--line-1);
}

.status-dot {
  width: 3px;
  height: 38px;
  margin-top: 4px;
  background: var(--violet);
  box-shadow: none;
}

.status-dot.reviewed {
  background: var(--accent);
}

.review-box {
  align-items: stretch;
  gap: var(--s-2);
  margin-top: 16px;
  padding-left: 16px;
  border-left: 2px solid rgba(116, 93, 120, 0.34);
}

.review-box textarea {
  min-height: 56px;
}

.review-box button {
  min-width: 112px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 var(--s-3);
  font-size: var(--fs-1);
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
  .decisions-view {
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

  .decision-row,
  .review-box {
    align-items: stretch;
  }

  .topbar,
  .panel-head {
    align-items: center;
  }

  .decision-row {
    grid-template-columns: 1fr;
  }

  .review-box {
    flex-direction: column;
  }

  .status-dot {
    display: none;
  }
}
</style>
