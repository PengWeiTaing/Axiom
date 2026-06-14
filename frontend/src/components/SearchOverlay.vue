<script setup lang="ts">
/*
 * SearchOverlay — Ctrl+F / Ctrl+/ 唤起的浮层搜索
 *
 * 不是一个面板，是一个浮层。打完字 Esc 关掉，回到时间流。
 *
 * 设计：
 *   - 顶部居中浮窗，宽 560，离顶 18vh
 *   - 实时搜索（输入停 200ms 触发）
 *   - 默认调 /search/all（跨表，结果丰富）
 *   - 可切到 /search/vector（语义）
 */

import { ref, watch, nextTick } from 'vue';
import { searchAll, searchVector } from '@/api/search';
import type { Item, Memory, Task, Decision, ObjectTarget } from '@/api/types';
import { useWindowEventListener } from '@/composables/useEventListener';
import { useTimeout } from '@/composables/useTimeout';
import { ApiError } from '@/api/client';
import { isAbortError } from '@/utils/http';

const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ close: []; openItem: [id: number]; openObject: [target: ObjectTarget] }>();

const query = ref('');
const mode = ref<'all' | 'vector'>('all');
const loading = ref(false);
const error = ref<string | null>(null);
const input = ref<HTMLInputElement | null>(null);

type Result =
  | { kind: 'item';     data: Item }
  | { kind: 'memory';   data: Memory }
  | { kind: 'task';     data: Task }
  | { kind: 'decision'; data: Decision };

const results = ref<Result[]>([]);
let aborter: AbortController | null = null;
const debounce = useTimeout();

watch(() => props.open, async (open) => {
  if (open) {
    await nextTick();
    input.value?.focus();
    input.value?.select();
  } else {
    // 关闭时不清空 query，下次打开还能继续上次的
    aborter?.abort();
  }
});

watch(query, () => {
  debounce.clear();
  if (!query.value.trim()) {
    results.value = [];
    error.value = null;
    return;
  }
  debounce.schedule(run, 220);
});

watch(mode, () => {
  if (query.value.trim()) run();
});

async function run() {
  aborter?.abort();
  aborter = new AbortController();
  loading.value = true;
  error.value = null;
  const q = query.value.trim();
  try {
    if (mode.value === 'vector') {
      const data = await searchVector(q, 20);
      results.value = data.items.map((it) => ({ kind: 'item', data: it }));
    } else {
      const data = await searchAll(q, 12);
      results.value = [
        ...data.items.map((d) => ({ kind: 'item', data: d } as Result)),
        ...data.tasks.map((d) => ({ kind: 'task', data: d } as Result)),
        ...data.memories.map((d) => ({ kind: 'memory', data: d } as Result)),
        ...data.decisions.map((d) => ({ kind: 'decision', data: d } as Result)),
      ];
    }
  } catch (err) {
    if (isAbortError(err)) return;
    error.value = err instanceof ApiError ? err.message : '搜索失败';
    results.value = [];
  } finally {
    loading.value = false;
  }
}

useWindowEventListener('keydown', onKey);

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open) {
    e.preventDefault();
    emit('close');
  }
}

function resultSummary(r: Result): string {
  switch (r.kind) {
    case 'item':     return (r.data.content || r.data.derived_text || r.data.original_name || '—');
    case 'task':     return r.data.title;
    case 'memory':   return r.data.content;
    case 'decision': return r.data.title + ' → ' + r.data.decision;
  }
}

function kindLabel(kind: Result['kind']): string {
  return { item: '记录', task: '任务', memory: '记忆', decision: '决策' }[kind];
}

function openResult(result: Result) {
  if (result.kind === 'item') {
    emit('openItem', result.data.id);
  } else {
    emit('openObject', { kind: result.kind, id: result.data.id });
  }
  emit('close');
}
</script>

<template>
  <Transition name="overlay">
    <div v-if="open" class="search-overlay" @click.self="emit('close')">
      <div class="search-card">
        <div class="search-input">
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="1.5" />
            <path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
          <input
            ref="input"
            v-model="query"
            type="text"
            placeholder="搜索一切…"
            autocomplete="off"
            spellcheck="false"
          />
          <div class="mode-switch">
            <button :class="{ active: mode === 'all' }" @click="mode = 'all'">关键词</button>
            <button :class="{ active: mode === 'vector' }" @click="mode = 'vector'">语义</button>
          </div>
        </div>

        <div class="search-body">
          <div v-if="loading" class="status">搜索中…</div>
          <div v-else-if="error" class="status error">{{ error }}</div>
          <div v-else-if="!query" class="status dim">
            <kbd class="mono">Esc</kbd> 关闭
            <kbd class="mono">↑↓</kbd> 切换
            <kbd class="mono">↵</kbd> 打开
          </div>
          <div v-else-if="!results.length" class="status dim">没有匹配</div>
          <ul v-else class="results">
            <li v-for="(r, i) in results" :key="i">
              <button class="result" type="button" @click="openResult(r)">
                <span class="result-kind mono">{{ kindLabel(r.kind) }}</span>
                <span class="result-text">{{ resultSummary(r) }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: rgba(7, 9, 13, 0.55);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 16vh;
}

.search-card {
  width: min(560px, 92vw);
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--line-2);
  border-radius: var(--r-3);
  box-shadow: var(--shadow-2);
  overflow: hidden;
}

.search-input {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  padding: var(--s-4);
  border-bottom: 1px solid var(--line-1);
  color: var(--text-3);
}

.search-input input {
  flex: 1;
  font-size: var(--fs-5);
  color: var(--text-1);
}

.search-input input::placeholder {
  color: var(--text-4);
}

.mode-switch {
  display: flex;
  gap: 2px;
  padding: 2px;
  background: var(--surface-1);
  border-radius: var(--r-pill);
  border: 1px solid var(--line-1);
}

.mode-switch button {
  padding: 4px 10px;
  font-size: var(--fs-1);
  color: var(--text-3);
  border-radius: var(--r-pill);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: all var(--t-fast) var(--ease);
}

.mode-switch button.active {
  background: var(--surface-3);
  color: var(--text-1);
}

.search-body {
  max-height: 60vh;
  overflow-y: auto;
}

.status {
  padding: var(--s-5);
  text-align: center;
  color: var(--text-3);
  font-size: var(--fs-3);
}

.status.dim {
  color: var(--text-4);
}

.status.error {
  color: var(--error);
}

.status kbd {
  display: inline-block;
  padding: 2px 6px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  border-radius: var(--r-1);
  font-size: 10px;
  color: var(--text-2);
}

.results {
  list-style: none;
  padding: var(--s-2) 0;
}

.result {
  display: flex;
  align-items: center;
  gap: var(--s-3);
  width: 100%;
  padding: var(--s-2) var(--s-4);
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
  transition: background var(--t-fast) var(--ease);
}

.result:hover {
  background: var(--surface-2);
}

.result-kind {
  font-size: var(--fs-1);
  color: var(--text-4);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  min-width: 36px;
}

.result-text {
  flex: 1;
  font-size: var(--fs-4);
  color: var(--text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity var(--t-base) var(--ease);
}
.overlay-enter-active .search-card,
.overlay-leave-active .search-card {
  transition: transform var(--t-base) var(--ease);
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
.overlay-enter-from .search-card,
.overlay-leave-to .search-card {
  transform: translateY(-12px);
}
</style>
