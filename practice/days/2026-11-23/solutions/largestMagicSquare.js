var largestMagicSquare = function(grid) {
  const m = grid.length, n = grid[0].length;
  const rowPref = Array.from({ length: m }, () => new Int32Array(n + 1));
  const colPref = Array.from({ length: m + 1 }, () => new Int32Array(n));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      rowPref[r][c + 1] = rowPref[r][c] + grid[r][c];
      colPref[r + 1][c] = colPref[r][c] + grid[r][c];
    }
  }
  for (let k = Math.min(m, n); k >= 2; k--) {
    for (let r = 0; r <= m - k; r++) {
      for (let c = 0; c <= n - k; c++) {
        const target = rowPref[r][c + k] - rowPref[r][c];
        let ok = true;
        for (let i = r + 1; i < r + k; i++) {
          if (rowPref[i][c + k] - rowPref[i][c] !== target) { ok = false; break; }
        }
        if (!ok) continue;
        for (let j = c; j < c + k; j++) {
          if (colPref[r + k][j] - colPref[r][j] !== target) { ok = false; break; }
        }
        if (!ok) continue;
        let d1 = 0, d2 = 0;
        for (let i = 0; i < k; i++) {
          d1 += grid[r + i][c + i];
          d2 += grid[r + i][c + k - 1 - i];
        }
        if (d1 === target && d2 === target) return k;
      }
    }
  }
  return 1;
};
var solve = largestMagicSquare;
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
module.exports = largestMagicSquare;
