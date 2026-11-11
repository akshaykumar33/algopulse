var minPathCost = function(grid, moveCost) {
  const m = grid.length;
  const n = grid[0].length;
  let dp = grid[0].slice();
  for (let r = 0; r < m - 1; r++) {
    const next = new Array(n).fill(1e9);
    const curRow = grid[r];
    const nxtRow = grid[r + 1];
    for (let c = 0; c < n; c++) {
      const base = dp[c];
      const costs = moveCost[curRow[c]];
      for (let nc = 0; nc < n; nc++) {
        const cand = base + costs[nc] + nxtRow[nc];
        if (cand < next[nc]) next[nc] = cand;
      }
    }
    dp = next;
  }
  let ans = dp[0];
  for (let c = 1; c < n; c++) {
    if (dp[c] < ans) ans = dp[c];
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const arity = minPathCost.length;
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === arity;
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(minPathCost(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + arity - 1 < lines.length; i += arity) {
        const args = lines.slice(i, i + arity).map((l) => JSON.parse(l));
        console.log(JSON.stringify(minPathCost(...args)));
      }
    }
  }
}
