var minPairSum = function(nums) {
  nums.sort((a, b) => a - b);
  let ans = 0;
  const n = nums.length;

  for (let i = 0; i < n / 2; i++) {
    const sum = nums[i] + nums[n - 1 - i];
    if (sum > ans) ans = sum;
  }

  return ans;
};

var solve = typeof minPairSum !== 'undefined' ? minPairSum : null;

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

