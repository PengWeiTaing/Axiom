<script setup lang="ts">
/*
 * AtlasView — 宏观驾驶舱
 *
 * 设计差异（与 Capture 模式刻意拉开）：
 *   - 宽栏 1100px，多列网格，信息密度高
 *   - 字号、间距、留白都更大，传达"思考时刻"的庄重感
 *   - 数据多，但视觉仍冷静——单一冷光源，灰阶为主
 *   - 这里不接受输入，只展示和阅读
 *
 * 五块信息：
 *   1. 主线（主区，goals + 进度）
 *   2. 节奏（30 天活跃柱状）
 *   3. 决策（最近判断）
 *   4. 领域（memory category 分布）
 *   5. 提炼（AI 周报文字）
 */

import { onMounted, computed } from 'vue';
import { useAtlasStore } from '@/stores/atlas';
import type { GoalWithProgress, DailyPoint } from '@/stores/atlas';

const atlas = useAtlasStore()

onMounted(() => atlas.load());

const goalSorted = computed(() => {
  return [...atlas.goals].sort((a, b) => {
    // 进度低的优先（更需要关注），同进度按相关任务多少
    const pa = a.progress.total ? a.progress.done / a.progress.total : 0;
    const pb = b.progress.total ? b.progress.done / b.progress.total : 0;
    if (pa !== pb) return pa - pb;
    return b.progress.total - a.progress.total;
  });
});

function pct(g: GoalWithProgress): number {
  if (!g.progress.total) return 0;
  return Math.round((g.progress.done / g.progress.total) * 100);
}

const dailyMax = computed(() => {
  let m = 1;
  for (const d of atlas.daily) {
    const v = (d.items || 0) + (d.tasks_done || 0);
    if (v > m) m = v;
  }
  return m;
});

function barHeight(d: DailyPoint): number {
  const v = (d.items || 0) + (d.tasks_done || 0);
  return Math.max(2, (v / dailyMax.value) * 56);
}

function shortDate(iso: string): string {
  const t = new Date(iso);
  return `${t.getMonth() + 1}/${t.getDate()}`;
}

const categoryLabel: Record<string, string> = {
  fact: '事实',
  preference: '偏好',
  goal: '目标',
  relationship: '人际',
  event: '事件',
};

const categories = computed(() => {
  const stats = atlas.memoryStats;
  if (!stats) return [];
  const total = stats.total || 1;
  return Object.entries(stats.by_category || {})
    .map(([k, n]) => ({
      key: k,
      label: categoryLabel[k] || k,
      n,
      ratio: n / total,
    }))
    .sort((a, b) => b.n - a.n);
});

const weekly = computed(() => atlas.weekly);
const trendArrow = computed(() => {
  const w = weekly.value;
  if (!w) return '';
  const a = w.completed_this_week ?? 0;
  const b = w.completed_last_week ?? 0;
  if (a > b) return '↑';
  if (a < b) return '↓';
  return '→';
});
</script>

