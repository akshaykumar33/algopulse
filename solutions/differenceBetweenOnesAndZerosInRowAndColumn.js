var onesMinusZeros = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const row = new Int32Array(m);
  const col = new Int32Array(n);

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        row[r]++;
        col[c]++;
      }
    }
  }

  const diff = [];
  for (let r = 0; r < m; r++) {
    const rowDiff = new Array(n);
    const rPart = 2 * row[r] - n - m;
    for (let c = 0; c < n; c++) {
      rowDiff[c] = rPart + 2 * col[c];
    }
    diff.push(rowDiff);
  }

  return diff;
};

var solve = onesMinusZeros;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = onesMinusZeros;
