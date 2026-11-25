var earliestSecondToMarkIndices = function(nums, changeIndices) {
  const n = nums.length;
  const m = changeIndices.length;
  if (m < n) return -1;
  const last = new Int32Array(n);
  const can = (t) => {
    last.fill(-1);
    for (let s = 0; s < t; s++) {
      last[changeIndices[s] - 1] = s;
    }
    for (let i = 0; i < n; i++) {
      if (last[i] === -1) return false;
    }
    let avail = 0;
    for (let s = 0; s < t; s++) {
      const idx = changeIndices[s] - 1;
      if (last[idx] === s) {
        if (avail < nums[idx]) return false;
        avail -= nums[idx];
      } else {
        avail++;
      }
    }
    return true;
  };
  if (!can(m)) return -1;
  let lo = n, hi = m;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (can(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
};
var solve = earliestSecondToMarkIndices;
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
    if (args.length === 1 && Array.isArray(args[0]) && earliestSecondToMarkIndices.length > 1 && args[0].length === earliestSecondToMarkIndices.length) {
      return args[0];
    }
    return args;
  }
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const parsed = parseArgs(raw);
    const res = earliestSecondToMarkIndices(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = earliestSecondToMarkIndices;
