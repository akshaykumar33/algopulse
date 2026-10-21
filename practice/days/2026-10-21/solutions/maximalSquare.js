var maximalSquare = function(matrix) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return 0;
  let m = matrix.length;
  let n = matrix[0].length;
  let dp = Array(n).fill(0);
  let maxSide = 0;
  let prev = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let temp = dp[j];
      if (matrix[i][j] === '1') {
        if (i === 0 || j === 0) {
          dp[j] = 1;
        } else {
          dp[j] = Math.min(Math.min(dp[j], prev), dp[j - 1]) + 1;
        }
        maxSide = Math.max(maxSide, dp[j]);
      } else {
        dp[j] = 0;
      }
      prev = temp;
    }
  }
  return maxSide * maxSide;
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
          const result = maximalSquare(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(maximalSquare(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = maximalSquare;
