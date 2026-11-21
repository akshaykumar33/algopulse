var findIndices = function(nums, indexDifference, valueDifference) {
  let minIdx = 0, maxIdx = 0;
  for (let j = indexDifference; j < nums.length; j++) {
    const i = j - indexDifference;
    if (nums[i] < nums[minIdx]) minIdx = i;
    if (nums[i] > nums[maxIdx]) maxIdx = i;
    if (Math.abs(nums[j] - nums[minIdx]) >= valueDifference) return [minIdx, j];
    if (Math.abs(nums[j] - nums[maxIdx]) >= valueDifference) return [maxIdx, j];
  }
  return [-1, -1];
};

var solve = findIndices;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2])));
    }
  } catch (e) {}
}

module.exports = findIndices;