var getAncestors = function(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < edges.length; i++) {
    adj[edges[i][1]].push(edges[i][0]);
  }
  const ans = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    const vis = new Uint8Array(n);
    const q = [i];
    vis[i] = 1;
    let head = 0;
    while (head < q.length) {
      const u = q[head++];
      for (let j = 0; j < adj[u].length; j++) {
        const v = adj[u][j];
        if (!vis[v]) {
          vis[v] = 1;
          q.push(v);
        }
      }
    }
    const list = [];
    for (let j = 0; j < n; j++) {
      if (j !== i && vis[j]) list.push(j);
    }
    ans[i] = list;
  }
  return ans;
};

var solve = typeof getAncestors !== 'undefined' ? getAncestors : null;

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
module.exports = { getAncestors, solve };
