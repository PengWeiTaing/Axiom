<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';
import { ArrowLeft, ArrowUpRight, Bookmark, Check, RotateCcw, SlidersHorizontal } from '@lucide/vue';
import { averageCycleDays } from './model';
import { littleSource } from './data';

defineProps<{ saved: boolean; rejected: boolean }>();
const emit = defineEmits<{ back: []; save: []; reject: [] }>();
const count = ref(6);
const throughput = ref(2);
const view = ref<'explanation' | 'limits'>('explanation');
const cycle = computed(() => averageCycleDays(count.value, throughput.value));
const comparisons = computed(() => [
  { name: '少一些在途', count: 2, days: averageCycleDays(2, throughput.value), tone: 'mint' },
  { name: '当前假设', count: count.value, days: cycle.value, tone: 'white' },
]);
const chartPoints = computed(() => Array.from({ length: 12 }, (_, index) => ({
  x: 56 + index * 37, y: 248 - averageCycleDays(index + 1, throughput.value) * 16,
})));
const line = computed(() => chartPoints.value.map((point, index) => `${index ? 'L' : 'M'} ${point.x} ${point.y}`).join(' '));
function reset() { count.value = 6; throughput.value = 2; }
async function moveTab(event: KeyboardEvent) {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  view.value = event.key === 'Home' ? 'explanation' : event.key === 'End' ? 'limits' : view.value === 'explanation' ? 'limits' : 'explanation';
  await nextTick(); document.getElementById(`${view.value}-tab`)?.focus();
}
</script>

