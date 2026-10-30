var findPaths = function(m, n, maxMove, startRow, startColumn) {
  if (maxMove === 0) return 0;
  const MOD = 1000000007;
  let dp = Array.from({ length: m }, () => new Int32Array(n));
  dp[startRow][startColumn] = 1;
  let ans = 0;

  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  for (let step = 0; step < maxMove; step++) {
    const next = Array.from({ length: m }, () => new Int32Array(n));
    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (dp[r][c] > 0) {
          const count = dp[r][c];
          for (let d = 0; d < 4; d++) {
            const nr = r + dirs[d][0];
            const nc = c + dirs[d][1];
            if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
              ans = (ans + count) % MOD;
            } else {
              next[nr][nc] = (next[nr][nc] + count) % MOD;
            }
          }
        }
      }
    }
    dp = next;
  }

  return ans;
};

var solve = function(m, n, maxMove, startRow, startColumn) {
  return findPaths(m, n, maxMove, startRow, startColumn);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      const args = lines.map(l => JSON.parse(l));
      console.log(JSON.stringify(solve(...args)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
