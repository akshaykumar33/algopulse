var countPairs = function(nums) {
  const check = (a, b) => {
    let sa = String(a);
    let sb = String(b);
    const maxLen = sa.length > sb.length ? sa.length : sb.length;
    sa = sa.padStart(maxLen, '0');
    sb = sb.padStart(maxLen, '0');
    let p = -1, q = -1, diff = 0;
    for (let k = 0; k < maxLen; k++) {
      if (sa.charCodeAt(k) !== sb.charCodeAt(k)) {
        diff++;
        if (diff === 1) p = k;
        else if (diff === 2) q = k;
        else return false;
      }
    }
    if (diff === 0) return true;
    if (diff === 2) {
      return sa.charCodeAt(p) === sb.charCodeAt(q) && sa.charCodeAt(q) === sb.charCodeAt(p);
    }
    return false;
  };
  let ans = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (check(nums[i], nums[j])) ans++;
    }
  }
  return ans;
};
var solve = countPairs;
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
    if (args.length === 1 && Array.isArray(args[0]) && countPairs.length > 1 && args[0].length === countPairs.length) {
      return args[0];
    }
    return args;
  }
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const parsed = parseArgs(raw);
    const res = countPairs(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = countPairs;
