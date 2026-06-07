<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { getArtifactContent, getAutomationJobs, getAutomationRuns, runAutomationJob } from '@/api/endpoints';
import type { AutomationJob, AutomationRun, AutomationRunListPayload, AutomationRunStatus } from '@/api/types';
import { ApiError } from '@/api/client';
import { formatRelative } from '@/composables/useRelativeTime';
import { currentRouteParams, replaceRouteQuery } from '@/composables/useRouteQuery';

const RUN_PAGE_SIZE = 8;

const jobs = ref<AutomationJob[]>([]);
const historyJobs = ref<AutomationJob[]>([]);
const runs = ref<AutomationRun[]>([]);
const runsPage = ref(1);
const runsTotalPages = ref(1);
const runsTotal = ref(0);
const loadingJobs = ref(false);
const loadingRuns = ref(false);
const runningJobId = ref<string | null>(null);
const error = ref<string | null>(null);
const feedback = ref<string | null>(null);
const runDate = ref('');
const filterJob = ref('');
const filterStatus = ref('');
const selectedRun = ref<AutomationRun | null>(null);
const artifactLoading = ref(false);
const artifactError = ref<string | null>(null);
const artifactContent = ref('');
const artifactForRunId = ref<number | null>(null);

const readyJobs = computed(() => jobs.value.filter((job) => job.ready).length);
const blockedJobs = computed(() => jobs.value.length - readyJobs.value);
const canLoadMore = computed(() => runsPage.value < runsTotalPages.value);
const runFiltersActive = computed(() => Boolean(filterJob.value || filterStatus.value));
const activeRunFilterChips = computed(() => {
  const chips: string[] = [];
  if (filterJob.value) chips.push(historyJobLabel(filterJob.value));
  if (filterStatus.value) chips.push(statusLabel(filterStatus.value));
  return chips;
});

async function loadJobs() {
  loadingJobs.value = true;
  error.value = null;
  try {
    const payload = await getAutomationJobs();
    jobs.value = payload.jobs || [];
    historyJobs.value = payload.history_jobs || payload.jobs || [];
    if (!runDate.value && jobs.value[0]?.default_date) {
      runDate.value = jobs.value[0].default_date;
    }
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '自动化任务加载失败';
  } finally {
    loadingJobs.value = false;
  }
}

async function loadRuns(reset = true) {
  loadingRuns.value = true;
  error.value = null;
  if (reset) syncRunListUrl();
  try {
    const nextPage = reset ? 1 : runsPage.value + 1;
    const payload: AutomationRunListPayload = await getAutomationRuns({
      page: nextPage,
      page_size: RUN_PAGE_SIZE,
      job: filterJob.value || undefined,
      status: filterStatus.value || undefined,
    });
    runsPage.value = payload.page;
    runsTotalPages.value = payload.total_pages || 1;
    runsTotal.value = payload.total || 0;
    runs.value = reset ? payload.items : [...runs.value, ...payload.items];
    if (reset) selectRun(payload.items[0] || null);
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '运行记录加载失败';
  } finally {
    loadingRuns.value = false;
  }
}

async function refreshAll() {
  await Promise.all([loadJobs(), loadRuns(true)]);
}

function applyRunFilters() {
  loadRuns(true);
}

function resetRunFilters() {
  filterJob.value = '';
  filterStatus.value = '';
  loadRuns(true);
}

function syncRunListUrl() {
  replaceRouteQuery('automation', {
    job: filterJob.value,
    status: filterStatus.value,
  });
}

async function runJob(job: AutomationJob) {
  if (!job.ready || runningJobId.value) return;
  runningJobId.value = job.id;
  error.value = null;
  feedback.value = null;
  try {
    const payload = await runAutomationJob(job.id, runDate.value || job.default_date);
    feedback.value = payload.run
      ? `${job.label} 已完成：${statusLabel(payload.run.status)}`
      : `${job.label} 已提交`;
    await Promise.all([loadJobs(), loadRuns(true)]);
    if (payload.run) selectRun(payload.run);
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '自动化运行失败';
  } finally {
    runningJobId.value = null;
  }
}

