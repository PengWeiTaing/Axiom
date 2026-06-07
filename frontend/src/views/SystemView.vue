<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { ApiError } from '@/api/client';
import { exportData, getAdminLogs, getAuditLog, getMetrics, getSystemInfo } from '@/api/endpoints';
import type { AdminLogsPayload, AuditLogEntry, AuditLogPayload, MetricsPayload, SystemInfoPayload } from '@/api/types';
import { formatRelative } from '@/composables/useRelativeTime';
import { currentRouteParams, replaceRouteQuery } from '@/composables/useRouteQuery';

const system = ref<SystemInfoPayload | null>(null);
const metrics = ref<MetricsPayload | null>(null);
const audit = ref<AuditLogPayload | null>(null);
const logs = ref<AdminLogsPayload | null>(null);
const loading = ref(false);
const exporting = ref(false);
const error = ref<string | null>(null);
const logError = ref<string | null>(null);
const exportMessage = ref<string | null>(null);
const auditTarget = ref('');
const logLevel = ref('');

type AuditTarget = 'item' | 'task' | 'memory' | 'decision' | 'system';
type LogLevel = 'info' | 'warning' | 'error';

const tableRows = computed(() => {
  const tables = system.value?.tables || {};
  return Object.entries(tables)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
});

const latestMigrations = computed(() => (system.value?.migrations || []).slice(-5).reverse());
const auditEntries = computed<AuditLogEntry[]>(() => audit.value?.entries || []);
const systemFiltersActive = computed(() => Boolean(auditTarget.value || logLevel.value));
const activeSystemFilterChips = computed(() => {
  const chips: string[] = [];
  if (auditTarget.value) chips.push(`审计 ${auditTargetLabel(auditTarget.value)}`);
  if (logLevel.value) chips.push(`日志 ${logLevelLabel(logLevel.value)}`);
  return chips;
});
const healthLevel = computed(() => {
  const score = system.value?.health_score ?? 0;
  if (score >= 75) return 'good';
  if (score >= 50) return 'warn';
  return 'bad';
});

async function refreshAll() {
  loading.value = true;
  error.value = null;
  syncSystemUrl();
  try {
    const [systemPayload, metricsPayload, auditPayload] = await Promise.all([
      getSystemInfo(),
      getMetrics(),
      getAuditLog({ page: 1, page_size: 12, target_type: auditTarget.value || undefined }),
    ]);
    system.value = systemPayload;
    metrics.value = metricsPayload;
    audit.value = auditPayload;
    await loadLogs();
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '系统信息加载失败';
  } finally {
    loading.value = false;
  }
}

async function loadAudit() {
  error.value = null;
  syncSystemUrl();
  try {
    audit.value = await getAuditLog({ page: 1, page_size: 12, target_type: auditTarget.value || undefined });
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '审计日志加载失败';
  }
}

async function loadLogs() {
  logError.value = null;
  syncSystemUrl();
  try {
    logs.value = await getAdminLogs({ lines: 16, level: logLevel.value || undefined });
  } catch (err) {
    logs.value = null;
    logError.value = err instanceof ApiError ? err.message : '日志读取失败';
  }
}

async function handleExport() {
  exporting.value = true;
  exportMessage.value = null;
  error.value = null;
  try {
    const { blob, filename } = await exportData();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
    exportMessage.value = '导出已开始';
    await loadAudit();
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '数据导出失败';
  } finally {
    exporting.value = false;
  }
}

async function resetSystemFilters() {
  auditTarget.value = '';
  logLevel.value = '';
  await Promise.all([loadAudit(), loadLogs()]);
}

function formatBytes(mb: number): string {
  if (mb >= 1024) return `${(mb / 1024).toFixed(2)} GB`;
  return `${mb.toFixed(2)} MB`;
}

