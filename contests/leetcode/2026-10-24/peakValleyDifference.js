var peakValleyDifference = function(nums) {
  let ans = 0;
  const n = nums.length;
  for (let i = 1; i < n - 1; i++) {
    if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
      ans += nums[i];
    } else if (nums[i] < nums[i - 1] && nums[i] < nums[i + 1]) {
      ans -= nums[i];
    }
  }
  return ans;
};

var solve = peakValleyDifference;

if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const nums = JSON.parse(line);
        console.log(JSON.stringify(solve(nums)));
      }
    }
  } catch (err) {}
}

module.exports = solve;
