var shiftGrid = function(grid, k) {
  let m = grid.length;
  let n = grid[0].length;
  let total = m * n;
  k = k % total;
  if (k === 0) return grid;
  
  let flat = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      flat.push(grid[r][c]);
    }
  }
  
  let shifted = flat.slice(total - k).concat(flat.slice(0, total - k));
  let ans = [];
  let idx = 0;
  for (let r = 0; r < m; r++) {
    let row = [];
    for (let c = 0; c < n; c++) {
      row.push(shifted[idx++]);
    }
    ans.push(row);
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const grid = JSON.parse(lines[i]);
        const k = JSON.parse(lines[i+1]);
        const result = shiftGrid(grid, k);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = shiftGrid;
