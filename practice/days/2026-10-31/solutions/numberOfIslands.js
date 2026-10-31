var numIslands = function(grid) {
    if (!grid || grid.length === 0) return 0;
    let rows = grid.length;
    let cols = grid[0].length;
    let ans = 0;
    let dfs = (r, c) => {
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') return;
        grid[r][c] = '0';
        dfs(r - 1, c);
        dfs(r + 1, c);
        dfs(r, c - 1);
        dfs(r, c + 1);
    };
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                ans++;
                dfs(r, c);
            }
        }
    }
    return ans;
};
var solve = numIslands;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = solve(parsed);
          console.log(JSON.stringify(result));
        } catch (e) {}
      }
    }
  } catch (err) {}
}
module.exports = solve;
