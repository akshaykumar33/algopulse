var findMaxFish = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  let maxFish = 0;

  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === 0) return 0;
    let fish = grid[r][c];
    grid[r][c] = 0;
    fish += dfs(r + 1, c);
    fish += dfs(r - 1, c);
    fish += dfs(r, c + 1);
    fish += dfs(r, c - 1);
    return fish;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] > 0) {
        const total = dfs(r, c);
        if (total > maxFish) maxFish = total;
      }
    }
  }
  return maxFish;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const l of lines) console.log(JSON.stringify(findMaxFish(JSON.parse(l))));
  }
}

module.exports = findMaxFish;
