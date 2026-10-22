var allPathsSourceTarget = function(graph) {
  const ans = [];
  const n = graph.length;
  function dfs(u, path) {
    if (u === n - 1) {
      ans.push([...path]);
      return;
    }
    for (const v of graph[u]) {
      path.push(v);
      dfs(v, path);
      path.pop();
    }
  }
  dfs(0, [0]);
  return ans;
};

var solve = function(graph) {
  return allPathsSourceTarget(graph);
};

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
