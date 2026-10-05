// ===================================
// Resource Review tool
// Loads every language data file, overlays automated signals (link check,
// the unapplied 2025 review, duplicates) and records keep/delete/edit/skip
// decisions for scripts/review/apply-decisions.mjs.
// ===================================
import { LanguageLoader } from '../../assets/js/language-loader.js';
import {
  RESOURCE_TYPES,
  flattenLanguage,
  assignIds,
  buildUrlIndex,
  buildPriorReviewIndex,
  assess,
  siblingsOf,
  isHttpUrl,
  buildExport,
  mergeDecisions,
  reconcileDecisions,
} from './lib/resources.js';

const STORAGE_KEY = 'resourceReview.v4';
const DATA_ROOT = '../../assets/js/language-data/';
const RESULTS_ROOT = '../../review_results/';
const DISK_ENDPOINT = '/__review/decisions';
const DISK_SAVE_DELAY = 1000;
const QUEUE_AHEAD = 80;
const QUEUE_BEHIND = 4;

const state = {
  resources: [],
  byId: new Map(),
  assessments: new Map(),
  urlIndex: new Map(),
  linkCheck: null,
  decisions: {},
  filters: { lang: 'all', type: 'all', status: 'undecided', link: 'any', order: 'attention', search: '' },
  settings: { companion: false, preview: true },
  view: [],
  pos: 0,
  draft: null,
  pendingDecision: null,
  undo: [],
  session: { started: Date.now(), times: [] },
  exportedCount: 0,
  lastExportAt: null,
  // Saving into the repo through the local server (npm run review)
  disk: { available: false, saving: false, savedAt: null, error: null, timer: null },
};

const $ = id => document.getElementById(id);
const esc = s =>
  String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// ---------- persistence ----------

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved) {
      state.decisions = saved.decisions || {};
      Object.assign(state.filters, saved.filters);
      Object.assign(state.settings, saved.settings);
      state.exportedCount = saved.exportedCount || 0;
      state.lastExportAt = saved.lastExportAt || null;
      return saved.currentId || null;
    }
  } catch (e) {
    console.error('Could not read saved progress', e);
  }
  return null;
}

function save(decisionsChanged = false) {
  if (decisionsChanged) {
    scheduleDiskSave();
  }
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        decisions: state.decisions,
        filters: state.filters,
        settings: state.settings,
        currentId: current()?.id,
        exportedCount: state.exportedCount,
        lastExportAt: state.lastExportAt,
      }),
    );
  } catch (e) {
    toast('Could not save progress in this browser - export now to be safe');
    console.error(e);
  }
}

// The repo file (review_results/decisions/review-decisions.json) is the durable
// copy; browser storage is a fast local cache. Both are merged on load.
async function loadFromDisk() {
  try {
    const res = await fetch(DISK_ENDPOINT, { cache: 'no-store' });
    const isJson = (res.headers.get('content-type') || '').includes('application/json');
    state.disk.available = res.ok || (res.status === 404 && isJson);
    return res.ok ? await res.json() : null;
  } catch {
    state.disk.available = false;
    return null;
  }
}

function scheduleDiskSave() {
  if (!state.disk.available) {
    return;
  }
  clearTimeout(state.disk.timer);
  state.disk.timer = setTimeout(saveToDisk, DISK_SAVE_DELAY);
  renderSaveStatus();
}

async function saveToDisk() {
  state.disk.timer = null;
  state.disk.saving = true;
  renderSaveStatus();
  try {
    const res = await fetch(DISK_ENDPOINT, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildExport(state.resources, state.decisions)),
    });
    if (!res.ok) {
      throw new Error((await res.json().catch(() => ({}))).error || `HTTP ${res.status}`);
    }
    state.disk.savedAt = Date.now();
    state.disk.error = null;
  } catch (e) {
    state.disk.error = e.message;
    console.error('Saving decisions to the repo failed', e);
  } finally {
    state.disk.saving = false;
    renderSaveStatus();
  }
}

