var minSwaps = function(s) {
  let c0 = 0, c1 = 0;
  for (const ch of s) {
    if (ch === '0') c0++;
    else c1++;
  }
  if (Math.abs(c0 - c1) > 1) return -1;
  function countMismatches(startChar) {
    let diff = 0;
    let cur = startChar;
    for (let i = 0; i < s.length; i++) {
      if (s[i] !== cur) diff++;
      cur = cur === '0' ? '1' : '0';
    }
    return diff / 2;
  }
  let ans = Infinity;
  if (c0 >= c1) ans = Math.min(ans, countMismatches('0'));
  if (c1 >= c0) ans = Math.min(ans, countMismatches('1'));
  return ans;
};
var solve = minSwaps;
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
module.exports = minSwaps;
