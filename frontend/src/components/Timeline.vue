<script setup lang="ts">
/*
 * Timeline — Capture 模式下方的时间流
 *
 * 设计准则：
 *   - 行密度优先于卡片观感。每行 ≈ 36px 高
 *   - 不显示任何分页器，IntersectionObserver 触底加载
 *   - 不允许彩色 type badge——type 用一个 6px 的左侧色条表达
 *   - 文字一律单行截断，悬停才显示完整 tooltip
 */

import { onMounted, onBeforeUnmount, ref, computed } from 'vue';
import { useTimelineStore } from '@/stores/timeline';
import { formatRelative } from '@/composables/useRelativeTime';
import { typeAccent } from '@/composables/useTypeAccent';
import type { Item } from '@/api/types';

defineEmits<{ select: [id: number] }>();

const store = useTimelineStore();
const sentinel = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

const now = ref(Date.now());
let ticker: number | undefined;

onMounted(() => {
  store.loadInitial();
  observer = new IntersectionObserver(
    (ents) => {
      if (ents[0]?.isIntersecting) store.loadMore();
    },
    { rootMargin: '200px' },
  );
  if (sentinel.value) observer.observe(sentinel.value);

  // 每 30s 重算一次相对时间
  ticker = window.setInterval(() => {
    now.value = Date.now();
  }, 30000);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  if (ticker) clearInterval(ticker);
});

function summary(item: Item): string {
  return (item.content || item.derived_text || item.transcript_text || item.original_name || '—').replace(/\s+/g, ' ').trim();
}

const nowDate = computed(() => new Date(now.value));
</script>

<template>
  <section class="timeline">
    <header class="timeline-head">
      <span class="eyebrow">最近</span>
      <span class="dim" v-if="store.entries.length">{{ store.entries.length }} 条</span>
    </header>

    <ul class="entries">
      <li
        v-for="entry in store.entries"
        :key="entry.key"
        class="entry"
        :style="{ '--accent-bar': typeAccent(entry.raw.type) }"
	        @click="$emit('select', entry.raw.id)"
      >
        <span class="entry-time mono">{{ formatRelative(entry.created_at, nowDate) }}</span>
        <span class="entry-bar" />
        <span class="entry-summary" :title="summary(entry.raw)">
          {{ summary(entry.raw) }}
        </span>
        <span class="entry-type mono">{{ entry.raw.type }}</span>
      </li>

      <!-- 加载状态 -->
      <li v-if="store.loading" v-for="i in 3" :key="'sk' + i" class="entry skel">
        <span class="entry-time mono">···</span>
        <span class="entry-bar" />
        <span class="entry-summary skel-bar" />
        <span class="entry-type mono">···</span>
      </li>
    </ul>

    <div v-if="store.isEmpty" class="empty">
      时间流是空的。上面记一条试试。
    </div>

    <div v-if="store.error" class="error">{{ store.error }}</div>

    <div ref="sentinel" class="sentinel" />

    <div v-if="!store.hasMore && store.entries.length > 0" class="end">
      <span class="dim mono">— 没有更多了 —</span>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  margin-top: var(--s-6);
}

.timeline-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0 var(--s-2) var(--s-3);
  border-bottom: 1px solid var(--line-1);
}

.timeline-head .dim {
  font-size: var(--fs-2);
  color: var(--text-4);
  font-family: var(--font-mono);
}

.entries {
  list-style: none;
}

.entry {
  display: grid;
  grid-template-columns: 88px 2px 1fr auto;
  align-items: center;
  gap: var(--s-3);
  padding: var(--s-3) var(--s-2);
  border-bottom: 1px solid var(--line-1);
  transition: background var(--t-fast) var(--ease);
  cursor: pointer;
}

.entry:hover {
  background: var(--surface-1);
}

.entry-time {
  font-size: var(--fs-2);
  color: var(--text-3);
  text-align: right;
  white-space: nowrap;
}

.entry-bar {
  width: 2px;
  height: 18px;
  background: var(--accent-bar, var(--text-5));
  border-radius: 1px;
  opacity: 0.6;
}

.entry-summary {
  font-size: var(--fs-4);
  color: var(--text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.entry-type {
  font-size: var(--fs-1);
  color: var(--text-4);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.entry.skel .entry-summary,
.entry.skel .entry-time,
.entry.skel .entry-type {
  color: var(--text-5);
}

.skel-bar {
  height: 12px;
  width: 60%;
  background: linear-gradient(
    90deg,
    var(--surface-2) 0%,
    var(--surface-3) 50%,
    var(--surface-2) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.empty,
.end {
  padding: var(--s-6) var(--s-2);
  text-align: center;
  color: var(--text-4);
  font-size: var(--fs-3);
}

.error {
  padding: var(--s-3);
  color: var(--error);
  font-size: var(--fs-3);
  text-align: center;
}

.sentinel {
  height: 1px;
}
</style>
