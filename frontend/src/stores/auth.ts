import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { setKeyGetter, apiRequest, ApiError } from '@/api/client';

const STORAGE_KEY = 'axiom.key';

export const useAuthStore = defineStore('auth', () => {
  const key = ref<string>(localStorage.getItem(STORAGE_KEY) ?? '');
  const verified = ref<boolean>(false);
  const verifying = ref<boolean>(false);
  const lastError = ref<string | null>(null);

  const hasKey = computed(() => key.value.length > 0);
  const ready = computed(() => hasKey.value && verified.value);

  // 注入到 api client，让所有 apiRequest 自动带 key
  setKeyGetter(() => key.value || null);

  async function verify(): Promise<boolean> {
    if (!hasKey.value) return false;
    verifying.value = true;
    lastError.value = null;
    try {
      // /stats 是带 key 鉴权的轻量端点。
      // 用它探活既能验证后端可达，又能确认 key 有效。
      await apiRequest('/stats');
      verified.value = true;
      return true;
    } catch (err) {
      verified.value = false;
      lastError.value = err instanceof ApiError ? err.message : '连接失败';
      return false;
    } finally {
      verifying.value = false;
    }
  }

  function setKey(value: string) {
    key.value = value.trim();
    if (key.value) {
      localStorage.setItem(STORAGE_KEY, key.value);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    verified.value = false;
  }

  function clear() {
    setKey('');
  }

  return { key, verified, verifying, lastError, hasKey, ready, verify, setKey, clear };
});
