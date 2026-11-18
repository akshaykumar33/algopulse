var minimumCoins = function(prices) {
  const n = prices.length;
  const dp = new Int32Array(n + 1);

  for (let i = n - 1; i >= 0; i--) {
    let minNext = Infinity;
    const limit = Math.min(n, 2 * i + 2);
    if (limit >= n) {
      minNext = 0;
    } else {
      for (let j = i + 1; j <= limit; j++) {
        if (dp[j] < minNext) minNext = dp[j];
      }
    }
    dp[i] = prices[i] + minNext;
  }

  return dp[0];
};

var solve = minimumCoins;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = minimumCoins;
