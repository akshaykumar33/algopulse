var minimumOperationsToWriteY = function(grid) {
  const n = grid.length;
  const mid = Math.floor(n / 2);
  const isY = Array.from({ length: n }, () => new Uint8Array(n));
  for (let i = 0; i <= mid; i++) {
    isY[i][i] = 1;
    isY[i][n - 1 - i] = 1;
  }
  for (let i = mid; i < n; i++) {
    isY[i][mid] = 1;
  }
  let minOps = Infinity;
  for (let yVal = 0; yVal <= 2; yVal++) {
    for (let oVal = 0; oVal <= 2; oVal++) {
      if (yVal === oVal) continue;
      let ops = 0;
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          if (isY[r][c]) {
            if (grid[r][c] !== yVal) ops++;
          } else {
            if (grid[r][c] !== oVal) ops++;
          }
        }
      }
      if (ops < minOps) minOps = ops;
    }
  }
  return minOps;
};
var solve = minimumOperationsToWriteY;
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
module.exports = minimumOperationsToWriteY;
