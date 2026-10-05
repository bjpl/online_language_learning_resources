#!/usr/bin/env node
// Serve the repository root so the review tool can load the language data
// as ES modules, and save decisions into the repo as you work.
// Usage: npm run review  (optional: -- --port=8080)
//
// GET/PUT /__review/decisions reads/writes review_results/decisions/review-decisions.json
// (commit it - it is your review). A once-a-day snapshot also goes to
// review_results/decisions/daily/ (git-ignored) as a local safety net.
import http from 'http';
import fs from 'fs';
import path from 'path';
import { ROOT, DECISIONS_FILE } from './lib/load-data.mjs';

const port = Number((process.argv.find(a => a.startsWith('--port=')) || '--port=8080').split('=')[1]);
const DAILY_DIR = path.join(path.dirname(DECISIONS_FILE), 'daily');
const MAX_BODY = 50 * 1024 * 1024;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

function send(res, code, body, type = 'application/json; charset=utf-8') {
  res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(body);
}

// review:apply marks rows it applied in the decisions file. If the tool was open
// meanwhile, its next save would drop those marks; carry them over instead.
function keepAppliedMarks(payload) {
  if (!fs.existsSync(DECISIONS_FILE)) {
    return;
  }
  try {
    const existing = JSON.parse(fs.readFileSync(DECISIONS_FILE, 'utf8'));
    const applied = new Map(
      (existing.decisions || []).filter(d => d.status === 'applied').map(d => [d.id, d.decidedAt]),
    );
    for (const d of payload.decisions) {
      if (d.status !== 'applied' && applied.has(d.id) && applied.get(d.id) === d.decidedAt) {
        d.status = 'applied';
      }
    }
  } catch {
    // An unreadable old file is simply replaced
  }
}

function saveDecisions(req, res) {
  let size = 0;
  const chunks = [];
  req.on('data', chunk => {
    size += chunk.length;
    if (size > MAX_BODY) {
      req.destroy();
      return;
    }
    chunks.push(chunk);
  });
  req.on('end', () => {
    let payload;
    try {
      payload = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch {
      send(res, 400, '{"error":"invalid JSON"}');
      return;
    }
    if (payload.tool !== 'resource-review' || !Array.isArray(payload.decisions)) {
      send(res, 400, '{"error":"not a review tool export"}');
      return;
    }
    try {
      keepAppliedMarks(payload);
      fs.mkdirSync(DAILY_DIR, { recursive: true });
      const json = `${JSON.stringify(payload, null, 1)}\n`;
      // Write to a temp file and rename, so a crash never leaves a half-written file
      const tmp = `${DECISIONS_FILE}.tmp`;
      fs.writeFileSync(tmp, json);
      fs.renameSync(tmp, DECISIONS_FILE);
      fs.writeFileSync(path.join(DAILY_DIR, `${new Date().toISOString().slice(0, 10)}.json`), json);
      send(res, 200, JSON.stringify({ ok: true, savedAt: new Date().toISOString(), count: payload.decisions.length }));
    } catch (e) {
      console.error('Could not save decisions:', e.message);
      send(res, 500, JSON.stringify({ error: e.message }));
    }
  });
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

  if (urlPath === '/__review/decisions') {
    if (req.method === 'PUT' || req.method === 'POST') {
      saveDecisions(req, res);
    } else if (fs.existsSync(DECISIONS_FILE)) {
      send(res, 200, fs.readFileSync(DECISIONS_FILE));
    } else {
      send(res, 404, '{"error":"no saved decisions yet"}');
    }
    return;
  }

  let file = path.normalize(path.join(ROOT, urlPath));
  if (!file.startsWith(ROOT)) {
    send(res, 403, '');
    return;
  }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, 'index.html');
  }
  fs.readFile(file, (err, body) => {
    if (err) {
      send(res, 404, 'Not found', 'text/plain');
      return;
    }
    send(res, 200, body, TYPES[path.extname(file)] || 'application/octet-stream');
  });
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use - the review server is probably already running.`);
    console.error(`Open http://localhost:${port}/tools/review/ in your browser.`);
    console.error('(Using a different port works too: your decisions load from the repo file either way.)');
  } else {
    console.error(err.message);
  }
  process.exit(1);
});

// Listen on this machine only: the server can write files
server.listen(port, '127.0.0.1', () => {
  console.warn(`Review tool: http://localhost:${port}/tools/review/`);
  console.warn(`Decisions save to ${path.relative(process.cwd(), DECISIONS_FILE)} as you work - commit it now and then.`);
  console.warn('Press Ctrl+C to stop.');
});
