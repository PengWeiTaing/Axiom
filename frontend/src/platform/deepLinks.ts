const SCHEME = 'axiom';

interface ParsedDeepLink {
  route: string;
  params: Record<string, string>;
}

const PATTERNS: Array<{ pattern: RegExp; route: string }> = [
  { pattern: /^axiom:\/\/capture\/?$/, route: 'capture' },
  { pattern: /^axiom:\/\/atlas\/?$/, route: 'atlas' },
  { pattern: /^axiom:\/\/board\/([^/?]+)/, route: 'board' },
  { pattern: /^axiom:\/\/review\/?$/, route: 'review' },
  { pattern: /^axiom:\/\/search/, route: 'search' },
  { pattern: /^axiom:\/\/cosmos\/?$/, route: 'cosmos' },
  { pattern: /^axiom:\/\/item\/(\d+)/, route: 'item' },
];

export function parseDeepLink(url: string): ParsedDeepLink | null {
  if (!url.startsWith(SCHEME + '://')) return null;

  for (const { pattern, route } of PATTERNS) {
    const match = url.match(pattern);
    if (!match) continue;

    const params: Record<string, string> = {};

    if (route === 'board' || route === 'item') {
      params.id = match[1];
    }

    if (route === 'search') {
      const q = extractQueryParam(url, 'q');
      if (q) params.q = q;
    }

    return { route, params };
  }

  return null;
}

export function buildDeepLink(route: string, params: Record<string, string> = {}): string {
  switch (route) {
    case 'capture':
      return `${SCHEME}://capture`;
    case 'atlas':
      return `${SCHEME}://atlas`;
    case 'board':
      return `${SCHEME}://board/${params.id ?? ''}`;
    case 'review':
      return `${SCHEME}://review`;
    case 'search': {
      const q = params.q ? `?q=${encodeURIComponent(params.q)}` : '';
      return `${SCHEME}://search${q}`;
    }
    case 'cosmos':
      return `${SCHEME}://cosmos`;
    case 'item':
      return `${SCHEME}://item/${params.id ?? ''}`;
    default:
      return `${SCHEME}://capture`;
  }
}

function extractQueryParam(url: string, param: string): string | null {
  try {
    const idx = url.indexOf('?');
    if (idx === -1) return null;
    const qs = url.slice(idx + 1);
    const params = new URLSearchParams(qs);
    return params.get(param);
  } catch {
    return null;
  }
}