<template>
  <div class="atlas">
    <header class="atlas-head">
      <div>
        <span class="eyebrow">近况</span>
        <h1 class="title">本周与最近的轮廓</h1>
      </div>
    </header>

    <div v-if="atlas.loading && atlas.goals.length === 0" class="loading">
      正在汇总…
    </div>

    <div class="grid">
      <!-- 主线 —— 占两列 -->
      <section class="block mainline">
        <header class="block-head">
          <span class="eyebrow">主线</span>
          <span class="dim mono">{{ goalSorted.length }} 条目标</span>
        </header>
        <ul v-if="goalSorted.length" class="goals">
          <li v-for="g in goalSorted" :key="g.memory.id" class="goal">
            <div class="goal-line">
              <span class="goal-dot" />
              <span class="goal-text">{{ g.memory.content }}</span>
              <span class="goal-pct mono">{{ pct(g) }}%</span>
            </div>
            <div class="goal-bar">
              <div class="goal-fill" :style="{ width: pct(g) + '%' }" />
            </div>
            <div class="goal-meta">
              <span class="mono dim">完成 {{ g.progress.done }} · 待办 {{ g.progress.todo }} · 共 {{ g.progress.total }}</span>
            </div>
          </li>
        </ul>
        <div v-else-if="!atlas.loading" class="block-empty">
          还没有目标。在 Capture 模式记一条"目标"，它会出现在这里。
        </div>
      </section>

      <!-- 数字卡 -->
      <section class="block kpi">
        <header class="block-head">
          <span class="eyebrow">本周</span>
        </header>
        <div class="kpi-grid">
          <div class="kpi-cell">
            <div class="kpi-value">{{ weekly?.completed_this_week ?? '—' }}</div>
            <div class="kpi-label">完成</div>
          </div>
          <div class="kpi-cell">
            <div class="kpi-value">{{ weekly?.completed_last_week ?? '—' }}</div>
            <div class="kpi-label">上周</div>
          </div>
          <div class="kpi-cell">
            <div class="kpi-value">
              {{ weekly?.completion_rate != null ? Math.round((weekly.completion_rate as number) * 100) + '%' : '—' }}
            </div>
            <div class="kpi-label">完成率</div>
          </div>
          <div class="kpi-cell">
            <div class="kpi-value kpi-trend">{{ trendArrow || '—' }}</div>
            <div class="kpi-label">趋势</div>
          </div>
        </div>
      </section>

      <!-- 节奏 -->
      <section class="block rhythm">
        <header class="block-head">
          <span class="eyebrow">节奏</span>
          <span class="dim mono">近 30 天</span>
        </header>
        <div v-if="atlas.daily.length" class="rhythm-chart">
          <div
            v-for="d in atlas.daily"
            :key="d.date"
            class="rhythm-bar"
            :title="`${d.date} · 记录 ${d.items} · 完成 ${d.tasks_done}`"
            :style="{ height: barHeight(d) + 'px' }"
          />
        </div>
        <div v-if="atlas.daily.length" class="rhythm-axis">
          <span class="mono dim">{{ shortDate(atlas.daily[0].date) }}</span>
          <span class="mono dim">{{ shortDate(atlas.daily[atlas.daily.length - 1].date) }}</span>
        </div>
        <div v-else-if="!atlas.loading" class="block-empty small">没有节奏数据</div>
      </section>

      <!-- 领域 -->
      <section class="block domain">
        <header class="block-head">
          <span class="eyebrow">领域</span>
          <span class="dim mono">记忆 {{ atlas.memoryStats?.total ?? '—' }}</span>
        </header>
        <ul v-if="categories.length" class="domain-list">
          <li v-for="c in categories" :key="c.key" class="domain-row">
            <span class="domain-label">{{ c.label }}</span>
            <span class="domain-bar">
              <span class="domain-fill" :style="{ width: c.ratio * 100 + '%' }" />
            </span>
            <span class="domain-n mono">{{ c.n }}</span>
          </li>
        </ul>
        <div v-else-if="!atlas.loading" class="block-empty small">没有数据</div>
      </section>

      <!-- 决策 -->
      <section class="block decisions">
        <header class="block-head">
          <span class="eyebrow">决策</span>
          <span class="dim mono">最近 {{ atlas.decisions.length }} 条</span>
        </header>
        <ul v-if="atlas.decisions.length" class="dec-list">
          <li v-for="d in atlas.decisions" :key="d.id" class="dec">
            <span class="dec-mark" :class="d.status">
              {{ d.status === 'reviewed' ? '◆' : '◇' }}
            </span>
            <div class="dec-body">
              <div class="dec-title">{{ d.title }}</div>
              <div class="dec-meta mono dim">{{ d.decision }}</div>
            </div>
          </li>
        </ul>
        <div v-else-if="!atlas.loading" class="block-empty small">没有决策</div>
      </section>

      <!-- 提炼 -->
      <section class="block distill">
        <header class="block-head">
          <span class="eyebrow">提炼</span>
          <span class="dim mono">AI 周报</span>
        </header>
        <div v-if="weekly?.summary" class="distill-body">{{ weekly.summary }}</div>
        <div v-else-if="!atlas.loading" class="block-empty small">本周还没有提炼</div>
      </section>
    </div>

    <footer v-if="atlas.notices.length" class="notice-bar">
      <span
        v-for="(n, i) in atlas.notices"
        :key="n.source"
        class="notice-item"
      >
        <span class="notice-dot" :class="{ warn: n.level === 'warn' }" />
        <span>{{ n.message }}</span>
        <span v-if="i < atlas.notices.length - 1" class="notice-sep"> · </span>
      </span>
    </footer>
  </div>
</template>

<style scoped>
.atlas {
  width: 100%;
  max-width: var(--content-wide);
  margin: 0 auto;
  padding: var(--s-6) var(--s-5) 120px;
  flex: 1;
}

.atlas-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: var(--s-7);
  padding: 0 var(--s-2);
  border-bottom: 1px solid var(--line-1);
  padding-bottom: var(--s-5);
}

.title {
  font-size: var(--fs-7);
  font-weight: 400;
  color: var(--text-1);
  letter-spacing: -0.02em;
  margin-top: var(--s-2);
}

.loading {
  padding: var(--s-7);
  text-align: center;
  color: var(--text-3);
}

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: var(--s-5);
}

.block {
  background: var(--surface-1);
  border: 1px solid var(--line-1);
  border-radius: var(--r-3);
  padding: var(--s-5);
}

.block-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: var(--s-4);
  padding-bottom: var(--s-3);
  border-bottom: 1px solid var(--line-1);
}

.block-head .dim {
  font-size: var(--fs-1);
  color: var(--text-4);
}

.block-empty {
  padding: var(--s-5) 0;
  text-align: center;
  color: var(--text-4);
  font-size: var(--fs-3);
}
.block-empty.small {
  padding: var(--s-3) 0;
  font-size: var(--fs-2);
}

