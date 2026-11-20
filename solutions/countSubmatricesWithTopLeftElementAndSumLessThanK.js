var countSubmatrices = function(grid, k) {
  const m = grid.length, n = grid[0].length;
  let ans = 0;
  const pref = Array.from({ length: m }, () => new Int32Array(n));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      let sum = grid[r][c];
      if (r > 0) sum += pref[r - 1][c];
      if (c > 0) sum += pref[r][c - 1];
      if (r > 0 && c > 0) sum -= pref[r - 1][c - 1];
      pref[r][c] = sum;
      if (sum <= k) ans++;
    }
  }
  return ans;
};

var solve = countSubmatrices;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = countSubmatrices;