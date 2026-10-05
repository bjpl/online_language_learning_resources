// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import http from 'http';
import {
  flattenLanguage,
  assignIds,
  normalizeUrl,
  buildUrlIndex,
  buildPriorReviewIndex,
  assess,
  buildExport,
  mergeDecisions,
} from '../../tools/review/lib/resources.js';
import { classify, compareUrls, isEmbeddable } from '../../scripts/review/lib/link-classify.mjs';
import { checkUrl } from '../../scripts/review/lib/link-fetch.mjs';
import {
  parseDataFile,
  findResources,
  stringValue,
  removeElementEdit,
  encodeString,
  applyEdit,
} from '../../scripts/review/lib/js-source.mjs';

const lang = {
  name: 'Testish',
  flag: '🏳️',
  resources: {
    courses: [
      {
        category: 'Online',
        items: [
          { name: 'Alpha', url: 'https://alpha.example/learn/', free: true },
          { name: 'Beta', url: 'http://beta.example/x', free: false },
          { name: 'Alpha', url: 'https://alpha.example/learn/', free: true },
        ],
      },
    ],
    apps: [{ category: 'Apps', items: [{ name: 'Store', url: 'App stores' }] }],
  },
};

describe('review model', () => {
  const resources = assignIds(flattenLanguage('testish', lang));

  it('flattens categories and keeps context', () => {
    expect(resources).toHaveLength(4);
    expect(resources[0]).toMatchObject({ language: 'testish', type: 'courses', category: 'Online', languageName: 'Testish' });
  });

  it('gives exact duplicates distinct, stable ids', () => {
    expect(resources[0].id).toBe('testish::courses::https://alpha.example/learn/::Alpha');
    expect(resources[2].id).toBe(`${resources[0].id}::2`);
  });

  it('normalizes URLs for matching', () => {
    expect(normalizeUrl('https://www.Example.com/a/')).toBe(normalizeUrl('http://example.com/a'));
    // Hash-routed pages are different resources
    expect(normalizeUrl('https://bloomlibrary.org/#!/language:ceb')).not.toBe(normalizeUrl('https://bloomlibrary.org/#!/language:af'));
  });

  it('flags dead links, prior removals, duplicates and non-links', () => {
    const ctx = {
      linkCheck: { 'http://beta.example/x': { status: 'redirect', code: 200, finalUrl: 'https://beta.example/y' } },
      urlIndex: buildUrlIndex(resources),
      priorReview: buildPriorReviewIndex([{ language: 'testish', url: 'https://alpha.example/learn' }], []),
    };
    const alpha = assess(resources[0], ctx);
    expect(alpha.signals.map(s => s.kind)).toEqual(expect.arrayContaining(['prior', 'duplicate', 'link']));
    expect(alpha.score).toBe(3);

    const beta = assess(resources[1], ctx);
    expect(beta.suggestedUrl).toBe('https://beta.example/y');
    expect(beta.score).toBe(2);

    expect(assess(resources[3], ctx).signals[0]).toMatchObject({ kind: 'url', severity: 'high', label: 'Not a link' });
  });

  it('uses the prior review replacement as a suggestion', () => {
    const ctx = {
      linkCheck: null,
      urlIndex: new Map(),
      priorReview: buildPriorReviewIndex([], [{ language: 'testish', original_url: 'http://beta.example/x', replacement_url: 'https://new.example/' }]),
    };
    expect(assess(resources[1], ctx).suggestedUrl).toBe('https://new.example/');
  });

  it('round-trips decisions through export and import, newest wins', () => {
    const decisions = { [resources[1].id]: { decision: 'edit', newUrl: 'https://beta.example/y', decidedAt: 10 } };
    const exported = buildExport(resources, decisions);
    expect(exported.decisions[0]).toMatchObject({ name: 'Beta', url: 'http://beta.example/x', newUrl: 'https://beta.example/y', language: 'testish' });
    expect(exported.counts.edit).toBe(1);

    const older = { [resources[1].id]: { decision: 'keep', decidedAt: 5 } };
    expect(mergeDecisions(older, exported).merged[resources[1].id].decision).toBe('edit');
    const newer = { [resources[1].id]: { decision: 'delete', decidedAt: 99 } };
    expect(mergeDecisions(newer, exported).merged[resources[1].id].decision).toBe('delete');
  });
});

describe('link classification', () => {
  it('ignores cosmetic URL differences', () => {
    expect(compareUrls('http://www.a.com/x/', 'https://a.com/x')).toBe('same');
    expect(compareUrls('https://a.com/course/danish', 'https://a.com/')).toBe('home');
    expect(compareUrls('https://a.com/course/danish', 'https://a.com/en')).toBe('home');
    expect(compareUrls('https://a.com/course/danish', 'https://a.com/courses/danish')).toBe('moved');
  });

  it('detects pages that refuse to be embedded', () => {
    expect(isEmbeddable({ 'x-frame-options': 'SAMEORIGIN' })).toBe(false);
    expect(isEmbeddable({ 'content-security-policy': "frame-ancestors 'self'" })).toBe(false);
    expect(isEmbeddable({ 'content-security-policy': 'frame-ancestors *' })).toBe(true);
    expect(isEmbeddable({})).toBe(true);
  });

  it('classifies outcomes', () => {
    expect(classify({ url: 'https://a.com/x', code: 404 }).status).toBe('dead');
    expect(classify({ url: 'https://a.com/x', errorCode: 'ENOTFOUND' })).toMatchObject({ status: 'dead', error: 'Domain not found' });
    expect(classify({ url: 'https://a.com/x', code: 403, headers: {} }).status).toBe('blocked');
    expect(classify({ url: 'https://a.com/x', code: 503, headers: { server: 'cloudflare' } }).status).toBe('blocked');
    expect(classify({ url: 'https://a.com/x', code: 500, headers: {} }).status).toBe('error');
    expect(classify({ url: 'https://a.com/x', timedOut: true }).status).toBe('timeout');
    expect(classify({ url: 'http://a.com/x', code: 200, finalUrl: 'https://a.com/x', headers: {} })).toMatchObject({
      status: 'redirect',
      finalUrl: 'https://a.com/x',
    });
    expect(classify({ url: 'https://a.com/x', code: 200, finalUrl: 'https://a.com/x/', headers: {} })).toMatchObject({
      status: 'ok',
      finalUrl: undefined,
    });
  });
});

