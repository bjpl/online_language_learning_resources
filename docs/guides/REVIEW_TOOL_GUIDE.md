# Resource Review Tool

A local tool for going through every resource on the site and deciding what stays.
Automated checks do the tedious part (dead links, redirects, duplicates); you make
the judgment calls, with shortcuts for each decision.

## The workflow

```bash
npm run review:check-links   # 1. once, ~10-20 min: check every URL
npm run review               # 2. open http://localhost:8080/tools/review/ and review
                             # 3. decisions save into the repo as you go; commit them now and then
npm run review:apply         # 4. dry run
npm run review:apply -- --write   #    then apply
git diff                     # 5. check, then commit
```

### 1. Check links (run on your own machine)

`npm run review:check-links` fetches every unique URL (about 3,400) like a browser
would and writes `review_results/link-check.json`. It is safe to stop with Ctrl+C
and re-run; it continues where it left off.

| Result | Meaning |
|--------|---------|
| Dead | 404/410, or the domain no longer exists |
| Redirects to homepage | A deep link now lands on the site's front page; the page is probably gone |
| Moved | The page now lives at another URL (offered as a one-key fix) |
| Server error / Timed out | Retried once; still failing |
| Bot-protected | 401/403/429 or Cloudflare; the checker can't tell, so you look |
| OK | Works. It also records whether the site allows embedding in the preview |

Options: `--retry-failed` re-checks anything not OK, `--recheck` re-checks
everything, `--lang=danish,hindi` limits the run, and `--concurrency=12` and
`--timeout=20000` tune it. Commit `link-check.json` so the results travel with the repo.

### 2. Review

`npm run review` starts a small local server; open the printed URL. Without it, the
browser won't load the language data.

The tool also flags:
- Removals and URL fixes from the 2025 link review that were never applied
- The same URL listed twice in one language
- Entries whose "URL" isn't a link (e.g. "App stores")
- Missing free/paid flags

**Problems first** (the default order) puts all of that at the top, so the
highest-value decisions come first. Filter by language, type, link result or
decision; the queue stays fixed until you change a filter, so deciding an item never
reshuffles the list.

**Previews.** Many sites refuse to load inside another page. The tool knows which
ones (from the link check) and skips straight to a note instead of a blank frame.
Turn on the **companion window** (`W`) to open every resource in one reused browser
window instead; put it on a second screen and keep your hands on the keyboard. The
next item is preloaded in the background.

### Shortcuts

| Key | Action |
|-----|--------|
| `K` / `D` / `S` | Keep / Delete / Skip, then move to the next undecided item |
| `E` | Edit: type a note, `Enter` saves and moves on |
| `U` | Use the suggested URL (from a redirect or the 2025 review) |
| `F` | Flip free / paid |
| `A` | Same decision as this URL got in another language |
| `Z` | Undo the last decision |
| `←` `→` / `J` | Previous / next / next undecided |
| `Space` | Open in a new tab |
| `W` / `P` | Companion window / embedded preview on or off |
| `/` | Search (Enter returns to the shortcuts) |
| `Ctrl+S` | Export decisions |

Changing the URL or the cost turns Keep into Edit automatically. With the link filter
set to *Dead* or *Redirects to homepage*, a button marks them all as Delete in one go
(each is undoable).

### 3. Saving

Every decision is saved, about a second later, to
`review_results/decisions/review-decisions.json`. The top bar shows "Saved to repo"
with the time. **Commit that file now and then**: it is your review, and git
history versions it. The tool also keeps a copy in the browser, and on load merges the
two (the newest decision wins). So a different port or browser, or cleared browser
data, loses nothing.

As a further safety net, the first save each day also goes to
`review_results/decisions/daily/` (not committed).

If the top bar says "Saved in this browser only", the tool wasn't started with
`npm run review`. Restart it that way, or press **Ctrl+S** to download a copy.
**Import** merges a downloaded copy back in.

If port 8080 is busy, the review server is probably already running; just open the
address it printed.

### 4. Apply

`npm run review:apply` (or `-- <file.json>` for a downloaded copy) prints what would change: deletions,
URL and cost fixes, and anything not found (the data changed since the review).
Add `--write` to apply it. Applied decisions are marked as applied in the decisions
file, so running it again only picks up new decisions, and the tool keeps showing
them as decided (an edited URL keeps its decision). Each edited file is re-imported to prove it still loads
and has exactly the expected number of resources before it is written, and the
homepage resource counts are regenerated. Edits that need a human (notes without a
URL or cost change) are listed in `review_results/manual-edits.md`, each only once.

## Files

| Path | What |
|------|------|
| `tools/review/` | The review tool (not part of the deployed site) |
| `tools/review/lib/resources.js` | Shared resource model and signals |
| `scripts/review/check-links.mjs` | Link checker |
| `scripts/review/apply-decisions.mjs` | Applies exported decisions |
| `review_results/decisions/review-decisions.json` | Your decisions (saved as you work; commit it) |
| `review_results/link-check.json` | Link check results |
| `review_results/deduplicated/unique_removals.json`, `url_replacements.json` | 2025 review, shown as hints |

## Troubleshooting

- **"Couldn't load the language data"**: start with `npm run review`; don't open the HTML file directly.
- **Companion window doesn't open**: allow pop-ups for `localhost`.
- **Link check shows everything as error**: check your network; behind a corporate proxy, run with `NODE_USE_ENV_PROXY=1` (Node 22.21+).
