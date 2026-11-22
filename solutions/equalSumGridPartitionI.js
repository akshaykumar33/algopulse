var canPartitionGrid = function(grid) {
  const m = grid.length, n = grid[0].length;
  let total = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) total += grid[r][c];
  }
  if (total % 2 !== 0) return false;
  const target = total / 2;
  let rSum = 0;
  for (let r = 0; r < m - 1; r++) {
    for (let c = 0; c < n; c++) rSum += grid[r][c];
    if (rSum === target) return true;
  }
  let cSum = 0;
  for (let c = 0; c < n - 1; c++) {
    for (let r = 0; r < m; r++) cSum += grid[r][c];
    if (cSum === target) return true;
  }
  return false;
};
var solve = canPartitionGrid;
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
module.exports = canPartitionGrid;