describe('link fetching (local server)', () => {
  let server;
  let base;
  beforeAll(async () => {
    server = http.createServer((req, res) => {
      const routes = {
        '/ok': () => res.writeHead(200, { 'Content-Type': 'text/html' }).end('<p>hi</p>'),
        '/gone': () => res.writeHead(404).end(),
        '/old-page': () => res.writeHead(301, { Location: '/new-page' }).end(),
        '/new-page': () => res.writeHead(200).end('moved here'),
        '/deep/lesson': () => res.writeHead(302, { Location: '/' }).end(),
        '/': () => res.writeHead(200).end('home'),
        '/no-frames': () => res.writeHead(200, { 'X-Frame-Options': 'DENY' }).end('x'),
        '/bot-wall': () => res.writeHead(403, { Server: 'cloudflare' }).end(),
        '/slow': () => {},
      };
      (routes[req.url] || routes['/gone'])();
    });
    await new Promise(r => server.listen(0, '127.0.0.1', r));
    base = `http://127.0.0.1:${server.address().port}`;
  });
  afterAll(() => {
    server.closeAllConnections();
    server.close();
  });

  const cases = [
    ['/ok', { status: 'ok', embeddable: true }],
    ['/gone', { status: 'dead', code: 404 }],
    ['/old-page', { status: 'redirect' }],
    ['/deep/lesson', { status: 'redirect-home' }],
    ['/no-frames', { status: 'ok', embeddable: false }],
    ['/bot-wall', { status: 'blocked' }],
  ];
  it.each(cases)('%s', async (path, expected) => {
    const result = await checkUrl(`${base}${path}`, { timeout: 2000 });
    expect(result).toMatchObject(expected);
    if (path === '/old-page') {
      expect(result.finalUrl).toBe(`${base}/new-page`);
    }
  });

  it('times out on unresponsive servers', async () => {
    const result = await checkUrl(`${base}/slow`, { timeout: 200 });
    expect(result.status).toBe('timeout');
  }, 10000);
});

describe('data file source editing', () => {
  const src = `// header
const testResources = {
    name: "Test",
    resources: {
        courses: [
            {
                category: "One",
                items: [
                    { name: "A", url: "https://a.example/", free: true },
                    { 'name': 'B "quoted"', 'url': 'https://b.example/it\\'s', free: false },
                    { "name": "C", "url": "https://c.example/", "free": true } // trailing comment
                ]
            },
            {
                category: "Solo",
                items: [
                    { name: "D", url: "https://d.example/" }
                ]
            }
        ]
    }
};
export default testResources;
`;
  const find = (s, name) => findResources(parseDataFile(s)).find(f => stringValue(f.node, 'name') === name);
  const evalSrc = s => new Function(`${s.replace('export default testResources;', '')} return testResources;`)();

  it('parses all quoting styles', () => {
    const found = findResources(parseDataFile(src));
    expect(found.map(f => stringValue(f.node, 'name'))).toEqual(['A', 'B "quoted"', 'C', 'D']);
    expect(stringValue(found[1].node, 'url')).toBe("https://b.example/it's");
  });

  it('removes first, middle and last items, keeping valid syntax', () => {
    for (const name of ['A', 'B "quoted"', 'C']) {
      const hit = find(src, name);
      const out = applyEdit(src, removeElementEdit(src, hit.array, hit.index));
      const names = evalSrc(out).resources.courses[0].items.map(i => i.name);
      expect(names).toHaveLength(2);
      expect(names).not.toContain(name);
    }
  });

  it('can empty a category and then remove it', () => {
    const hit = find(src, 'D');
    let out = applyEdit(src, removeElementEdit(src, hit.array, hit.index));
    expect(evalSrc(out).resources.courses[1].items).toEqual([]);
    const groups = parseDataFile(out).get('resources').get('courses');
    out = applyEdit(out, removeElementEdit(out, groups, 1));
    expect(evalSrc(out).resources.courses.map(c => c.category)).toEqual(['One']);
  });

  it('replaces a URL in the file’s own quote style', () => {
    const hit = find(src, 'B "quoted"');
    const node = hit.node.get('url');
    const out = applyEdit(src, { start: node.start, end: node.end, text: encodeString("https://b.example/new's", node.quote) });
    expect(out).toContain("'url': 'https://b.example/new\\'s'");
    expect(evalSrc(out).resources.courses[0].items[1].url).toBe("https://b.example/new's");
  });
});
