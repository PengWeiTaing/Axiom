<script setup lang="ts">
import { type Component, onBeforeUnmount, onMounted, ref } from 'vue';
import {
  Archive,
  Brain,
  CalendarDays,
  CircleDot,
  Ellipsis,
  GitFork,
  House,
  Inbox,
  LibraryBig,
  ListTodo,
  Orbit,
  Plus,
  Settings,
  SlidersHorizontal,
  Workflow,
} from '@lucide/vue';
import { useModeStore, type AppMode, type PrimaryMode } from '@/stores/mode';

const emit = defineEmits<{ capture: [] }>();
const mode = useModeStore();
const menuOpen = ref(false);

const primaryItems: { key: PrimaryMode; label: string; icon: Component }[] = [
  { key: 'today', label: '此刻', icon: House },
  { key: 'library', label: '资料库', icon: LibraryBig },
  { key: 'atlas', label: 'Atlas', icon: Orbit },
];

const contextItems: { key: AppMode; label: string; icon: Component }[] = [
  { key: 'processing', label: '待处理', icon: Inbox },
  { key: 'tasks', label: '任务', icon: ListTodo },
  { key: 'memories', label: '记忆', icon: Brain },
  { key: 'decisions', label: '决策', icon: GitFork },
  { key: 'timeline', label: '时间线', icon: CalendarDays },
  { key: 'recent', label: '回顾', icon: Archive },
];

const adminItems: { key: AppMode; label: string; icon: Component }[] = [
  { key: 'cosmos', label: '结构编辑', icon: SlidersHorizontal },
  { key: 'automation', label: '自动化', icon: Workflow },
  { key: 'system', label: '系统', icon: Settings },
];

function select(next: AppMode) {
  menuOpen.value = false;
  mode.set(next);
}

function onWindowPointerDown(event: PointerEvent) {
  const target = event.target as HTMLElement | null;
  if (menuOpen.value && !target?.closest('.app-navigation, .more-menu')) {
    menuOpen.value = false;
  }
}

function onWindowKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') menuOpen.value = false;
}

onMounted(() => {
  window.addEventListener('pointerdown', onWindowPointerDown);
  window.addEventListener('keydown', onWindowKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('pointerdown', onWindowPointerDown);
  window.removeEventListener('keydown', onWindowKeydown);
});
</script>

<template>
  <nav class="app-navigation" aria-label="主要导航">
    <button class="brand-mark" type="button" title="Axiom" aria-label="Axiom" @click="select('today')">
      <CircleDot :size="22" :stroke-width="1.7" />
    </button>

    <div class="primary-navigation">
      <button
        v-for="item in primaryItems.slice(0, 2)"
        :key="item.key"
        class="nav-item"
        :class="{ active: mode.mode === item.key }"
        type="button"
        @click="select(item.key)"
      >
        <component :is="item.icon" :size="20" :stroke-width="1.7" />
        <span>{{ item.label }}</span>
      </button>

      <button class="nav-item capture-item" type="button" @click="emit('capture')">
        <span class="capture-icon"><Plus :size="21" :stroke-width="2" /></span>
        <span>记录</span>
      </button>

      <button
        v-for="item in primaryItems.slice(2)"
        :key="item.key"
        class="nav-item"
        :class="{ active: mode.mode === item.key }"
        type="button"
        @click="select(item.key)"
      >
        <component :is="item.icon" :size="20" :stroke-width="1.7" />
        <span>{{ item.label }}</span>
      </button>
    </div>

    <button
      class="nav-item more-trigger"
      :class="{ active: menuOpen || !['today', 'library', 'atlas'].includes(mode.mode) }"
      type="button"
      aria-haspopup="menu"
      :aria-expanded="menuOpen"
      @click.stop="menuOpen = !menuOpen"
    >
      <Ellipsis :size="20" :stroke-width="1.7" />
      <span>更多</span>
    </button>
  </nav>

  <Transition name="menu">
    <aside v-if="menuOpen" class="more-menu" role="menu" aria-label="其他视图">
      <div class="menu-brand">
        <span>Axiom</span>
        <small>上下文与管理</small>
      </div>
      <p class="menu-label">整理与回顾</p>
      <button
        v-for="item in contextItems"
        :key="item.key"
        class="menu-item"
        :class="{ active: mode.mode === item.key }"
        type="button"
        role="menuitem"
        @click="select(item.key)"
      >
        <component :is="item.icon" :size="17" :stroke-width="1.7" />
        <span>{{ item.label }}</span>
      </button>
      <p class="menu-label admin-label">管理</p>
      <button
        v-for="item in adminItems"
        :key="item.key"
        class="menu-item"
        :class="{ active: mode.mode === item.key }"
        type="button"
        role="menuitem"
        @click="select(item.key)"
      >
        <component :is="item.icon" :size="17" :stroke-width="1.7" />
        <span>{{ item.label }}</span>
      </button>
    </aside>
  </Transition>
</template>

<style scoped>
.app-navigation {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 50;
  width: var(--app-rail-width);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 8px 12px;
  background: rgba(10, 12, 16, 0.92);
  border-right: 1px solid var(--line-1);
  backdrop-filter: blur(18px);
}

.brand-mark {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  color: var(--text-1);
  margin-bottom: 26px;
}

.primary-navigation {
  display: contents;
}

.nav-item {
  width: 56px;
  min-height: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: var(--text-4);
  font-size: 10px;
  border-radius: 6px;
  transition: color var(--t-fast) var(--ease), background var(--t-fast) var(--ease);
}

.nav-item:hover,
.nav-item.active {
  color: var(--text-1);
  background: rgba(255, 255, 255, 0.045);
}

.capture-item {
  margin: 10px 0;
  color: var(--text-2);
}

.capture-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--focus);
  color: #111318;
  box-shadow: 0 4px 18px rgba(222, 170, 95, 0.16);
}

