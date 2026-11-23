var shortestSubstrings = function(arr) {
  const n = arr.length;
  const map = new Map();
  for (let i = 0; i < n; i++) {
    const seen = new Set();
    const s = arr[i];
    for (let l = 0; l < s.length; l++) {
      for (let r = l + 1; r <= s.length; r++) {
        seen.add(s.slice(l, r));
      }
    }
    for (const sub of seen) {
      map.set(sub, (map.get(sub) || 0) + 1);
    }
  }
  const ans = [];
  for (let i = 0; i < n; i++) {
    const s = arr[i];
    const candidates = [];
    for (let l = 0; l < s.length; l++) {
      for (let r = l + 1; r <= s.length; r++) {
        const sub = s.slice(l, r);
        if (map.get(sub) === 1) candidates.push(sub);
      }
    }
    if (candidates.length === 0) {
      ans.push('');
    } else {
      candidates.sort((a, b) => a.length !== b.length ? a.length - b.length : a.localeCompare(b));
      ans.push(candidates[0]);
    }
  }
  return ans;
};
var solve = shortestSubstrings;
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
module.exports = shortestSubstrings;
