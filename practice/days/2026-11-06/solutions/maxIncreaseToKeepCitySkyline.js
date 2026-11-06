var maxIncreaseKeepingSkyline = function(grid) {
  const n = grid.length;
  const rowMax = new Int32Array(n);
  const colMax = new Int32Array(n);

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] > rowMax[r]) rowMax[r] = grid[r][c];
      if (grid[r][c] > colMax[c]) colMax[c] = grid[r][c];
    }
  }

  let ans = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const limit = rowMax[r] < colMax[c] ? rowMax[r] : colMax[c];
      ans += limit - grid[r][c];
    }
  }

  return ans;
};

var solve = typeof maxIncreaseKeepingSkyline !== 'undefined' ? maxIncreaseKeepingSkyline : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const grid = JSON.parse(lines[i]);
        console.log(JSON.stringify(solve(grid)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

