var getMoneyAmount = function(n) {
    const dp = Array.from({ length: n + 2 }, () => new Array(n + 2).fill(0));
    for (let len = 2; len <= n; len++) {
        for (let i = 1; i <= n - len + 1; i++) {
            let j = i + len - 1;
            dp[i][j] = Infinity;
            for (let k = i; k < j; k++) {
                let cost = k + Math.max(dp[i][k - 1], dp[k + 1][j]);
                dp[i][j] = Math.min(dp[i][j], cost);
            }
        }
    }
    return dp[1][n];
};

var solve = typeof getMoneyAmount !== 'undefined' ? getMoneyAmount : null;

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
