// Turn a raw fetch outcome into a review status.
//   ok             reachable, same page
//   redirect       reachable, but now lives at a different URL (finalUrl is the suggestion)
//   redirect-home  a deep link that now lands on the site's homepage (page likely removed)
//   dead           404/410, or the domain/server no longer exists
//   blocked        bot protection or login wall (401/403/429, Cloudflare...) - needs a human
//   error          other HTTP errors or TLS problems
//   timeout        no response in time

const DEAD_NETWORK_CODES = new Set(['ENOTFOUND', 'ECONNREFUSED', 'EHOSTUNREACH', 'ENETUNREACH']);
const BLOCKED_HTTP = new Set([401, 403, 429]);

function stripForCompare(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase().replace(/^www\./, '');
    const path = u.pathname.replace(/\/+$/, '') || '/';
    return { host, path, query: u.search };
  } catch {
    return null;
  }
}

/**
 * Is `finalUrl` meaningfully different from `url`? Ignores http→https,
 * www, trailing slashes, and tracking/locale query strings.
 * Returns 'same' | 'home' | 'moved'.
 */
export function compareUrls(url, finalUrl) {
  const a = stripForCompare(url);
  const b = stripForCompare(finalUrl);
  if (!a || !b) {
    return 'same';
  }
  const samePage = a.host === b.host && a.path.toLowerCase() === b.path.toLowerCase();
  if (samePage) {
    return 'same';
  }
  const wasDeep = a.path !== '/';
  const isRoot = b.path === '/' || /^\/[a-z]{2}(-[a-z]{2})?$/i.test(b.path);
  if (wasDeep && isRoot) {
    return 'home';
  }
  return 'moved';
}

/** Sites that refuse to be shown in an iframe. Returns true/false/null (unknown). */
export function isEmbeddable(headers) {
  if (!headers) {
    return null;
  }
  const xfo = (headers['x-frame-options'] || '').toLowerCase();
  if (xfo.includes('deny') || xfo.includes('sameorigin')) {
    return false;
  }
  const csp = (headers['content-security-policy'] || '').toLowerCase();
  const fa = csp.match(/frame-ancestors([^;]*)/);
  if (fa && !/(^|\s)\*(\s|$)/.test(fa[1])) {
    return false;
  }
  return true;
}

/**
 * outcome: { url, code?, finalUrl?, headers?, errorCode?, errorMessage?, timedOut? }
 */
export function classify(outcome) {
  const { url, code, finalUrl, headers, errorCode, errorMessage, timedOut } = outcome;
  const base = { code: code || undefined, finalUrl: finalUrl && finalUrl !== url ? finalUrl : undefined };

  if (timedOut) {
    return { ...base, status: 'timeout', error: 'No response within time limit' };
  }
  if (!code) {
    if (DEAD_NETWORK_CODES.has(errorCode)) {
      return { ...base, status: 'dead', error: errorCode === 'ENOTFOUND' ? 'Domain not found' : errorCode };
    }
    return { ...base, status: 'error', error: errorCode || errorMessage || 'Request failed' };
  }

  const server = (headers?.server || '').toLowerCase();
  const botWall = server.includes('cloudflare') || headers?.['cf-mitigated'] || server.includes('akamai');

  if (code === 404 || code === 410) {
    return { ...base, status: 'dead' };
  }
  if (BLOCKED_HTTP.has(code) || (code === 503 && botWall)) {
    return { ...base, status: 'blocked' };
  }
  if (code >= 400) {
    return { ...base, status: 'error' };
  }

  const embeddable = isEmbeddable(headers);
  const moved = finalUrl ? compareUrls(url, finalUrl) : 'same';
  if (moved === 'home') {
    return { ...base, status: 'redirect-home', embeddable };
  }
  if (moved === 'moved') {
    return { ...base, status: 'redirect', embeddable };
  }
  // Same page; still suggest the canonical URL if only the scheme changed (http → https)
  const upgraded = finalUrl && url.startsWith('http://') && finalUrl.startsWith('https://');
  return { ...base, status: upgraded ? 'redirect' : 'ok', embeddable, finalUrl: upgraded ? finalUrl : undefined };
}