.more-trigger {
  margin-top: auto;
}

.more-menu {
  position: fixed;
  left: calc(var(--app-rail-width) + 10px);
  bottom: 12px;
  z-index: 55;
  width: 230px;
  max-height: calc(100vh - 24px);
  overflow-y: auto;
  padding: 10px;
  background: rgba(20, 23, 29, 0.97);
  border: 1px solid var(--line-2);
  border-radius: 8px;
  box-shadow: var(--shadow-2);
  backdrop-filter: blur(20px);
}

.menu-brand {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 6px 8px 12px;
  border-bottom: 1px solid var(--line-1);
  color: var(--text-1);
}

.menu-brand small,
.menu-label {
  color: var(--text-4);
  font-size: 10px;
}

.menu-label {
  padding: 12px 8px 5px;
}

.admin-label {
  border-top: 1px solid var(--line-1);
  margin-top: 6px;
}

.menu-item {
  width: 100%;
  min-height: 36px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 9px;
  border-radius: 5px;
  color: var(--text-3);
  font-size: var(--fs-3);
  text-align: left;
}

.menu-item:hover,
.menu-item.active {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-1);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity var(--t-fast) var(--ease), transform var(--t-fast) var(--ease);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateX(-6px);
}

@media (max-width: 760px) {
  .app-navigation {
    inset: auto 0 0;
    width: auto;
    height: var(--app-mobile-nav-height);
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    padding: 6px max(6px, env(safe-area-inset-right)) max(6px, env(safe-area-inset-bottom)) max(6px, env(safe-area-inset-left));
    border-right: 0;
    border-top: 1px solid var(--line-1);
  }

  .brand-mark {
    display: none;
  }

  .primary-navigation {
    display: contents;
  }

  .nav-item {
    width: 100%;
    min-height: 52px;
  }

  .capture-item {
    margin: 0;
    grid-column: 3;
  }

  .capture-icon {
    width: 36px;
    height: 36px;
  }

  .more-trigger {
    margin: 0;
    grid-column: 5;
  }

  .more-menu {
    left: 12px;
    right: 12px;
    bottom: calc(var(--app-mobile-nav-height) + 10px);
    width: auto;
    max-height: min(62vh, 520px);
  }

  .menu-enter-from,
  .menu-leave-to {
    transform: translateY(6px);
  }
}
</style>
