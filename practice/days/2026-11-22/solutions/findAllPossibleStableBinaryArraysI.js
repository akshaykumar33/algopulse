var numberOfStableArrays = function(zero, one, limit) {
  const MOD = 1000000007;
  const dp0 = Array.from({ length: zero + 1 }, () => new Int32Array(one + 1));
  const dp1 = Array.from({ length: zero + 1 }, () => new Int32Array(one + 1));
  for (let i = 1; i <= Math.min(zero, limit); i++) dp0[i][0] = 1;
  for (let j = 1; j <= Math.min(one, limit); j++) dp1[0][j] = 1;
  for (let i = 1; i <= zero; i++) {
    for (let j = 1; j <= one; j++) {
      let sum0 = 0;
      for (let k = 1; k <= Math.min(i, limit); k++) {
        sum0 = (sum0 + dp1[i - k][j]) % MOD;
      }
      dp0[i][j] = sum0;
      let sum1 = 0;
      for (let k = 1; k <= Math.min(j, limit); k++) {
        sum1 = (sum1 + dp0[i][j - k]) % MOD;
      }
      dp1[i][j] = sum1;
    }
  }
  return (dp0[zero][one] + dp1[zero][one]) % MOD;
};
var solve = numberOfStableArrays;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2])));
    }
  } catch (e) {}
}
module.exports = numberOfStableArrays;