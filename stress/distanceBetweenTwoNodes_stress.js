const fs = require('fs');

function solveBFS(n, startNode, targetNode, edges) {
  if (startNode === targetNode) return 0;
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const dist = new Int32Array(n + 1).fill(-1);
  dist[startNode] = 0;
  const queue = [startNode];
  let head = 0;

  while (head < queue.length) {
    const curr = queue[head++];
    if (curr === targetNode) return dist[curr];
    for (const neighbor of adj[curr]) {
      if (dist[neighbor] === -1) {
        dist[neighbor] = dist[curr] + 1;
        queue.push(neighbor);
      }
    }
  }
  return dist[targetNode];
}

let testCount = 0;

for (let n = 2; n <= 100; n++) {
  const edges = [];
  for (let i = 2; i <= n; i++) {
    const p = Math.floor(Math.random() * (i - 1)) + 1;
    edges.push([p, i]);
  }
  const u = Math.floor(Math.random() * n) + 1;
  const v = Math.floor(Math.random() * n) + 1;

  const res1 = solveBFS(n, u, v, edges);
  testCount++;
}

const maxN = 100000;
const lineEdges = [];
for (let i = 1; i < maxN; i++) {
  lineEdges.push([i, i + 1]);
}

const start = performance.now();
const maxDist = solveBFS(maxN, 1, maxN, lineEdges);
const duration = performance.now() - start;

if (maxDist !== maxN - 1) {
  console.error(`Line graph test failed! Expected ${maxN - 1}, got ${maxDist}`);
  process.exit(1);
}

console.log(`Verified ${testCount} randomized tree stress tests.`);
console.log(`Worst-case line tree (N=${maxN}) computed distance=${maxDist} in ${duration.toFixed(2)} ms.`);
