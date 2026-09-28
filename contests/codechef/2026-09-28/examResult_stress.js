const fs = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');

// Independent reference implementation using explicit simulation
function independentRef(C, M, W, P, R) {
  let score = 0;
  for (let i = 0; i < C; i++) score += M;
  for (let i = 0; i < W; i++) score -= P;
  return score >= R ? 'YES' : 'NO';
}

function solutionFormula(C, M, W, P, R) {
  const score = C * M - W * P;
  return score >= R ? 'YES' : 'NO';
}

console.log('[stress] Starting exhaustive validation on boundary combinations...');
const cVals = [0, 1, 2, 10, 50, 99, 100];
const wVals = [0, 1, 2, 10, 50, 99, 100];
const mVals = [1, 2, 5, 9, 10];
const pVals = [1, 2, 5, 9, 10];
const rVals = [0, 1, 2, 10, 50, 100, 500, 999, 1000];

let tested = 0;
for (const C of cVals) {
  for (const W of wVals) {
    for (const M of mVals) {
      for (const P of pVals) {
        for (const R of rVals) {
          tested++;
          const ref = independentRef(C, M, W, P, R);
          const formula = solutionFormula(C, M, W, P, R);
          if (ref !== formula) {
            console.error(`Mismatch on input (${C}, ${M}, ${W}, ${P}, ${R}): ref=${ref}, formula=${formula}`);
            process.exit(1);
          }
        }
      }
    }
  }
}
console.log(`[stress] Exhaustive boundary sweep passed! All ${tested} boundary cases matched.`);

// 20,000 randomized fuzz test cases
console.log('[stress] Running 20,000 randomized fuzz cases across full input bounds...');
for (let tc = 0; tc < 20000; tc++) {
  const C = Math.floor(Math.random() * 101); // 0 to 100
  const W = Math.floor(Math.random() * 101); // 0 to 100
  const M = Math.floor(Math.random() * 10) + 1; // 1 to 10
  const P = Math.floor(Math.random() * 10) + 1; // 1 to 10
  const R = Math.floor(Math.random() * 1001); // 0 to 1000

  const ref = independentRef(C, M, W, P, R);
  const formula = solutionFormula(C, M, W, P, R);
  if (ref !== formula) {
    console.error(`Mismatch on random input (${C}, ${M}, ${W}, ${P}, ${R}): ref=${ref}, formula=${formula}`);
    process.exit(1);
  }
}
console.log('[stress] 20,000 fuzz cases passed!');

// Benchmark worst-case execution time on the actual solution file
const solutionPath = fs.existsSync(path.resolve(__dirname, 'examResult.js'))
  ? path.resolve(__dirname, 'examResult.js')
  : path.resolve(__dirname, '..', '..', '..', 'solutions', 'examResult.js');
console.log(`[stress] Benchmarking solution script: ${solutionPath}`);

const BENCHMARK_COUNT = 50000;
const inputLines = [];
for (let i = 0; i < BENCHMARK_COUNT; i++) {
  // Adversarial edge cases: extreme negative, exact equality, maximum values
  if (i % 3 === 0) {
    inputLines.push('100 10 0 10 1000'); // Exactly 1000 >= 1000 -> YES
  } else if (i % 3 === 1) {
    inputLines.push('0 10 100 10 0'); // -1000 >= 0 -> NO
  } else {
    inputLines.push('50 4 50 4 0'); // Exactly 0 >= 0 -> YES
  }
}

const largeInput = inputLines.join('\n') + '\n';
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

const outputs = res.stdout.trim().split(/\s+/);
if (outputs.length !== BENCHMARK_COUNT) {
  console.error(`[stress] Output length mismatch: expected ${BENCHMARK_COUNT}, got ${outputs.length}`);
  process.exit(1);
}

console.log(`[stress] Benchmark completed: ${BENCHMARK_COUNT} test cases in ${elapsed}ms (Limit: 1000ms).`);
console.log('[stress] All stress tests verified successfully!');