function renderSaveStatus() {
  const el = $('save-status');
  const { disk } = state;
  let text = 'Saved in this browser only';
  let cls = 'warn';
  if (disk.available) {
    if (disk.error) {
      text = `Not saved to repo: ${disk.error}`;
      cls = 'error';
    } else if (disk.saving || disk.timer) {
      text = 'Saving…';
      cls = '';
    } else {
      text = disk.savedAt ? `Saved to repo ${new Date(disk.savedAt).toLocaleTimeString()}` : 'Saving to repo';
      cls = 'ok';
    }
  }
  el.textContent = text;
  el.className = `save-status ${cls}`;
  el.title = disk.available ? 'review_results/decisions/review-decisions.json - commit it now and then' : 'Start the tool with npm run review to save decisions into the repo';
}

// ---------- data loading ----------

async function fetchJson(path) {
  try {
    const res = await fetch(path, { cache: 'no-store' });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

async function loadData() {
  const { languageMap } = new LanguageLoader();
  const entries = Object.entries(languageMap);
  const modules = await Promise.all(entries.map(([, file]) => import(`${DATA_ROOT}${file}.js`)));
  const resources = [];
  entries.forEach(([key], i) => resources.push(...flattenLanguage(key, modules[i].default)));
  assignIds(resources);

  const [linkCheck, removals, replacements] = await Promise.all([
    fetchJson(`${RESULTS_ROOT}link-check.json`),
    fetchJson(`${RESULTS_ROOT}deduplicated/unique_removals.json`),
    fetchJson(`${RESULTS_ROOT}url_replacements.json`),
  ]);

  state.resources = resources;
  state.byId = new Map(resources.map(r => [r.id, r]));
  state.linkCheck = linkCheck?.results || null;
  state.urlIndex = buildUrlIndex(resources);
  const ctx = { linkCheck: state.linkCheck, urlIndex: state.urlIndex, priorReview: buildPriorReviewIndex(removals || [], replacements || []) };
  for (const r of resources) {
    state.assessments.set(r.id, assess(r, ctx));
  }
}

// ---------- view (filtered + ordered queue) ----------

function linkStatusOf(r) {
  if (!isHttpUrl(r.url)) {
    return 'invalid';
  }
  return state.linkCheck?.[r.url]?.status || 'unchecked';
}

function matches(r) {
  const f = state.filters;
  const d = state.decisions[r.id];
  if (f.lang !== 'all' && r.language !== f.lang) { return false; }
  if (f.type !== 'all' && r.type !== f.type) { return false; }
  if (f.status === 'undecided' && d) { return false; }
  if (f.status === 'attention' && (d || state.assessments.get(r.id).score < 2)) { return false; }
  if (['keep', 'delete', 'edit', 'skip'].includes(f.status) && d?.decision !== f.status) { return false; }
  if (f.link !== 'any' && linkStatusOf(r) !== f.link) { return false; }
  if (f.search) {
    const q = f.search.toLowerCase();
    if (!`${r.name} ${r.url} ${r.category}`.toLowerCase().includes(q)) { return false; }
  }
  return true;
}

function rebuildView(keepId) {
  const view = state.resources.filter(matches);
  if (state.filters.order === 'attention') {
    const idx = new Map(state.resources.map((r, i) => [r.id, i]));
    view.sort((a, b) => state.assessments.get(b.id).score - state.assessments.get(a.id).score || idx.get(a.id) - idx.get(b.id));
  }
  state.view = view;
  const at = keepId ? view.findIndex(r => r.id === keepId) : -1;
  state.pos = at >= 0 ? at : 0;
  resetDraft();
}

const current = () => state.view[state.pos];

// ---------- drafts & decisions ----------

function resetDraft() {
  const r = current();
  const d = r && state.decisions[r.id];
  state.draft = {
    newUrl: d?.newUrl || '',
    free: typeof d?.free === 'boolean' ? d.free : r?.free,
    notes: d?.notes || '',
  };
  state.pendingDecision = d?.decision || null;
}

function draftChanges(r) {
  const changes = [];
  const newUrl = state.draft.newUrl.trim();
  if (newUrl && newUrl !== r.url) { changes.push('url'); }
  if (typeof state.draft.free === 'boolean' && state.draft.free !== r.free) { changes.push('free'); }
  return changes;
}

function decide(decision, { advance = true, reason } = {}) {
  const r = current();
  if (!r) { return; }
  const changes = draftChanges(r);
  // A keep that changes data is an edit
  const final = decision === 'keep' && changes.length ? 'edit' : decision;
  const prev = state.decisions[r.id] || null;
  state.decisions[r.id] = {
    decision: final,
    newUrl: changes.includes('url') ? state.draft.newUrl.trim() : undefined,
    free: changes.includes('free') ? state.draft.free : undefined,
    notes: state.draft.notes.trim() || undefined,
    reason,
    decidedAt: Date.now(),
    name: r.name,
    url: r.url,
    language: r.language,
    type: r.type,
    category: r.category,
  };
  state.undo.push({ id: r.id, prev });
  state.session.times.push(Date.now());
  save(true);
  if (advance) {
    next({ undecidedOnly: true });
  } else {
    render();
  }
}

function undo() {
  const last = state.undo.pop();
  if (!last) {
    toast('Nothing to undo');
    return;
  }
  if (last.prev) {
    state.decisions[last.id] = last.prev;
  } else {
    delete state.decisions[last.id];
  }
  state.session.times.pop();
  save(true);
  const at = state.view.findIndex(r => r.id === last.id);
  if (at >= 0) {
    go(at);
  } else {
    render();
  }
  toast(`Undid decision on “${state.byId.get(last.id)?.name}”`);
}

// ---------- navigation ----------

function go(index) {
  if (!state.view.length) {
    render();
    return;
  }
  state.pos = Math.max(0, Math.min(index, state.view.length - 1));
  resetDraft();
  render();
  showPreview();
  save();
}

function next({ undecidedOnly = false } = {}) {
  let i = state.pos + 1;
  if (undecidedOnly) {
    while (i < state.view.length && state.decisions[state.view[i].id]) { i++; }
  }
  if (i >= state.view.length) {
    toast(undecidedOnly ? 'Nothing undecided left in this view' : 'End of the list');
    render();
    return;
  }
  go(i);
}

// ---------- preview: iframe, preloading, companion window ----------

const frames = [...document.querySelectorAll('.frame')];
let activeFrame = 0;
let companion = null;

function setFrame(frame, url) {
  if (frame.dataset.url !== url) {
    frame.dataset.url = url;
    frame.src = url;
  }
}

function showPreview() {
  const r = current();
  const note = $('preview-note');
  $('preview-url').textContent = r?.url || '';
  if (!r) { return; }

  if (state.settings.companion && isHttpUrl(r.url)) {
    openCompanion(r.url);
  }

  const a = state.assessments.get(r.id);
  let message = null;
  if (!isHttpUrl(r.url)) {
    message = '<strong>No web address to preview</strong><span>Fix the URL with Edit, or delete the entry.</span>';
  } else if (!state.settings.preview) {
    message = `<strong>Preview is off</strong><span>${state.settings.companion ? 'Showing in the companion window.' : 'Press Space to open, or P to turn the preview back on.'}</span>`;
  } else if (a.embeddable === false) {
    message = `<strong>This site doesn't allow embedding</strong><span>Press <kbd>Space</kbd> to open it, or <kbd>W</kbd> to open every resource in a companion window automatically.</span>`;
  }
  note.hidden = !message;
  note.innerHTML = message || '';
  if (message) {
    frames.forEach(f => (f.hidden = true));
    preloadNext();
    return;
  }

  // Swap in the preloaded frame if it already holds this URL
  const other = 1 - activeFrame;
  if (frames[other].dataset.url === r.url) {
    activeFrame = other;
  } else {
    setFrame(frames[activeFrame], r.url);
  }
  frames[activeFrame].hidden = false;
  frames[1 - activeFrame].hidden = true;
  preloadNext();
}

function preloadNext() {
  const upcoming = state.view.slice(state.pos + 1).find(r => !state.decisions[r.id]);
  if (!upcoming || !state.settings.preview || !isHttpUrl(upcoming.url)) { return; }
  if (state.assessments.get(upcoming.id).embeddable === false) { return; }
  const r = current();
  const target = frames[r && frames[activeFrame].dataset.url === r.url ? 1 - activeFrame : activeFrame];
  if (!target.hidden) { return; }
  setFrame(target, upcoming.url);
}

function openCompanion(url) {
  companion = window.open(url, 'review-companion');
  if (!companion) {
    toast('Your browser blocked the companion window - allow pop-ups for this page');
  }
}

function openInTab() {
  const r = current();
  if (r && isHttpUrl(r.url)) {
    window.open(r.url, '_blank', 'noopener');
  }
}

// ---------- rendering ----------

const DECISION_LABEL = { keep: '✓ keep', delete: '✗ delete', edit: '✎ edit', skip: '⊙ skip' };
const LINK_FILTER_LABEL = {
  dead: 'dead', 'redirect-home': 'redirect-to-home', redirect: 'moved', error: 'error', timeout: 'timed-out',
  blocked: 'bot-protected', ok: 'OK', unchecked: 'unchecked', invalid: 'non-link',
};

function render() {
  renderFilters();
  renderTop();
  renderBanners();
  renderSummary();
  renderQueue();
  renderCard();
  renderDecide();
}

function decidedCounts(list) {
  const counts = { keep: 0, delete: 0, edit: 0, skip: 0 };
  let decided = 0;
  for (const r of list) {
    const d = state.decisions[r.id];
    if (d) {
      counts[d.decision]++;
      decided++;
    }
  }
  return { counts, decided };
}

function renderTop() {
  const { counts, decided } = decidedCounts(state.resources);
  const total = state.resources.length;
  $('progress-bar').style.width = `${total ? (decided / total) * 100 : 0}%`;
  $('progress-text').textContent = `${decided.toLocaleString()} / ${total.toLocaleString()} decided`;
  $('stats').innerHTML = Object.entries(counts)
    .map(([k, v]) => `<span class="stat ${k}" title="${k}">${v.toLocaleString()}</span>`)
    .join('');

  // Pace from the last 30 decisions this session
  const times = state.session.times.slice(-30);
  if (times.length >= 3) {
    const perMin = (times.length - 1) / ((times.at(-1) - times[0]) / 60000 || 1);
    const remaining = state.view.filter(r => !state.decisions[r.id]).length;
    const mins = remaining / perMin;
    const eta = mins > 90 ? `${(mins / 60).toFixed(1)} h` : `${Math.round(mins)} min`;
    $('pace').textContent = `${perMin.toFixed(1)}/min · this view ≈ ${eta} left · ${state.session.times.length} this session`;
  } else {
    $('pace').textContent = state.session.times.length ? `${state.session.times.length} this session` : '';
  }
}

function renderBanners() {
  renderSaveStatus();
  const out = [];
  if (!state.linkCheck) {
    out.push('Links haven\'t been checked yet. Run <code>npm run review:check-links</code> (about 10-20 minutes), then reload. It flags dead links and redirects and spots sites that can\'t be previewed here.');
  }
  if (!state.disk.available) {
    const unexported = Object.keys(state.decisions).length - state.exportedCount;
    out.push(`Decisions are only being saved in this browser. Start the tool with <code>npm run review</code> to save them into the repo automatically${unexported > 0 ? `, or press <kbd>Ctrl</kbd>+<kbd>S</kbd> to download a copy (${unexported} not yet exported)` : ''}.`);
  } else if (state.disk.error) {
    out.push(`Saving to the repo failed (${esc(state.disk.error)}). Your decisions are still in this browser; is <code>npm run review</code> still running? Press <kbd>Ctrl</kbd>+<kbd>S</kbd> to download a copy.`);
  }
  $('banners').innerHTML = out.map(m => `<div class="banner">${m}</div>`).join('');
}

function renderFilters() {
  const langSel = $('f-lang');
  if (!langSel.options.length) {
    const langs = [...new Map(state.resources.map(r => [r.language, r])).values()].sort((a, b) =>
      a.languageName.localeCompare(b.languageName),
    );
    langSel.innerHTML = `<option value="all">All languages</option>${langs
      .map(r => `<option value="${esc(r.language)}">${r.flag} ${esc(r.languageName)}</option>`)
      .join('')}`;
    $('f-type').innerHTML = `<option value="all">All types</option>${RESOURCE_TYPES.map(t => `<option value="${t}">${t}</option>`).join('')}`;
  }
  // Keep "N left" counts on each language current
  const left = new Map();
  for (const r of state.resources) {
    if (!state.decisions[r.id]) {
      left.set(r.language, (left.get(r.language) || 0) + 1);
    }
  }
  for (const opt of langSel.options) {
    if (opt.value !== 'all') {
      const name = opt.textContent.replace(/ - \d+ left$/, '').replace(/ - done$/, '');
      const n = left.get(opt.value) || 0;
      opt.textContent = `${name} - ${n ? `${n} left` : 'done'}`;
    }
  }
  for (const [key, id] of [['lang', 'f-lang'], ['type', 'f-type'], ['status', 'f-status'], ['link', 'f-link'], ['order', 'f-order']]) {
    $(id).value = state.filters[key];
  }
  if (document.activeElement !== $('f-search')) {
    $('f-search').value = state.filters.search;
  }
}

function renderSummary() {
  const undecided = state.view.filter(r => !state.decisions[r.id]);
  let html = `${state.view.length.toLocaleString()} in this view · ${undecided.length.toLocaleString()} undecided`;
  const bulkable = ['dead', 'redirect-home'].includes(state.filters.link) ? undecided : [];
  if (bulkable.length) {
    html += `<button id="btn-bulk">Mark ${bulkable.length} ${LINK_FILTER_LABEL[state.filters.link]} links as Delete…</button>`;
  }
  $('view-summary').innerHTML = html;
  $('btn-bulk')?.addEventListener('click', () => bulkDelete(bulkable));
}

function renderQueue() {
  const start = Math.max(0, state.pos - QUEUE_BEHIND);
  const end = Math.min(state.view.length, state.pos + QUEUE_AHEAD);
  const items = state.view.slice(start, end).map((r, k) => {
    const i = start + k;
    const d = state.decisions[r.id];
    const { score } = state.assessments.get(r.id);
    return `<li data-i="${i}" class="${i === state.pos ? 'current' : ''}">
      <span class="dot ${d ? d.decision : ''}"></span>
      <span class="q-name">${r.flag} ${esc(r.name)}</span>
      <span class="sev sev-${score}">${score >= 2 ? '!' : ''}</span>
    </li>`;
  });
  if (end < state.view.length) {
    items.push(`<li class="more">… ${state.view.length - end} more</li>`);
  }
  if (!state.view.length) {
    items.push('<li class="more">Nothing matches these filters.</li>');
  }
  $('queue').innerHTML = items.join('');
  $('queue').querySelector('.current')?.scrollIntoView({ block: 'nearest' });
}

function renderSignals(a) {
  if (!a.signals.length) {
    return state.linkCheck ? '<div class="signal clear"><b>No problems detected</b><span>The link works and nothing else looks off. Is it still a good resource?</span></div>' : '';
  }
  return a.signals
    .map(s => `<div class="signal ${s.severity}"><b>${esc(s.label)}</b>${s.detail ? `<span>${esc(s.detail)}</span>` : ''}</div>`)
    .join('');
}

function renderSiblings(r) {
  const sibs = siblingsOf(r, state.urlIndex);
  if (!sibs.length) { return ''; }
  const decided = sibs.find(s => state.decisions[s.id]);
  const rows = sibs
    .slice(0, 8)
    .map(s => {
      const d = state.decisions[s.id];
      return `<li>${s.flag} ${esc(s.languageName)} · ${esc(s.type)}${d ? ` - <b>${DECISION_LABEL[d.decision]}</b>` : ''}</li>`;
    })
    .join('');
  const hint = decided ? ` Press <kbd>A</kbd> to ${DECISION_LABEL[state.decisions[decided.id].decision]} here too.` : '';
  return `<div class="siblings">Same URL also listed ${sibs.length}× elsewhere.${hint}<ul>${rows}${sibs.length > 8 ? `<li>…and ${sibs.length - 8} more</li>` : ''}</ul></div>`;
}

function renderCard() {
  const r = current();
  const card = $('card');
  if (!r) {
    card.innerHTML = state.resources.length
      ? '<h1>All done here 🎉</h1><p class="muted">Nothing matches the current filters. Change “Show” or the language to keep going.</p>'
      : '<p class="muted">Loading resources…</p>';
    return;
  }
  const a = state.assessments.get(r.id);
  const d = state.decisions[r.id];
  const freeChanged = typeof state.draft.free === 'boolean' && state.draft.free !== r.free;
  const freeChip =
    typeof state.draft.free === 'boolean'
      ? `<span class="chip ${state.draft.free ? 'free' : 'paid'} ${freeChanged ? 'changed' : ''}">${state.draft.free ? 'Free' : 'Paid / freemium'}${freeChanged ? ' (changed)' : ''}</span>`
      : '';
  const chips = [r.level, r.platform, r.author, r.format].filter(Boolean).map(c => `<span class="chip">${esc(c)}</span>`).join('');
  const features = Array.isArray(r.features) && r.features.length ? `<ul class="features">${r.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : '';
  const urlHtml = isHttpUrl(r.url)
    ? `<a class="url" href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.url)}</a>`
    : `<span class="url">${esc(r.url || '(no URL)')}</span>`;
  const when = d ? new Date(d.decidedAt).toLocaleString() : '';

  card.innerHTML = `
    <div class="card-head">
      <span>${r.flag} ${esc(r.languageName)} · ${esc(r.type)} › ${esc(r.category)}</span>
      <span>${state.pos + 1} / ${state.view.length}</span>
    </div>
    <h1>${esc(r.name)}</h1>
    ${urlHtml}
    <div class="chips">${freeChip}${chips}</div>
    ${r.description ? `<p class="desc">${esc(r.description)}</p>` : ''}
    ${features}
    <div class="signals">${renderSignals(a)}</div>
    ${renderSiblings(r)}
    ${d ? `<p class="current-decision">Decided <b>${DECISION_LABEL[d.decision]}</b> · ${esc(when)}${d.reason ? ` · ${esc(d.reason)}` : ''}</p>` : ''}
  `;
}

function renderDecide() {
  const r = current();
  $('decide').hidden = !r;
  if (!r) { return; }
  const a = state.assessments.get(r.id);
  document.querySelectorAll('[data-decision]').forEach(b => b.classList.toggle('on', b.dataset.decision === state.pendingDecision));
  document.querySelectorAll('[data-free]').forEach(b => b.classList.toggle('on', String(state.draft.free) === b.dataset.free));
  if (document.activeElement !== $('d-url')) { $('d-url').value = state.draft.newUrl; }
  if (document.activeElement !== $('d-notes')) { $('d-notes').value = state.draft.notes; }

  const suggest = $('d-suggest');
  const showSuggestion = a.suggestedUrl && a.suggestedUrl !== r.url && state.draft.newUrl !== a.suggestedUrl;
  suggest.hidden = !showSuggestion;
  suggest.innerHTML = showSuggestion ? `Use suggested URL <kbd>U</kbd> ${esc(a.suggestedUrl)}` : '';

  const changes = draftChanges(r);
  $('d-hint').textContent = changes.length ? `Unsaved change (${changes.join(', ')}) - Keep or Enter will save it as Edit.` : '';
}

// ---------- actions ----------

function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('show'), 2600);
}

function bulkDelete(list) {
  const label = LINK_FILTER_LABEL[state.filters.link];
  // eslint-disable-next-line no-alert -- deliberate confirmation for a bulk change
  if (!confirm(`Mark ${list.length} ${label} links as Delete? You can undo each one with Z, or review them under Show → Decided: delete.`)) {
    return;
  }
  const now = Date.now();
  for (const r of list) {
    const check = state.linkCheck?.[r.url];
    state.undo.push({ id: r.id, prev: state.decisions[r.id] || null });
    state.decisions[r.id] = {
      decision: 'delete',
      reason: `link check: ${label}${check?.code ? ` (HTTP ${check.code})` : check?.error ? ` (${check.error})` : ''}`,
      decidedAt: now,
      name: r.name, url: r.url, language: r.language, type: r.type, category: r.category,
    };
  }
  save(true);
  render();
  toast(`Marked ${list.length} as Delete`);
}

function applySiblingDecision() {
  const r = current();
  if (!r) { return; }
  const decided = siblingsOf(r, state.urlIndex).find(s => state.decisions[s.id]);
  if (!decided) {
    toast('This URL has no decision elsewhere yet');
    return;
  }
  const d = state.decisions[decided.id];
  if (d.newUrl) { state.draft.newUrl = d.newUrl; }
  if (typeof d.free === 'boolean') { state.draft.free = d.free; }
  decide(d.decision, { reason: `same as ${decided.languageName}` });
}

function exportDecisions() {
  const payload = buildExport(state.resources, state.decisions);
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `review-decisions-${new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-')}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  state.exportedCount = payload.decisions.length;
  state.lastExportAt = Date.now();
  save();
  render();
  toast(`Exported ${payload.decisions.length} decisions`);
}

async function importDecisions(file) {
  try {
    const data = JSON.parse(await file.text());
    if (data.tool !== 'resource-review') {
      toast('That file is not a review export');
      return;
    }
    const { merged, added } = mergeDecisions(state.decisions, data);
    state.decisions = merged;
    save(true);
    rebuildView(current()?.id);
    render();
    showPreview();
    toast(`Imported ${added} decisions`);
  } catch (e) {
    console.error(e);
    toast('Could not read that file');
  }
}

function toggleSetting(key) {
  state.settings[key] = !state.settings[key];
  $('btn-companion').classList.toggle('on', state.settings.companion);
  $('btn-preview').classList.toggle('on', state.settings.preview);
  save();
  showPreview();
}

function setPending(decision) {
  state.pendingDecision = decision;
  renderDecide();
}

// ---------- events ----------

function onFieldKey(e) {
  if (e.key === 'Escape') {
    e.target.blur();
    return;
  }
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    e.target.blur();
    decide(state.pendingDecision || 'edit');
  }
}

