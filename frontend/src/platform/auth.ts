export interface TokenStore {
  getToken(): string | null;
  setToken(token: string): void;
  clearToken(): void;
  hasToken(): boolean;
}

const STORAGE_KEY = 'axiom.key';

function read(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function write(token: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, token);
  } catch {
    // storage full or unavailable — silently ignore
  }
}

function remove(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
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
