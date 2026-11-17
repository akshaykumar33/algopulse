var lastStoneWeightII = function(stones) {
  let sum = 0;
  for (let i = 0; i < stones.length; i++) {
    sum += stones[i];
  }

  const target = Math.floor(sum / 2);
  const dp = new Uint8Array(target + 1);
  dp[0] = 1;

  for (let i = 0; i < stones.length; i++) {
    const s = stones[i];
    for (let j = target; j >= s; j--) {
      if (dp[j - s]) dp[j] = 1;
    }
  }

  for (let j = target; j >= 0; j--) {
    if (dp[j]) return sum - 2 * j;
  }
  return 0;
};

var solve = lastStoneWeightII;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        console.log(JSON.stringify(solve(...parsed)));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
