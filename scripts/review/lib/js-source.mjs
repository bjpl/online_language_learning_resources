// Minimal, position-preserving parser for the language data files.
// Parses the `const xResources = { ... }` object literal into nodes that
// remember their character spans, so edits can splice the original text and
// keep its formatting, quoting and comments intact.

const PUNCT = new Set(['{', '}', '[', ']', ',', ':']);

function decodeString(raw) {
  const body = raw.slice(1, -1);
  return body.replace(/\\(u\{[0-9a-fA-F]+\}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{2}|.)/gs, (_, esc) => {
    if (esc[0] === 'u') {
      const hex = esc[1] === '{' ? esc.slice(2, -1) : esc.slice(1);
      return String.fromCodePoint(parseInt(hex, 16));
    }
    if (esc[0] === 'x') {
      return String.fromCharCode(parseInt(esc.slice(1), 16));
    }
    return { n: '\n', t: '\t', r: '\r', b: '\b', f: '\f', v: '\v', 0: '\0' }[esc] ?? esc;
  });
}

/** Tokenize from `start` until the matching close of the first `{`. */
function tokenize(src, start) {
  const tokens = [];
  let i = start;
  let depth = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) { i++; continue; }
    if (c === '/' && src[i + 1] === '/') { i = src.indexOf('\n', i); if (i === -1) { break; } continue; }
    if (c === '/' && src[i + 1] === '*') { i = src.indexOf('*/', i) + 2; continue; }
    if (c === '"' || c === "'" || c === '`') {
      let j = i + 1;
      while (j < src.length && src[j] !== c) { j += src[j] === '\\' ? 2 : 1; }
      const raw = src.slice(i, j + 1);
      tokens.push({ t: 'str', start: i, end: j + 1, raw, value: decodeString(raw), quote: c });
      i = j + 1;
      continue;
    }
    if (PUNCT.has(c)) {
      tokens.push({ t: c, start: i, end: i + 1 });
      if (c === '{' || c === '[') { depth++; }
      if (c === '}' || c === ']') {
        depth--;
        if (depth === 0) { break; }
      }
      i++;
      continue;
    }
    const m = /^[A-Za-z0-9_$.+-]+/.exec(src.slice(i, i + 200));
    if (!m) { throw new Error(`Unexpected character ${JSON.stringify(c)} at ${i}`); }
    tokens.push({ t: 'word', start: i, end: i + m[0].length, raw: m[0] });
    i += m[0].length;
  }
  return tokens;
}

function parseValue(tokens, pos) {
  const tok = tokens[pos.i];
  if (tok.t === '{') { return parseObject(tokens, pos); }
  if (tok.t === '[') { return parseArray(tokens, pos); }
  pos.i++;
  if (tok.t === 'str') { return { type: 'string', start: tok.start, end: tok.end, value: tok.value, quote: tok.quote }; }
  if (tok.t === 'word') {
    const value = tok.raw === 'true' ? true : tok.raw === 'false' ? false : tok.raw === 'null' ? null : Number(tok.raw);
    return { type: 'literal', start: tok.start, end: tok.end, value, raw: tok.raw };
  }
  throw new Error(`Unexpected token ${tok.t} at ${tok.start}`);
}

function parseObject(tokens, pos) {
  const open = tokens[pos.i++];
  const props = [];
  while (tokens[pos.i].t !== '}') {
    const keyTok = tokens[pos.i++];
    const key = keyTok.t === 'str' ? keyTok.value : keyTok.raw;
    if (tokens[pos.i++].t !== ':') { throw new Error(`Expected ':' after key ${key} at ${keyTok.start}`); }
    const value = parseValue(tokens, pos);
    props.push({ key, start: keyTok.start, end: value.end, value });
    if (tokens[pos.i].t === ',') { pos.i++; }
  }
  const close = tokens[pos.i++];
  const node = { type: 'object', start: open.start, end: close.end, props };
  node.get = k => props.find(p => p.key === k)?.value;
  return node;
}

function parseArray(tokens, pos) {
  const open = tokens[pos.i++];
  const items = [];
  while (tokens[pos.i].t !== ']') {
    items.push(parseValue(tokens, pos));
    if (tokens[pos.i].t === ',') { pos.i++; }
  }
  const close = tokens[pos.i++];
  return { type: 'array', start: open.start, end: close.end, items };
}

/** Parse the language object in a data file's source. */
export function parseDataFile(src) {
  const m = /const\s+\w+\s*=\s*\{/.exec(src);
  if (!m) { throw new Error('No `const name = {` object found'); }
  const tokens = tokenize(src, m.index + m[0].length - 1);
  return parseValue(tokens, { i: 0 });
}

/**
 * Find resource objects (with their parent array and category) in a parsed file.
 * Returns [{ node, array, index, group, groupArray, groupIndex, type }]
 */
export function findResources(root) {
  const found = [];
  const resources = root.get('resources');
  if (!resources || resources.type !== 'object') { return found; }
  for (const typeProp of resources.props) {
    const groups = typeProp.value;
    if (groups.type !== 'array') { continue; }
    groups.items.forEach((group, groupIndex) => {
      if (group.type !== 'object') { return; }
      const items = group.get('items');
      if (items?.type === 'array') {
        items.items.forEach((node, index) => {
          if (node.type === 'object') {
            found.push({ node, array: items, index, group, groupArray: groups, groupIndex, type: typeProp.key });
          }
        });
      } else if (group.get('name')) {
        found.push({ node: group, array: groups, index: groupIndex, group: null, type: typeProp.key });
      }
    });
  }
  return found;
}

export function stringValue(node, key) {
  const v = node.get(key);
  return v?.type === 'string' ? v.value : undefined;
}

/** Text edit that removes array element `index`, including its separating comma. */
export function removeElementEdit(src, array, index) {
  const items = array.items;
  const item = items[index];
  if (items.length === 1) {
    return { start: array.start + 1, end: array.end - 1, text: '' };
  }
  if (index < items.length - 1) {
    return { start: item.start, end: items[index + 1].start, text: '' };
  }
  return { start: items[index - 1].end, end: item.end, text: '' };
}

/** Encode a string literal using the quote style already used in the file. */
export function encodeString(value, quote) {
  if (quote === "'") {
    return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
  }
  return JSON.stringify(value);
}

export function applyEdit(src, edit) {
  return src.slice(0, edit.start) + edit.text + src.slice(edit.end);
}
