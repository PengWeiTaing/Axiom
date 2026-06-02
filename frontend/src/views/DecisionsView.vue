<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ApiError } from '@/api/client';
import { createDecision, listDecisions, reviewDecision } from '@/api/endpoints';
import type { Decision, DecisionList, DecisionStatus } from '@/api/types';
import { formatRelative } from '@/composables/useRelativeTime';

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

onMounted(refreshAll);
</script>

<template>
  <main class="decisions-view">
    <header class="topbar">
      <div>
        <p class="eyebrow">Decisions</p>
        <h1>决策台</h1>
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

    <section class="metrics" aria-label="决策指标">
      <article>
        <span>总量</span>
        <strong>{{ pendingTotal + reviewedTotal }}</strong>
        <small>全部决策记录</small>
      </article>
      <article :class="{ urgent: pendingTotal > 0 }">
        <span>待回顾</span>
        <strong>{{ pendingTotal }}</strong>
        <small>需要补实际结果</small>
      </article>
      <article>
        <span>已回顾</span>
        <strong>{{ reviewedTotal }}</strong>
        <small>可沉淀为经验</small>
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
            {{ saving ? '添加中' : '添加决策' }}
          </button>
        </form>
      </div>

      <section class="panel list-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Decision List</p>
            <h2>决策列表</h2>
          </div>
          <div class="filters">
            <label>
              <span>状态</span>
              <select v-model="statusFilter" aria-label="决策状态筛选" @change="loadDecisionList(true)">
                <option value="">全部</option>
                <option value="pending">待回顾</option>
                <option value="reviewed">已回顾</option>
              </select>
            </label>
          </div>
        </div>

        <div v-if="decisions.length" class="decision-list">
          <article v-for="item in decisions" :key="item.id" class="decision-row" :class="item.status">
            <div class="status-dot" :class="item.status" aria-hidden="true" />
            <div class="decision-main">
              <strong>{{ item.title }}</strong>
              <p>{{ decisionSummary(item) }}</p>
              <p class="context-line">{{ contextSummary(item) }}</p>
              <div class="decision-meta">
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
                >标记已回顾</button>
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
  </main>
</template>

<style scoped>
.decisions-view {
  min-height: 100vh;
  padding: var(--s-8) var(--s-6) calc(var(--s-8) + 72px);
  color: var(--text-1);
  background:
    radial-gradient(circle at 12% 0%, rgba(205, 160, 101, 0.10), transparent 32%),
    linear-gradient(180deg, rgba(12, 16, 24, 0.96), rgba(9, 12, 18, 1));
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
.review-box button,
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
  background: rgba(205, 160, 101, 0.16);
  border-color: rgba(205, 160, 101, 0.34);
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
.decision-meta {
  color: var(--text-3);
}

.metrics strong {
  display: block;
  margin: var(--s-1) 0;
  font-size: 1.9rem;
}

.metrics .urgent strong {
  color: #d3b36f;
}

.workspace-grid {
  display: grid;
  grid-template-columns: minmax(280px, 0.72fr) minmax(440px, 1.28fr);
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

.decision-form {
  display: grid;
  gap: var(--s-3);
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
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 8px;
  background: rgba(7, 10, 15, 0.64);
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
  resize: vertical;
  padding: var(--s-3);
}

.decision-list {
  display: grid;
  gap: var(--s-3);
}

.decision-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--s-3);
  align-items: start;
  padding: var(--s-3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: rgba(8, 11, 17, 0.46);
}

.decision-row.reviewed {
  opacity: 0.76;
  border-color: rgba(109, 181, 168, 0.18);
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
.status-dot {
  border-radius: 999px;
}

.decision-meta span {
  padding: 2px var(--s-2);
  background: rgba(255, 255, 255, 0.055);
}

.status-dot {
  width: 8px;
  height: 8px;
  margin-top: 8px;
  background: #d3b36f;
  box-shadow: 0 0 14px rgba(211, 179, 111, 0.34);
}

.status-dot.reviewed {
  background: #6db5a8;
  box-shadow: 0 0 14px rgba(109, 181, 168, 0.28);
}

.review-box {
  align-items: stretch;
  gap: var(--s-2);
  margin-top: var(--s-3);
}

.review-box textarea {
  min-height: 56px;
}

.review-box button {
  min-width: 112px;
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
  .decisions-view {
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
  .decision-row,
  .review-box {
    align-items: stretch;
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
