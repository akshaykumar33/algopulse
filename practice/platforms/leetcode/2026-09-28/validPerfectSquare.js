/**
 * LeetCode Problem Solution
 */
var solve = function(num) {
  let l = 1, r = num;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const sq = mid * mid;
    if (sq === num) return true;
    if (sq < num) l = mid + 1;
    else r = mid - 1;
  }
  return false;
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
