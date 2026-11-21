var sumDistance = function(nums, s, d) {
  const MOD = 1000000007n;
  const n = nums.length;
  const pos = new Array(n);
  const bigD = BigInt(d);
  for (let i = 0; i < n; i++) {
    pos[i] = BigInt(nums[i]) + (s[i] === 'R' ? bigD : -bigD);
  }
  pos.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  let ans = 0n;
  for (let i = 0; i < n; i++) {
    const weight = BigInt(2 * i - n + 1);
    ans = (ans + (pos[i] % MOD) * weight) % MOD;
  }
  if (ans < 0n) ans += MOD;
  return Number(ans);
};

var solve = sumDistance;

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

module.exports = sumDistance;