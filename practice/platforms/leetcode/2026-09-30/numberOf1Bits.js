/**
 * LeetCode Problem Solution: Number of 1 Bits
 */
var hammingWeight = function(n) {
  let count = 0;
  while (n) {
    n = (n & (n - 1));
    count++;
  }
  return count;
};

var solve = function(n) {
  return hammingWeight(Number(n));
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
