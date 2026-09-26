const fs = require('fs');

// Ground-truth O(n^2) power calculator
function bruteForcePower(arr) {
  const n = arr.length;
  let totalPower = 0;
  for (let l = 0; l < n; l++) {
    let trans = 0;
    for (let r = l; r < n; r++) {
      if (r > l && arr[r] !== arr[r - 1]) {
        trans++;
      }
      totalPower += Math.ceil(trans / 2);
    }
  }
  return totalPower;
}

// Optimal O(1) query implementation
function solveFast(s, queries) {
  const n = s.length;
  const a = new Uint8Array(n);
  let c0 = 0, c1 = 0;

  for (let i = 0; i < n; i++) {
    a[i] = typeof s === 'string' ? (s.charCodeAt(i) - 48) : s[i];
    if (a[i] === 0) c0++;
    else c1++;
  }

  let sumTransitions = 0;
  for (let j = 0; j < n - 1; j++) {
    if (a[j] !== a[j + 1]) {
      sumTransitions += (j + 1) * (n - 1 - j);
    }
  }

  const results = [];
  results.push((sumTransitions + c0 * c1) / 2);

  for (const q of queries) {
    const pos = q - 1;

    if (a[pos] === 0) {
      c0--;
      c1++;
    } else {
      c1--;
      c0++;
    }

    if (pos > 0) {
      const j = pos - 1;
      const weight = (j + 1) * (n - 1 - j);
      if (a[j] !== a[pos]) sumTransitions -= weight;
      else sumTransitions += weight;
    }

    if (pos < n - 1) {
      const j = pos;
      const weight = (j + 1) * (n - 1 - j);
      if (a[pos] !== a[pos + 1]) sumTransitions -= weight;
      else sumTransitions += weight;
    }

    a[pos] = 1 - a[pos];
    results.push((sumTransitions + c0 * c1) / 2);
  }

  return results;
}

console.log('=== Phase 1: Small Exhaustive and Degenerate Stress Tests ===');
// Exhaustive test on all binary strings of length up to 8
let totalSmallCases = 0;
for (let len = 1; len <= 8; len++) {
  const total = 1 << len;
  for (let mask = 0; mask < total; mask++) {
    const arr = [];
    for (let i = 0; i < len; i++) {
      arr.push((mask >> i) & 1);
    }
    const expected = bruteForcePower(arr);
    const actual = solveFast(arr, [])[0];
    if (expected !== actual) {
      console.error(`MISMATCH on mask=${mask}, len=${len}: expected ${expected}, got ${actual}`);
      process.exit(1);
    }
    totalSmallCases++;
  }
}
console.log(`Passed all ${totalSmallCases} exhaustive binary strings of lengths 1..8.`);

console.log('\n=== Phase 2: Dynamic Query Stress Tests against O(n^2) Brute Force ===');
let dynamicTestsPassed = 0;
for (let trial = 0; trial < 1000; trial++) {
  const n = Math.floor(Math.random() * 30) + 1;
  const q = Math.floor(Math.random() * 30) + 1;
  const arr = [];
  for (let i = 0; i < n; i++) arr.push(Math.random() < 0.5 ? 0 : 1);

  const queries = [];
  for (let i = 0; i < q; i++) {
    queries.push(Math.floor(Math.random() * n) + 1);
  }

  // Run brute force query by query
  const expectedResults = [];
  const curArr = [...arr];
  expectedResults.push(bruteForcePower(curArr));
  for (const query of queries) {
    curArr[query - 1] = 1 - curArr[query - 1];
    expectedResults.push(bruteForcePower(curArr));
  }

  const actualResults = solveFast(arr, queries);

  for (let i = 0; i < expectedResults.length; i++) {
    if (expectedResults[i] !== actualResults[i]) {
      console.error(`MISMATCH on dynamic test trial=${trial}, step=${i}: expected ${expectedResults[i]}, got ${actualResults[i]}`);
      process.exit(1);
    }
  }
  dynamicTestsPassed++;
}
console.log(`Passed all ${dynamicTestsPassed} randomized dynamic query trials (each with up to 30 modifications).`);

console.log('\n=== Phase 3: Worst-Case Scale Benchmark ===');
// n = 200,000, q = 200,000
const N = 200000;
const Q = 200000;
const bigArr = new Uint8Array(N);
for (let i = 0; i < N; i++) bigArr[i] = i % 2; // Alternating 0101...

const bigQueries = new Int32Array(Q);
for (let i = 0; i < Q; i++) bigQueries[i] = (i % N) + 1;

const startTime = Date.now();
const res = solveFast(bigArr, bigQueries);
const elapsed = Date.now() - startTime;
console.log(`Worst-case execution for N=${N}, Q=${Q}: ${elapsed}ms (Initial power: ${res[0]})`);
console.log('All stress tests successfully completed!');
