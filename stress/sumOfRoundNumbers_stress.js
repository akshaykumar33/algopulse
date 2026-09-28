/**
 * Stress test and property validator for 1352A - Sum of Round Numbers
 */
const assert = require('assert');

function solveOne(n) {
  const ans = [];
  let place = 1;
  while (n > 0) {
    const digit = n % 10;
    if (digit !== 0) {
      ans.push(digit * place);
    }
    n = Math.floor(n / 10);
    place *= 10;
  }
  return ans;
}

function isRound(x) {
  if (x <= 0) return false;
  const s = String(x);
  if (s[0] === '0') return false;
  for (let i = 1; i < s.length; i++) {
    if (s[i] !== '0') return false;
  }
  return true;
}

function minSummandsRequired(n) {
  let count = 0;
  while (n > 0) {
    if (n % 10 !== 0) count++;
    n = Math.floor(n / 10);
  }
  return count;
}

console.log('[Stress] Validating mathematical properties for ALL n in [1, 10000]...');
for (let n = 1; n <= 10000; n++) {
  const terms = solveOne(n);
  
  // Property 1: Optimal length
  const expectedLen = minSummandsRequired(n);
  assert.strictEqual(terms.length, expectedLen, `Length mismatch for ${n}`);

  // Property 2: Every term is strictly round
  for (const term of terms) {
    assert(isRound(term), `Term ${term} is not a round number for n=${n}`);
  }

  // Property 3: Sum of terms strictly equals n
  const sum = terms.reduce((acc, v) => acc + v, 0);
  assert.strictEqual(sum, n, `Sum of terms ${sum} != ${n}`);
}
console.log('✓ All 10,000 numbers verified against mathematical roundness and optimality!');

// Worst-case timing: T = 10^4, all n = 9999 (maximum digits and non-zero addends)
console.log('[Timing] Benchmarking max testcase count T = 10,000 with adversarial inputs (n = 9999)...');
const start = performance.now();
for (let t = 0; t < 10000; t++) {
  solveOne(9999);
}
const elapsed = performance.now() - start;
console.log(`✓ 10,000 test cases took ${elapsed.toFixed(2)}ms (~${(elapsed / 10).toFixed(4)}µs per testcase). Well within 1.0s limit!`);
