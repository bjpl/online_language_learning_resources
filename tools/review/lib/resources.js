// ===================================
// Review tool - shared resource model
// Pure functions used by the browser tool and the Node scripts
// (link checker, decision applier). No DOM, no Node APIs.
// ===================================

export const RESOURCE_TYPES = ['courses', 'apps', 'books', 'audio', 'practice'];

export const DECISIONS = ['keep', 'delete', 'edit', 'skip'];

// Severity order used for "needs attention first" sorting
export const SEVERITY = { high: 3, medium: 2, low: 1, info: 0 };

/**
 * Flatten one language's data into a list of resources.
 * Data shape: resources[type] = [{ category, items: [...] }] (or direct items).
 */
export function flattenLanguage(langKey, lang) {
  const out = [];
  if (!lang || !lang.resources) {
    return out;
  }
  for (const type of Object.keys(lang.resources)) {
    const groups = lang.resources[type];
    if (!Array.isArray(groups)) {
      continue;
    }
    for (const group of groups) {
      const items = Array.isArray(group.items) ? group.items : group.name ? [group] : [];
      const category = Array.isArray(group.items) ? group.category : undefined;
      for (const item of items) {
        out.push({
          ...item,
          language: langKey,
          languageName: lang.name || langKey,
          flag: lang.flag || '🌐',
          type,
          category: category || '',
        });
      }
    }
  }
  return out;
}

/**
 * Assign stable IDs. language::type::url::name identifies a resource across
 * sessions and data edits; a numeric suffix separates exact duplicates.
 */
export function assignIds(resources) {
  const seen = new Map();
  for (const r of resources) {
    const base = `${r.language}::${r.type}::${r.url || ''}::${r.name || ''}`;
    const n = (seen.get(base) || 0) + 1;
    seen.set(base, n);
    r.id = n === 1 ? base : `${base}::${n}`;
  }
  return resources;
}

export function isHttpUrl(url) {
  return typeof url === 'string' && /^https?:\/\/[^\s/]+\.[^\s]+$/i.test(url.trim());
}

/** Normalize a URL for matching: lowercase host, no www or trailing slash. Hash routes (#!/...) are kept. */
export function normalizeUrl(url) {
  if (!isHttpUrl(url)) {
    return (url || '').trim().toLowerCase();
  }
  try {
    const u = new URL(url.trim());
    const host = u.hostname.toLowerCase().replace(/^www\./, '');
    const path = u.pathname.replace(/\/+$/, '');
    return `${host}${path}${u.search}${u.hash.length > 1 ? u.hash : ''}`;
  } catch {
    return url.trim().toLowerCase();
  }
}

/** Index resources by normalized URL so duplicates can be shown together. */
export function buildUrlIndex(resources) {
  const index = new Map();
  for (const r of resources) {
    if (!r.url) {
      continue;
    }
    const key = normalizeUrl(r.url);
    if (!index.has(key)) {
      index.set(key, []);
    }
    index.get(key).push(r);
  }
  return index;
}

/**
 * Index the earlier (2025) link review so its unapplied verdicts show up as hints.
 * removals: [{ language, url, title }]; replacements: [{ language, original_url, replacement_url }]
 */
export function buildPriorReviewIndex(removals = [], replacements = []) {
  const index = new Map();
  for (const r of removals) {
    index.set(`${r.language}|${normalizeUrl(r.url)}`, { action: 'delete' });
  }
  for (const r of replacements) {
    if (r.replacement_url) {
      index.set(`${r.language}|${normalizeUrl(r.original_url)}`, {
        action: 'replace',
        replacementUrl: r.replacement_url,
      });
    }
  }
  return index;
}

const LINK_SIGNALS = {
  dead: { severity: 'high', label: 'Dead link' },
  'redirect-home': { severity: 'high', label: 'Redirects to homepage (page likely gone)' },
  error: { severity: 'medium', label: 'Server error' },
  timeout: { severity: 'medium', label: 'Timed out' },
  redirect: { severity: 'medium', label: 'Moved' },
  blocked: { severity: 'low', label: 'Bot protection - could not verify automatically' },
};

