/**
 * LeetCode Problem Solution
 */
var solve = function(nums) {
  let count = 0;
  let candidate = null;
  for (let i = 0; i < nums.length; i++) {
    if (count === 0) {
      candidate = nums[i];
    }
    count += (nums[i] === candidate ? 1 : -1);
  }
  return candidate;
};

// ---------------- LOCAL TEST HARNESS ----------------
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
          console.log(solve(line));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
