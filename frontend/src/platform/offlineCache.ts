const DB_NAME = 'axiom_cache';
const DB_VERSION = 1;

const STORES = {
  api_responses: { keyPath: 'key' },
  drafts: { keyPath: 'key' },
  generation_cache: { keyPath: 'key' },
} as const;

interface CacheEntry {
  key: string;
  data: unknown;
  expiresAt: number; // 0 = no expiration
}

const DEFAULT_TTL_MS = 5 * 60 * 1000; // 5 minutes

let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;
      for (const [name, opts] of Object.entries(STORES)) {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, opts);
        }
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    req.onblocked = () => reject(new Error('IndexedDB blocked'));
  });

  return dbPromise;
}

export function openCache(): Promise<IDBDatabase> {
  return openDB();
}

function storeOp(
  storeName: keyof typeof STORES,
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest,
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const tx = db.transaction(storeName, mode);
      const store = tx.objectStore(storeName);
      fn(store);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    } catch (err) {
      reject(err);
    }
  });
}

function storeGet<T>(storeName: keyof typeof STORES, key: string): Promise<T | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => {
        const entry = req.result as CacheEntry | undefined;
        if (!entry) return resolve(null);
        if (entry.expiresAt && Date.now() > entry.expiresAt) {
          // expired — clean up asynchronously
          store.delete(key);
          return resolve(null);
        }
        resolve(entry.data as T);
      };
      req.onerror = () => reject(req.error);
    } catch (err) {
      reject(err);
    }
  });
}

export function cacheResponse(key: string, data: unknown, ttlMs = DEFAULT_TTL_MS): Promise<void> {
  const expiresAt = ttlMs > 0 ? Date.now() + ttlMs : 0;
  return storeOp('api_responses', 'readwrite', (store) =>
    store.put({ key, data, expiresAt }),
  );
}

export function getCachedResponse<T>(key: string): Promise<T | null> {
  return storeGet<T>('api_responses', key);
}

export function saveDraft(key: string, data: unknown): Promise<void> {
  return storeOp('drafts', 'readwrite', (store) =>
    store.put({ key, data, expiresAt: 0 }),
  );
}

export function getDraft<T>(key: string): Promise<T | null> {
  return storeGet<T>('drafts', key);
}

export function deleteDraft(key: string): Promise<void> {
  return storeOp('drafts', 'readwrite', (store) => store.delete(key));
}

export function clearExpired(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const tx = db.transaction(['api_responses', 'generation_cache'], 'readwrite');
      const now = Date.now();

      for (const name of ['api_responses', 'generation_cache'] as const) {
        const store = tx.objectStore(name);
        const req = store.openCursor();
        req.onsuccess = () => {
          const cursor = req.result;
          if (!cursor) return;
          const entry = cursor.value as CacheEntry;
          if (entry.expiresAt && now > entry.expiresAt) {
            cursor.delete();
          }
          cursor.continue();
        };
      }

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    } catch (err) {
      reject(err);
    }
  });
}
