<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, type Component } from 'vue';
import {
  Archive,
  Brain,
  CalendarDays,
  CheckSquare2,
  CircleDot,
  FileStack,
  GitFork,
  Inbox,
  LibraryBig,
  ListTodo,
  Menu,
  Orbit,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  Workflow,
  X,
} from '@lucide/vue';
import { useModeStore, type AppMode, type PrimaryMode } from '@/stores/mode';

const emit = defineEmits<{ capture: [] }>();
const mode = useModeStore();
const indexOpen = ref(false);

const primaryItems: { key: PrimaryMode; label: string; index: string; icon: Component }[] = [
  { key: 'today', label: '此刻', index: '01', icon: CircleDot },
  { key: 'library', label: '资料库', index: '02', icon: LibraryBig },
  { key: 'atlas', label: 'Atlas', index: '03', icon: Orbit },
];

const contextItems: { key: AppMode; label: string; code: string; icon: Component }[] = [
  { key: 'processing', label: '待整理', code: 'INPUT', icon: Inbox },
  { key: 'tasks', label: '行动', code: 'ACTION', icon: ListTodo },
  { key: 'memories', label: '记忆', code: 'MEMORY', icon: Brain },
  { key: 'decisions', label: '决定', code: 'DECISION', icon: GitFork },
  { key: 'timeline', label: '时间', code: 'TIMELINE', icon: CalendarDays },
  { key: 'recent', label: '回顾', code: 'RECENT', icon: Archive },
];

const systemItems: { key: AppMode; label: string; icon: Component }[] = [
  { key: 'cosmos', label: '结构校准', icon: SlidersHorizontal },
  { key: 'automation', label: '自动化', icon: Workflow },
  { key: 'system', label: '系统状态', icon: Settings },
];

function isTextLikeElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable;
}

function select(next: AppMode) {
  indexOpen.value = false;
  mode.set(next);
}

function openSearch() {
  indexOpen.value = false;
  mode.set('library');
  nextTick(() => window.dispatchEvent(new CustomEvent('axiom:focus-search')));
}

function openCapture() {
  indexOpen.value = false;
  emit('capture');
}

function onWindowKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && indexOpen.value) {
    event.preventDefault();
    indexOpen.value = false;
    return;
  }
  if (isTextLikeElement(event.target)) return;
  if (event.key === '/' || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) {
    event.preventDefault();
    openSearch();
    return;
  }
  if (!event.ctrlKey && !event.metaKey && !event.altKey && event.key.toLowerCase() === 'n') {
    event.preventDefault();
    openCapture();
  }
}

onMounted(() => window.addEventListener('keydown', onWindowKeydown));
onBeforeUnmount(() => window.removeEventListener('keydown', onWindowKeydown));
</script>

<template>
  <nav class="app-navigation" :class="{ 'over-atlas': mode.mode === 'atlas' }" aria-label="主要导航">
    <button class="brand" type="button" aria-label="返回此刻" @click="select('today')">
      <span class="brand-name">Axiom</span>
      <span class="brand-state">personal cortex</span>
    </button>

    <div class="primary-navigation">
      <button
        v-for="item in primaryItems.slice(0, 2)"
        :key="item.key"
        class="chapter-link"
        :class="{ active: mode.mode === item.key }"
        type="button"
        @click="select(item.key)"
      >
        <component :is="item.icon" class="chapter-icon" :size="18" :stroke-width="1.55" />
        <span>{{ item.label }}</span>
        <small>{{ item.index }}</small>
      </button>

      <button class="capture-link" type="button" title="记录（N）" aria-label="记录" @click="openCapture">
        <Plus :size="19" :stroke-width="1.8" />
        <span>记录</span>
      </button>

      <button
        v-for="item in primaryItems.slice(2)"
        :key="item.key"
        class="chapter-link"
        :class="{ active: mode.mode === item.key }"
        type="button"
        @click="select(item.key)"
      >
        <component :is="item.icon" class="chapter-icon" :size="18" :stroke-width="1.55" />
        <span>{{ item.label }}</span>
        <small>{{ item.index }}</small>
      </button>
    </div>

    <div class="nav-tools">
      <button class="tool-link search-link" type="button" title="找回（/）" aria-label="找回" @click="openSearch">
        <Search :size="18" :stroke-width="1.55" />
      </button>
      <button
        class="tool-link index-link"
        :class="{ active: indexOpen || !['today', 'library', 'atlas'].includes(mode.mode) }"
        type="button"
        title="索引"
        aria-label="打开索引"
        :aria-expanded="indexOpen"
        @click="indexOpen = true"
      >
        <Menu :size="19" :stroke-width="1.55" />
        <span>索引</span>
      </button>
    </div>
  </nav>

  <Transition name="index-sheet">
    <aside v-if="indexOpen" class="index-sheet" aria-label="Axiom 索引">
      <header class="index-head">
        <div>
          <span class="index-kicker">Axiom / Index</span>
          <h2>索引</h2>
        </div>
        <button type="button" title="关闭" aria-label="关闭索引" @click="indexOpen = false">
          <X :size="22" :stroke-width="1.45" />
        </button>
      </header>

      <div class="index-body">
        <section class="index-context">
          <p>在需要时进入</p>
          <button
            v-for="(item, itemIndex) in contextItems"
            :key="item.key"
            type="button"
            :class="{ active: mode.mode === item.key }"
            @click="select(item.key)"
          >
            <span class="index-number">{{ String(itemIndex + 1).padStart(2, '0') }}</span>
            <component :is="item.icon" :size="17" :stroke-width="1.45" />
            <strong>{{ item.label }}</strong>
            <small>{{ item.code }}</small>
          </button>
        </section>

        <section class="index-system">
          <p>校准与治理</p>
          <button
            v-for="item in systemItems"
            :key="item.key"
            type="button"
            :class="{ active: mode.mode === item.key }"
            @click="select(item.key)"
          >
            <component :is="item.icon" :size="15" :stroke-width="1.45" />
            <span>{{ item.label }}</span>
          </button>
        </section>
      </div>

      <footer class="index-foot">
        <FileStack :size="15" />
        <span>PRIVATE INDEX / 06 + 03</span>
        <CheckSquare2 :size="15" />
      </footer>
    </aside>
  </Transition>
