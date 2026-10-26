var minPathSum = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const dp = Array(n).fill(0);
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) {
                dp[j] = grid[i][j];
            } else if (i === 0) {
                dp[j] = dp[j - 1] + grid[i][j];
            } else if (j === 0) {
                dp[j] = dp[j] + grid[i][j];
            } else {
                dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
            }
        }
    }
    return dp[n - 1];
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && minPathSum.length > 1 ? minPathSum(...parsed) : minPathSum(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(minPathSum(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = minPathSum;
