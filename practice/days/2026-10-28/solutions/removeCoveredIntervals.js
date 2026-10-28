var removeCoveredIntervals = function(intervals) {
  intervals.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]);
  let count = 0;
  let maxRight = 0;

  for (let i = 0; i < intervals.length; i++) {
    const end = intervals[i][1];
    if (end > maxRight) {
      count++;
      maxRight = end;
    }
  }

  return count;
};

var solve = function(intervals) {
  return removeCoveredIntervals(intervals);
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
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

