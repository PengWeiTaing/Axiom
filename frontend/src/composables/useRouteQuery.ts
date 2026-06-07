type QueryValue = string | number | boolean | null | undefined;

export function currentRouteParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

export function replaceRouteQuery(mode: string, values: Record<string, QueryValue>) {
  const url = new URL(window.location.href);
  url.searchParams.set('mode', mode);
  for (const [key, value] of Object.entries(values)) {
    if (value === '' || value === null || value === undefined || value === false) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, String(value));
    }
  }
  const search = url.searchParams.toString();
  window.history.replaceState(null, '', `${url.pathname}${search ? `?${search}` : ''}${url.hash}`);
}