function describeLink(check) {
  const parts = [];
  if (check.code) {
    parts.push(`HTTP ${check.code}`);
  }
  if (check.error) {
    parts.push(check.error);
  }
  if (check.finalUrl && check.status !== 'ok') {
    parts.push(`→ ${check.finalUrl}`);
  }
  return parts.join(' · ');
}

/**
 * Compute review signals for one resource.
 * ctx: { linkCheck: {url: result} | null, urlIndex, priorReview }
 * Returns { signals: [{kind, severity, label, detail}], suggestedUrl, embeddable, score }
 */
export function assess(resource, ctx) {
  const signals = [];
  let suggestedUrl = null;
  let embeddable = null;

  if (!resource.url) {
    signals.push({ kind: 'url', severity: 'high', label: 'No URL' });
  } else if (!isHttpUrl(resource.url)) {
    signals.push({ kind: 'url', severity: 'high', label: 'Not a link', detail: resource.url });
  } else if (ctx.linkCheck) {
    const check = ctx.linkCheck[resource.url];
    if (!check) {
      signals.push({ kind: 'link', severity: 'info', label: 'Not link-checked yet' });
    } else {
      embeddable = check.embeddable ?? null;
      const meta = LINK_SIGNALS[check.status];
      if (meta) {
        signals.push({ kind: 'link', severity: meta.severity, label: meta.label, detail: describeLink(check) });
      }
      if (check.status === 'redirect' && check.finalUrl) {
        suggestedUrl = check.finalUrl;
      }
    }
  }

  if (resource.url && resource.url.startsWith('http://') && !suggestedUrl) {
    signals.push({ kind: 'url', severity: 'low', label: 'Uses http:// (not https)' });
  }

  const prior = ctx.priorReview?.get(`${resource.language}|${normalizeUrl(resource.url)}`);
  if (prior?.action === 'delete') {
    signals.push({ kind: 'prior', severity: 'high', label: 'Marked for removal in the 2025 link review (never applied)' });
  } else if (prior?.action === 'replace') {
    signals.push({
      kind: 'prior',
      severity: 'medium',
      label: '2025 link review suggested a new URL (never applied)',
      detail: prior.replacementUrl,
    });
    suggestedUrl = suggestedUrl || prior.replacementUrl;
  }

  const dupes = resource.url ? ctx.urlIndex?.get(normalizeUrl(resource.url)) || [] : [];
  const sameLang = dupes.filter(d => d !== resource && d.language === resource.language);
  if (sameLang.length) {
    signals.push({
      kind: 'duplicate',
      severity: 'medium',
      label: `Listed ${sameLang.length + 1}× in ${resource.languageName}`,
      detail: sameLang.map(d => `${d.type} › ${d.category}`).join('; '),
    });
  }

  if (resource.free === undefined) {
    signals.push({ kind: 'data', severity: 'low', label: 'Free/paid not set' });
  }

  const score = signals.reduce((max, s) => Math.max(max, SEVERITY[s.severity] ?? 0), 0);
  return { signals, suggestedUrl, embeddable, score };
}

/** Resources elsewhere with the same URL (other languages or categories). */
export function siblingsOf(resource, urlIndex) {
  if (!resource.url) {
    return [];
  }
  return (urlIndex.get(normalizeUrl(resource.url)) || []).filter(d => d !== resource);
}

/**
 * Build the export payload consumed by scripts/review/apply-decisions.mjs.
 */
