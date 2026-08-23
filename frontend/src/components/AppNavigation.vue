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
      <CircleDot :size="23" :stroke-width="1.35" />
      <span class="brand-word">Axiom</span>
      <small>01</small>
    </button>

    <div class="primary-navigation">
      <button
        v-for="item in primaryItems.slice(0, 2)"
        :key="item.key"
        class="nav-item"
        :class="{ active: mode.mode === item.key }"
        :data-mode="item.key"
        type="button"
        @click="select(item.key)"
      >
        <component :is="item.icon" :size="20" :stroke-width="1.45" />
        <span>{{ item.label }}</span>
      </button>

      <button class="nav-item capture-item" type="button" data-mode="capture" @click="emit('capture')">
        <span class="capture-icon"><Plus :size="21" :stroke-width="1.75" /></span>
        <span>记录</span>
      </button>

      <button
        v-for="item in primaryItems.slice(2)"
        :key="item.key"
        class="nav-item"
        :class="{ active: mode.mode === item.key }"
        :data-mode="item.key"
        type="button"
        @click="select(item.key)"
      >
        <component :is="item.icon" :size="20" :stroke-width="1.45" />
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
      <Ellipsis :size="20" :stroke-width="1.45" />
      <span>更多</span>
    </button>
  </nav>

  <Transition name="menu">
    <aside v-if="menuOpen" class="more-menu" role="menu" aria-label="其他视图">
      <header class="menu-brand">
        <div>
          <span>Axiom</span>
          <small>Context index</small>
        </div>
        <i aria-hidden="true" />
      </header>
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
        <component :is="item.icon" :size="17" :stroke-width="1.45" />
        <span>{{ item.label }}</span>
      </button>
      <p class="menu-label admin-label">系统与治理</p>
      <button
        v-for="item in adminItems"
        :key="item.key"
        class="menu-item"
        :class="{ active: mode.mode === item.key }"
        type="button"
        role="menuitem"
        @click="select(item.key)"
      >
        <component :is="item.icon" :size="17" :stroke-width="1.45" />
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
  padding: 14px 0 13px;
  background: rgba(10, 10, 9, 0.86);
  border-right: 1px solid var(--line-1);
  backdrop-filter: blur(22px) saturate(105%);
}

.app-navigation::after {
  content: '';
  position: absolute;
  top: 112px;
  bottom: 88px;
  left: 43px;
  z-index: -1;
  width: 1px;
  background: var(--line-1);
}

.brand-mark {
  position: relative;
  width: 64px;
  min-height: 76px;
  display: grid;
  grid-template-columns: 25px 1fr;
  grid-template-rows: 28px 18px;
  align-content: center;
  align-items: center;
  color: var(--text-1);
  text-align: left;
  margin-bottom: 22px;
}

.brand-mark svg {
  grid-row: 1 / -1;
  color: var(--focus-bright);
  filter: drop-shadow(0 0 7px rgba(225, 165, 88, 0.25));
}

.brand-word {
  align-self: end;
  font-family: var(--font-display);
  font-size: 14px;
  line-height: 1;
}

.brand-mark small {
  align-self: start;
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 8px;
}

.primary-navigation {
  display: contents;
}

.nav-item {
  position: relative;
  width: 72px;
  min-height: 62px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: var(--text-4);
  font-size: 10px;
  transition: color var(--t-base) var(--ease), background var(--t-base) var(--ease), transform var(--t-base) var(--ease);
}

.nav-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 18px;
  width: 1px;
  height: 26px;
  background: transparent;
  transition: width var(--t-base) var(--ease), background var(--t-base) var(--ease);
}

.nav-item:hover {
  color: var(--text-1);
  background: rgba(242, 237, 225, 0.025);
}

.nav-item:focus-visible {
  outline: none;
  color: var(--text-1);
  background: rgba(242, 237, 225, 0.025);
}

