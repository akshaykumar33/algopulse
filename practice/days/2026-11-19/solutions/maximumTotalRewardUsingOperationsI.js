var maxTotalReward = function(rewardValues) {
  rewardValues.sort((a, b) => a - b);
  const dp = new Uint8Array(4001);
  dp[0] = 1;
  let maxR = 0;

  for (let i = 0; i < rewardValues.length; i++) {
    const v = rewardValues[i];
    for (let x = v - 1; x >= 0; x--) {
      if (dp[x]) {
        dp[x + v] = 1;
        if (x + v > maxR) maxR = x + v;
      }
    }
  }

  return maxR;
};

var solve = maxTotalReward;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = maxTotalReward;
