const fs = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');

// Independent reference: Greedy step-by-step simulation (decrementing max frequency one by one)
function independentStepSimulation(S, K) {
  if (!S || S.length === 0 || K >= S.length) return 0;
  const counts = new Array(26).fill(0);
  for (let i = 0; i < S.length; i++) {
    counts[S.charCodeAt(i) - 97]++;
  }
  for (let step = 0; step < K; step++) {
    let maxIdx = 0;
    for (let i = 1; i < 26; i++) {
      if (counts[i] > counts[maxIdx]) {
        maxIdx = i;
      }
    }
    if (counts[maxIdx] > 0) {
      counts[maxIdx]--;
    }
  }
  let weight = 0;
  for (let i = 0; i < 26; i++) {
    weight += counts[i] * counts[i];
  }
  return weight;
}

// Binary search solution method
function binarySearchSolution(S, K) {
  if (!S || S.length === 0 || K >= S.length) return 0;
  if (K <= 0) {
    const counts = new Int32Array(26);
    for (let i = 0; i < S.length; i++) counts[S.charCodeAt(i) - 97]++;
    let weight = 0;
    for (let i = 0; i < 26; i++) weight += counts[i] * counts[i];
    return weight;
  }

  const counts = new Int32Array(26);
  let maxF = 0;
  for (let i = 0; i < S.length; i++) {
    const code = S.charCodeAt(i) - 97;
    counts[code]++;
    if (counts[code] > maxF) maxF = counts[code];
  }

  let low = 0;
  let high = maxF;
  let bestC = maxF;

  while (low <= high) {
    const mid = (low + high) >> 1;
    let removed = 0;
    for (let i = 0; i < 26; i++) {
      if (counts[i] > mid) removed += counts[i] - mid;
    }
    if (removed <= K) {
      bestC = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  let removalsUsed = 0;
  for (let i = 0; i < 26; i++) {
    if (counts[i] > bestC) {
      removalsUsed += counts[i] - bestC;
      counts[i] = bestC;
    }
  }

  let remainingRemovals = K - removalsUsed;
  if (remainingRemovals > 0 && bestC > 0) {
    for (let i = 0; i < 26 && remainingRemovals > 0; i++) {
      if (counts[i] === bestC) {
        counts[i]--;
        remainingRemovals--;
      }
    }
  }

  let totalWeight = 0;
  for (let i = 0; i < 26; i++) {
    totalWeight += counts[i] * counts[i];
  }
  return totalWeight;
}

console.log('[stress] Testing edge-case configurations...');

const edgeCases = [
  // Empty
  { s: '', k: 0, exp: 0 },
  // All removed
  { s: 'abcde', k: 5, exp: 0 },
  // None removed
  { s: 'abcde', k: 0, exp: 5 },
  // All same
  { s: 'aaaaa', k: 2, exp: 9 }, // 3^2 = 9
  // Single char
  { s: 'a', k: 0, exp: 1 },
  { s: 'a', k: 1, exp: 0 },
  // Remove all but 1
  { s: 'abbcccdddd', k: 9, exp: 1 },
  // Equal frequencies
  { s: 'aabbcc', k: 3, exp: 3 }, // frequencies 1, 1, 1 -> 3
];

for (const tc of edgeCases) {
  const sim = independentStepSimulation(tc.s, tc.k);
  const bs = binarySearchSolution(tc.s, tc.k);
  if (sim !== tc.exp || bs !== tc.exp) {
    console.error('[stress] Edge case failed:', tc, 'sim =', sim, 'bs =', bs);
    process.exit(1);
  }
}
console.log(`[stress] All ${edgeCases.length} edge cases passed!`);

console.log('[stress] Running 5,000 randomized fuzz test cases...');
for (let tc = 0; tc < 5000; tc++) {
  const len = Math.floor(Math.random() * 200) + 1;
  const alphabetSize = Math.floor(Math.random() * 26) + 1;
  const chars = [];
  for (let i = 0; i < len; i++) {
    chars.push(String.fromCharCode(97 + Math.floor(Math.random() * alphabetSize)));
  }
  const s = chars.join('');
  const k = Math.floor(Math.random() * (len + 1));

  const sim = independentStepSimulation(s, k);
  const bs = binarySearchSolution(s, k);
  if (sim !== bs) {
    console.error(`[stress] Fuzz mismatch on string length ${len}, k=${k}: sim=${sim}, bs=${bs}`);
    process.exit(1);
  }
}
console.log('[stress] 5,000 randomized fuzz cases passed!');

// Benchmark worst-case scenario: |S| = 50,000, K = 25,000
const solutionPath = fs.existsSync(path.resolve(__dirname, 'minimumStringWeight.js'))
  ? path.resolve(__dirname, 'minimumStringWeight.js')
  : path.resolve(__dirname, '..', '..', '..', 'solutions', 'minimumStringWeight.js');
console.log(`[stress] Benchmarking worst-case scenario (|S| = 50,000) on: ${solutionPath}`);

const MAX_LEN = 50000;
const K_VAL = 25000;
const largeChars = new Array(MAX_LEN);
for (let i = 0; i < MAX_LEN; i++) {
  largeChars[i] = String.fromCharCode(97 + (i % 26));
}
const largeString = largeChars.join('');
const largeInput = `${largeString}\n${K_VAL}\n`;

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

const expectedAns = binarySearchSolution(largeString, K_VAL);
const actualAns = parseInt(res.stdout.trim(), 10);

if (actualAns !== expectedAns) {
  console.error(`[stress] Output mismatch on worst case: expected ${expectedAns}, got ${actualAns}`);
  process.exit(1);
}

console.log(`[stress] Max constraint test (|S| = ${MAX_LEN}, K = ${K_VAL}) finished in ${elapsed}ms (Limit: 1000ms).`);
console.log(`[stress] Computed minimum weight: ${actualAns}`);
console.log('[stress] All stress tests verified successfully!');
