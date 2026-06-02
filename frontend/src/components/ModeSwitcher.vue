<script setup lang="ts">
/** ModeSwitcher — 全局右上角模式切换 */
import { computed } from 'vue'
import { useModeStore, type AppMode } from '@/stores/mode'

const mode = useModeStore()

const tabs: { key: AppMode; label: string }[] = [
  { key: 'capture', label: 'Capture' },
  { key: 'atlas', label: 'Atlas' },
  { key: 'recent', label: '近况' },
  { key: 'automation', label: '自动化' },
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
  gap: var(--s-3);
  font-size: var(--fs-2);
  transition: opacity var(--t-base) var(--ease);
}

.mode-switcher:hover {
  opacity: 1;
}

.mode-tab {
  padding: var(--s-2) var(--s-3);
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
</style>
