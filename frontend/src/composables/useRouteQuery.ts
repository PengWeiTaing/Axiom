import { currentBrowserHref, replaceBrowserPath } from '@/composables/useBrowserHistory';

type QueryValue = string | number | boolean | null | undefined;

export function currentRouteParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

export function currentRoutePathname(): string {
  return window.location.pathname;
}

export function currentRoutePathWithSearch(): string {
  return `${window.location.pathname}${window.location.search}`;
}

export function replaceRouteQuery(mode: string, values: Record<string, QueryValue>) {
  if (typeof window === 'undefined') return;
  const url = new URL(currentBrowserHref());
  url.searchParams.set('mode', mode);
  for (const [key, value] of Object.entries(values)) {
    if (value === '' || value === null || value === undefined || value === false) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, String(value));
    }
  }
  const search = url.searchParams.toString();
  replaceBrowserPath(`${url.pathname}${search ? `?${search}` : ''}${url.hash}`);
}
