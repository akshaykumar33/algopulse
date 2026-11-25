var maxPossibleScore = function(start, d) {
  const s = start.slice().sort((a, b) => a - b);
  const n = s.length;
  const can = (gap) => {
    let prev = s[0];
    for (let i = 1; i < n; i++) {
      let cur = prev + gap;
      if (cur < s[i]) cur = s[i];
      if (cur > s[i] + d) return false;
      prev = cur;
    }
    return true;
  };
  let lo = 0;
  let hi = s[n - 1] + d - s[0];
  while (lo < hi) {
    const mid = Math.floor((lo + hi + 1) / 2);
    if (can(mid)) lo = mid;
    else hi = mid - 1;
  }
  return lo;
};
var solve = maxPossibleScore;
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
    if (args.length === 1 && Array.isArray(args[0]) && maxPossibleScore.length > 1 && args[0].length === maxPossibleScore.length) {
      return args[0];
    }
    return args;
  }
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const parsed = parseArgs(raw);
    const res = maxPossibleScore(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = maxPossibleScore;
