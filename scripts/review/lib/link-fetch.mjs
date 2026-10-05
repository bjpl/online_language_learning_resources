// Fetch a URL the way a browser would and classify the outcome.
import { classify } from './link-classify.mjs';

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const MAX_REDIRECTS = 10;

/** GET a URL following redirects by hand so the final URL and headers are known. */
export async function fetchOutcome(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  let current = url;
  try {
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      const res = await fetch(current, {
        redirect: 'manual',
        signal: controller.signal,
        headers: {
          'User-Agent': USER_AGENT,
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });
      res.body?.cancel().catch(() => {});
      const location = res.headers.get('location');
      if (res.status >= 300 && res.status < 400 && location) {
        current = new URL(location, current).href;
        continue;
      }
      return { url, code: res.status, finalUrl: current, headers: Object.fromEntries(res.headers) };
    }
    return { url, errorCode: 'TOO_MANY_REDIRECTS' };
  } catch (err) {
    if (controller.signal.aborted) {
      return { url, timedOut: true };
    }
    return { url, errorCode: err.cause?.code || err.code, errorMessage: err.cause?.message || err.message };
  } finally {
    clearTimeout(timer);
  }
}

export async function checkUrl(url, opts = { timeout: 20000 }) {
  const started = Date.now();
  let result = classify(await fetchOutcome(url, opts.timeout));
  // One retry for transient failures before reporting them
  if (['timeout', 'error'].includes(result.status)) {
    await new Promise(r => setTimeout(r, 1500));
    result = classify(await fetchOutcome(url, opts.timeout));
  }
  return { ...result, ms: Date.now() - started, checkedAt: new Date().toISOString() };
}

