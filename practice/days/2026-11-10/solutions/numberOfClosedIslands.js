var closedIsland = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const fill = (r, c) => {
    const queue = [r, c];
    grid[r][c] = 1;
    let head = 0;
    while (head < queue.length) {
      const cr = queue[head++];
      const cc = queue[head++];
      if (cr > 0 && grid[cr - 1][cc] === 0) {
        grid[cr - 1][cc] = 1;
        queue.push(cr - 1, cc);
      }
      if (cr + 1 < m && grid[cr + 1][cc] === 0) {
        grid[cr + 1][cc] = 1;
        queue.push(cr + 1, cc);
      }
      if (cc > 0 && grid[cr][cc - 1] === 0) {
        grid[cr][cc - 1] = 1;
        queue.push(cr, cc - 1);
      }
      if (cc + 1 < n && grid[cr][cc + 1] === 0) {
        grid[cr][cc + 1] = 1;
        queue.push(cr, cc + 1);
      }
    }
  };
  for (let r = 0; r < m; r++) {
    if (grid[r][0] === 0) fill(r, 0);
    if (grid[r][n - 1] === 0) fill(r, n - 1);
  }
  for (let c = 0; c < n; c++) {
    if (grid[0][c] === 0) fill(0, c);
    if (grid[m - 1][c] === 0) fill(m - 1, c);
  }
  let ans = 0;
  for (let r = 1; r < m - 1; r++) {
    for (let c = 1; c < n - 1; c++) {
      if (grid[r][c] === 0) {
        ans++;
        fill(r, c);
      }
    }
  }
  return ans;
};

var solve = closedIsland;

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
