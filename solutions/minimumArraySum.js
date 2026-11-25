var minArraySum = function(nums, k, op1, op2) {
  const INF = 1000000000;
  const stride = op2 + 1;
  const dp = new Int32Array((op1 + 1) * stride).fill(INF);
  dp[0] = 0;
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    const c0 = x;
    const c1 = (x + 1) >> 1;
    const c2 = x >= k ? x - k : INF;
    let c12 = INF;
    if (c1 >= k && c1 - k < c12) c12 = c1 - k;
    if (x >= k) {
      const alt = (x - k + 1) >> 1;
      if (alt < c12) c12 = alt;
    }
    for (let j = op1; j >= 0; j--) {
      for (let m = op2; m >= 0; m--) {
        const idx = j * stride + m;
        let best = dp[idx] + c0;
        if (j >= 1) {
          const v = dp[(j - 1) * stride + m] + c1;
          if (v < best) best = v;
        }
        if (m >= 1 && c2 < INF) {
          const v = dp[j * stride + (m - 1)] + c2;
          if (v < best) best = v;
        }
        if (j >= 1 && m >= 1 && c12 < INF) {
          const v = dp[(j - 1) * stride + (m - 1)] + c12;
          if (v < best) best = v;
        }
        dp[idx] = best;
      }
    }
  }
  let ans = INF;
  for (let i = 0; i < dp.length; i++) {
    if (dp[i] < ans) ans = dp[i];
  }
  return ans;
};
var solve = minArraySum;
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
    if (args.length === 1 && Array.isArray(args[0]) && minArraySum.length > 1 && args[0].length === minArraySum.length) {
      return args[0];
    }
    return args;
  }
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const parsed = parseArgs(raw);
    const res = minArraySum(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = minArraySum;
