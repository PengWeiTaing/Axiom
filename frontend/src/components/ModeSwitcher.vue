<script setup lang="ts">
/** ModeSwitcher — 全局右上角模式切换 */
import { computed } from 'vue'
import { useModeStore, type AppMode } from '@/stores/mode'

const mode = useModeStore()

const tabs: { key: AppMode; label: string }[] = [
  { key: 'capture', label: 'Capture' },
  { key: 'atlas', label: 'Atlas' },
  { key: 'cosmos', label: 'Cosmos' },
  { key: 'recent', label: '近况' },
  { key: 'processing', label: '处理' },
  { key: 'search', label: '搜索' },
  { key: 'timeline', label: '时间' },
  { key: 'tasks', label: '任务' },
  { key: 'memories', label: '记忆' },
  { key: 'decisions', label: '决策' },
  { key: 'automation', label: '自动化' },
  { key: 'system', label: '系统' },
  { key: 'board', label: 'Board' },
]

const containerOpacity = computed(() => mode.mode === 'atlas' ? 0.65 : 1)
</script>

<template>
  <nav class="mode-switcher" :style="{ opacity: containerOpacity }">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      class="mode-tab"
      :class="{ active: mode.mode === tab.key }"
      @click="mode.set(tab.key)"
    >{{ tab.label }}</button>
  </nav>
</template>

<style scoped>
.mode-switcher {
  position: fixed;
  top: var(--s-4);
  right: var(--s-4);
  z-index: 25;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: var(--s-2);
  max-width: min(760px, calc(100vw - 320px));
  font-size: var(--fs-2);
  transition: opacity var(--t-base) var(--ease);
}

.mode-switcher:hover {
  opacity: 1;
}

.mode-tab {
  padding: 6px var(--s-2);
  background: none;
  border: none;
  color: var(--text-3);
  font-size: var(--fs-2);
  cursor: pointer;
  position: relative;
  transition: color var(--t-base) var(--ease);
}

.mode-tab:hover {
  color: var(--text-1);
}

.mode-tab.active {
  color: var(--text-1);
}

.mode-tab.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: var(--s-3);
  right: var(--s-3);
  height: 2px;
  background: var(--accent);
  border-radius: 1px;
  transition: opacity var(--t-base) var(--ease);
}

.mode-tab:not(.active)::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: var(--s-3);
  right: var(--s-3);
  height: 2px;
  background: var(--accent);
  border-radius: 1px;
  opacity: 0;
  transition: opacity var(--t-base) var(--ease);
}

@media (max-width: 760px) {
  .mode-switcher {
    top: auto;
    right: var(--s-3);
    bottom: var(--s-3);
    left: var(--s-3);
    flex-wrap: nowrap;
    justify-content: flex-start;
    max-width: none;
    overflow-x: auto;
    padding: var(--s-2);
    background: color-mix(in srgb, var(--bg-1) 88%, transparent);
    border: 1px solid var(--line-1);
    border-radius: var(--r-2);
    backdrop-filter: blur(12px);
  }

  .mode-tab {
    flex: 0 0 auto;
  }
}
</style>