function formatUptime(value: number | string): string {
  if (typeof value === 'string') {
    const compact = value.trim();
    return compact || '--';
  }
  const seconds = value;
  if (seconds < 60) return `${Math.round(seconds)} 秒`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} 分钟`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return `${hours} 小时 ${minutes % 60} 分钟`;
  return `${Math.floor(hours / 24)} 天 ${hours % 24} 小时`;
}

function actionLabel(action: string): string {
  const labels: Record<string, string> = {
    item_create: '记录创建',
    item_update: '记录更新',
    item_archive: '记录归档',
    item_restore: '记录恢复',
    item_delete: '记录删除',
    memory_create: '记忆创建',
    memory_confirm: '记忆确认',
    memory_archive: '记忆归档',
    task_create: '任务创建',
    task_done: '任务完成',
    task_todo: '任务恢复',
    decision_create: '决策创建',
    decision_review: '决策回顾',
    export: '数据导出',
  };
  return labels[action] || action;
}

function auditTargetLabel(value: string): string {
  const labels: Record<AuditTarget, string> = {
    item: '记录',
    task: '任务',
    memory: '记忆',
    decision: '决策',
    system: '系统',
  };
  return labels[value as AuditTarget] || value;
}

function logLevelLabel(value: string): string {
  const labels: Record<LogLevel, string> = {
    info: 'INFO',
    warning: 'WARNING',
    error: 'ERROR',
  };
  return labels[value as LogLevel] || value.toUpperCase();
}

function syncSystemUrl() {
  replaceRouteQuery('system', {
    audit: auditTarget.value,
    level: logLevel.value,
  });
}

function isAuditTarget(value: string | null): value is AuditTarget {
  return value === 'item' || value === 'task' || value === 'memory' || value === 'decision' || value === 'system';
}

function isLogLevel(value: string | null): value is LogLevel {
  return value === 'info' || value === 'warning' || value === 'error';
}

function restoreSystemFiltersFromUrl() {
  const params = currentRouteParams();
  const initialAudit = params.get('audit');
  const initialLevel = params.get('level');
  if (isAuditTarget(initialAudit)) auditTarget.value = initialAudit;
  if (isLogLevel(initialLevel)) logLevel.value = initialLevel;
}

onMounted(() => {
  restoreSystemFiltersFromUrl();
  refreshAll();
});
</script>

<template>
  <main class="system-view">
    <header class="topbar">
      <div>
        <p class="eyebrow">System</p>
        <h1>系统治理</h1>
      </div>
      <div class="top-actions">
        <button class="export-btn" type="button" :disabled="exporting" @click="handleExport">
          <span>{{ exporting ? '导出中' : '导出数据' }}</span>
        </button>
        <button class="refresh-btn" type="button" :disabled="loading" @click="refreshAll">
          <span>{{ loading ? '刷新中' : '刷新' }}</span>
        </button>
      </div>
    </header>

    <div v-if="error" class="notice error-row">
      <span>{{ error }}</span>
      <button type="button" @click="refreshAll">重试</button>
    </div>
    <div v-if="exportMessage" class="notice success-row">
      <span>{{ exportMessage }}</span>
    </div>
    <div v-if="systemFiltersActive" class="filter-summary" aria-label="当前系统筛选">
      <span v-for="chip in activeSystemFilterChips" :key="chip">{{ chip }}</span>
      <button type="button" :disabled="loading" @click="resetSystemFilters">重置筛选</button>
    </div>

    <section class="health-strip">
      <article class="score-card" :data-health="healthLevel">
        <span>健康分</span>
        <strong>{{ system?.health_score ?? 0 }}</strong>
      </article>
      <article>
        <span>数据库</span>
        <strong>{{ system ? formatBytes(system.db_size_mb) : '--' }}</strong>
      </article>
      <article>
        <span>请求</span>
        <strong>{{ metrics?.requests ?? 0 }}</strong>
      </article>
      <article>
        <span>错误率</span>
        <strong>{{ metrics ? `${metrics.error_rate}%` : '--' }}</strong>
      </article>
      <article>
        <span>运行</span>
        <strong>{{ metrics ? formatUptime(metrics.uptime) : '--' }}</strong>
      </article>
    </section>

    <section class="workspace-grid">
      <div class="panel status-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Health</p>
            <h2>运行状态</h2>
          </div>
          <span class="state-pill" :data-state="system?.integrity.ok ? 'good' : 'warn'">
            {{ system?.integrity.ok ? '结构正常' : '需要检查' }}
          </span>
        </div>

        <div class="check-list">
          <article>
            <span>FTS 索引</span>
            <strong>{{ system?.fts_index_entries ?? 0 }}</strong>
          </article>
          <article>
            <span>Inbox 文件</span>
            <strong>{{ system?.inbox_files ?? 0 }}</strong>
          </article>
          <article>
            <span>归档文件</span>
            <strong>{{ system?.archive_files ?? 0 }}</strong>
          </article>
          <article>
            <span>日志大小</span>
            <strong>{{ system ? formatBytes(system.log_size_mb) : '--' }}</strong>
          </article>
        </div>

        <div class="integrity-box">
          <h3>完整性</h3>
          <p>孤立记忆 {{ system?.integrity.orphan_memories ?? 0 }}，孤立任务 {{ system?.integrity.orphan_tasks ?? 0 }}，空内容记录 {{ system?.integrity.empty_content_items ?? 0 }}。</p>
          <p>备份：{{ system?.backup_ok ? '48 小时内可用' : '未确认' }}<span v-if="system?.backup_age_hours !== null">，{{ system?.backup_age_hours }} 小时前</span></p>
          <p>增长：{{ system?.growth.items_per_day ?? 0 }} 条/日，{{ system?.growth.db_mb_per_100_items ?? 0 }} MB/100 条。</p>
        </div>
      </div>

      <div class="panel tables-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Tables</p>
            <h2>数据表</h2>
          </div>
          <small>{{ tableRows.length }} 张</small>
        </div>

        <div class="table-list">
          <article v-for="row in tableRows" :key="row.name">
            <span>{{ row.name }}</span>
            <strong>{{ row.count }}</strong>
          </article>
        </div>

        <div class="migration-box">
          <h3>最近迁移</h3>
          <article v-for="migration in latestMigrations" :key="migration.version">
            <span>#{{ migration.version }} {{ migration.name }}</span>
            <small>{{ formatRelative(migration.applied_at) }}</small>
          </article>
        </div>
      </div>

      <div class="panel audit-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Audit</p>
            <h2>审计日志</h2>
          </div>
          <small>{{ audit?.total ?? 0 }} 条</small>
        </div>

        <form class="filters" @submit.prevent="loadAudit">
          <select v-model="auditTarget" aria-label="审计对象筛选">
            <option value="">全部对象</option>
            <option value="item">记录</option>
            <option value="task">任务</option>
            <option value="memory">记忆</option>
            <option value="decision">决策</option>
            <option value="system">系统</option>
          </select>
          <button type="submit">筛选</button>
        </form>

        <div v-if="auditEntries.length" class="audit-list">
          <article v-for="entry in auditEntries" :key="entry.id">
            <span class="audit-action">{{ actionLabel(entry.action) }}</span>
            <strong>{{ entry.target_type }}<template v-if="entry.target_id"> #{{ entry.target_id }}</template></strong>
            <small>{{ formatRelative(entry.created_at) }}</small>
            <p v-if="entry.detail">{{ entry.detail }}</p>
          </article>
        </div>
        <p v-else class="empty-line">{{ loading ? '加载审计中' : '暂无审计记录' }}</p>
      </div>

      <div class="panel logs-panel">
        <div class="panel-head">
          <div>
            <p class="eyebrow">Logs</p>
            <h2>日志尾部</h2>
          </div>
          <small>{{ logs?.lines ?? 0 }} 行</small>
        </div>

        <form class="filters" @submit.prevent="loadLogs">
          <select v-model="logLevel" aria-label="日志等级筛选">
            <option value="">全部级别</option>
            <option value="info">INFO</option>
            <option value="warning">WARNING</option>
            <option value="error">ERROR</option>
          </select>
          <button type="submit">读取</button>
        </form>

        <p v-if="logError" class="empty-line">{{ logError }}</p>
        <pre v-else-if="logs?.log.length" class="log-box">{{ logs.log.join('\n') }}</pre>
        <p v-else class="empty-line">{{ loading ? '读取日志中' : '暂无日志' }}</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.system-view {
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

.top-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--s-2);
}

.refresh-btn,
.export-btn,
.filters button {
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  color: var(--text-2);
  padding: var(--s-2) var(--s-3);
  transition: border-color var(--t-fast) var(--ease), color var(--t-fast) var(--ease);
}

.refresh-btn:hover:not(:disabled),
.export-btn:hover:not(:disabled),
.filters button:hover {
  border-color: rgba(110, 231, 208, 0.25);
  color: var(--text-1);
}

.refresh-btn:disabled,
.export-btn:disabled {
  color: var(--text-4);
  cursor: default;
}

.export-btn {
  border-color: rgba(110, 231, 208, 0.18);
  color: var(--accent-bright);
}

.notice,
.empty-line {
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
  margin-bottom: var(--s-4);
}

.error-row {
  border-color: rgba(232, 120, 120, 0.22);
  color: var(--error);
}

.success-row {
  border-color: rgba(110, 231, 208, 0.18);
  color: var(--accent-bright);
}

.filter-summary {
  margin: 0 0 var(--s-4);
}

.health-strip {
  display: grid;
  grid-template-columns: 1.2fr repeat(4, 1fr);
  gap: var(--s-3);
  margin-bottom: var(--s-4);
}

.health-strip article,
.check-list article,
.table-list article {
  min-width: 0;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: rgba(13, 17, 22, 0.74);
  padding: var(--s-4);
}

.health-strip span,
.check-list span,
.table-list span,
.panel-head small,
.state-pill,
.audit-list small,
.migration-box small {
  color: var(--text-3);
  font-size: var(--fs-2);
}

.health-strip strong,
.check-list strong,
.table-list strong {
  display: block;
  color: var(--text-1);
  font-family: var(--font-mono);
  font-size: var(--fs-6);
  font-weight: 520;
  line-height: 1.2;
  margin-top: var(--s-2);
}

.score-card[data-health='good'] strong {
  color: var(--accent-bright);
}

.score-card[data-health='warn'] strong {
  color: var(--warn);
}

.score-card[data-health='bad'] strong {
  color: var(--error);
}

.workspace-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--s-4);
  align-items: start;
}

.panel {
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: rgba(13, 17, 22, 0.74);
  padding: var(--s-4);
}

.state-pill {
  border: 1px solid var(--line-1);
  border-radius: var(--r-pill);
  padding: 3px 9px;
}

.state-pill[data-state='good'] {
  border-color: rgba(110, 231, 208, 0.2);
  color: var(--accent-bright);
}

.state-pill[data-state='warn'] {
  border-color: rgba(245, 179, 107, 0.22);
  color: var(--warn);
}

.check-list,
.table-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--s-3);
  margin-top: var(--s-4);
}

.integrity-box,
.migration-box {
  display: grid;
  gap: var(--s-2);
  margin-top: var(--s-4);
  border-top: 1px solid var(--line-1);
  padding-top: var(--s-4);
}

.integrity-box p,
.migration-box article,
.audit-list p {
  color: var(--text-3);
  font-size: var(--fs-3);
  line-height: var(--lh-relaxed);
}

.filters {
  display: flex;
  gap: var(--s-2);
  margin: var(--s-4) 0;
}

select {
  flex: 1;
  min-width: 0;
  border: 1px solid var(--line-2);
  border-radius: var(--r-2);
  background: var(--surface-1);
  color: var(--text-1);
  padding: var(--s-2) var(--s-3);
}

.audit-list {
  display: grid;
  gap: var(--s-2);
}

.audit-list article {
  display: grid;
  gap: 3px;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-1);
  padding: var(--s-3);
}

.audit-action {
  color: var(--accent-bright);
  font-size: var(--fs-2);
}

.audit-list strong {
  color: var(--text-1);
  font-weight: 520;
}

.log-box {
  max-height: 360px;
  overflow: auto;
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  background: var(--surface-1);
  color: var(--text-3);
  font-family: var(--font-mono);
  font-size: var(--fs-2);
  line-height: 1.7;
  padding: var(--s-3);
  white-space: pre-wrap;
}

@media (max-width: 900px) {
  .system-view {
    width: min(100vw - var(--s-4), 640px);
    padding-top: calc(var(--s-8) + var(--s-7));
  }

  .health-strip,
  .workspace-grid,
  .check-list,
  .table-list {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
  }

  .top-actions {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
