var countServers = function(grid) {
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
      if (grid[r][c] === 1 && (rowCount[r] > 1 || colCount[c] > 1)) {
        ans++;
      }
    }
  }
  return ans;
};

var solve = countServers;

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
  } catch (err) {}
}
module.exports = solve;
