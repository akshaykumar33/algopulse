const fs = require('fs');

function solveDP(n, m, a, b, c) {
  let maxCap = 0;
  for (let i = 0; i < n; i++) {
    if (a[i] > maxCap) maxCap = a[i];
  }

  const INF = 1e15;
  const dp = new Float64Array(maxCap + 1).fill(INF);
  dp[0] = 0;

  for (let j = 0; j < m; j++) {
    const cap = b[j];
    const cost = c[j];
    for (let w = cap; w <= maxCap; w++) {
      if (dp[w - cap] + cost < dp[w]) {
        dp[w] = dp[w - cap] + cost;
      }
    }
  }

  let totalCost = 0;
  for (let i = 0; i < n; i++) {
    totalCost += dp[a[i]];
  }

  return totalCost;
}

function solveBrute(n, m, a, b, c) {
  let totalCost = 0;
  for (let i = 0; i < n; i++) {
    const target = a[i];
    let minCost = Infinity;

    function dfs(rem, currCost) {
      if (rem === 0) {
        if (currCost < minCost) minCost = currCost;
        return;
      }
      if (rem < 0 || currCost >= minCost) return;
      for (let j = 0; j < m; j++) {
        dfs(rem - b[j], currCost + c[j]);
      }
    }

    dfs(target, 0);
    totalCost += minCost;
  }
  return totalCost;
}

let testCount = 0;

for (let round = 0; round < 50; round++) {
  const n = Math.floor(Math.random() * 5) + 1;
  const m = Math.floor(Math.random() * 5) + 1;
  const a = Array.from({ length: n }, () => Math.floor(Math.random() * 10) + 1);
  const b = [1, ...Array.from({ length: m - 1 }, () => Math.floor(Math.random() * 10) + 1)];
  const c = Array.from({ length: m }, () => Math.floor(Math.random() * 50) + 1);

  const expected = solveBrute(n, m, a, b, c);
  const actual = solveDP(n, m, a, b, c);

  if (expected !== actual) {
    console.error(`Mismatch on round ${round}: expected ${expected}, got ${actual}`);
    process.exit(1);
  }
  testCount++;
}

const maxN = 1000;
const maxM = 1000;
const maxA = Array.from({ length: maxN }, () => 1000);
const maxB = [1, ...Array.from({ length: maxM - 1 }, () => Math.floor(Math.random() * 1000) + 1)];
const maxC = Array.from({ length: maxM }, () => Math.floor(Math.random() * 10000) + 1);

const start = performance.now();
const maxRes = solveDP(maxN, maxM, maxA, maxB, maxC);
const duration = performance.now() - start;

console.log(`Verified ${testCount} randomized stress tests against DFS brute force.`);
console.log(`Maximal bounds (N=1000, M=1000, A_i=1000) finished in ${duration.toFixed(2)} ms.`);
