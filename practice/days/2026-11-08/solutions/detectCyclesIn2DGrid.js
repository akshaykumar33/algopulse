var containsCycle = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const total = m * n;
  const parent = new Int32Array(total);
  for (let i = 0; i < total; i++) parent[i] = i;

  function find(i) {
    let root = i;
    while (root !== parent[root]) root = parent[root];
    let curr = i;
    while (curr !== root) {
      let nxt = parent[curr];
      parent[curr] = root;
      curr = nxt;
    }
    return root;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const u = r * n + c;
      const ch = grid[r][c];
      if (c + 1 < n && grid[r][c + 1] === ch) {
        const v = r * n + (c + 1);
        const rootU = find(u);
        const rootV = find(v);
        if (rootU === rootV) return true;
        parent[rootU] = rootV;
      }
      if (r + 1 < m && grid[r + 1][c] === ch) {
        const v = (r + 1) * n + c;
        const rootU = find(u);
        const rootV = find(v);
        if (rootU === rootV) return true;
        parent[rootU] = rootV;
      }
    }
  }
  return false;
};

var solve = containsCycle;
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
