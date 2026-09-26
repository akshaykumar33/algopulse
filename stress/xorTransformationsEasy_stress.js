const fs = require('fs');

// Ground-truth naive transformation with full sort
function transformNaive(arr) {
  const n = arr.length;
  const xors = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      xors.push(arr[i] ^ arr[j]);
    }
  }
  xors.sort((a, b) => a - b);
  return xors.slice(0, n);
}

function solveNaive(a, queries) {
  const n = a.length;
  let cur = [...a];
  const history = [Math.max(...cur) - Math.min(...cur)];

  while (history[history.length - 1] > 0) {
    cur = transformNaive(cur);
    history.push(Math.max(...cur) - Math.min(...cur));
  }

  return queries.map(x => (x < history.length ? history[x] : 0));
}

// Optimal quickselect transformation
const MAX_PAIRS = 2000000;
const xorBuffer = new Int32Array(MAX_PAIRS);

function quickselect(arr, totalLen, k) {
  let left = 0, right = totalLen - 1;
  while (left < right) {
    const pivotIdx = left + ((Math.random() * (right - left + 1)) | 0);
    const pivot = arr[pivotIdx];
    let i = left, j = right;
    while (i <= j) {
      while (arr[i] < pivot) i++;
      while (arr[j] > pivot) j--;
      if (i <= j) {
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
        i++;
        j--;
      }
    }
    if (k <= j) {
      right = j;
    } else if (k >= i) {
      left = i;
    } else {
      break;
    }
  }
}

function solveFast(a, queries) {
  const n = a.length;
  let cur = new Int32Array(a);
  let minVal = 2147483647;
  let maxVal = 0;
  for (let i = 0; i < n; i++) {
    if (cur[i] < minVal) minVal = cur[i];
    if (cur[i] > maxVal) maxVal = cur[i];
  }

  const history = [maxVal - minVal];
  const totalPairs = (n * (n - 1)) / 2;

  while (history[history.length - 1] > 0) {
    let idx = 0;
    for (let i = 0; i < n; i++) {
      const valI = cur[i];
      for (let j = i + 1; j < n; j++) {
        xorBuffer[idx++] = valI ^ cur[j];
      }
    }

    quickselect(xorBuffer, totalPairs, n);

    const nextCur = new Int32Array(n);
    for (let i = 0; i < n; i++) nextCur[i] = xorBuffer[i];
    nextCur.sort();

    history.push(nextCur[n - 1] - nextCur[0]);
    cur = nextCur;
  }

  return queries.map(x => (x < history.length ? history[x] : 0));
}

console.log('=== Phase 1: Randomized Stress Fuzzing against Naive Sort ===');
let trialsPassed = 0;
for (let trial = 0; trial < 1000; trial++) {
  const n = Math.floor(Math.random() * 15) + 5; // 5..19
  const q = Math.floor(Math.random() * 10) + 1;
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * (1 << 20)));
  }
  const queries = [];
  for (let i = 0; i < q; i++) {
    queries.push(Math.floor(Math.random() * 30));
  }

  const expected = solveNaive(arr, queries);
  const actual = solveFast(arr, queries);

  for (let i = 0; i < q; i++) {
    if (expected[i] !== actual[i]) {
      console.error(`MISMATCH on trial ${trial}, query ${queries[i]}: expected ${expected[i]}, got ${actual[i]}`);
      process.exit(1);
    }
  }
  trialsPassed++;
}
console.log(`Passed all ${trialsPassed} randomized stress trials!`);

console.log('\n=== Phase 2: Worst-Case Scale Benchmark ===');
// n = 2000, q = 2000, random 30-bit integers
const N = 2000;
const Q = 2000;
const bigArr = new Int32Array(N);
for (let i = 0; i < N; i++) bigArr[i] = Math.floor(Math.random() * (1 << 30));

const bigQueries = [];
for (let i = 0; i < Q; i++) bigQueries.push(i);

const startTime = Date.now();
const res = solveFast(bigArr, bigQueries);
const elapsed = Date.now() - startTime;
console.log(`Worst-case execution for N=${N}, Q=${Q}: ${elapsed}ms (Sample ans: ${res.slice(0, 5).join(', ')})`);
console.log('All stress tests successfully completed!');
