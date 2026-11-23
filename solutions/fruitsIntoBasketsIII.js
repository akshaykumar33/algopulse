var numOfUnplacedFruits = function(fruits, baskets) {
  const n = baskets.length;
  const tree = new Int32Array(4 * n);
  function build(node, l, r) {
    if (l === r) {
      tree[node] = baskets[l];
      return;
    }
    const mid = (l + r) >> 1;
    build(node * 2, l, mid);
    build(node * 2 + 1, mid + 1, r);
    tree[node] = Math.max(tree[node * 2], tree[node * 2 + 1]);
  }
  function queryAndUse(node, l, r, val) {
    if (tree[node] < val) return -1;
    if (l === r) {
      tree[node] = -1;
      return l;
    }
    const mid = (l + r) >> 1;
    let res = -1;
    if (tree[node * 2] >= val) {
      res = queryAndUse(node * 2, l, mid, val);
    } else {
      res = queryAndUse(node * 2 + 1, mid + 1, r, val);
    }
    tree[node] = Math.max(tree[node * 2], tree[node * 2 + 1]);
    return res;
  }
  build(1, 0, n - 1);
  let unplaced = 0;
  for (const x of fruits) {
    const idx = queryAndUse(1, 0, n - 1, x);
    if (idx === -1) unplaced++;
  }
  return unplaced;
};
var solve = numOfUnplacedFruits;
if (require.main === module) {
  const fs = require('fs');
  function parseArgs(raw) {
    raw = raw.trim();
    try {
      const p = JSON.parse(raw);
      if (Array.isArray(p) && solve.length > 1 && !raw.startsWith('[[')) return p;
    } catch (e) {}
    const args = [];
    let i = 0;
    while (i < raw.length) {
      while (i < raw.length && /\s/.test(raw[i])) i++;
      if (i >= raw.length) break;
      if (raw[i] === '[' || raw[i] === '{') {
        let depth = 0, start = i, inStr = false, quote = '';
        while (i < raw.length) {
          const c = raw[i];
          if (inStr) {
            if (c === '\\') i++;
            else if (c === quote) inStr = false;
          } else {
            if (c === '"' || c === "'") { inStr = true; quote = c; }
            else if (c === '[' || c === '{') depth++;
            else if (c === ']' || c === '}') {
              depth--;
              if (depth === 0) { i++; break; }
            }
          }
          i++;
        }
        args.push(JSON.parse(raw.slice(start, i)));
      } else if (raw[i] === '"' || raw[i] === "'") {
        let quote = raw[i], start = i; i++;
        while (i < raw.length) {
          if (raw[i] === '\\') i += 2;
          else if (raw[i] === quote) { i++; break; }
          else i++;
        }
        args.push(JSON.parse(raw.slice(start, i)));
      } else {
        let start = i;
        while (i < raw.length && !/\s/.test(raw[i])) i++;
        const tok = raw.slice(start, i);
        if (tok === 'true') args.push(true);
        else if (tok === 'false') args.push(false);
        else if (tok === 'null') args.push(null);
        else if (!isNaN(Number(tok))) args.push(Number(tok));
        else args.push(tok);
      }
    }
    return args;
  }
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = parseArgs(raw);
      const res = solve(...parsed);
      console.log(JSON.stringify(res));
    }
  } catch (e) {}
}
module.exports = numOfUnplacedFruits;
