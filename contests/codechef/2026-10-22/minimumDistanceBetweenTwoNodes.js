class Solution {
  getMinimumDistance(n, edges, x, y) {
    if (x === y) return 0;
    const head = new Int32Array(n + 1).fill(-1);
    const to = new Int32Array(edges.length * 2);
    const next = new Int32Array(edges.length * 2);
    let edgeCount = 0;

    function addEdge(u, v) {
      to[edgeCount] = v;
      next[edgeCount] = head[u];
      head[u] = edgeCount++;
    }

    for (let i = 0; i < edges.length; i++) {
      const u = edges[i][0];
      const v = edges[i][1];
      if (u <= n && v <= n) {
        addEdge(u, v);
        addEdge(v, u);
      }
    }

    const dist = new Int32Array(n + 1).fill(-1);
    const queue = new Int32Array(n + 1);
    let headQ = 0, tailQ = 0;

    dist[x] = 0;
    queue[tailQ++] = x;

    while (headQ < tailQ) {
      const cur = queue[headQ++];
      if (cur === y) return dist[cur];
      for (let e = head[cur]; e !== -1; e = next[e]) {
        const neighbor = to[e];
        if (dist[neighbor] === -1) {
          dist[neighbor] = dist[cur] + 1;
          if (neighbor === y) return dist[neighbor];
          queue[tailQ++] = neighbor;
        }
      }
    }

    return dist[y];
  }
}

if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input && input.length >= 4 && input[0] !== '') {
    let ptr = 0;
    const sol = new Solution();
    while (ptr < input.length) {
      const n = parseInt(input[ptr++], 10);
      const m = parseInt(input[ptr++], 10);
      if (isNaN(n) || isNaN(m)) break;
      const edges = [];
      for (let i = 0; i < m; i++) {
        edges.push([parseInt(input[ptr++], 10), parseInt(input[ptr++], 10)]);
      }
      const x = parseInt(input[ptr++], 10);
      const y = parseInt(input[ptr++], 10);
      console.log(sol.getMinimumDistance(n, edges, x, y));
    }
  }
}
