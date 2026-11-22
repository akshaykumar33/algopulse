var differenceOfDistinctValues = function(grid) {
  const m = grid.length, n = grid[0].length;
  const ans = Array.from({ length: m }, () => new Int32Array(n));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const tl = new Set(), br = new Set();
      let kr = r - 1, kc = c - 1;
      while (kr >= 0 && kc >= 0) {
        tl.add(grid[kr][kc]);
        kr--; kc--;
      }
      kr = r + 1; kc = c + 1;
      while (kr < m && kc < n) {
        br.add(grid[kr][kc]);
        kr++; kc++;
      }
      ans[r][c] = Math.abs(tl.size - br.size);
    }
  }
  return ans.map(row => Array.from(row));
};
var solve = differenceOfDistinctValues;
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0])));
    }
  } catch (e) {}
}
module.exports = differenceOfDistinctValues;