export function buildExport(resources, decisions) {
  const byId = new Map(resources.map(r => [r.id, r]));
  const rows = [];
  for (const [id, d] of Object.entries(decisions)) {
    const r = byId.get(id);
    rows.push({
      id,
      decision: d.decision,
      language: r?.language ?? d.language,
      type: r?.type ?? d.type,
      category: r?.category ?? d.category,
      name: r?.name ?? d.name,
      url: r?.url ?? d.url,
      newUrl: d.newUrl || undefined,
      free: typeof d.free === 'boolean' ? d.free : undefined,
      notes: d.notes || undefined,
      reason: d.reason || undefined,
      decidedAt: d.decidedAt,
      // Set when the decision no longer matches the data: already applied, or the entry changed
      status: d.appliedAt || d.editAppliedAt ? 'applied' : r ? undefined : 'missing',
    });
  }
  const counts = Object.fromEntries(DECISIONS.map(k => [k, rows.filter(r => r.decision === k).length]));
  return {
    tool: 'resource-review',
    version: 4,
    exportedAt: new Date().toISOString(),
    totalResources: resources.length,
    counts,
    decisions: rows,
  };
}

/** Merge an imported export into existing decisions; the newer decision wins. */
export function mergeDecisions(existing, imported) {
  const merged = { ...existing };
  let added = 0;
  for (const row of imported.decisions || []) {
    if (!row.id || !DECISIONS.includes(row.decision)) {
      continue;
    }
    const current = merged[row.id];
    // Same decision, now known to be applied (apply-decisions marks rows it applied)
    if (current && row.status === 'applied' && row.decidedAt === current.decidedAt && !current.appliedAt) {
      merged[row.id] = { ...current, appliedAt: row.decidedAt };
      continue;
    }
    if (!current || (row.decidedAt || 0) > (current.decidedAt || 0)) {
      merged[row.id] = {
        decision: row.decision,
        newUrl: row.newUrl,
        free: row.free,
        notes: row.notes,
        reason: row.reason,
        decidedAt: row.decidedAt || Date.now(),
        name: row.name,
        url: row.url,
        language: row.language,
        type: row.type,
        category: row.category,
        appliedAt: row.status === 'applied' ? row.decidedAt : undefined,
      };
      added++;
    }
  }
  return { merged, added };
}

/**
 * Line saved decisions up with the current data after decisions were applied.
 * - An edit whose new URL is now in the data moves to that resource's new id,
 *   so it still shows as decided.
 * - A decision whose resource is gone (a delete, or an edit that was applied)
 *   is marked applied and no longer counts as pending.
 * Returns { decisions, migrated, applied }.
 */
export function reconcileDecisions(resources, decisions) {
  const byId = new Map(resources.map(r => [r.id, r]));
  const out = {};
  let migrated = 0;
  let applied = 0;
  for (const [id, d] of Object.entries(decisions)) {
    const r = byId.get(id);
    if (d.appliedAt && d.decision === 'delete' && r) {
      // The deleted entry had an exact duplicate, which now has this id: it is undecided
      continue;
    }
    if (d.editAppliedAt || (d.appliedAt && !(d.newUrl && !r))) {
      out[id] = d;
      continue;
    }
    if (r) {
      // A cost-only edit keeps the same id; once the data matches, it has been applied
      const costApplied = d.decision === 'edit' && !d.newUrl && typeof d.free === 'boolean' && r.free === d.free;
      out[id] = costApplied ? { ...d, free: undefined, editAppliedAt: Date.now() } : d;
      continue;
    }
    const moved =
      d.newUrl &&
      resources.find(r => r.language === d.language && r.type === d.type && r.name === d.name && r.url === d.newUrl);
    if (moved && !decisions[moved.id] && !out[moved.id]) {
      out[moved.id] = { ...d, url: moved.url, newUrl: undefined, free: undefined, editAppliedAt: Date.now() };
      migrated++;
    } else if (d.decision === 'delete' || moved || d.appliedAt) {
      out[id] = { ...d, appliedAt: d.appliedAt || Date.now() };
      applied++;
    } else {
      out[id] = d;
    }
  }
  return { decisions: out, migrated, applied };
}
