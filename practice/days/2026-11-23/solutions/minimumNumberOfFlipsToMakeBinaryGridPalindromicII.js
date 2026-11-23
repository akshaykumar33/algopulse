var minFlips = function(grid) {
  const m = grid.length, n = grid[0].length;
  let ans = 0;
  for (let r = 0; r < Math.floor(m / 2); r++) {
    for (let c = 0; c < Math.floor(n / 2); c++) {
      const cnt1 = grid[r][c] + grid[m - 1 - r][c] + grid[r][n - 1 - c] + grid[m - 1 - r][n - 1 - c];
      ans += Math.min(cnt1, 4 - cnt1);
    }
  }
  let diffPairs = 0, pairOnes = 0;
  if (m % 2 === 1) {
    const midR = Math.floor(m / 2);
    for (let c = 0; c < Math.floor(n / 2); c++) {
      if (grid[midR][c] !== grid[midR][n - 1 - c]) {
        diffPairs++;
      } else if (grid[midR][c] === 1) {
        pairOnes += 2;
      }
    }
  }
  if (n % 2 === 1) {
    const midC = Math.floor(n / 2);
    for (let r = 0; r < Math.floor(m / 2); r++) {
      if (grid[r][midC] !== grid[m - 1 - r][midC]) {
        diffPairs++;
      } else if (grid[r][midC] === 1) {
        pairOnes += 2;
      }
    }
  }
  ans += diffPairs;
  if (pairOnes % 4 !== 0) {
    if (diffPairs === 0) ans += 2;
  }
  if (m % 2 === 1 && n % 2 === 1) {
    if (grid[Math.floor(m / 2)][Math.floor(n / 2)] === 1) ans++;
  }
  return ans;
};
var solve = minFlips;
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
module.exports = minFlips;
