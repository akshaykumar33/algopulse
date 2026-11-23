var minXor = function(nums, k) {
  const n = nums.length;
  const pref = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) pref[i + 1] = pref[i] ^ nums[i];
  function can(M) {
    const words = Math.ceil((k + 2) / 32);
    const dp = Array.from({ length: n + 1 }, () => new Uint32Array(words));
    dp[0][0] = 1;
    for (let i = 1; i <= n; i++) {
      for (let p = 0; p < i; p++) {
        if ((pref[i] ^ pref[p]) <= M) {
          for (let w = 0; w < words; w++) {
            const shiftVal = (dp[p][w] << 1) | (w > 0 ? (dp[p][w - 1] >>> 31) : 0);
            dp[i][w] |= shiftVal;
          }
        }
      }
    }
    const targetWord = Math.floor(k / 32);
    const targetBit = k % 32;
    return ((dp[n][targetWord] >>> targetBit) & 1) === 1;
  }
  let low = 0, high = 2000000000, ans = high;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (can(mid)) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
};
var solve = minXor;
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
module.exports = minXor;
