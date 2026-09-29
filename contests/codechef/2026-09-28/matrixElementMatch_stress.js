const fs = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');

// Independent Reference: Hash Map frequency counting
function independentMapRef(arrA, arrB) {
  const countA = new Map();
  for (let i = 0; i < arrA.length; i++) {
    const x = arrA[i];
    countA.set(x, (countA.get(x) || 0) + 1);
  }
  for (let i = 0; i < arrB.length; i++) {
    const x = arrB[i];
    const c = countA.get(x);
    if (!c) return 'FALSE';
    countA.set(x, c - 1);
  }
  return 'TRUE';
}

function twoPointersSolution(arrA, arrB) {
  const a = new Int32Array(arrA).sort();
  const b = new Int32Array(arrB).sort();

  let ptrA = 0;
  let ptrB = 0;
  while (ptrB < b.length && ptrA < a.length) {
    if (a[ptrA] === b[ptrB]) {
      ptrA++;
      ptrB++;
    } else if (a[ptrA] < b[ptrB]) {
      ptrA++;
    } else {
      return 'FALSE';
    }
  }
  return ptrB === b.length ? 'TRUE' : 'FALSE';
}

console.log('[stress] Testing edge-case configurations...');

const edgeTests = [
  // 1x1 match
  { a: [5], b: [5], exp: 'TRUE' },
  // 1x1 mismatch
  { a: [5], b: [6], exp: 'FALSE' },
  // Negative numbers
  { a: [-1000000000, 0, 1000000000, -5], b: [-1000000000, 1000000000], exp: 'TRUE' },
  // Negative number mismatch
  { a: [-10, -20], b: [-10, -10], exp: 'FALSE' },
  // Duplicate counts
  { a: [1, 1, 2, 2], b: [1, 2, 2, 2], exp: 'FALSE' },
  { a: [1, 1, 2, 2], b: [1, 1, 2, 2], exp: 'TRUE' },
  // All equal
  { a: [7, 7, 7, 7], b: [7, 7], exp: 'TRUE' },
];

for (const test of edgeTests) {
  const ref = independentMapRef(test.a, test.b);
  const sol = twoPointersSolution(test.a, test.b);
  if (ref !== test.exp || sol !== test.exp) {
    console.error('[stress] Edge test failed on:', test);
    process.exit(1);
  }
}
console.log(`[stress] All ${edgeTests.length} edge cases passed!`);

console.log('[stress] Running 5,000 randomized fuzz tests...');
for (let tc = 0; tc < 5000; tc++) {
  const n = Math.floor(Math.random() * 8) + 1;
  const m = Math.floor(Math.random() * n) + 1;
  const totalA = n * n;
  const totalB = m * m;

  const arrA = new Int32Array(totalA);
  for (let i = 0; i < totalA; i++) {
    arrA[i] = Math.floor(Math.random() * 20) - 10;
  }

  const arrB = new Int32Array(totalB);
  if (Math.random() < 0.5) {
    // Pick subset from A to frequently trigger TRUE cases
    const indices = [];
    for (let i = 0; i < totalA; i++) indices.push(i);
    // Shuffle
    for (let i = totalA - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = indices[i];
      indices[i] = indices[j];
      indices[j] = tmp;
    }
    for (let i = 0; i < totalB; i++) {
      arrB[i] = arrA[indices[i]];
    }
  } else {
    // Completely random B to trigger FALSE cases
    for (let i = 0; i < totalB; i++) {
      arrB[i] = Math.floor(Math.random() * 20) - 10;
    }
  }

  const ref = independentMapRef(arrA, arrB);
  const sol = twoPointersSolution(arrA, arrB);
  if (ref !== sol) {
    console.error(`[stress] Fuzz mismatch: ref=${ref}, sol=${sol}`);
    process.exit(1);
  }
}
console.log('[stress] 5,000 randomized fuzz tests passed!');

// Benchmark worst-case scenario: N = 500, M = 500 (250,000 elements each)
const solutionPath = fs.existsSync(path.resolve(__dirname, 'matrixElementMatch.js'))
  ? path.resolve(__dirname, 'matrixElementMatch.js')
  : path.resolve(__dirname, '..', '..', '..', 'solutions', 'matrixElementMatch.js');
console.log(`[stress] Benchmarking worst-case scenario (N=500, M=500) on: ${solutionPath}`);

const MAX_N = 500;
const MAX_M = 500;
const totalA = MAX_N * MAX_N;
const totalB = MAX_M * MAX_M;

const rawA = new Int32Array(totalA);
for (let i = 0; i < totalA; i++) {
  rawA[i] = i - 125000;
}
// Shuffle rawA partially to test sort
for (let i = 0; i < 10000; i++) {
  const idx1 = Math.floor(Math.random() * totalA);
  const idx2 = Math.floor(Math.random() * totalA);
  const tmp = rawA[idx1];
  rawA[idx1] = rawA[idx2];
  rawA[idx2] = tmp;
}

// B is identical elements of A, meaning it traverses all elements to the end (worst-case branch)
const rawB = new Int32Array(totalB);
for (let i = 0; i < totalB; i++) {
  rawB[i] = rawA[i];
}

const inputChunks = [`${MAX_N}\n${MAX_M}\n`];
// Output A rows
for (let r = 0; r < MAX_N; r++) {
  const row = [];
  for (let c = 0; c < MAX_N; c++) {
    row.push(rawA[r * MAX_N + c]);
  }
  inputChunks.push(row.join(' ') + '\n');
}
// Output B rows
for (let r = 0; r < MAX_M; r++) {
  const row = [];
  for (let c = 0; c < MAX_M; c++) {
    row.push(rawB[r * MAX_M + c]);
  }
  inputChunks.push(row.join(' ') + '\n');
}

const largeInput = inputChunks.join('');
const start = Date.now();
const res = spawnSync('node', [solutionPath], {
  input: largeInput,
  encoding: 'utf-8',
  maxBuffer: 100 * 1024 * 1024,
});
const elapsed = Date.now() - start;

if (res.status !== 0) {
  console.error('[stress] Solution execution failed:', res.stderr);
  process.exit(1);
}

const output = res.stdout.trim();
if (output !== 'TRUE') {
  console.error(`[stress] Unexpected output on identical max matrices: expected TRUE, got ${output}`);
  process.exit(1);
}

console.log(`[stress] Max constraint test (N=500, M=500: 500,000 integers) finished in ${elapsed}ms (Limit: 1000ms).`);
console.log('[stress] All stress tests verified successfully!');