</template>

<style scoped>
.app-navigation {
  position: fixed;
  inset: 0 0 auto;
  z-index: 60;
  height: var(--app-header-height);
  display: grid;
  grid-template-columns: minmax(210px, 1fr) auto minmax(210px, 1fr);
  align-items: stretch;
  padding: 0 28px;
  color: var(--text-2);
  background: rgba(11, 14, 12, 0.97);
  border-bottom: 1px solid var(--line-2);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.16);
}

.brand {
  position: relative;
  width: max-content;
  display: grid;
  grid-template-columns: auto auto;
  align-items: baseline;
  align-content: center;
  gap: 13px;
  padding-left: 17px;
  text-align: left;
}

.brand::before {
  content: '';
  position: absolute;
  top: 18px;
  bottom: 18px;
  left: 0;
  width: 3px;
  background: var(--focus);
}

.brand-name {
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 21px;
  font-weight: 650;
  line-height: 1;
}

.brand-state {
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 560;
}

.primary-navigation {
  display: flex;
  align-items: stretch;
}

.chapter-link {
  position: relative;
  min-width: 106px;
  display: grid;
  grid-template-columns: auto auto;
  align-content: center;
  justify-content: center;
  gap: 0 7px;
  color: var(--text-4);
  font-size: 13px;
  font-weight: 560;
}

.chapter-link::after {
  content: '';
  position: absolute;
  right: 18px;
  bottom: -1px;
  left: 18px;
  height: 3px;
  background: transparent;
}

.chapter-link small {
  grid-column: 2;
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 11px;
}

.chapter-icon {
  display: none;
}

.chapter-link:hover,
.chapter-link.active {
  color: var(--text-1);
}

.app-navigation button:focus-visible {
  outline: none;
  background: var(--surface-2);
}

.chapter-link.active::after {
  background: var(--text-1);
}

.capture-link {
  width: 62px;
  display: grid;
  place-items: center;
  color: var(--focus);
}

.capture-link span {
  display: none;
}

.capture-link svg {
  width: 34px;
  height: 34px;
  padding: 7px;
  color: var(--surface-0);
  background: var(--focus);
  border: 1px solid var(--focus);
  border-radius: 50%;
  transition: color var(--t-base) var(--ease), background var(--t-base) var(--ease), transform var(--t-base) var(--ease);
}

.capture-link:hover svg {
  color: var(--text-1);
  background: transparent;
  transform: scale(1.06);
}

.nav-tools {
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
}

.tool-link {
  width: 52px;
  display: grid;
  place-items: center;
  color: var(--text-3);
}

.tool-link:hover,
.tool-link.active {
  color: var(--text-1);
}

.index-link {
  width: 76px;
  grid-template-columns: auto auto;
  gap: 7px;
  font-size: 12px;
  font-weight: 560;
}

.index-sheet {
  position: fixed;
  inset: 0;
  z-index: 100;
  overflow-y: auto;
  padding: 46px clamp(28px, 6vw, 96px) 28px;
  color: var(--text-2);
  background: var(--surface-0);
}