/* ---------- 主线 ---------- */
.mainline {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

.goals {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--s-5);
}

.goal-line {
  display: flex;
  align-items: center;
  gap: var(--s-3);
}

.goal-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
  flex-shrink: 0;
}

.goal-text {
  flex: 1;
  font-size: var(--fs-5);
  color: var(--text-1);
  letter-spacing: -0.005em;
}

.goal-pct {
  font-size: var(--fs-3);
  color: var(--text-2);
  min-width: 48px;
  text-align: right;
}

.goal-bar {
  height: 3px;
  background: var(--surface-3);
  border-radius: var(--r-pill);
  margin-top: var(--s-2);
  overflow: hidden;
}

.goal-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent-bright));
  border-radius: var(--r-pill);
  transition: width var(--t-slow) var(--ease);
}

.goal-meta {
  margin-top: 6px;
  font-size: var(--fs-2);
}

/* ---------- KPI ---------- */
.kpi {
  grid-column: 2 / 4;
  grid-row: 1 / 2;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--s-4);
}

.kpi-cell {
  text-align: left;
}

.kpi-value {
  font-size: var(--fs-7);
  font-weight: 400;
  color: var(--text-1);
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.kpi-trend {
  color: var(--accent);
}

.kpi-label {
  margin-top: var(--s-2);
  font-size: var(--fs-1);
  color: var(--text-4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* ---------- 节奏 ---------- */
.rhythm {
  grid-column: 2 / 4;
  grid-row: 2 / 3;
}

.rhythm-chart {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 60px;
  padding: 0 2px;
}

.rhythm-bar {
  flex: 1;
  min-width: 4px;
  background: linear-gradient(180deg, var(--accent), var(--accent-dim));
  border-radius: 2px;
  transition: opacity var(--t-fast) var(--ease);
}

.rhythm-bar:hover {
  opacity: 0.7;
}

.rhythm-axis {
  display: flex;
  justify-content: space-between;
  margin-top: var(--s-2);
  font-size: var(--fs-1);
}

/* ---------- 领域 ---------- */
.domain {
  grid-column: 1 / 2;
  grid-row: 3 / 4;
}

.domain-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
}

.domain-row {
  display: grid;
  grid-template-columns: 56px 1fr 32px;
  align-items: center;
  gap: var(--s-3);
}

.domain-label {
  font-size: var(--fs-3);
  color: var(--text-2);
}

.domain-bar {
  height: 4px;
  background: var(--surface-3);
  border-radius: var(--r-pill);
  overflow: hidden;
}

.domain-fill {
  display: block;
  height: 100%;
  background: var(--accent);
  opacity: 0.55;
}

.domain-n {
  font-size: var(--fs-2);
  color: var(--text-3);
  text-align: right;
}

/* ---------- 决策 ---------- */
.decisions {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
}

.dec-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--s-3);
}

.dec {
  display: flex;
  gap: var(--s-3);
  align-items: flex-start;
}

.dec-mark {
  font-size: 16px;
  color: var(--accent);
  line-height: 1.2;
}

.dec-mark.pending {
  color: var(--warn);
}

.dec-body {
  flex: 1;
  min-width: 0;
}

.dec-title {
  font-size: var(--fs-3);
  color: var(--text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dec-meta {
  margin-top: 2px;
  font-size: var(--fs-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ---------- 提炼 ---------- */
.distill {
  grid-column: 3 / 4;
  grid-row: 3 / 4;
}

.distill-body {
  font-size: var(--fs-3);
  color: var(--text-2);
  line-height: 1.7;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
}

/* ---------- 响应式 ---------- */
@media (max-width: 960px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
  .mainline { grid-column: 1 / 3; grid-row: 1; }
  .kpi      { grid-column: 1 / 3; grid-row: 2; }
  .rhythm   { grid-column: 1 / 3; grid-row: 3; }
  .domain   { grid-column: 1 / 2; grid-row: 4; }
  .decisions{ grid-column: 2 / 3; grid-row: 4; }
  .distill  { grid-column: 1 / 3; grid-row: 5; }
}

@media (max-width: 640px) {
  .atlas {
    padding: var(--s-4) var(--s-3) 100px;
  }
  .grid {
    grid-template-columns: 1fr;
  }
  .mainline, .kpi, .rhythm, .domain, .decisions, .distill {
    grid-column: 1;
    grid-row: auto;
  }
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .title {
    font-size: var(--fs-6);
  }
}

.notice-bar {
  margin-top: var(--s-5);
  padding: var(--s-2) var(--s-4);
  border-top: 1px solid var(--line-1);
  font-size: var(--fs-2);
  color: var(--text-4);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notice-item {
  display: inline-flex;
  align-items: center;
  gap: var(--s-1);
}

.notice-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-5);
  flex-shrink: 0;
}

.notice-dot.warn {
  background: var(--warn);
}

.notice-sep {
  color: var(--text-5);
  margin: 0 2px;
}
</style>
