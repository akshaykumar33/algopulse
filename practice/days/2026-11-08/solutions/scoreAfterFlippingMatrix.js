var matrixScore = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  let ans = m * (1 << (n - 1));
  for (let c = 1; c < n; c++) {
    let ones = 0;
    for (let r = 0; r < m; r++) {
      const val = grid[r][0] === 0 ? 1 - grid[r][c] : grid[r][c];
      if (val === 1) ones++;
    }
    const bestOnes = Math.max(ones, m - ones);
    ans += bestOnes * (1 << (n - 1 - c));
  }
  return ans;
};

var solve = matrixScore;
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
  } catch (err) {}
}
module.exports = solve;
