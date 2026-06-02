import { defineStore } from 'pinia';
import { ref } from 'vue';

export type AppMode = 'capture' | 'atlas' | 'recent' | 'tasks' | 'memories' | 'automation' | 'board';

const MODES: AppMode[] = ['capture', 'atlas', 'recent', 'tasks', 'memories', 'automation', 'board'];

function isMode(value: string | null): value is AppMode {
  return Boolean(value && MODES.includes(value as AppMode));
}

function modeFromLocation(): AppMode {
  if (typeof window === 'undefined') return 'capture';
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/atlas') return 'atlas';
  if (path.startsWith('/board')) return 'board';
  const requested = new URLSearchParams(window.location.search).get('mode');
  return isMode(requested) ? requested : 'capture';
}

function urlForMode(mode: AppMode): string {
  if (mode === 'atlas') return '/atlas';
  if (mode === 'board') {
    const recent = localStorage.getItem('axiom_board_recent');
    return recent ? `/board/${recent}` : '/board';
  }
  if (mode === 'tasks') return '/app?mode=tasks';
  if (mode === 'memories') return '/app?mode=memories';
  if (mode === 'automation') return '/app?mode=automation';
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
    const current = `${window.location.pathname}${window.location.search}`;
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
