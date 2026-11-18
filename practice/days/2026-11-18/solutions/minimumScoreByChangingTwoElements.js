var minimizeSum = function(nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  return Math.min(nums[n - 3] - nums[0], nums[n - 1] - nums[2], nums[n - 2] - nums[1]);
};

var solve = minimizeSum;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = minimizeSum;
