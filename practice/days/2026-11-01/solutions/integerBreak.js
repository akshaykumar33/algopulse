var integerBreak = function(n) {
    if (n <= 3) return n - 1;
    let dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    dp[2] = 2;
    dp[3] = 3;
    for (let i = 4; i <= n; i++) {
        let maxVal = 0;
        for (let j = 1; j <= i / 2; j++) {
            maxVal = Math.max(maxVal, dp[j] * dp[i - j]);
        }
        dp[i] = maxVal;
    }
    return dp[n];
};
var solve = typeof integerBreak !== 'undefined' ? integerBreak : null;

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
