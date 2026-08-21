import { defineStore } from 'pinia';
import { ref } from 'vue';
import { navigateToPath, pathForRecentBoard } from '@/composables/useAppNavigation';
import { listenToBrowserPopState, pushBrowserPath } from '@/composables/useBrowserHistory';
import { currentRouteParams, currentRoutePathname, currentRoutePathWithSearch } from '@/composables/useRouteQuery';

export type PrimaryMode = 'today' | 'library' | 'atlas';
export type LegacyMode = 'capture' | 'cosmos' | 'recent' | 'processing' | 'search' | 'timeline' | 'tasks' | 'memories' | 'decisions' | 'automation' | 'system' | 'board';
export type AppMode = PrimaryMode | LegacyMode;

const MODES: AppMode[] = ['today', 'library', 'atlas', 'capture', 'cosmos', 'recent', 'processing', 'search', 'timeline', 'tasks', 'memories', 'decisions', 'automation', 'system', 'board'];

function isMode(value: string | null): value is AppMode {
  return Boolean(value && MODES.includes(value as AppMode));
}

function modeFromLocation(): AppMode {
  if (typeof window === 'undefined') return 'today';
  const path = currentRoutePathname().replace(/\/+$/, '') || '/';
  if (path === '/atlas') return 'atlas';
  if (path.startsWith('/board')) return 'board';
  const requested = currentRouteParams().get('mode');
  if (requested === 'capture') return 'today';
  if (requested === 'search') return 'library';
  return isMode(requested) ? requested : 'today';
}

function urlForMode(mode: AppMode): string {
  if (mode === 'atlas') return '/atlas';
  if (mode === 'library' || mode === 'search') return '/app?mode=library';
  if (mode === 'today' || mode === 'capture') return '/app';
  if (mode === 'board') return pathForRecentBoard();
  if (mode === 'cosmos') return '/app?mode=cosmos';
  if (mode === 'tasks') return '/app?mode=tasks';
  if (mode === 'memories') return '/app?mode=memories';
  if (mode === 'decisions') return '/app?mode=decisions';
  if (mode === 'automation') return '/app?mode=automation';
  if (mode === 'system') return '/app?mode=system';
  if (mode === 'timeline') return '/app?mode=timeline';
  if (mode === 'processing') return '/app?mode=processing';
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
      navigateToPath(urlForMode(m));
      return;
    }
    const next = urlForMode(m);
    const current = currentRoutePathWithSearch();
    if (current !== next) pushBrowserPath(next);
  }

  function syncFromLocation() {
    set(modeFromLocation(), false);
  }

  function bindHistory() {
    if (listening || typeof window === 'undefined') return;
    listenToBrowserPopState(syncFromLocation);
    listening = true;
  }

  return { mode, set, bindHistory };
});
