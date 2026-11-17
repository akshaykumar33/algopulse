var smallestRangeII = function(nums, k) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let ans = nums[n - 1] - nums[0];

  for (let i = 0; i < n - 1; i++) {
    const high = Math.max(nums[i] + k, nums[n - 1] - k);
    const low = Math.min(nums[0] + k, nums[i + 1] - k);
    const diff = high - low;
    if (diff < ans) {
      ans = diff;
    }
  }

  return ans;
};

var solve = smallestRangeII;

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
