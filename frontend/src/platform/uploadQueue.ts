export interface QueuedRequest {
  id: string;
  url: string;
  method: 'POST' | 'PUT' | 'PATCH';
  body?: unknown;
  headers: Record<string, string>;
  timestamp: number;
  retries: number;
}

interface DeadLetter {
  request: QueuedRequest;
  reason: string;
  failedAt: number;
}

const QUEUE_KEY = 'axiom.upload_queue';
const DEAD_LETTER_KEY = 'axiom.dead_letters';
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

let fetchImpl: typeof fetch = globalThis.fetch.bind(globalThis);

export function setFetchImpl(fn: typeof fetch): void {
  fetchImpl = fn;
}

function loadQueue(): QueuedRequest[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveQueue(queue: QueuedRequest[]): void {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // ignore
  }
}

function loadDeadLetters(): DeadLetter[] {
  try {
    const raw = localStorage.getItem(DEAD_LETTER_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDeadLetters(letters: DeadLetter[]): void {
  try {
    localStorage.setItem(DEAD_LETTER_KEY, JSON.stringify(letters));
  } catch {
    // ignore
  }
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function enqueue(request: Omit<QueuedRequest, 'id' | 'timestamp' | 'retries'>): void {
  const queue = loadQueue();
  queue.push({
    ...request,
    id: generateId(),
    timestamp: Date.now(),
    retries: 0,
  });
  saveQueue(queue);
}

export function getQueueSize(): number {
  return loadQueue().length;
}

export function getDeadLetterCount(): number {
  return loadDeadLetters().length;
}

export function clearQueue(): void {
  saveQueue([]);
}

export function clearDeadLetters(): void {
  saveDeadLetters([]);
}

async function delayForRetry(retryCount: number): Promise<void> {
  const ms = Math.min(BASE_DELAY_MS * Math.pow(2, retryCount), 16000);
  await new Promise((r) => setTimeout(r, ms));
}

export async function processQueue(): Promise<{ succeeded: number; failed: number; deadLettered: number }> {
  const queue = loadQueue();
  if (queue.length === 0) return { succeeded: 0, failed: 0, deadLettered: 0 };

  const remaining: QueuedRequest[] = [];
  let succeeded = 0;
  let deadLettered = 0;

  for (const req of queue) {
    try {
      const init: RequestInit = {
        method: req.method,
        headers: req.headers,
      };
      if (req.body !== undefined) {
        init.headers = { ...init.headers, 'Content-Type': 'application/json' };
        init.body = JSON.stringify(req.body);
      }

      const resp = await fetchImpl(req.url, init);
      if (resp.ok) {
        succeeded++;
        continue;
      }
      // 4xx = client error, don't retry
      if (resp.status >= 400 && resp.status < 500) {
        const letters = loadDeadLetters();
        letters.push({
          request: req,
          reason: `HTTP ${resp.status}: ${resp.statusText}`,
          failedAt: Date.now(),
        });
        saveDeadLetters(letters);
        deadLettered++;
        continue;
      }
      throw new Error(`HTTP ${resp.status}`);
    } catch {
      req.retries++;
      if (req.retries > MAX_RETRIES) {
        const letters = loadDeadLetters();
        letters.push({
          request: req,
          reason: `Exceeded max retries (${MAX_RETRIES})`,
          failedAt: Date.now(),
        });
        saveDeadLetters(letters);
        deadLettered++;
        continue;
      }
      remaining.push(req);
    }
  }

  saveQueue(remaining);

  // retry with backoff for items that weren't terminal failures
  if (remaining.length > 0) {
    await delayForRetry(remaining[0]?.retries ?? 1);
    const sub = await processQueue();
    succeeded += sub.succeeded;
    deadLettered += sub.deadLettered;
  }

  return { succeeded, failed: 0, deadLettered };
}
