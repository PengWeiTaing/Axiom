/*
 * Atlas store — 宏观驾驶舱数据
 *
 * Atlas 是低频高价值视图，所以加载策略可以重一点：
 * 进入时并行拉所有数据，缓存 60s。
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  listMemories,
  getMemory,
  memoriesStats,
  listDecisions,
  weeklyReport,
  dailyStats,
} from '@/api/endpoints';
import type { Memory, Task, Decision } from '@/api/types';
import { ApiError } from '@/api/client';

export interface GoalWithProgress {
  memory: Memory;
  linked_tasks: Task[];
  progress: { total: number; done: number; todo: number };
}

export interface DailyPoint {
  date: string;
  items: number;
  tasks_done: number;
}

interface WeeklyReportData {
  summary?: string;
  completed_this_week?: number;
  completed_last_week?: number;
  completion_rate?: number;
  trend?: string;
}

const CACHE_TTL = 60_000;

export const useAtlasStore = defineStore('atlas', () => {
  const goals = ref<GoalWithProgress[]>([]);
  const decisions = ref<Decision[]>([]);
  const memoryStats = ref<{
    total: number;
    by_category: Record<string, number>;
    by_status: Record<string, number>;
  } | null>(null);
  const weekly = ref<WeeklyReportData | null>(null);
  const daily = ref<DailyPoint[]>([]);

  const loading = ref(false);
  const errors = ref<string[]>([]);
  const lastLoaded = ref<number>(0);

  const isStale = computed(() => Date.now() - lastLoaded.value > CACHE_TTL);

  async function load(force = false) {
    if (loading.value) return;
    if (!force && !isStale.value && lastLoaded.value > 0) return;

    loading.value = true;
    errors.value = [];

    // 并行拉，失败一个不影响其他
    const settled = await Promise.allSettled([
      loadGoals(),
      loadDecisions(),
      loadMemoryStats(),
      loadWeekly(),
      loadDaily(),
    ]);

    settled.forEach((r) => {
      if (r.status === 'rejected') {
        const msg = r.reason instanceof ApiError ? r.reason.message : '加载失败';
        errors.value.push(msg);
      }
    });

    lastLoaded.value = Date.now();
    loading.value = false;
  }

  async function loadGoals() {
    const data = await listMemories({ category: 'goal', status: 'confirmed', page_size: 20 });
    // 给每个 goal 拉 linked_tasks + progress（顺序拉，避免后端压力）
    const result: GoalWithProgress[] = [];
    for (const m of data.items) {
      try {
        const detail = await getMemory(m.id);
        result.push({
          memory: detail.memory,
          linked_tasks: detail.linked_tasks,
          progress: detail.task_progress,
        });
      } catch {
        result.push({
          memory: m,
          linked_tasks: [],
          progress: { total: 0, done: 0, todo: 0 },
        });
      }
    }
    goals.value = result;
  }

  async function loadDecisions() {
    const data = await listDecisions({ page: 1 });
    decisions.value = data.items.slice(0, 8);
  }

  async function loadMemoryStats() {
    memoryStats.value = await memoriesStats();
  }

  async function loadWeekly() {
    weekly.value = await weeklyReport();
  }

  async function loadDaily() {
    const data = await dailyStats(30);
    daily.value = data.days ?? [];
  }

  return {
    goals,
    decisions,
    memoryStats,
    weekly,
    daily,
    loading,
    errors,
    isStale,
    load,
  };
});
