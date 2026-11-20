const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);

  const adj = Array.from({ length: n + 1 }, () => new Uint8Array(n + 1));
  for (let i = 0; i < m; i++) {
    const u = parseInt(input[ptr++], 10);
    const v = parseInt(input[ptr++], 10);
    adj[u][v] = 1;
    adj[v][u] = 1;
  }

  const targetEdgeType = adj[1][n] === 1 ? 0 : 1;
  const dist = new Int32Array(n + 1).fill(-1);
  const q = new Int32Array(n + 2);
  let head = 0;
  let tail = 0;

  dist[1] = 0;
  q[tail++] = 1;

  while (head < tail) {
    const u = q[head++];
    if (u === n) {
      console.log(dist[n]);
      return;
    }
    for (let v = 1; v <= n; v++) {
      if (adj[u][v] === targetEdgeType && dist[v] === -1) {
        dist[v] = dist[u] + 1;
        q[tail++] = v;
      }
    }
  }

  console.log(-1);
}

solve();
