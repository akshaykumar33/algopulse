var findMaxVal = function(n, restrictions, diff) {
  const cap = new Float64Array(n).fill(Infinity);
  cap[0] = 0;
  for (let i = 0; i < restrictions.length; i++) {
    const idx = restrictions[i][0];
    const val = restrictions[i][1];
    if (val < cap[idx]) cap[idx] = val;
  }
  for (let i = 1; i < n; i++) {
    const bound = cap[i - 1] + diff[i - 1];
    if (bound < cap[i]) cap[i] = bound;
  }
  for (let i = n - 2; i >= 0; i--) {
    const bound = cap[i + 1] + diff[i];
    if (bound < cap[i]) cap[i] = bound;
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
    if (cap[i] > ans) ans = cap[i];
  }
  return ans;
};
var solve = findMaxVal;
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
    const res = findMaxVal(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = findMaxVal;
