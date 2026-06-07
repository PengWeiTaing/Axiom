import { defineStore } from 'pinia';
import { ref } from 'vue';
import { currentRouteParams, currentRoutePathname, currentRoutePathWithSearch } from '@/composables/useRouteQuery';

export type AppMode = 'capture' | 'atlas' | 'cosmos' | 'recent' | 'processing' | 'search' | 'timeline' | 'tasks' | 'memories' | 'decisions' | 'automation' | 'system' | 'board';

const MODES: AppMode[] = ['capture', 'atlas', 'cosmos', 'recent', 'processing', 'search', 'timeline', 'tasks', 'memories', 'decisions', 'automation', 'system', 'board'];

function isMode(value: string | null): value is AppMode {
  return Boolean(value && MODES.includes(value as AppMode));
}

function modeFromLocation(): AppMode {
  if (typeof window === 'undefined') return 'capture';
  const path = currentRoutePathname().replace(/\/+$/, '') || '/';
  if (path === '/atlas') return 'atlas';
  if (path.startsWith('/board')) return 'board';
  const requested = currentRouteParams().get('mode');
  return isMode(requested) ? requested : 'capture';
}

function urlForMode(mode: AppMode): string {
  if (mode === 'atlas') return '/atlas';
  if (mode === 'board') {
    const recent = localStorage.getItem('axiom_board_recent');
    return recent ? `/board/${recent}` : '/board';
  }
  if (mode === 'cosmos') return '/app?mode=cosmos';
  if (mode === 'tasks') return '/app?mode=tasks';
  if (mode === 'memories') return '/app?mode=memories';
  if (mode === 'decisions') return '/app?mode=decisions';
  if (mode === 'automation') return '/app?mode=automation';
  if (mode === 'system') return '/app?mode=system';
  if (mode === 'timeline') return '/app?mode=timeline';
  if (mode === 'processing') return '/app?mode=processing';
  if (mode === 'search') return '/app?mode=search';
  if (mode === 'recent') return '/app?mode=recent';
  return '/app';
}

export const useModeStore = defineStore('mode', () => {
  const mode = ref<AppMode>(modeFromLocation());
  let listening = false;

  function set(m: AppMode, updateUrl = true) {
    mode.value = m;
    if (!updateUrl || typeof window === 'undefined') return;
    if (m === 'board') {
      window.location.href = urlForMode(m);
      return;
    }
    const next = urlForMode(m);
    const current = currentRoutePathWithSearch();
    if (current !== next) window.history.pushState({}, '', next);
  }

  function syncFromLocation() {
    set(modeFromLocation(), false);
  }

  function bindHistory() {
    if (listening || typeof window === 'undefined') return;
    window.addEventListener('popstate', syncFromLocation);
    listening = true;
  }

  return { mode, set, bindHistory };
});
