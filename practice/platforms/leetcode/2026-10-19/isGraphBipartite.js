var isBipartite = function(graph) {
  const n = graph.length;
  const color = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    if (color[i] !== 0) continue;
    color[i] = 1;
    const q = [i];
    let head = 0;
    while (head < q.length) {
      const u = q[head++];
      for (const v of graph[u]) {
        if (color[v] === 0) {
          color[v] = -color[u];
          q.push(v);
        } else if (color[v] === color[u]) {
          return false;
        }
      }
    }
  }
  return true;
};

var solve = function(graph) {
  return isBipartite(graph);
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
