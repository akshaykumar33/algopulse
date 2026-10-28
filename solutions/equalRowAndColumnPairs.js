var equalPairs = function(grid) {
  const n = grid.length;
  const rowMap = new Map();

  for (let r = 0; r < n; r++) {
    const key = grid[r].join(',');
    rowMap.set(key, (rowMap.get(key) || 0) + 1);
  }

  let count = 0;
  for (let c = 0; c < n; c++) {
    const col = [];
    for (let r = 0; r < n; r++) {
      col.push(grid[r][c]);
    }
    const key = col.join(',');
    if (rowMap.has(key)) {
      count += rowMap.get(key);
    }
  }

  return count;
};

var solve = function(grid) {
  return equalPairs(grid);
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