<template>
  <main class="knowledge-board">
    <div class="board-return">
      <button class="quiet-command" type="button" @click="emit('back')"><ArrowLeft :size="17" /> 回到图中的位置</button>
      <span>探索 01 <span class="quiet-separator">/</span> 行动与节奏</span>
    </div>
    <header class="board-heading">
      <div>
        <div class="eyebrow"><span class="status-dot"></span> {{ rejected ? '已标记异议' : '待检验的解释' }}</div>
        <h1>把「忙」和「完成」<br />分开看。</h1>
        <p>问题不一定是做得不够。也可能是太多事情，一直停留在途中。</p>
      </div>
      <button class="quiet-command save-command" type="button" :aria-pressed="saved" @click="emit('save')">
        <Check v-if="saved" :size="17" /><Bookmark v-else :size="17" />{{ saved ? '已留待验证' : '留待验证' }}
      </button>
    </header>

    <div class="board-tabs" role="tablist" aria-label="解释与边界" @keydown="moveTab">
      <button id="explanation-tab" role="tab" type="button" :tabindex="view === 'explanation' ? 0 : -1" :aria-selected="view === 'explanation'" aria-controls="explanation-content" @click="view = 'explanation'">一种解释</button>
      <button id="limits-tab" role="tab" type="button" :tabindex="view === 'limits' ? 0 : -1" :aria-selected="view === 'limits'" aria-controls="limits-content" @click="view = 'limits'">哪些情况不成立</button>
      <span>模型演示 · 非个人预测</span>
    </div>

    <section v-if="view === 'explanation'" id="explanation-content" role="tabpanel" aria-labelledby="explanation-tab" class="explanation-layout">
      <div class="model-figure">
        <div class="figure-heading"><span class="section-index">01</span><h2>在途更多，平均周期会怎样？</h2></div>
        <p class="figure-condition">假设系统稳定，完成速度保持为每天 {{ throughput }} 件。</p>
        <svg class="cycle-chart" viewBox="0 0 560 300" role="img" :aria-label="`平均在途 ${count} 件，每天完成 ${throughput} 件，模型平均周期 ${cycle.toFixed(1)} 天`">
          <g class="chart-grid"><path v-for="tick in [0, 3, 6, 9, 12]" :key="tick" :d="`M 48 ${248 - tick * 16} H 500`" /><text v-for="tick in [0, 3, 6, 9, 12]" :key="`t${tick}`" x="25" :y="252 - tick * 16">{{ tick }}</text></g>
          <text class="chart-axis-title" x="48" y="24">平均周期 / 天</text>
          <path :d="line" class="chart-line" />
          <path :d="`M ${56 + (count - 1) * 37} 248 V ${248 - cycle * 16}`" class="chart-projection" />
          <circle :cx="56 + (count - 1) * 37" :cy="248 - cycle * 16" r="5" class="chart-selected" />
          <text :x="Math.min(56 + (count - 1) * 37 + 13, 463)" :y="235 - cycle * 16" class="chart-value">{{ cycle.toFixed(1) }} 天</text>
          <text v-for="tick in [1, 3, 6, 9, 12]" :key="`x${tick}`" :x="52 + (tick - 1) * 37" y="272" class="chart-tick">{{ tick }}</text>
          <text class="chart-axis-title" x="418" y="294">平均在途 / 件</text>
        </svg>
        <div class="comparison-rows">
          <div v-for="row in comparisons" :key="row.name" class="comparison-row">
            <span>{{ row.name }} <small>{{ row.count }} 件</small></span>
            <div class="comparison-track"><div :class="row.tone" :style="{ width: `${row.days / 12 * 100}%` }"></div></div>
            <strong>{{ row.days.toFixed(1) }} <small>天</small></strong>
          </div>
        </div>
      </div>
      <aside class="model-assumptions" aria-label="模型假设">
        <div class="figure-heading"><SlidersHorizontal :size="17" /><h2>改变一个条件</h2><button class="icon-button" type="button" title="恢复初始条件" aria-label="恢复初始条件" @click="reset"><RotateCcw :size="16" /></button></div>
        <label for="in-progress" class="range-label">平均在途数量 <output>{{ count }} <small>件</small></output></label>
        <input id="in-progress" v-model.number="count" type="range" min="1" max="12" step="1" />
        <div class="range-ends"><span>1 件</span><span>12 件</span></div>
        <label for="throughput" class="range-label">平均完成速度 <output>{{ throughput }} <small>件 / 天</small></output></label>
        <input id="throughput" v-model.number="throughput" type="range" min="1" max="4" step="0.5" />
        <div class="range-ends"><span>1 件 / 天</span><span>4 件 / 天</span></div>
        <div class="formula-note"><span>Little 定律</span><strong>L = λW</strong><p>在途数量 = 完成速度 × 平均周期</p></div>
        <p class="model-caveat">这是长期平均量之间的关系。减少并行是否改变完成速度，需要另行观察；这条公式本身不证明因果。</p>
        <a class="source-link" :href="littleSource" target="_blank" rel="noreferrer">MIT · John D. C. Little <ArrowUpRight :size="15" /></a>
      </aside>
    </section>

    <section v-else id="limits-content" role="tabpanel" aria-labelledby="limits-tab" class="limits-layout">
      <div class="limit-intro"><span class="section-index">另一面</span><h2>少开几件事，<br />不一定更快。</h2><p>公式的关系成立，不意味着每一次调整都会产生期待的结果。</p></div>
      <div class="limits-list">
        <article><span>01</span><div><h3>任务的难度变了</h3><p>一件研究任务与一件简单修订不能按同样的工作量计算。先比较同类任务。</p></div></article>
        <article><span>02</span><div><h3>瓶颈在外部等待</h3><p>如果等待的是别人的答复，减少手头事项未必缩短这部分时间，也可能浪费可并行处理的机会。</p></div></article>
        <article><span>03</span><div><h3>完成速度也改变了</h3><p>在途减少时，吞吐率也可能下降。回到模型，改变完成速度，就会看到不同结果。</p></div></article>
      </div>
    </section>

    <section class="board-evidence">
      <div class="figure-heading"><span class="section-index">02</span><h2>回到具体的经历</h2></div>
      <div class="evidence-columns">
        <article><span class="eyebrow">09.02 / 演示记录</span><blockquote>“做了很多，却很少有一件真正结束。”</blockquote><p>它提出了问题，还没有说明原因。</p></article>
        <article><span class="eyebrow">下一次观察</span><h3>同时记录在途数量、完成速度与任务难度。</h3><p>若结果不符合预期，把反例留下。</p></article>
        <article class="judgment"><span class="eyebrow">我的判断</span><p>{{ rejected ? '这条迁移关系已标记为有异议。原始研究与记录仍然保留。' : '是否能解释这段经历，还没有答案。' }}</p><button class="quiet-command" type="button" @click="emit('reject')">{{ rejected ? '撤回异议' : '这条联系有问题' }}<ArrowUpRight :size="16" /></button></article>
      </div>
    </section>
  </main>
</template>
