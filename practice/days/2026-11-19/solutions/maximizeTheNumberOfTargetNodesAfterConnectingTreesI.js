var maxTargetNodes = function(edges1, edges2, k) {
  const n = edges1.length + 1;
  const m = edges2.length + 1;

  function buildAdj(edges, sz) {
    const adj = Array.from({ length: sz }, () => []);
    for (let i = 0; i < edges.length; i++) {
      const u = edges[i][0];
      const v = edges[i][1];
      adj[u].push(v);
      adj[v].push(u);
    }
    return adj;
  }

  const adj1 = buildAdj(edges1, n);
  const adj2 = buildAdj(edges2, m);

  function countWithinDist(adj, root, maxDist) {
    if (maxDist < 0) return 0;
    const q = [root];
    const visited = new Uint8Array(adj.length);
    visited[root] = 1;
    let dist = 0;
    let count = 0;
    let head = 0;

    while (head < q.length && dist <= maxDist) {
      const levelEnd = q.length;
      count += levelEnd - head;
      if (dist === maxDist) break;

      while (head < levelEnd) {
        const u = q[head++];
        for (let i = 0; i < adj[u].length; i++) {
          const v = adj[u][i];
          if (!visited[v]) {
            visited[v] = 1;
            q.push(v);
          }
        }
      }
      dist++;
    }

    return count;
  }

  let maxTree2 = 0;
  for (let y = 0; y < m; y++) {
    const cnt = countWithinDist(adj2, y, k - 1);
    if (cnt > maxTree2) maxTree2 = cnt;
  }

  const ans = new Int32Array(n);
  for (let x = 0; x < n; x++) {
    ans[x] = countWithinDist(adj1, x, k) + maxTree2;
  }

  return Array.from(ans);
};

var solve = maxTargetNodes;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1], parsed[2])));
    }
  } catch (e) {}
}

module.exports = maxTargetNodes;
