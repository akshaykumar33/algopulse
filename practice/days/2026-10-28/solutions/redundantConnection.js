var findRedundantConnection = function(edges) {
  const n = edges.length;
  const parent = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) parent[i] = i;

  function find(i) {
    let root = i;
    while (root !== parent[root]) root = parent[root];
    let curr = i;
    while (curr !== root) {
      const nxt = parent[curr];
      parent[curr] = root;
      curr = nxt;
    }
    return root;
  }

  for (let i = 0; i < n; i++) {
    const u = edges[i][0];
    const v = edges[i][1];
    const rootU = find(u);
    const rootV = find(v);
    if (rootU === rootV) {
      return [u, v];
    }
    parent[rootU] = rootV;
  }

  return [];
};

var solve = function(edges) {
  return findRedundantConnection(edges);
};

// ---------------- LOCAL TEST HARNESS ----------------
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
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

