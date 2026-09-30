/**
 * LeetCode Problem Solution
 */
var solve = function(rowIndex) {
  const row = [1];
  for (let i = 1; i <= rowIndex; i++) {
    row.push(1);
    for (let j = i - 1; j > 0; j--) {
      row[j] += row[j - 1];
    }
  }
  return row;
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