function rerun(run: AutomationRun) {
  const job = jobs.value.find((entry) => entry.id === run.job_id);
  if (!job) return;
  runDate.value = run.run_date;
  runJob(job);
}

function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    success: '成功',
    failed: '失败',
    skipped: '跳过',
    running: '运行中',
    timeout: '超时',
  };
  return labels[status] || status;
}

function isRunStatus(value: string | null): value is AutomationRunStatus {
  return value === 'success' || value === 'failed' || value === 'skipped' || value === 'running' || value === 'timeout';
}

function historyJobLabel(jobId: string): string {
  return historyJobs.value.find((job) => job.id === jobId)?.label || jobs.value.find((job) => job.id === jobId)?.label || jobId;
}

function runtimeLabel(job: AutomationJob): string {
  const labels: Record<string, string> = {
    local: '本地',
    mock: 'Mock',
    openai: 'AI',
    missing_key: '缺 key',
  };
  return labels[job.runtime_mode] || job.runtime_mode;
}

function durationLabel(ms: number | null): string {
  if (ms === null || ms === undefined) return '未知耗时';
  if (ms < 1000) return `${ms}ms`;
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  return `${Math.round(seconds / 60)}min`;
}

function previewRun(run: AutomationRun): string {
  const text = run.message || run.stderr_tail.join(' ') || run.stdout_tail.join(' ');
  const compact = text.replace(/\s+/g, ' ').trim();
  return compact ? (compact.length > 140 ? `${compact.slice(0, 139)}…` : compact) : '没有更多输出。';
}

function artifactTitle(run: AutomationRun): string {
  const artifact = run.artifact;
  if (!artifact) return '未生成产物';
  return artifact.report_date || artifact.generated_name || artifact.relative_path;
}

function resetArtifactPreview() {
  artifactLoading.value = false;
  artifactError.value = null;
  artifactContent.value = '';
  artifactForRunId.value = null;
}

function selectRun(run: AutomationRun | null) {
  selectedRun.value = run;
  resetArtifactPreview();
}

async function openArtifact(run: AutomationRun) {
  const fileUrl = run.artifact?.file_url;
  if (!fileUrl || artifactLoading.value) return;
  artifactLoading.value = true;
  artifactError.value = null;
  artifactContent.value = '';
  artifactForRunId.value = run.id;
  try {
    artifactContent.value = await getArtifactContent(fileUrl);
  } catch (err) {
    artifactError.value = err instanceof ApiError ? err.message : '产物读取失败';
  } finally {
    artifactLoading.value = false;
  }
}

onMounted(() => {
  const params = currentRouteParams();
  const initialJob = params.get('job');
  const initialStatus = params.get('status');
  if (initialJob) filterJob.value = initialJob;
  if (isRunStatus(initialStatus)) filterStatus.value = initialStatus;
  refreshAll();
});
</script>

