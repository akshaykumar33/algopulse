/**
 * LeetCode Problem Solution: Minimum Absolute Difference
 */
var minimumAbsDifference = function(arr) {
  arr.sort((a, b) => a - b);
  let minDiff = Infinity;
  for (let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i + 1] - arr[i];
    if (diff < minDiff) minDiff = diff;
  }
  const res = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1] - arr[i] === minDiff) {
      res.push([arr[i], arr[i + 1]]);
    }
  }
  return res;
};

var solve = function(arr) {
  return minimumAbsDifference(arr);
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
