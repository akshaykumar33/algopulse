var findValueOfPartition = function(nums) {
  nums.sort((a, b) => a - b);
  let minDiff = Infinity;
  for (let i = 1; i < nums.length; i++) {
    const diff = nums[i] - nums[i - 1];
    if (diff < minDiff) minDiff = diff;
  }
  return minDiff;
};

var solve = findValueOfPartition;

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

module.exports = findValueOfPartition;
