/*
 * Timeline store — Capture 模式的核心数据
 *
 * 时间流不只装 items，也装 tasks/memories/decisions 的近期变化。
 * 这样用户只看一条流，就能感知"我最近往里放了什么"。
 *
 * 第一阶段先只做 items（来自 /recent），后续再合并其他来源。
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getRecent } from '@/api/records';
import type { Item } from '@/api/types';
import { ApiError } from '@/api/client';

export interface TimelineEntry {
  // 内部 id：可能是 'item:123' 或 'task:45'，方便后续合流
  key: string;
  kind: 'item' | 'task' | 'memory' | 'decision';
  created_at: string;
  raw: Item; // 第一阶段只有 item，后续是 union
}

export const useTimelineStore = defineStore('timeline', () => {
  const entries = ref<TimelineEntry[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const page = ref(1);
  const hasMore = ref(true);

  const isEmpty = computed(() => !loading.value && entries.value.length === 0);

  async function loadInitial() {
    page.value = 1;
    entries.value = [];
    hasMore.value = true;
    await loadMore();
  }

  async function loadMore() {
    if (loading.value || !hasMore.value) return;
    loading.value = true;
    error.value = null;
    try {
      const data = await getRecent({ page: page.value });
      const fresh = data.items.map(toEntry);
      entries.value.push(...fresh);
      hasMore.value = page.value < data.total_pages;
      page.value += 1;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : '加载失败';
    } finally {
      loading.value = false;
    }
  }

  // 新捕获的内容直接插到顶部（乐观更新，无需等下一次 /recent）
  function prepend(item: Item) {
    entries.value.unshift(toEntry(item));
  }

  function reset() {
    entries.value = [];
    page.value = 1;
    hasMore.value = true;
    error.value = null;
  }

  return {
    entries,
    loading,
    error,
    hasMore,
    isEmpty,
    loadInitial,
    loadMore,
    prepend,
    reset,
  };
});

function toEntry(item: Item): TimelineEntry {
  return {
    key: `item:${item.id}`,
    kind: 'item',
    created_at: item.created_at,
    raw: item,
  };
}
