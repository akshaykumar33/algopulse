var findFarmland = function(land) {
  const m = land.length, n = land[0].length;
  const ans = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (land[r][c] === 1) {
        if ((r === 0 || land[r - 1][c] === 0) && (c === 0 || land[r][c - 1] === 0)) {
          let r2 = r, c2 = c;
          while (r2 + 1 < m && land[r2 + 1][c] === 1) r2++;
          while (c2 + 1 < n && land[r][c2 + 1] === 1) c2++;
          ans.push([r, c, r2, c2]);
        }
      }
    }
  }
  return ans;
};

var solve = findFarmland;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = findFarmland;