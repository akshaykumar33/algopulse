var getMaximumGold = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  let maxGold = 0;

  function dfs(r, c) {
    const val = grid[r][c];
    grid[r][c] = 0;
    let best = 0;

    if (r > 0 && grid[r - 1][c] > 0) {
      const g = dfs(r - 1, c);
      if (g > best) best = g;
    }
    if (r + 1 < m && grid[r + 1][c] > 0) {
      const g = dfs(r + 1, c);
      if (g > best) best = g;
    }
    if (c > 0 && grid[r][c - 1] > 0) {
      const g = dfs(r, c - 1);
      if (g > best) best = g;
    }
    if (c + 1 < n && grid[r][c + 1] > 0) {
      const g = dfs(r, c + 1);
      if (g > best) best = g;
    }

    grid[r][c] = val;
    return val + best;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] > 0) {
        const total = dfs(r, c);
        if (total > maxGold) {
          maxGold = total;
        }
      }
    }
  }

  return maxGold;
};

var solve = function(grid) {
  return getMaximumGold(grid);
};

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

