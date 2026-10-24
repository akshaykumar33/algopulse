var coinChange = function(coins, amount) {
  if (amount === 0) return 0;
  const dp = new Int32Array(amount + 1).fill(amount + 1);
  dp[0] = 0;

  for (let c = 0; c < coins.length; c++) {
    const coin = coins[c];
    for (let i = coin; i <= amount; i++) {
      if (dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1;
      }
    }
  }

  return dp[amount] > amount ? -1 : dp[amount];
};

var solve = coinChange;

if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const coins = JSON.parse(lines[i]);
        const amount = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(coins, amount)));
      }
    }
  } catch (err) {}
}

module.exports = solve;
