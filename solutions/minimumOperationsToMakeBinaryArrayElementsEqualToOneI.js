var minOperations = function(nums) {
  let ans = 0;
  const n = nums.length;
  for (let i = 0; i <= n - 3; i++) {
    if (nums[i] === 0) {
      nums[i] ^= 1;
      nums[i + 1] ^= 1;
      nums[i + 2] ^= 1;
      ans++;
    }
  }
  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) return -1;
  }
  return ans;
};

var solve = minOperations;

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

module.exports = minOperations;