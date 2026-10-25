var change = function(amount, coins) {
  const dp = new Int32Array(amount + 1);
  dp[0] = 1;
  for (let i = 0; i < coins.length; i++) {
    const c = coins[i];
    for (let j = c; j <= amount; j++) {
      dp[j] += dp[j - c];
    }
  }
  return dp[amount];
};

var solve = change;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const amount = JSON.parse(lines[i]);
        const coins = JSON.parse(lines[i + 1]);
        const result = solve(amount, coins);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = change;
