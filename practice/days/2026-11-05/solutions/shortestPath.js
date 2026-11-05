const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const adj = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < m; i++) {
    const u = parseInt(tokens[ptr++], 10);
    const v = parseInt(tokens[ptr++], 10);
    adj[u].push(v);
    adj[v].push(u);
  }
  const start = parseInt(tokens[ptr++], 10);
  const end = parseInt(tokens[ptr++], 10);
  const dist = new Array(n + 1).fill(-1);
  const parent = new Array(n + 1).fill(-1);
  const queue = new Int32Array(n + 1);
  let head = 0, tail = 0;
  queue[tail++] = start;
  dist[start] = 0;
  while (head < tail) {
    const u = queue[head++];
    if (u === end) break;
    const neighbors = adj[u];
    for (let i = 0; i < neighbors.length; i++) {
      const v = neighbors[i];
      if (dist[v] === -1) {
        dist[v] = dist[u] + 1;
        parent[v] = u;
        queue[tail++] = v;
      }
    }
  }
  const out = [];
  if (dist[end] === -1) {
    out.push(-1);
  } else {
    const path = [];
    let curr = end;
    while (curr !== -1) {
      path.push(curr);
      curr = parent[curr];
    }
    path.reverse();
    out.push(dist[end]);
    out.push(path.join(' '));
  }
  console.log(out.join('\n'));
}
solve();
