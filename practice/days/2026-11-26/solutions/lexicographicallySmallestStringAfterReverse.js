var lexSmallest = function(s) {
  const n = s.length;
  let best = s;
  for (let k = 2; k <= n; k++) {
    let pRev = '';
    for (let i = k - 1; i >= 0; i--) pRev += s[i];
    const candP = pRev + s.slice(k);
    if (candP < best) best = candP;

    let sRev = '';
    for (let i = n - 1; i >= n - k; i--) sRev += s[i];
    const candS = s.slice(0, n - k) + sRev;
    if (candS < best) best = candS;
  }
  return best;
};
var solve = lexSmallest;
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
    const res = lexSmallest(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = lexSmallest;
