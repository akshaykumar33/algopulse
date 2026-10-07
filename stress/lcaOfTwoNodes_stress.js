const fs = require('fs');

function solveLCA(n, nodeU, nodeV, edges) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const parent = new Int32Array(n + 1);
  const depth = new Int32Array(n + 1);
  const visited = new Uint8Array(n + 1);

  const queue = [1];
  visited[1] = 1;
  parent[1] = 0;
  depth[1] = 0;
  let head = 0;

  while (head < queue.length) {
    const curr = queue[head++];
    for (const neighbor of adj[curr]) {
      if (!visited[neighbor]) {
        visited[neighbor] = 1;
        parent[neighbor] = curr;
        depth[neighbor] = depth[curr] + 1;
        queue.push(neighbor);
      }
    }
  }

  let u = nodeU;
  let v = nodeV;

  while (depth[u] > depth[v]) u = parent[u];
  while (depth[v] > depth[u]) v = parent[v];

  while (u !== v) {
    u = parent[u];
    v = parent[v];
  }

  return u;
}

function oracleLCA(n, nodeU, nodeV, edges) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const parent = new Int32Array(n + 1);
  const visited = new Uint8Array(n + 1);
  const queue = [1];
  visited[1] = 1;
  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    for (const neighbor of adj[curr]) {
      if (!visited[neighbor]) {
        visited[neighbor] = 1;
        parent[neighbor] = curr;
        queue.push(neighbor);
      }
    }
  }

  const ancestorsU = new Set();
  let currU = nodeU;
  while (currU !== 0) {
    ancestorsU.add(currU);
    currU = parent[currU];
  }

  let currV = nodeV;
  while (currV !== 0) {
    if (ancestorsU.has(currV)) {
      return currV;
    }
    currV = parent[currV];
  }
  return 1;
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

  const expected = oracleLCA(n, u, v, edges);
  const actual = solveLCA(n, u, v, edges);

  if (expected !== actual) {
    console.error(`Mismatch for N=${n}, u=${u}, v=${v}: expected ${expected}, got ${actual}`);
    process.exit(1);
  }
  testCount++;
}

const maxN = 100000;
const lineEdges = [];
for (let i = 1; i < maxN; i++) {
  lineEdges.push([i, i + 1]);
}

const start = performance.now();
const maxAns = solveLCA(maxN, maxN - 10, maxN, lineEdges);
const duration = performance.now() - start;

if (maxAns !== maxN - 10) {
  console.error(`Line tree test failed! Expected ${maxN - 10}, got ${maxAns}`);
  process.exit(1);
}

console.log(`Verified ${testCount} randomized stress test cases successfully.`);
console.log(`Worst-case line tree (N=${maxN}) computed LCA=${maxAns} in ${duration.toFixed(2)} ms.`);
