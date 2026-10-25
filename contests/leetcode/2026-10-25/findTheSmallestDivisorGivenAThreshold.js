var smallestDivisor = function(nums, threshold) {
  let low = 1;
  let high = 1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > high) high = nums[i];
  }

  while (low < high) {
    const mid = (low + high) >> 1;
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
      sum += Math.ceil(nums[i] / mid);
    }
    if (sum <= threshold) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }

  return low;
};

var solve = smallestDivisor;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const nums = JSON.parse(lines[i]);
        const threshold = JSON.parse(lines[i + 1]);
        const result = solve(nums, threshold);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = smallestDivisor;
