var reachableNodes = function(n, edges, restricted) {
  const rest = new Uint8Array(n);
  for (let i = 0; i < restricted.length; i++) {
    rest[restricted[i]] = 1;
  }
  const head = new Int32Array(n).fill(-1);
  const to = new Int32Array(edges.length * 2);
  const nxt = new Int32Array(edges.length * 2);
  let edgeCount = 0;

  function addEdge(u, v) {
    to[edgeCount] = v;
    nxt[edgeCount] = head[u];
    head[u] = edgeCount++;
  }

  for (let i = 0; i < edges.length; i++) {
    const u = edges[i][0];
    const v = edges[i][1];
    addEdge(u, v);
    addEdge(v, u);
  }

  const vis = new Uint8Array(n);
  const queue = new Int32Array(n);
  let qh = 0, qt = 0;
  queue[qt++] = 0;
  vis[0] = 1;
  let ans = 0;

  while (qh < qt) {
    const u = queue[qh++];
    ans++;
    for (let e = head[u]; e !== -1; e = nxt[e]) {
      const v = to[e];
      if (!vis[v] && !rest[v]) {
        vis[v] = 1;
        queue[qt++] = v;
      }
    }
  }

  return ans;
};

var solve = reachableNodes;

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

module.exports = reachableNodes;
