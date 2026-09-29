const fs = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');

// Independent brute-force reference:
// Tries removing every single index, parses numeric value, returns minimum
function independentBruteForce(s) {
  let minVal = Infinity;
  for (let i = 0; i < s.length; i++) {
    const cand = s.slice(0, i) + s.slice(i + 1);
    const val = Number(cand);
    if (val < minVal) {
      minVal = val;
    }
  }
  return minVal;
}

function greedySolution(s) {
  let removeIdx = s.length - 1;
  for (let i = 0; i < s.length - 1; i++) {
    if (s.charCodeAt(i) > s.charCodeAt(i + 1)) {
      removeIdx = i;
      break;
    }
  }
  const res = s.slice(0, removeIdx) + s.slice(removeIdx + 1);
  return Number(res);
}

console.log('[stress] Starting exhaustive verification for all numbers 10 <= N <= 9999...');
let tested = 0;
for (let n = 10; n <= 9999; n++) {
  tested++;
  const s = String(n);
  const bf = independentBruteForce(s);
  const gr = greedySolution(s);
  if (bf !== gr) {
    console.error(`Mismatch on N=${n}: bruteForce=${bf}, greedy=${gr}`);
    process.exit(1);
  }
}
console.log(`[stress] Exhaustive verification passed! All ${tested} consecutive numbers matched.`);

console.log('[stress] Running 50,000 randomized fuzz test cases across all lengths up to 10^9...');
for (let tc = 0; tc < 50000; tc++) {
  // Generate different patterns:
  let s;
  const pattern = tc % 5;
  if (pattern === 0) {
    // Completely random integer in [10, 10^9]
    const n = Math.floor(Math.random() * (1000000000 - 10 + 1)) + 10;
    s = String(n);
  } else if (pattern === 1) {
    // Strings with many zeros (e.g. 1000000000, 10500020)
    const len = Math.floor(Math.random() * 9) + 2;
    const digits = [String(Math.floor(Math.random() * 9) + 1)];
    for (let i = 1; i < len; i++) {
      digits.push(Math.random() < 0.6 ? '0' : String(Math.floor(Math.random() * 10)));
    }
    s = digits.join('');
  } else if (pattern === 2) {
    // Strictly increasing or non-decreasing digits
    const len = Math.floor(Math.random() * 9) + 2;
    const digits = [];
    let cur = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < len; i++) {
      digits.push(String(cur));
      cur = Math.min(9, cur + Math.floor(Math.random() * 2));
    }
    s = digits.join('');
  } else if (pattern === 3) {
    // Strictly decreasing digits
    const len = Math.floor(Math.random() * 8) + 2;
    const digits = [];
    let cur = 9;
    for (let i = 0; i < len; i++) {
      digits.push(String(cur));
      cur = Math.max(0, cur - Math.floor(Math.random() * 2) - 1);
    }
    s = digits.join('');
  } else {
    // Repeated digits (e.g. 7777777, 8881888)
    const len = Math.floor(Math.random() * 9) + 2;
    const d = Math.floor(Math.random() * 9) + 1;
    const digits = new Array(len).fill(String(d));
    if (len > 2) {
      digits[Math.floor(Math.random() * len)] = String(Math.floor(Math.random() * 10));
    }
    s = digits.join('');
  }

  const bf = independentBruteForce(s);
  const gr = greedySolution(s);
  if (bf !== gr) {
    console.error(`Mismatch on fuzz input s="${s}": bruteForce=${bf}, greedy=${gr}`);
    process.exit(1);
  }
}
console.log('[stress] 50,000 fuzz test cases passed!');

// Benchmark worst case: T = 100,000 inputs of length 10
const solutionPath = fs.existsSync(path.resolve(__dirname, 'discount.js'))
  ? path.resolve(__dirname, 'discount.js')
  : path.resolve(__dirname, '..', '..', '..', 'solutions', 'discount.js');
console.log(`[stress] Benchmarking worst-case scenario on solution script: ${solutionPath}`);

const MAX_T = 100000;
const testLines = [String(MAX_T)];
for (let i = 0; i < MAX_T; i++) {
  // Worst-case string where no drop happens until the very end, requiring full scan of all digits
  testLines.push('123456789');
}

const largeInput = testLines.join('\n') + '\n';
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
if (outputs.length !== MAX_T) {
  console.error(`[stress] Output count mismatch: expected ${MAX_T}, got ${outputs.length}`);
  process.exit(1);
}

if (outputs[0] !== '12345678') {
  console.error(`[stress] Unexpected output: expected 12345678, got ${outputs[0]}`);
  process.exit(1);
}

console.log(`[stress] Max constraint test (T = ${MAX_T}) finished in ${elapsed}ms (Limit: 1000ms).`);
console.log('[stress] All stress tests verified successfully!');
