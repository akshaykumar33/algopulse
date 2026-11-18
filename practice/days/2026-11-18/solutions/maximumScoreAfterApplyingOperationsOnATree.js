var maximumScoreAfterOperations = function(edges, values) {
  const n = values.length;
  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
    const u = edges[i][0];
    const v = edges[i][1];
    adj[u].push(v);
    adj[v].push(u);
  }

  let totalSum = 0;
  for (let i = 0; i < n; i++) {
    totalSum += values[i];
  }

  function dfs(u, p) {
    let childrenSum = 0;
    let isLeaf = true;
    for (let i = 0; i < adj[u].length; i++) {
      const v = adj[u][i];
      if (v !== p) {
        isLeaf = false;
        childrenSum += dfs(v, u);
      }
    }
    if (isLeaf) return values[u];
    return Math.min(values[u], childrenSum);
  }

  return totalSum - dfs(0, -1);
};

var solve = maximumScoreAfterOperations;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = maximumScoreAfterOperations;
