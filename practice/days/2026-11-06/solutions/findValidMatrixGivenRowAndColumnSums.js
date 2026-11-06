var restoreMatrix = function(rowSum, colSum) {
  const m = rowSum.length;
  const n = colSum.length;
  const grid = Array.from({ length: m }, () => new Int32Array(n));

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const val = rowSum[r] < colSum[c] ? rowSum[r] : colSum[c];
      grid[r][c] = val;
      rowSum[r] -= val;
      colSum[c] -= val;
    }
  }

  return grid.map(row => Array.from(row));
};

var solve = typeof restoreMatrix !== 'undefined' ? restoreMatrix : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const rowSum = JSON.parse(lines[i]);
        const colSum = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(rowSum, colSum)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

