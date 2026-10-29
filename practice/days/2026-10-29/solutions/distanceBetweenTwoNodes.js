const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3 || input[0] === '') return;

  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const u = parseInt(input[ptr++], 10);
  const v = parseInt(input[ptr++], 10);

  if (u === v) {
    console.log(0);
    return;
  }

  const head = new Int32Array(n + 1).fill(-1);
  const to = new Int32Array(2 * n);
  const next = new Int32Array(2 * n);
  let edgeCount = 0;

  function addEdge(x, y) {
    to[edgeCount] = y;
    next[edgeCount] = head[x];
    head[x] = edgeCount++;
  }

  for (let i = 0; i < n - 1; i++) {
    const a = parseInt(input[ptr++], 10);
    const b = parseInt(input[ptr++], 10);
    addEdge(a, b);
    addEdge(b, a);
  }

  const dist = new Int32Array(n + 1).fill(-1);
  const queue = new Int32Array(n);
  let qHead = 0;
  let qTail = 0;

  dist[u] = 0;
  queue[qTail++] = u;

  while (qHead < qTail) {
    const curr = queue[qHead++];
    if (curr === v) {
      console.log(dist[curr]);
      return;
    }

    for (let e = head[curr]; e !== -1; e = next[e]) {
      const neighbor = to[e];
      if (dist[neighbor] === -1) {
        dist[neighbor] = dist[curr] + 1;
        queue[qTail++] = neighbor;
      }
    }
  }

  console.log(dist[v]);
}

solve();
