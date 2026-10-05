#!/usr/bin/env node
// Serve the repository root so the review tool can load the language data
// as ES modules. Usage: npm run review  (optional: -- --port=8080)
import http from 'http';
import fs from 'fs';
import path from 'path';
import { ROOT } from './lib/load-data.mjs';

const port = Number((process.argv.find(a => a.startsWith('--port=')) || '--port=8080').split('=')[1]);
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

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  let file = path.normalize(path.join(ROOT, urlPath));
  if (!file.startsWith(ROOT)) {
    res.writeHead(403).end();
    return;
  }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, 'index.html');
  }
  fs.readFile(file, (err, body) => {
    if (err) {
      res.writeHead(404).end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(body);
  });
});

server.listen(port, () => {
  console.warn(`Review tool: http://localhost:${port}/tools/review/`);
  console.warn('Press Ctrl+C to stop. Decisions are kept in your browser; export them from the tool.');
});