<template>
  <main class="automation-view">
    <header class="topbar">
      <div>
        <p class="eyebrow">Automation</p>
        <h1>自动化中心</h1>
      </div>
      <button class="refresh-btn" type="button" :disabled="loadingJobs || loadingRuns" @click="refreshAll">
        <span>{{ loadingJobs || loadingRuns ? '刷新中' : '刷新' }}</span>
      </button>
    </header>

    <div v-if="error" class="notice error-row">
      <span>{{ error }}</span>
      <button type="button" @click="refreshAll">重试</button>
    </div>
    <div v-else-if="feedback" class="notice feedback-row">
      <span>{{ feedback }}</span>
    </div>

    <section class="control-strip">
      <label>
        <span>运行日期</span>
        <input v-model="runDate" type="date" />
      </label>
      <article>
        <span>可运行</span>
        <strong>{{ readyJobs }}</strong>
      </article>
      <article>
        <span>不可用</span>
        <strong>{{ blockedJobs }}</strong>
      </article>
      <article>
        <span>历史</span>
        <strong>{{ runsTotal }}</strong>
      </article>
    </section>

    <section class="workspace-grid">
      <div class="panel jobs-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Jobs</p>
            <h2>可执行任务</h2>
          </div>
          <small>{{ jobs.length }} 项</small>
        </div>

        <div v-if="jobs.length" class="job-list">
          <article v-for="job in jobs" :key="job.id" class="job-card" :class="{ blocked: !job.ready }">
            <div class="job-meta">
              <span>{{ job.artifact_group }}</span>
              <span>{{ runtimeLabel(job) }}</span>
              <span>{{ job.artifact_window }}</span>
            </div>
            <h3>{{ job.label }}</h3>
            <p>{{ job.description }}</p>
            <small>{{ job.availability_note }}</small>
            <button
              type="button"
              :disabled="!job.ready || Boolean(runningJobId)"
              @click="runJob(job)"
            >
              {{ runningJobId === job.id ? '运行中' : '运行' }}
            </button>
          </article>
        </div>
        <p v-else class="empty-line">{{ loadingJobs ? '加载任务中…' : '暂无可执行任务' }}</p>
      </div>

      <div class="panel runs-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Runs</p>
            <h2>运行记录</h2>
          </div>
        </div>

        <form class="filters" @submit.prevent="applyRunFilters">
          <select v-model="filterJob" aria-label="自动化任务筛选">
            <option value="">全部任务</option>
            <option v-for="job in historyJobs" :key="job.id" :value="job.id">{{ job.label }}</option>
          </select>
          <select v-model="filterStatus" aria-label="自动化状态筛选">
            <option value="">全部状态</option>
            <option value="success">成功</option>
            <option value="failed">失败</option>
            <option value="skipped">跳过</option>
            <option value="running">运行中</option>
            <option value="timeout">超时</option>
          </select>
          <button type="submit" :disabled="loadingRuns">筛选</button>
        </form>

        <div v-if="runFiltersActive" class="filter-summary" aria-label="当前自动化筛选">
          <span v-for="chip in activeRunFilterChips" :key="chip">{{ chip }}</span>
          <button type="button" :disabled="loadingRuns" @click="resetRunFilters">重置筛选</button>
        </div>

        <div v-if="runs.length" class="run-list">
          <button
            v-for="run in runs"
            :key="run.id"
            type="button"
            class="run-row"
            :class="{ active: selectedRun?.id === run.id }"
            @click="selectRun(run)"
          >
            <span class="status-dot" :data-status="run.status" />
            <div>
              <strong>{{ run.job_label }}</strong>
              <small>{{ statusLabel(run.status) }} · {{ run.run_date }} · {{ formatRelative(run.started_at) }}</small>
              <p>{{ previewRun(run) }}</p>
            </div>
          </button>
        </div>
        <p v-else class="empty-line">{{ loadingRuns ? '加载记录中…' : '还没有运行记录' }}</p>

        <button v-if="canLoadMore" class="load-more" type="button" :disabled="loadingRuns" @click="loadRuns(false)">
          加载更多
        </button>
      </div>

      <aside class="panel detail-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Detail</p>
            <h2>记录详情</h2>
          </div>
        </div>

        <div v-if="selectedRun" class="run-detail">
          <div class="detail-title">
            <span class="status-tag" :data-status="selectedRun.status">{{ statusLabel(selectedRun.status) }}</span>
            <strong>{{ selectedRun.job_label }}</strong>
          </div>
          <dl>
            <div><dt>日期</dt><dd>{{ selectedRun.run_date }}</dd></div>
            <div><dt>耗时</dt><dd>{{ durationLabel(selectedRun.duration_ms) }}</dd></div>
            <div><dt>产物</dt><dd>{{ artifactTitle(selectedRun) }}</dd></div>
            <div><dt>返回码</dt><dd>{{ selectedRun.return_code ?? '无' }}</dd></div>
          </dl>
          <pre>{{ previewRun(selectedRun) }}</pre>
          <div v-if="selectedRun.artifact?.file_url" class="artifact-actions">
            <button type="button" :disabled="artifactLoading" @click="openArtifact(selectedRun)">
              {{ artifactLoading && artifactForRunId === selectedRun.id ? '读取中' : '查看产物' }}
            </button>
            <small>{{ selectedRun.artifact.relative_path }}</small>
          </div>
          <div
            v-if="artifactForRunId === selectedRun.id && (artifactContent || artifactError || artifactLoading)"
            class="artifact-preview"
          >
            <span>产物预览</span>
            <p v-if="artifactError" class="error-text">{{ artifactError }}</p>
            <p v-else-if="artifactLoading" class="empty-line">读取中…</p>
            <pre v-else>{{ artifactContent }}</pre>
          </div>
          <button
            v-if="selectedRun.manual_enabled"
            type="button"
            :disabled="Boolean(runningJobId)"
            @click="rerun(selectedRun)"
          >
            再次运行
          </button>
        </div>
        <p v-else class="empty-line">选择一条运行记录查看详情</p>
      </aside>
    </section>
  </main>
