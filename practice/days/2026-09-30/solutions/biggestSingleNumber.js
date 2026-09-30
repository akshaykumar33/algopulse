/**
 * LeetCode Problem Solution: Biggest Single Number
 */
var biggestSingleNumber = function(nums) {
  const count = {};
  for (const x of nums) {
    count[x] = (count[x] || 0) + 1;
  }
  let max = null;
  for (const k in count) {
    if (count[k] === 1) {
      const num = Number(k);
      if (max === null || num > max) {
        max = num;
      }
    }
  }
  return max;
};

var solve = function(nums) {
  return biggestSingleNumber(nums);
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
          const result = solve(parsed);
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
