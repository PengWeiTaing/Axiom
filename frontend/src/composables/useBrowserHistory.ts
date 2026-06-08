export function assignBrowserPath(path: string): void {
  if (typeof window === 'undefined') return;
  window.location.href = path;
}

export function currentBrowserHref(): string {
  return typeof window === 'undefined' ? 'http://localhost/' : window.location.href;
}

export function pushBrowserPath(path: string): void {
  if (typeof window === 'undefined') return;
  window.history.pushState({}, '', path);
}

export function replaceBrowserPath(path: string): void {
  if (typeof window === 'undefined') return;
  window.history.replaceState(null, '', path);
}

export function listenToBrowserPopState(listener: (event: PopStateEvent) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('popstate', listener);
  return () => window.removeEventListener('popstate', listener);
}