const KEYS = {
  k: () => decide('keep'),
  d: () => decide('delete'),
  e: () => {
    setPending('edit');
    $('d-notes').focus();
  },
  s: () => decide('skip'),
  u: () => {
    const r = current();
    const s = r && state.assessments.get(r.id).suggestedUrl;
    if (s) {
      state.draft.newUrl = s;
      state.pendingDecision = 'edit';
      render();
    }
  },
  f: () => {
    state.draft.free = state.draft.free === false;
    render();
  },
  a: applySiblingDecision,
  n: () => $('d-notes').focus(),
  z: undo,
  j: () => next({ undecidedOnly: true }),
  arrowright: () => next(),
  arrowleft: () => go(state.pos - 1),
  ' ': openInTab,
  w: () => toggleSetting('companion'),
  p: () => toggleSetting('preview'),
  '/': () => $('f-search').focus(),
  '?': () => $('help').showModal(),
};

function onKey(e) {
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') { return; }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    exportDecisions();
    return;
  }
  if (e.ctrlKey || e.metaKey || e.altKey) { return; }
  const action = KEYS[e.key.toLowerCase()];
  if (action) {
    e.preventDefault();
    action();
  }
}

function bindEvents() {
  document.addEventListener('keydown', onKey);
  const filterIds = { 'f-lang': 'lang', 'f-type': 'type', 'f-status': 'status', 'f-link': 'link', 'f-order': 'order' };
  for (const [id, key] of Object.entries(filterIds)) {
    $(id).addEventListener('change', e => {
      state.filters[key] = e.target.value;
      rebuildView();
      render();
      showPreview();
      save();
      e.target.blur();
    });
  }
  let searchTimer;
  $('f-search').addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.filters.search = e.target.value.trim();
      rebuildView();
      render();
      showPreview();
    }, 200);
  });
  $('f-search').addEventListener('keydown', e => {
    if (e.key === 'Escape' || e.key === 'Enter') { e.target.blur(); }
  });

  $('queue').addEventListener('click', e => {
    const li = e.target.closest('li[data-i]');
    if (li) { go(Number(li.dataset.i)); }
  });
  document.querySelectorAll('[data-decision]').forEach(b =>
    b.addEventListener('click', () => {
      if (b.dataset.decision === 'edit') {
        KEYS.e();
      } else {
        decide(b.dataset.decision);
      }
    }),
  );
  document.querySelectorAll('[data-free]').forEach(b =>
    b.addEventListener('click', () => {
      state.draft.free = b.dataset.free === 'true';
      render();
    }),
  );
  $('d-suggest').addEventListener('click', KEYS.u);
  $('d-url').addEventListener('input', e => {
    state.draft.newUrl = e.target.value;
    renderDecide();
  });
  $('d-notes').addEventListener('input', e => {
    state.draft.notes = e.target.value;
  });
  $('d-url').addEventListener('keydown', onFieldKey);
  $('d-notes').addEventListener('keydown', onFieldKey);

  $('btn-export').addEventListener('click', exportDecisions);
  $('btn-import').addEventListener('click', () => $('import-file').click());
  $('import-file').addEventListener('change', e => {
    if (e.target.files[0]) { importDecisions(e.target.files[0]); }
    e.target.value = '';
  });
  $('btn-help').addEventListener('click', () => $('help').showModal());
  $('btn-open').addEventListener('click', openInTab);
  $('btn-companion').addEventListener('click', () => toggleSetting('companion'));
  $('btn-preview').addEventListener('click', () => toggleSetting('preview'));
}

