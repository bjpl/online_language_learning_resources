#!/usr/bin/env node
// ===================================
// Link checker for the review tool
// Checks every resource URL once and writes review_results/link-check.json,
// which the review tool reads to flag dead links, redirects and pages that
// can't be embedded.
//
// Usage:
//   npm run review:check-links                    # check everything not yet checked
//   npm run review:check-links -- --retry-failed  # re-check anything not "ok"
//   npm run review:check-links -- --recheck       # re-check everything
//   npm run review:check-links -- --lang=danish,hindi
//   Options: --concurrency=12 --per-host=2 --timeout=20000
// ===================================
import fs from 'fs';
import path from 'path';
import { loadAllResources, RESULTS_DIR } from './lib/load-data.mjs';
import { checkUrl } from './lib/link-fetch.mjs';
import { isHttpUrl } from '../../tools/review/lib/resources.js';

const OUT_FILE = path.join(RESULTS_DIR, 'link-check.json');

function parseArgs(argv) {
  const opts = { concurrency: 12, perHost: 2, timeout: 20000, recheck: false, retryFailed: false, langs: null };
  for (const arg of argv) {
    const [k, v] = arg.replace(/^--/, '').split('=');
    if (k === 'concurrency') { opts.concurrency = Number(v); }
    else if (k === 'per-host') { opts.perHost = Number(v); }
    else if (k === 'timeout') { opts.timeout = Number(v); }
    else if (k === 'recheck') { opts.recheck = true; }
    else if (k === 'retry-failed') { opts.retryFailed = true; }
    else if (k === 'lang') { opts.langs = new Set(v.split(',')); }
    else { console.error(`Unknown option: ${arg}`); process.exit(1); }
  }
  return opts;
}

function loadExisting() {
  try {
    return JSON.parse(fs.readFileSync(OUT_FILE, 'utf8'));
  } catch {
    return { results: {} };
  }
}

function save(data) {
  data.generatedAt = new Date().toISOString();
  const sorted = Object.fromEntries(Object.entries(data.results).sort(([a], [b]) => a.localeCompare(b)));
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, `${JSON.stringify({ ...data, results: sorted }, null, 1)}\n`);
}

function hostOf(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

async function run() {
  const opts = parseArgs(process.argv.slice(2));
  const resources = await loadAllResources();
  const data = loadExisting();

  const urls = [...new Set(
    resources.filter(r => !opts.langs || opts.langs.has(r.language)).map(r => r.url).filter(isHttpUrl),
  )];
  const todo = urls.filter(u => {
    const prev = data.results[u];
    if (opts.recheck || !prev) { return true; }
    return opts.retryFailed && prev.status !== 'ok';
  });

  console.warn(`${urls.length} unique URLs; ${todo.length} to check (${urls.length - todo.length} already done).`);
  if (!todo.length) {
    printSummary(data, urls);
    return;
  }

  // Simple scheduler: global concurrency plus a per-host cap to stay polite
  const queue = [...todo];
  const activeHosts = new Map();
  let done = 0;
  let sinceSave = 0;
  let stopping = false;
  process.on('SIGINT', () => {
    stopping = true;
    console.warn('\nStopping after in-flight requests finish; progress is saved.');
  });

  async function worker() {
    while (queue.length && !stopping) {
      const idx = queue.findIndex(u => (activeHosts.get(hostOf(u)) || 0) < opts.perHost);
      if (idx === -1) {
        await new Promise(r => setTimeout(r, 100));
        continue;
      }
      const [url] = queue.splice(idx, 1);
      const host = hostOf(url);
      activeHosts.set(host, (activeHosts.get(host) || 0) + 1);
      try {
        data.results[url] = await checkUrl(url, opts);
      } finally {
        activeHosts.set(host, activeHosts.get(host) - 1);
      }
      done++;
      if (++sinceSave >= 25) {
        save(data);
        sinceSave = 0;
      }
      process.stderr.write(`\r  checked ${done}/${todo.length}`);
    }
  }

  await Promise.all(Array.from({ length: opts.concurrency }, worker));
  save(data);
  process.stderr.write('\n');
  printSummary(data, urls);
}

function printSummary(data, urls) {
  const counts = {};
  for (const u of urls) {
    const s = data.results[u]?.status || 'unchecked';
    counts[s] = (counts[s] || 0) + 1;
  }
  console.warn('Results:', counts);
  console.warn(`Wrote ${path.relative(process.cwd(), OUT_FILE)} - reload the review tool to use it.`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
