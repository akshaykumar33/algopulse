var numRollsToTarget = function(n, k, target) {
  const MOD = 1000000007;
  let dp = new Int32Array(target + 1);
  dp[0] = 1;

  for (let dice = 1; dice <= n; dice++) {
    const nextDp = new Int32Array(target + 1);
    for (let sum = dice; sum <= target; sum++) {
      let ways = 0;
      for (let face = 1; face <= k; face++) {
        if (sum - face >= 0) {
          ways = (ways + dp[sum - face]) % MOD;
        } else {
          break;
        }
      }
      nextDp[sum] = ways;
    }
    dp = nextDp;
  }

  return dp[target];
};

var numberOfDiceRollsWithTargetSum = numRollsToTarget;
var solve = typeof numberOfDiceRollsWithTargetSum !== 'undefined' ? numberOfDiceRollsWithTargetSum : null;

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

