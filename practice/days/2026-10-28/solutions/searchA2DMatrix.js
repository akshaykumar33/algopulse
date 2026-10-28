var searchMatrix = function(matrix, target) {
  const m = matrix.length;
  if (m === 0) return false;
  const n = matrix[0].length;
  let low = 0;
  let high = m * n - 1;

  while (low <= high) {
    const mid = (low + high) >> 1;
    const r = Math.floor(mid / n);
    const c = mid % n;
    const val = matrix[r][c];
    if (val === target) return true;
    if (val < target) low = mid + 1;
    else high = mid - 1;
  }

  return false;
};

var solve = function(matrix, target) {
  return searchMatrix(matrix, target);
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

