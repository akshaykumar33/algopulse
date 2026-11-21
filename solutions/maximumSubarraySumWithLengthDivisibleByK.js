var maxSubarraySum = function(nums, k) {
  const minPref = new Array(k).fill(Infinity);
  minPref[0] = 0;
  let cur = 0, ans = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    cur += nums[i];
    const rem = (i + 1) % k;
    if (minPref[rem] !== Infinity) {
      ans = Math.max(ans, cur - minPref[rem]);
    }
    minPref[rem] = Math.min(minPref[rem], cur);
  }
  return ans;
};

var solve = maxSubarraySum;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = maxSubarraySum;