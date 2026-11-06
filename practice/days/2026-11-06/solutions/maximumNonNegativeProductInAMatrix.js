var maxProductPath = function(grid) {
  const m = grid.length;
  const n = grid[0].length;

  const maxDp = Array.from({ length: m }, () => new Array(n).fill(null));
  const minDp = Array.from({ length: m }, () => new Array(n).fill(null));

  maxDp[0][0] = BigInt(grid[0][0]);
  minDp[0][0] = BigInt(grid[0][0]);

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (r === 0 && c === 0) continue;
      const v = BigInt(grid[r][c]);
      let maxVal = null;
      let minVal = null;

      if (r > 0) {
        const p1 = maxDp[r - 1][c] * v;
        const p2 = minDp[r - 1][c] * v;
        const curMax = p1 > p2 ? p1 : p2;
        const curMin = p1 < p2 ? p1 : p2;
        if (maxVal === null || curMax > maxVal) maxVal = curMax;
        if (minVal === null || curMin < minVal) minVal = curMin;
      }

      if (c > 0) {
        const p1 = maxDp[r][c - 1] * v;
        const p2 = minDp[r][c - 1] * v;
        const curMax = p1 > p2 ? p1 : p2;
        const curMin = p1 < p2 ? p1 : p2;
        if (maxVal === null || curMax > maxVal) maxVal = curMax;
        if (minVal === null || curMin < minVal) minVal = curMin;
      }

      maxDp[r][c] = maxVal;
      minDp[r][c] = minVal;
    }
  }

  const ans = maxDp[m - 1][n - 1];
  if (ans < 0n) return -1;
  return Number(ans % 1000000007n);
};

var solve = typeof maxProductPath !== 'undefined' ? maxProductPath : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const grid = JSON.parse(lines[i]);
        console.log(JSON.stringify(solve(grid)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

