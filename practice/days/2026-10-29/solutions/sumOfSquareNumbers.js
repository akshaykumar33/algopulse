var judgeSquareSum = function(c) {
  let left = 0;
  let right = Math.floor(Math.sqrt(c));
  while (left <= right) {
    const sum = left * left + right * right;
    if (sum === c) return true;
    if (sum < c) {
      left++;
    } else {
      right--;
    }
  }
  return false;
};

var solve = typeof judgeSquareSum !== 'undefined' ? judgeSquareSum : null;

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
