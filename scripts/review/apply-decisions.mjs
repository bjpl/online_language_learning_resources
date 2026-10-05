#!/usr/bin/env node
// ===================================
// Apply review decisions to the language data files
//
// Usage:
//   npm run review:apply -- path/to/review-decisions.json          # dry run (prints the plan)
//   npm run review:apply -- path/to/review-decisions.json --write  # apply it
//
// delete → the resource is removed (and its category, if it becomes empty)
// edit   → new URL and free/paid flag are applied; notes are written to
//          review_results/manual-edits.md for anything that needs a human
// keep / skip → no change
//
// Every edited file is re-imported before it is written, to prove it still
// loads and contains exactly the expected changes.
// ===================================
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import { createHash } from 'crypto';
import { ROOT, RESULTS_DIR, DECISIONS_FILE, dataFileFor, importLanguageFile } from './lib/load-data.mjs';
import { parseDataFile, findResources, stringValue, removeElementEdit, encodeString, applyEdit } from './lib/js-source.mjs';
import { flattenLanguage } from '../../tools/review/lib/resources.js';

function locate(src, d) {
  const all = findResources(parseDataFile(src));
  const match = all.filter(
    f => stringValue(f.node, 'name') === d.name && stringValue(f.node, 'url') === d.url,
  );
  const sameType = match.filter(f => f.type === d.type);
  return (sameType.length ? sameType : match)[0] || null;
}

function deleteResource(src, d) {
  const hit = locate(src, d);
  if (!hit) { return null; }
  let out = applyEdit(src, removeElementEdit(src, hit.array, hit.index));
  // Drop a category left with no items
  if (hit.group) {
    const groups = findResources(parseDataFile(out));
    const stillHas = groups.some(g => g.group && g.type === hit.type && g.groupIndex === hit.groupIndex);
    if (!stillHas) {
      const root = parseDataFile(out);
      const groupArray = root.get('resources').get(hit.type);
      out = applyEdit(out, removeElementEdit(out, groupArray, hit.groupIndex));
    }
  }
  return out;
}

/** Returns { src, applied: [...], manual: [...] } or null if the resource wasn't found. */
function editResource(src, d) {
  const hit = locate(src, d);
  if (!hit) { return null; }
  const edits = [];
  const applied = [];
  const manual = [];
  if (d.newUrl && d.newUrl !== d.url) {
    const urlNode = hit.node.get('url');
    if (urlNode?.type === 'string') {
      edits.push({ start: urlNode.start, end: urlNode.end, text: encodeString(d.newUrl, urlNode.quote) });
      applied.push(`url → ${d.newUrl}`);
    } else {
      manual.push(`add url ${d.newUrl}`);
    }
  }
  if (typeof d.free === 'boolean') {
    const freeNode = hit.node.get('free');
    if (freeNode?.type === 'literal' && freeNode.value !== d.free) {
      edits.push({ start: freeNode.start, end: freeNode.end, text: String(d.free) });
      applied.push(`free → ${d.free}`);
    } else if (!freeNode) {
      manual.push(`set free: ${d.free}`);
    }
  }
  if (d.notes) { manual.push(d.notes); }
  // Apply from the end of the file backwards so earlier offsets stay valid
  edits.sort((a, b) => b.start - a.start);
  return { src: edits.reduce(applyEdit, src), applied, manual };
}