.index-sheet::before {
  content: '';
  position: fixed;
  top: 0;
  bottom: 0;
  left: 36%;
  width: 1px;
  width: 3px;
  background: var(--focus);
  pointer-events: none;
}

.index-head {
  min-height: 190px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 32px;
  border-bottom: 1px solid var(--line-2);
}

.index-kicker,
.index-context > p,
.index-system > p {
  color: var(--focus);
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
}

.index-head h2 {
  margin-top: 21px;
  color: var(--text-1);
  font-family: var(--font-display);
  font-size: 42px;
  font-weight: 640;
  line-height: 1.38;
}

.index-head > button {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  color: var(--text-3);
  border: 1px solid var(--line-2);
}

.index-head > button:hover {
  color: var(--surface-1);
  background: var(--text-1);
}

.index-body {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(240px, 1fr);
  gap: clamp(42px, 8vw, 130px);
  padding: 44px 0 52px;
}

.index-context,
.index-system {
  min-width: 0;
}

.index-context > p,
.index-system > p {
  margin-bottom: 18px;
  color: var(--text-5);
}

.index-context > button {
  width: 100%;
  min-height: 70px;
  display: grid;
  grid-template-columns: 28px 24px minmax(100px, 0.55fr) minmax(180px, 1fr);
  align-items: center;
  gap: 12px;
  text-align: left;
  border-top: 1px solid var(--line-1);
}

.index-context > button:last-child {
  border-bottom: 1px solid var(--line-1);
}

.index-context > button:hover,
.index-context > button.active {
  padding-left: 8px;
  color: var(--focus);
}

.index-number {
  color: var(--text-5);
  font-family: var(--font-mono);
  font-size: 11px;
}

.index-context strong {
  color: var(--text-1);
  font-size: 16px;
  font-weight: 620;
}

.index-context small {
  color: var(--text-4);
  font-family: var(--font-mono);
  font-size: 11px;
  text-align: right;
}

.index-system > button {
  width: 100%;
  min-height: 48px;
  display: grid;
  grid-template-columns: 25px 1fr;
  align-items: center;
  gap: 8px;
  color: var(--text-3);
  text-align: left;
  border-top: 1px solid var(--line-1);
}

.index-system > button:hover,
.index-system > button.active {
  color: var(--text-1);
}

.index-foot {
  min-height: 50px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-4);
  font-family: var(--font-mono);
  font-size: 11px;
  border-top: 1px solid var(--line-2);
}

.index-foot svg:last-child {
  margin-left: auto;
}

.index-sheet-enter-active,
.index-sheet-leave-active {
  transition: clip-path var(--t-slow) var(--ease), opacity var(--t-base) var(--ease);
}

.index-sheet-enter-from,
.index-sheet-leave-to {
  opacity: 0;
  clip-path: inset(0 0 100% 0);
}

@media (max-width: 760px) {
  .app-navigation {
    inset: auto 0 0;
    height: var(--app-mobile-nav-height);
    grid-template-columns: repeat(5, minmax(0, 1fr));
    padding: 0 max(4px, env(safe-area-inset-right)) env(safe-area-inset-bottom) max(4px, env(safe-area-inset-left));
    background: rgba(11, 14, 12, 0.985);
    border-top: 1px solid var(--line-2);
    border-bottom: 0;
  }

  .brand {
    display: none;
  }

  .primary-navigation,
  .nav-tools {
    display: contents;
  }

  .chapter-link {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
    font-size: 11px;
  }

  .chapter-link::after {
    top: 0;
    right: 26%;
    bottom: auto;
    left: 26%;
  }

  .chapter-link small {
    display: none;
  }

  .chapter-icon {
    display: block;
  }

  .capture-link {
    width: auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 11px;
  }

  .capture-link span {
    display: block;
  }

  .capture-link svg {
    width: 30px;
    height: 30px;
    padding: 6px;
  }

  .search-link {
    display: none;
  }

  .index-link {
    width: auto;
    display: flex;
    flex-direction: column;
    gap: 3px;
    font-size: 11px;
  }

  .index-sheet {
    padding: 28px 20px calc(var(--app-mobile-nav-height) + 28px);
  }

  .index-sheet::before {
    display: none;
  }

  .index-head {
    min-height: 150px;
  }

  .index-head h2 {
    font-size: 28px;
  }

  .index-body {
    grid-template-columns: 1fr;
    gap: 42px;
    padding-top: 30px;
  }

  .index-context > button {
    grid-template-columns: 24px 22px minmax(0, 1fr);
    min-height: 62px;
  }

  .index-context small {
    display: none;
  }
}
</style>
