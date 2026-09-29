const fs = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');

// Independent Reference:
// Exhaustively test all possible valid final levels L in [0, min(H)]
// and return min over all valid L of sum(H_i - L)
function independentBruteForce(arr) {
  const minH = Math.min(...arr);
  let minCost = Infinity;
  for (let L = 0; L <= minH; L++) {
    let cost = 0;
    for (const h of arr) {
      cost += (h - L);
    }
    if (cost < minCost) {
      minCost = cost;
    }
  }
  return minCost;
}

function mathSolution(arr) {
  const minH = Math.min(...arr);
  let sum = 0;
  for (const h of arr) {
    sum += h;
  }
  return sum - arr.length * minH;
}

console.log('[stress] Starting exhaustive brute force verification on small inputs...');

// Exhaustive test on all small arrays of length 1 to 5 with elements in 0..10
for (let len = 1; len <= 4; len++) {
  function generate(current) {
    if (current.length === len) {
      const bf = independentBruteForce(current);
      const math = mathSolution(current);
      if (bf !== math) {
        console.error(`Mismatch on input ${JSON.stringify(current)}: bf=${bf}, math=${math}`);
        process.exit(1);
      }
      return;
    }
    for (let v = 1; v <= 6; v++) {
      current.push(v);
      generate(current);
      current.pop();
    }
  }
  generate([]);
}
console.log('[stress] Small input exhaustive tests passed!');

console.log('[stress] Running 10,000 randomized fuzz test cases with edge configurations...');
for (let tc = 0; tc < 10000; tc++) {
  const n = Math.floor(Math.random() * 20) + 1;
  const arr = [];
  const type = Math.floor(Math.random() * 4);
  if (type === 0) {
    // All equal
    const val = Math.floor(Math.random() * 50) + 1;
    for (let i = 0; i < n; i++) arr.push(val);
  } else if (type === 1) {
    // Alternating
    const val1 = Math.floor(Math.random() * 50) + 1;
    const val2 = Math.floor(Math.random() * 50) + 1;
    for (let i = 0; i < n; i++) arr.push(i % 2 === 0 ? val1 : val2);
  } else {
    // Random
    for (let i = 0; i < n; i++) arr.push(Math.floor(Math.random() * 50) + 1);
  }

  const bf = independentBruteForce(arr);
  const math = mathSolution(arr);
  if (bf !== math) {
    console.error(`Mismatch on fuzz input: arr=${JSON.stringify(arr)}, bf=${bf}, math=${math}`);
    process.exit(1);
  }
}
console.log('[stress] 10,000 fuzz cases passed!');

// Worst case benchmark on maximum constraints: N = 100,000, H_i = 10^9
const solutionPath = fs.existsSync(path.resolve(__dirname, 'equalReservoirLevels.js'))
  ? path.resolve(__dirname, 'equalReservoirLevels.js')
  : path.resolve(__dirname, '..', '..', '..', 'solutions', 'equalReservoirLevels.js');
console.log(`[stress] Benchmarking worst-case scenario on solution script: ${solutionPath}`);

const MAX_N = 100000;
const testArr = new Array(MAX_N);
let expectedSum = 0;
let expectedMin = 1000000000;

for (let i = 0; i < MAX_N; i++) {
  // Alternate between large values and 1 to stress sum & min
  const val = (i === 42) ? 1 : 1000000000;
  testArr[i] = val;
  expectedSum += val;
  if (val < expectedMin) expectedMin = val;
}

const expectedAns = expectedSum - MAX_N * expectedMin;
const largeInput = `${MAX_N}\n` + testArr.join(' ') + '\n';

const start = Date.now();
const res = spawnSync('node', [solutionPath], {
  input: largeInput,
  encoding: 'utf-8',
  maxBuffer: 50 * 1024 * 1024,
});
const elapsed = Date.now() - start;

if (res.status !== 0) {
  console.error('[stress] Solution execution failed:', res.stderr);
  process.exit(1);
}

const output = res.stdout.trim();
if (output !== String(expectedAns)) {
  console.error(`[stress] Output mismatch on worst case: expected ${expectedAns}, got ${output}`);
  process.exit(1);
}

console.log(`[stress] Max constraint test (N = ${MAX_N}, H_i up to 10^9) finished in ${elapsed}ms (Limit: 1000ms).`);
console.log(`[stress] Computed result: ${output}`);
console.log('[stress] All stress tests verified successfully!');
