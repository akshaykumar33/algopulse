var maxSubarraySumCircular = function(nums) {
    let totalSum = 0;
    let currMax = 0, maxSum = nums[0];
    let currMin = 0, minSum = nums[0];
    for (let x of nums) {
        currMax = Math.max(x, currMax + x);
        maxSum = Math.max(maxSum, currMax);
        currMin = Math.min(x, currMin + x);
        minSum = Math.min(minSum, currMin);
        totalSum += x;
    }
    return maxSum > 0 ? Math.max(maxSum, totalSum - minSum) : maxSum;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && maxSubarraySumCircular.length > 1 ? maxSubarraySumCircular(...parsed) : maxSubarraySumCircular(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(maxSubarraySumCircular(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = maxSubarraySumCircular;
