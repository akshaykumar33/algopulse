/**
 * LeetCode Problem Solution
 */
var solve = function(nums) {
  const n = nums.length;
  const count = new Array(n + 1).fill(0);
  for (const x of nums) count[x]++;
  let dup = -1, missing = -1;
  for (let i = 1; i <= n; i++) {
    if (count[i] === 2) dup = i;
    if (count[i] === 0) missing = i;
  }
  return [dup, missing];
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
