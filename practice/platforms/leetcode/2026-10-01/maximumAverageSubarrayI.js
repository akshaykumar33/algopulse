/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
  let currentSum = 0;
  for (let i = 0; i < k; i++) {
    currentSum += nums[i];
  }
  let maxSum = currentSum;
  for (let i = k; i < nums.length; i++) {
    currentSum += nums[i] - nums[i - k];
    if (currentSum > maxSum) maxSum = currentSum;
  }
  return maxSum / k;
};

var solve = findMaxAverage;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        if (!lines[i + 1]) break;
        const nums = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i + 1]);
        console.log(solve(nums, k));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