.nav-item:focus-visible::after {
  content: '';
  position: absolute;
  top: 8px;
  right: 7px;
  width: 6px;
  height: 6px;
  border-top: 1px solid var(--focus-bright);
  border-right: 1px solid var(--focus-bright);
}

.nav-item.active {
  color: var(--text-1);
}

.nav-item.active::before {
  width: 3px;
  background: var(--focus);
}

.nav-item[data-mode='library'].active::before {
  background: var(--accent);
}

.nav-item[data-mode='atlas'].active::before {
  background: var(--cobalt);
}

.capture-item {
  min-height: 76px;
  color: var(--text-3);
}

.capture-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line-warm);
  border-radius: 50%;
  background: var(--focus-dim);
  color: var(--focus-bright);
  box-shadow: 0 0 28px rgba(225, 165, 88, 0.08);
  transition: transform var(--t-base) var(--ease), background var(--t-base) var(--ease), color var(--t-base) var(--ease);
}

.capture-item:hover .capture-icon {
  transform: rotate(90deg);
  background: var(--focus);
  color: var(--surface-0);
}

.more-trigger {
  margin-top: auto;
}

.more-menu {
  position: fixed;
  left: calc(var(--app-rail-width) + 14px);
  bottom: 14px;
  z-index: 55;
  width: 272px;
  max-height: calc(100vh - 28px);
  overflow-y: auto;
  padding: 16px;
  background: rgba(16, 16, 14, 0.96);
  border: 1px solid var(--line-2);
  border-radius: var(--r-3);
  box-shadow: var(--shadow-2);
  backdrop-filter: var(--glass-blur);
}

.menu-brand {
  min-height: 64px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid var(--line-1);
}

.menu-brand > div {
  display: grid;
  gap: 3px;
}

.menu-brand span {
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 20px;
}

.menu-brand small,
.menu-label {
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 9px;
}

.menu-brand i {
  width: 20px;
  height: 20px;
  border-top: 1px solid var(--focus);
  border-right: 1px solid var(--focus);
}

.menu-label {
  padding: 18px 8px 6px;
}

.admin-label {
  border-top: 1px solid var(--line-1);
  margin-top: 10px;
}

.menu-item {
  width: 100%;
  min-height: 40px;
  display: grid;
  grid-template-columns: 26px 1fr;
  align-items: center;
  gap: 8px;
  padding: 0 8px;
  color: var(--text-3);
  font-size: var(--fs-3);
  text-align: left;
  border-bottom: 1px solid transparent;
}

.menu-item:hover,
.menu-item.active {
  color: var(--text-1);
  border-bottom-color: var(--line-2);
}

.menu-item.active svg {
  color: var(--focus-bright);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity var(--t-base) var(--ease), transform var(--t-base) var(--ease);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

@media (max-width: 760px) {
  .app-navigation {
    inset: auto 0 0;
    width: auto;
    height: var(--app-mobile-nav-height);
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    padding: 5px max(6px, env(safe-area-inset-right)) max(5px, env(safe-area-inset-bottom)) max(6px, env(safe-area-inset-left));
    border-right: 0;
    border-top: 1px solid var(--line-1);
  }

  .app-navigation::after,
  .brand-mark {
    display: none;
  }

  .primary-navigation {
    display: contents;
  }

  .nav-item {
    width: 100%;
    min-height: 60px;
  }

  .nav-item::before {
    top: 0;
    right: 22%;
    left: 22%;
    width: auto;
    height: 1px;
  }

  .nav-item.active::before {
    width: auto;
    height: 2px;
  }

  .capture-item {
    grid-column: 3;
  }

  .capture-icon {
    width: 39px;
    height: 39px;
  }

  .more-trigger {
    grid-column: 5;
    margin: 0;
  }

  .more-menu {
    left: 10px;
    right: 10px;
    bottom: calc(var(--app-mobile-nav-height) + 10px);
    width: auto;
    max-height: min(68vh, 560px);
  }

  .menu-enter-from,
  .menu-leave-to {
    transform: translateY(10px);
  }
}
</style>
