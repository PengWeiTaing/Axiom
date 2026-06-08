function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readStoredJson<T>(key: string, fallback: T): T {
  const storage = getLocalStorage();
  if (!storage) return fallback;
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

export function writeStoredJson<T>(key: string, value: T): boolean {
  const storage = getLocalStorage();
  if (!storage) return false;
  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function readStoredValue(key: string, fallback = ''): string {
  const storage = getLocalStorage();
  if (!storage) return fallback;
  try {
    return storage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeStoredValue(key: string, value: string): boolean {
  const storage = getLocalStorage();
  if (!storage) return false;
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function removeStoredValue(key: string): boolean {
  const storage = getLocalStorage();
  if (!storage) return false;
  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}
