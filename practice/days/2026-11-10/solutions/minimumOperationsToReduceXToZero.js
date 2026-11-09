var minOperations = function(nums, x) {
  let total = 0;
  for (let i = 0; i < nums.length; i++) total += nums[i];
  const target = total - x;
  if (target < 0) return -1;
  if (target === 0) return nums.length;

  let maxLen = -1;
  let sum = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum > target && left <= right) {
      sum -= nums[left++];
    }
    if (sum === target) {
      const len = right - left + 1;
      if (len > maxLen) maxLen = len;
    }
  }

  return maxLen === -1 ? -1 : nums.length - maxLen;
};

var solve = minOperations;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}

module.exports = solve;
