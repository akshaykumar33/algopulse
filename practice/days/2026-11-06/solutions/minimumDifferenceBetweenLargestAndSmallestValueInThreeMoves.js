var minDifference = function(nums) {
  const n = nums.length;
  if (n <= 4) return 0;

  nums.sort((a, b) => a - b);

  let ans = nums[n - 1] - nums[3];
  ans = Math.min(ans, nums[n - 2] - nums[2]);
  ans = Math.min(ans, nums[n - 3] - nums[1]);
  ans = Math.min(ans, nums[n - 4] - nums[0]);

  return ans;
};

var solve = typeof minDifference !== 'undefined' ? minDifference : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const nums = JSON.parse(lines[i]);
        console.log(JSON.stringify(solve(nums)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

