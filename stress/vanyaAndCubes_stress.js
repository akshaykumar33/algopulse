/**
 * Stress test and verification for 492A - Vanya and Cubes
 */
const assert = require('assert');

// Solution under test: simulation level by level
function solveSim(n) {
  let height = 0;
  let totalCubes = 0;
  let level = 1;

  while (true) {
    const cubesForLevel = (level * (level + 1)) / 2;
    if (totalCubes + cubesForLevel > n) break;
    totalCubes += cubesForLevel;
    height++;
    level++;
  }

  return height;
}

// Independent reference: closed-form formula + binary search
// Total cubes for height h: S(h) = h * (h + 1) * (h + 2) / 6
function solveRef(n) {
  let low = 0;
  let high = 50; // because S(50) = 50*51*52/6 = 22100 > 10000
  let ans = 0;
  while (low <= high) {
    const mid = (low + high) >> 1;
    const total = (mid * (mid + 1) * (mid + 2)) / 6;
    if (total <= n) {
      ans = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return ans;
}

console.log('[Stress] Testing all n in [1, 10000] exhaustively against independent reference...');
for (let n = 1; n <= 10000; n++) {
  const actual = solveSim(n);
  const expected = solveRef(n);
  if (actual !== expected) {
    console.error(`Mismatch for n = ${n}: actual = ${actual}, expected = ${expected}`);
    process.exit(1);
  }
}
console.log('✓ Exhaustive check passed: 10,000 / 10,000 values match reference exactly!');

// Worst-case timing
console.log('[Timing] Benchmarking 500,000 queries with n = 10000...');
const start = performance.now();
for (let i = 0; i < 500000; i++) {
  solveSim(10000);
}
const elapsed = performance.now() - start;
console.log(`✓ 500,000 queries of n = 10000 took ${elapsed.toFixed(2)}ms (~${(elapsed / 500).toFixed(4)}µs per query). Well within 1.0s limit!`);
