<script setup lang="ts">
/*
 * CaptureView — 日常模式主视图
 *
 * 整页只有两个东西：
 *   1. 顶部的 SmartInput（页面唯一的"重点"）
 *   2. 下方的 Timeline（视觉极弱，纯密度信息）
 *
 * 浮层：SearchOverlay / QuickCapture / FloatChat 在 App.vue 里挂全局
 */

import { ref, onMounted, onBeforeUnmount } from 'vue';
import SmartInput from '@/components/SmartInput.vue';
import Timeline from '@/components/Timeline.vue';
import ItemDrawer from '@/components/ItemDrawer.vue';
import ObjectDrawer from '@/components/ObjectDrawer.vue';
import { useTimelineStore } from '@/stores/timeline';
import type { ObjectTarget } from '@/api/types';
const showSearch = ref(false);
const timeline = useTimelineStore();
const selectedId = ref<number | null>(null);
const selectedObject = ref<ObjectTarget | null>(null);

function onChanged(options?: { nextItemId?: number }) {
  selectedId.value = options?.nextItemId ?? null;
  timeline.reset();
  timeline.loadInitial();
}

function openSearchItem(id: number) {
  selectedObject.value = null;
  selectedId.value = id;
}

function openSearchObject(target: ObjectTarget) {
  selectedId.value = null;
  selectedObject.value = target;
}

function onKey(e: KeyboardEvent) {
  // Ctrl+F → 浮层搜索（覆盖浏览器内置 find 是有意的）
  if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'F')) {
    const tgt = e.target as HTMLElement | null;
    // 只有在没编辑文本时拦截 Ctrl+F
    if (tgt && (tgt.tagName === 'INPUT' || tgt.tagName === 'TEXTAREA' || tgt.isContentEditable)) {
      // 在输入框里就让浏览器原生行为走（用户更可能想搜文本内部）
      return;
    }
    e.preventDefault();
    showSearch.value = true;
  }
}

onMounted(() => window.addEventListener('keydown', onKey));
onBeforeUnmount(() => window.removeEventListener('keydown', onKey));

defineExpose({ openSearch: () => (showSearch.value = true) });
</script>

<template>
  <div class="capture-view">
    <div class="header">
      <div class="brand">
        <span class="brand-dot" />
        <span class="brand-text">Axiom</span>
        <button
          class="action-btn"
          type="button"
          title="搜索 (Ctrl+F)"
          @click="showSearch = true"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" stroke-width="1.5" />
            <path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
          <span>搜索</span>
          <kbd class="mono">⌘F</kbd>
        </button>
      </div>
    </div>

    <SmartInput />
    <Timeline @select="(id) => selectedId = id" />

    <ItemDrawer
      :item-id="selectedId"
      @close="selectedId = null"
      @changed="onChanged"
    />
    <ObjectDrawer
      :target="selectedObject"
      @close="selectedObject = null"
      @changed="onChanged"
      @open-item="openSearchItem"
      @open-object="openSearchObject"
    />

    <SearchOverlayLazy
      :open="showSearch"
      @close="showSearch = false"
      @open-item="openSearchItem"
      @open-object="openSearchObject"
    />
  </div>
</template>

<script lang="ts">
// 分开声明：让 SearchOverlay 异步加载
import { defineAsyncComponent } from 'vue';
const SearchOverlayLazy = defineAsyncComponent(
  () => import('@/components/SearchOverlay.vue'),
);
export default { components: { SearchOverlayLazy } };
</script>

<style scoped>
.capture-view {
  width: 100%;
  max-width: var(--content-max);
  margin: 0 auto;
  padding: var(--s-6) var(--s-4) 120px;
  flex: 1;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--s-5);
  padding: 0 var(--s-2);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--s-3);
}

.brand-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
}

.brand-text {
  font-size: var(--fs-4);
  font-weight: 500;
  color: var(--text-2);
  letter-spacing: -0.01em;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--s-2);
  padding: 6px var(--s-3);
  background: var(--surface-2);
  border: 1px solid var(--line-1);
  border-radius: var(--r-2);
  color: var(--text-3);
  font-size: var(--fs-2);
  transition: all var(--t-fast) var(--ease);
}

.action-btn:hover {
  background: var(--surface-3);
  color: var(--text-1);
  border-color: var(--line-2);
}

.action-btn kbd {
  display: inline-block;
  padding: 1px 6px;
  background: var(--surface-1);
  border: 1px solid var(--line-1);
  border-radius: var(--r-1);
  font-size: 10px;
  color: var(--text-4);
}

@media (max-width: 640px) {
  .capture-view {
    padding: var(--s-4) var(--s-3) 120px;
  }
  .action-btn kbd {
    display: none;
  }
}
</style>