async function verify(langKey, newSrc, expected) {
  const tmp = path.join(os.tmpdir(), `review-verify-${langKey}-${process.pid}.mjs`);
  fs.writeFileSync(tmp, newSrc);
  try {
    const data = await importLanguageFile(tmp);
    const after = flattenLanguage(langKey, data);
    const problems = [];
    if (after.length !== expected.count) {
      problems.push(`expected ${expected.count} resources, found ${after.length}`);
    }
    for (const url of expected.urlsPresent) {
      if (!after.some(r => r.url === url)) { problems.push(`missing new URL ${url}`); }
    }
    return problems;
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

async function main() {
  const args = process.argv.slice(2);
  const write = args.includes('--write');
  // Defaults to the file the review tool saves into the repo as you work
  const file = args.find(a => !a.startsWith('--')) || DECISIONS_FILE;
  if (!fs.existsSync(file)) {
    console.error(`No decisions file at ${path.relative(process.cwd(), file)}.`);
    console.error('Usage: npm run review:apply [-- <review-decisions.json>] [--write]');
    process.exit(1);
  }
  const payload = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (payload.tool !== 'resource-review' || !Array.isArray(payload.decisions)) {
    console.error('Not a review tool export (expected tool: "resource-review").');
    process.exit(1);
  }

  // Rows the tool marked as already applied (status: 'applied') are skipped quietly
  const alreadyApplied = payload.decisions.filter(d => d.status === 'applied').length;
  const actionable = payload.decisions.filter(
    d => (d.decision === 'delete' || d.decision === 'edit') && d.status !== 'applied',
  );
  if (alreadyApplied) {
    console.warn(`${alreadyApplied} decisions were already applied earlier; skipping them.`);
  }
  const byLang = new Map();
  for (const d of actionable) {
    byLang.set(d.language, [...(byLang.get(d.language) || []), d]);
  }
  console.warn(`${payload.decisions.length} decisions; ${actionable.length} change data across ${byLang.size} languages.${write ? '' : ' (dry run)'}\n`);

  const notFound = [];
  const manualEdits = [];
  const done = []; // decisions applied in files that were written
  let changedFiles = 0;
  let failed = false;

  for (const [langKey, decisions] of byLang) {
    const dataFile = dataFileFor(langKey);
    if (!dataFile) {
      notFound.push(...decisions.map(d => ({ ...d, why: `unknown language ${langKey}` })));
      continue;
    }
    const original = fs.readFileSync(dataFile, 'utf8');
    const before = flattenLanguage(langKey, await importLanguageFile(dataFile)).length;
    let src = original;
    let deleted = 0;
    const urlsPresent = [];
    const lines = [];
    const handled = [];

    for (const d of decisions) {
      if (d.decision === 'delete') {
        const out = deleteResource(src, d);
        if (out === null) { notFound.push(d); continue; }
        src = out;
        deleted++;
        handled.push(d);
        lines.push(`  - delete  ${d.name}  (${d.url || 'no url'})${d.notes ? `  - ${d.notes}` : ''}`);
      } else {
        const res = editResource(src, d);
        if (res === null) { notFound.push(d); continue; }
        src = res.src;
        handled.push(d);
        if (d.newUrl) { urlsPresent.push(d.newUrl); }
        if (res.applied.length) { lines.push(`  ~ edit    ${d.name}: ${res.applied.join(', ')}`); }
        if (res.manual.length) {
          manualEdits.push({ ...d, todo: res.manual });
          lines.push(`  ? manual  ${d.name}: ${res.manual.join(' / ')}`);
        }
      }
    }
    if (src === original) {
      // Nothing to change in the file (e.g. note-only edits, recorded below)
      if (lines.length) { console.warn(`${langKey}\n${lines.join('\n')}\n`); }
      done.push(...handled);
      continue;
    }

    const problems = await verify(langKey, src, { count: before - deleted, urlsPresent });
    console.warn(`${langKey} (${path.relative(ROOT, dataFile)}): ${before} → ${before - deleted} resources`);
    console.warn(lines.join('\n'));
    if (problems.length) {
      failed = true;
      console.error(`  ✗ verification failed, file left unchanged: ${problems.join('; ')}\n`);
      continue;
    }
    console.warn('  ✓ verified\n');
    if (write) {
      fs.writeFileSync(dataFile, src);
      changedFiles++;
      done.push(...handled);
    }
  }

  if (notFound.length) {
    console.warn(`Not found (already applied, or the data changed since the review) - ${notFound.length}:`);
    for (const d of notFound) { console.warn(`  ${d.language}: ${d.name} (${d.url})${d.why ? ` - ${d.why}` : ''}`); }
    console.warn('');
  }

  if (manualEdits.length && write) {
    const out = path.join(RESULTS_DIR, 'manual-edits.md');
    const existing = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
    // Each to-do carries a marker so re-running apply never adds it twice
    const marker = d => `<!-- review:${createHash('sha1').update([d.language, d.type, d.name, ...d.todo].join('|')).digest('hex').slice(0, 12)} -->`;
    const fresh = manualEdits.filter(d => !existing.includes(marker(d)));
    if (fresh.length) {
      const body = fresh
        .map(d => `- [ ] **${d.language}** / ${d.type} / ${d.name} ${marker(d)}\n  - ${d.url}\n${d.todo.map(t => `  - ${t}`).join('\n')}`)
        .join('\n');
      fs.appendFileSync(out, `\n## ${new Date().toISOString().slice(0, 10)}\n\n${body}\n`);
    }
    console.warn(`${manualEdits.length} edits need a human (${fresh.length} new) - listed in ${path.relative(ROOT, out)}`);
  }

  // Record what was applied in the decisions file itself, so the review tool and
  // later runs know for certain (the tool keeps these marks when it saves)
  if (write && done.length) {
    for (const d of done) { d.status = 'applied'; }
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, `${JSON.stringify(payload, null, 1)}\n`);
    fs.renameSync(tmp, file);
    console.warn(`Marked ${done.length} decisions as applied in ${path.relative(process.cwd(), file)}.`);
  }

  if (write && changedFiles) {
    execFileSync(process.execPath, [path.join(ROOT, 'scripts/generate-resource-counts.js')], { stdio: 'ignore' });
    fs.copyFileSync(path.join(ROOT, 'assets/data/resource-counts.json'), path.join(ROOT, 'public/assets/data/resource-counts.json'));
    console.warn(`Updated ${changedFiles} data files and regenerated resource counts. Review with \`git diff\`, then commit.`);
  } else if (!write) {
    console.warn('Dry run - nothing written. Re-run with --write to apply.');
  }
  process.exit(failed ? 1 : 0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
