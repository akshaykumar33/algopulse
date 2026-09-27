const { spawnSync } = require('child_process');
const path = require('path');

function solveGreedy(a, b, c) {
  const arr = [a, b, c];
  for (let step = 0; step < 5; step++) {
    arr.sort((x, y) => x - y);
    arr[0]++;
  }
  return arr[0] * arr[1] * arr[2];
}

function solvePartition(a, b, c) {
  let maxProduct = 0;
  for (let i = 0; i <= 5; i++) {
    for (let j = 0; j <= 5 - i; j++) {
      const k = 5 - i - j;
      const prod = (a + i) * (b + j) * (c + k);
      if (prod > maxProduct) maxProduct = prod;
    }
  }
  return maxProduct;
}

console.log('[stress] Starting exhaustive input space verification (all 1,000 combinations of 1 <= a, b, c <= 10)...');

let tested = 0;
for (let a = 1; a <= 10; a++) {
  for (let b = 1; b <= 10; b++) {
    for (let c = 1; c <= 10; c++) {
      tested++;
      const ansPartition = solvePartition(a, b, c);
      const ansGreedy = solveGreedy(a, b, c);
      if (ansPartition !== ansGreedy) {
        console.error(`Mismatch on input (${a}, ${b}, ${c}): partition=${ansPartition}, greedy=${ansGreedy}`);
        process.exit(1);
      }
    }
  }
}
console.log(`[stress] Exhaustive verification passed! All ${tested} states matched.`);

// Fuzz test with additional randomized cases
console.log('[stress] Running 10,000 randomized fuzz test cases...');
for (let tc = 0; tc < 10000; tc++) {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const c = Math.floor(Math.random() * 10) + 1;
  const ansPartition = solvePartition(a, b, c);
  const ansGreedy = solveGreedy(a, b, c);
  if (ansPartition !== ansGreedy) {
    console.error(`Mismatch on fuzz input (${a}, ${b}, ${c})`);
    process.exit(1);
  }
}
console.log('[stress] 10,000 fuzz cases passed!');

// Worst case benchmark on solution file
const solutionPath = path.resolve(__dirname, '..', 'onlyPluses.js');
console.log(`[stress] Benchmarking solution script: ${solutionPath}`);

const maxT = 1000;
const lines = [String(maxT)];
for (let i = 0; i < maxT; i++) {
  lines.push('10 10 10');
}
const maxInput = lines.join('\n') + '\n';

const start = Date.now();
const res = spawnSync('node', [solutionPath], {
  input: maxInput,
  encoding: 'utf-8',
});
const elapsed = Date.now() - start;

if (res.status !== 0) {
  console.error(`[stress] Solution execution failed:`, res.stderr);
  process.exit(1);
}

const outputs = res.stdout.trim().split(/\s+/).map(Number);
if (outputs.length !== maxT || outputs[0] !== 12 * 12 * 11) {
  console.error(`[stress] Unexpected output: expected ${12 * 12 * 11}, got ${outputs[0]}`);
  process.exit(1);
}

console.log(`[stress] Max constraint test (t=${maxT}, a=b=c=10): finished in ${elapsed}ms (Limit: 1000ms).`);
console.log('[stress] All stress tests verified successfully!');
