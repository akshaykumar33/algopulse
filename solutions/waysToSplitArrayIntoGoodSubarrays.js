var numberOfGoodSubarraySplits = function(nums) {
  const ones = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) ones.push(i);
  }
  if (ones.length === 0) return 0;

  let ans = 1n;
  const MOD = 1000000007n;
  for (let i = 0; i < ones.length - 1; i++) {
    ans = (ans * BigInt(ones[i + 1] - ones[i])) % MOD;
  }
  return Number(ans);
};

var solve = numberOfGoodSubarraySplits;

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