async function init() {
  const resumeId = load();
  bindEvents();
  $('btn-companion').classList.toggle('on', state.settings.companion);
  $('btn-preview').classList.toggle('on', state.settings.preview);
  try {
    await loadData();
  } catch (e) {
    console.error(e);
    $('card').innerHTML = `<h1>Couldn't load the language data</h1><p class="muted">${esc(e.message)}</p><p class="muted">Start the tool with <code>npm run review</code> rather than opening the file directly.</p>`;
    return;
  }
  const disk = await loadFromDisk();
  const before = Object.keys(state.decisions).length;
  if (disk) {
    state.decisions = mergeDecisions(state.decisions, disk).merged;
  }
  const { decisions, migrated, applied } = reconcileDecisions(state.resources, state.decisions);
  state.decisions = decisions;
  const changed = migrated || applied || Object.keys(state.decisions).length !== before;
  save(Boolean(changed || (disk === null && before > 0)));
  if (migrated || applied) {
    toast(`Found ${migrated + applied} applied decisions in the data${migrated ? ` (${migrated} edits carried over)` : ''}`);
  }
  rebuildView(resumeId);
  render();
  // The companion window needs a click or key press to open; don't open it on load
  const { companion: wasOn } = state.settings;
  state.settings.companion = false;
  showPreview();
  state.settings.companion = wasOn;
  window.reviewTool = { state }; // for debugging in the console
}

init();
