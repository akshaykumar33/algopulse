var maximumLength = function(nums, k) {
  const dp = Array.from({ length: k + 1 }, () => new Map());
  const best = new Int32Array(k + 1);
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    for (let j = k; j >= 0; j--) {
      let cur = (dp[j].get(x) || 0) + 1;
      if (j > 0) {
        const alt = best[j - 1] + 1;
        if (alt > cur) cur = alt;
      }
      const prev = dp[j].get(x) || 0;
      if (cur > prev) dp[j].set(x, cur);
      if (cur > best[j]) best[j] = cur;
    }
  }
  return best[k];
};
var solve = maximumLength;
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
    if (args.length === 1 && Array.isArray(args[0]) && maximumLength.length > 1 && args[0].length === maximumLength.length) {
      return args[0];
    }
    return args;
  }
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const parsed = parseArgs(raw);
    const res = maximumLength(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = maximumLength;
