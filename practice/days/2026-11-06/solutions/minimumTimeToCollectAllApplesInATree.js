var minTime = function(n, edges, hasApple) {
  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
    adj[edges[i][0]].push(edges[i][1]);
    adj[edges[i][1]].push(edges[i][0]);
  }

  function dfs(u, p) {
    let totalTime = 0;
    for (let i = 0; i < adj[u].length; i++) {
      const v = adj[u][i];
      if (v === p) continue;
      const childTime = dfs(v, u);
      if (childTime > 0 || hasApple[v]) {
        totalTime += childTime + 2;
      }
    }
    return totalTime;
  }

  return dfs(0, -1);
};

var solve = typeof minTime !== 'undefined' ? minTime : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 3) {
        const n = JSON.parse(lines[i]);
        const edges = JSON.parse(lines[i + 1]);
        const hasApple = JSON.parse(lines[i + 2]);
        console.log(JSON.stringify(solve(n, edges, hasApple)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

