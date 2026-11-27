var minOperationsToMakeMedianK = function(nums, k) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const m = Math.floor(n / 2);
  let ans = 0n;
  if (nums[m] < k) {
    for (let i = m; i < n; i++) {
      if (nums[i] < k) ans += BigInt(k - nums[i]);
      else break;
    }
  } else if (nums[m] > k) {
    for (let i = m; i >= 0; i--) {
      if (nums[i] > k) ans += BigInt(nums[i] - k);
      else break;
    }
  }
  return Number(ans);
};
var solve = minOperationsToMakeMedianK;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = minOperationsToMakeMedianK;