</template>

<style scoped>
.automation-view {
  min-height: 100vh;
  padding: calc(var(--s-7) + var(--s-5)) var(--s-5) var(--s-7);
  color: var(--text-2);
  background:
    radial-gradient(circle at 20% 0%, rgba(110, 231, 208, 0.08), transparent 28%),
    var(--surface-0);
}

.topbar,
.control-strip,
.workspace-grid {
  width: min(1280px, 100%);
  margin: 0 auto;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--s-4);
  margin-bottom: var(--s-5);
}

.eyebrow {
  margin: 0 0 var(--s-1);
  color: var(--accent);
  font-size: var(--fs-1);
  text-transform: uppercase;
  letter-spacing: 0;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1 {
  color: var(--text-1);
  font-size: var(--fs-7);
  font-weight: 520;
}

h2 {
  color: var(--text-1);
  font-size: var(--fs-5);
  font-weight: 520;
}

h3 {
  color: var(--text-1);
  font-size: var(--fs-4);
  font-weight: 520;
}

button,
input,
select {
  font: inherit;
}

button {
  border: 1px solid var(--line-2);
  border-radius: var(--r-1);
  background: var(--surface-2);
  color: var(--text-2);
  min-height: 32px;
  padding: 0 var(--s-3);
  cursor: pointer;
}

button:hover:not(:disabled) {
  color: var(--text-1);
  border-color: var(--line-3);
}

button:disabled {
  cursor: not-allowed;
  color: var(--text-4);
  opacity: 0.58;
}

.refresh-btn,
.load-more {
  background: var(--accent-dim);
  color: var(--accent-bright);
  border-color: rgba(110, 231, 208, 0.24);
}

.notice {
  width: min(1280px, 100%);
  margin: 0 auto var(--s-4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--s-3);
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  background: var(--surface-1);
  padding: var(--s-3) var(--s-4);
  font-size: var(--fs-3);
}

.error-row {
  color: var(--error);
}

.feedback-row {
  color: var(--warm);
}

.control-strip {
  display: grid;
  grid-template-columns: minmax(180px, 1fr) repeat(3, minmax(110px, 0.4fr));
  gap: var(--s-3);
  margin-bottom: var(--s-4);
}

.control-strip label,
.control-strip article {
  min-height: 68px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--s-2);
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-1);
  padding: var(--s-3) var(--s-4);
}

.control-strip span {
  color: var(--text-3);
  font-size: var(--fs-2);
}

.control-strip strong {
  color: var(--text-1);
  font-size: var(--fs-6);
  font-weight: 520;
}

input,
select {
  min-height: 34px;
  width: 100%;
  border: 1px solid var(--line-2);
  border-radius: var(--r-1);
  background: var(--surface-2);
  color: var(--text-1);
  padding: 0 var(--s-3);
}

.workspace-grid {
  display: grid;
  grid-template-columns: minmax(260px, 0.9fr) minmax(360px, 1.25fr) minmax(280px, 0.8fr);
  gap: var(--s-4);
  align-items: start;
}

.panel {
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: rgba(13, 17, 22, 0.82);
  box-shadow: var(--shadow-1);
  padding: var(--s-4);
}

.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: var(--s-3);
  margin-bottom: var(--s-4);
}

