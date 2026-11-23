var maximumCoins = function(coins, k) {
  coins.sort((a, b) => a[0] - b[0]);
  const n = coins.length;
  let ans = 0n;
  let cur = 0n, r = 0;
  for (let l = 0; l < n; l++) {
    while (r < n && coins[r][1] <= coins[l][0] + k - 1) {
      cur += BigInt(coins[r][1] - coins[r][0] + 1) * BigInt(coins[r][2]);
      r++;
    }
    let extra = 0n;
    if (r < n && coins[r][0] <= coins[l][0] + k - 1) {
      const count = Math.min(coins[r][1], coins[l][0] + k - 1) - coins[r][0] + 1;
      extra = BigInt(count) * BigInt(coins[r][2]);
    }
    if (cur + extra > ans) ans = cur + extra;
    cur -= BigInt(coins[l][1] - coins[l][0] + 1) * BigInt(coins[l][2]);
  }
  cur = 0n;
  let l = 0;
  for (let rIdx = 0; rIdx < n; rIdx++) {
    cur += BigInt(coins[rIdx][1] - coins[rIdx][0] + 1) * BigInt(coins[rIdx][2]);
    while (coins[l][1] < coins[rIdx][1] - k + 1) {
      cur -= BigInt(coins[l][1] - coins[l][0] + 1) * BigInt(coins[l][2]);
      l++;
    }
    let extra = 0n;
    if (coins[l][0] < coins[rIdx][1] - k + 1) {
      const trimmed = (coins[rIdx][1] - k + 1) - coins[l][0];
      extra = BigInt(trimmed) * BigInt(coins[l][2]);
    }
    if (cur - extra > ans) ans = cur - extra;
  }
  return Number(ans);
};
var solve = maximumCoins;
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
module.exports = maximumCoins;
