import { readStoredValue, removeStoredValue, writeStoredValue } from '@/composables/useLocalStorage';

export interface TokenStore {
  getToken(): string | null;
  setToken(token: string): void;
  clearToken(): void;
  hasToken(): boolean;
}

const STORAGE_KEY = 'axiom.key';

function read(): string | null {
  return readStoredValue(STORAGE_KEY, '') || null;
}

function write(token: string): void {
  writeStoredValue(STORAGE_KEY, token);
}

function remove(): void {
  removeStoredValue(STORAGE_KEY);
}

export const tokenStore: TokenStore = {
  getToken: read,
  setToken: write,
  clearToken: remove,
  hasToken: (): boolean => {
    const t = read();
    return t !== null && t.length > 0;
  },
};
