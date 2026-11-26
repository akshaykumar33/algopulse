var platesBetweenCandles = function(s, queries) {
  const n = s.length;
  const pref = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) {
    pref[i + 1] = pref[i] + (s.charCodeAt(i) === 42 ? 1 : 0);
  }
  const prev = new Int32Array(n);
  let last = -1;
  for (let i = 0; i < n; i++) {
    if (s.charCodeAt(i) === 124) last = i;
    prev[i] = last;
  }
  const next = new Int32Array(n);
  last = -1;
  for (let i = n - 1; i >= 0; i--) {
    if (s.charCodeAt(i) === 124) last = i;
    next[i] = last;
  }
  const m = queries.length;
  const ans = new Array(m);
  for (let i = 0; i < m; i++) {
    const l = next[queries[i][0]];
    const r = prev[queries[i][1]];
    if (l !== -1 && r !== -1 && l < r) {
      ans[i] = pref[r] - pref[l];
    } else {
      ans[i] = 0;
    }
  }
  return ans;
};
var solve = platesBetweenCandles;
if (require.main === module) {
  const fs = require('fs');
  function parseArgs(raw) {
    raw = raw.trim();
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
        const quote = raw[i], start = i;
        i++;
        while (i < raw.length) {
          if (raw[i] === '\\') i += 2;
          else if (raw[i] === quote) { i++; break; }
          else i++;
        }
        args.push(JSON.parse(raw.slice(start, i)));
      } else {
        const start = i;
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
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const parsed = parseArgs(raw);
    const res = platesBetweenCandles(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = platesBetweenCandles;
