var numberOfRightTriangles = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const rowCount = new Int32Array(m);
  const colCount = new Int32Array(n);

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        rowCount[r]++;
        colCount[c]++;
      }
    }
  }

  let ans = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        ans += (rowCount[r] - 1) * (colCount[c] - 1);
      }
    }
  }

  return ans;
};

var solve = numberOfRightTriangles;

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

module.exports = numberOfRightTriangles;