.panel-head small {
  color: var(--text-3);
  font-size: var(--fs-2);
}

.job-list,
.run-list,
.run-detail {
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
}

.job-card {
  display: grid;
  gap: var(--s-2);
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-2);
  padding: var(--s-4);
}

.job-card.blocked {
  opacity: 0.7;
}

.job-card p,
.job-card small,
.run-row p,
.run-row small {
  color: var(--text-3);
  font-size: var(--fs-2);
  line-height: var(--lh-base);
}

.job-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s-2);
}

.job-meta span,
.status-tag {
  border: 1px solid var(--line-1);
  border-radius: var(--r-pill);
  color: var(--text-3);
  font-size: var(--fs-1);
  padding: 2px var(--s-2);
}

.filters {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(110px, 0.5fr) auto;
  gap: var(--s-2);
  margin-bottom: var(--s-3);
}

.filter-summary {
  margin: calc(-1 * var(--s-1)) 0 var(--s-3);
}

.run-row {
  width: 100%;
  display: grid;
  grid-template-columns: 10px 1fr;
  gap: var(--s-3);
  text-align: left;
  border-radius: var(--r-2);
  padding: var(--s-3);
  background: var(--surface-2);
}

.run-row.active {
  border-color: rgba(110, 231, 208, 0.32);
  background: rgba(110, 231, 208, 0.08);
}

.status-dot {
  width: 8px;
  height: 8px;
  margin-top: 5px;
  border-radius: 50%;
  background: var(--text-4);
}

.status-dot[data-status='success'],
.status-tag[data-status='success'] {
  color: var(--accent-bright);
  border-color: rgba(110, 231, 208, 0.28);
}

.status-dot[data-status='success'] {
  background: var(--accent);
}

.status-dot[data-status='failed'],
.status-tag[data-status='failed'] {
  color: var(--error);
  border-color: rgba(232, 120, 120, 0.28);
}

.status-dot[data-status='failed'] {
  background: var(--error);
}

.status-dot[data-status='skipped'],
.status-tag[data-status='skipped'] {
  color: var(--warn);
  border-color: rgba(232, 168, 124, 0.28);
}

.status-dot[data-status='skipped'] {
  background: var(--warn);
}

.load-more {
  width: 100%;
  margin-top: var(--s-3);
}

.detail-title {
  display: flex;
  align-items: center;
  gap: var(--s-2);
}

dl {
  display: grid;
  gap: var(--s-2);
  margin: 0;
}

dl div {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: var(--s-3);
  font-size: var(--fs-2);
}

dt {
  color: var(--text-4);
}

dd {
  margin: 0;
  color: var(--text-2);
  overflow-wrap: anywhere;
}

pre {
  max-height: 220px;
  overflow: auto;
  margin: 0;
  border: 1px solid var(--line-1);
  border-radius: var(--r-1);
  background: var(--surface-0);
  color: var(--text-3);
  font-family: var(--font-mono);
  font-size: var(--fs-2);
  line-height: var(--lh-base);
  white-space: pre-wrap;
  padding: var(--s-3);
}

.artifact-actions {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: var(--s-2);
}

.artifact-actions small {
  color: var(--text-4);
  font-size: var(--fs-2);
  overflow-wrap: anywhere;
}

.artifact-preview {
  display: grid;
  gap: var(--s-2);
}

.artifact-preview span {
  color: var(--text-3);
  font-size: var(--fs-2);
}

.artifact-preview pre {
  max-height: 360px;
  color: var(--text-2);
}

.error-text {
  color: var(--error);
  font-size: var(--fs-2);
  line-height: var(--lh-base);
}

.empty-line {
  color: var(--text-4);
  font-size: var(--fs-3);
  line-height: var(--lh-base);
}

@media (max-width: 980px) {
  .automation-view {
    padding: calc(var(--s-7) + var(--s-5)) var(--s-4) var(--s-6);
  }

  .control-strip,
  .workspace-grid {
    grid-template-columns: 1fr;
  }

  .filters {
    grid-template-columns: 1fr;
  }
}
</style>
