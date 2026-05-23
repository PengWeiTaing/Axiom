/*
 * Mode store — Capture / Atlas 切换
 *
 * 不持久化。每次刷新都从 Capture 进，这是有意的——
 * 让 Atlas 永远是"被主动走进的"，不是默认。
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';

export type AppMode = 'capture' | 'atlas' | 'recent';

export const useModeStore = defineStore('mode', () => {
  const mode = ref<AppMode>('capture');

  function set(m: AppMode) {
    mode.value = m;
  }

  return { mode, set };
});
