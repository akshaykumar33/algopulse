var specialPerm = function(nums) {
  const n = nums.length;
  const MOD = 1000000007;
  const totalMasks = 1 << n;
  const dp = Array.from({ length: totalMasks }, () => new Int32Array(n).fill(-1));
  function solve(mask, last) {
    if (mask === totalMasks - 1) return 1;
    if (dp[mask][last] !== -1) return dp[mask][last];
    let res = 0;
    const lastVal = nums[last];
    for (let next = 0; next < n; next++) {
      if ((mask & (1 << next)) === 0) {
        const nextVal = nums[next];
        if (lastVal % nextVal === 0 || nextVal % lastVal === 0) {
          res = (res + solve(mask | (1 << next), next)) % MOD;
        }
      }
    }
    return (dp[mask][last] = res);
  }
  let ans = 0;
  for (let start = 0; start < n; start++) {
    ans = (ans + solve(1 << start, start)) % MOD;
  }
  return ans;
};
var solve = specialPerm;
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
module.exports = specialPerm;
