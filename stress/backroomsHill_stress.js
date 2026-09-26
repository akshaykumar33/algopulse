const fs = require('fs');

function isHill(arr) {
  const n = arr.length;
  let k = 0;
  for (let i = 1; i < n; i++) {
    if (arr[i] > arr[k]) k = i;
  }
  for (let i = 0; i < k; i++) if (arr[i] >= arr[i + 1]) return false;
  for (let i = k; i < n - 1; i++) if (arr[i] <= arr[i + 1]) return false;
  return true;
}

// Ground-truth brute force: checks all permutations of odd and even partitions
function canBeHillBrute(a) {
  const n = a.length;
  const odd = [], even = [];
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) odd.push(a[i]);
    else even.push(a[i]);
  }

  function permute(arr) {
    if (arr.length <= 1) return [arr];
    const res = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = arr.slice(0, i).concat(arr.slice(i + 1));
      for (const p of permute(rest)) {
        res.push([arr[i], ...p]);
      }
    }
    return res;
  }

  const oddPerms = permute(odd);
  const evenPerms = permute(even);

  for (const op of oddPerms) {
    for (const ep of evenPerms) {
      const b = [];
      for (let i = 0; i < n; i++) {
        b.push(i % 2 === 0 ? op[Math.floor(i / 2)] : ep[Math.floor(i / 2)]);
      }
      if (isHill(b)) return true;
    }
  }
  return false;
}

// DP over reachable [L, R] intervals
function canBeHillDP(a) {
  const n = a.length;
  const pos = new Int8Array(n + 1);
  for (let i = 0; i < n; i++) pos[a[i]] = (i & 1);

  let possibleL = new Set([0]);

  for (let v = 1; v <= n; v++) {
    const nextL = new Set();
    const p = pos[v];
    const remLen = n - v + 1;

    for (const L of possibleL) {
      const R = L + remLen - 1;
      if ((L & 1) === p) nextL.add(L + 1);
      if ((R & 1) === p) nextL.add(L);
    }

    if (nextL.size === 0) return false;
    possibleL = nextL;
  }
  return true;
}

// Optimal linear algorithm
function solveOptimal(a) {
  const n = a.length;
  const pos = new Int8Array(n + 1);
  for (let i = 0; i < n; i++) {
    pos[a[i]] = (i & 1);
  }

  let rem0 = Math.ceil(n / 2);
  let rem1 = Math.floor(n / 2);

  for (let v = 1; v <= n; v++) {
    const remLen = n - v + 1;
    const p = pos[v];

    if ((remLen & 1) === 1) {
      const maj = rem0 > rem1 ? 0 : 1;
      if (p !== maj) return false;
      if (maj === 0) rem0--;
      else rem1--;
    } else {
      if (p === 0) rem0--;
      else rem1--;
    }
  }
  return true;
}

console.log('=== Phase 1: Exhaustive Permutations (n=1..8) ===');
function generatePerms(arr) {
  if (arr.length <= 1) return [arr];
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    for (const p of generatePerms(rest)) {
      res.push([arr[i], ...p]);
    }
  }
  return res;
}

let totalExhaustive = 0;
for (let n = 1; n <= 8; n++) {
  const base = [];
  for (let i = 1; i <= n; i++) base.push(i);
  const perms = generatePerms(base);
  for (const p of perms) {
    const expected = canBeHillBrute(p);
    const actual = solveOptimal(p);
    if (expected !== actual) {
      console.error(`MISMATCH on [${p.join(',')}]: expected ${expected}, got ${actual}`);
      process.exit(1);
    }
    totalExhaustive++;
  }
}
console.log(`Passed all ${totalExhaustive} exhaustive permutations for n=1..8!`);

console.log('\n=== Phase 2: High-Volume DP Fuzzing (30,000 trials, n up to 60) ===');
let dpTrials = 0;
for (let trial = 0; trial < 30000; trial++) {
  const n = Math.floor(Math.random() * 60) + 1;
  const arr = [];
  for (let i = 1; i <= n; i++) arr.push(i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }

  const expected = canBeHillDP(arr);
  const actual = solveOptimal(arr);
  if (expected !== actual) {
    console.error(`MISMATCH on DP trial [${arr.join(',')}]: expected ${expected}, got ${actual}`);
    process.exit(1);
  }
  dpTrials++;
}
console.log(`Passed all ${dpTrials} DP fuzzing trials.`);

console.log('\n=== Phase 3: Worst-Case Scale Benchmark ===');
const N = 200000;
const bigArr = new Int32Array(N);
for (let i = 0; i < N; i++) bigArr[i] = i + 1;
bigArr.reverse();

const startTime = Date.now();
const res = solveOptimal(bigArr);
const elapsed = Date.now() - startTime;
console.log(`Worst-case execution for N=${N}: ${elapsed}ms (Result: ${res})`);
console.log('All stress tests successfully completed!');
