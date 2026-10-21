var eventualSafeNodes = function(graph) {
    const n = graph.length;
    const color = new Array(n).fill(0);
    
    const dfs = function(u) {
        if (color[u] > 0) {
            return color[u] === 2;
        }
        color[u] = 1;
        for (const v of graph[u]) {
            if (color[v] === 2) continue;
            if (color[v] === 1 || !dfs(v)) {
                return false;
            }
        }
        color[u] = 2;
        return true;
    };
    
    const ans = [];
    for (let i = 0; i < n; i++) {
        if (dfs(i)) {
            ans.push(i);
        }
    }
    return ans;
};

var solve = eventualSafeNodes;

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
