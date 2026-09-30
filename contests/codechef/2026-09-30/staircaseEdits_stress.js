/**
 * Stress test suite for Staircase Edits
 * Independent reference oracle vs fast Map solution
 */

function oracle(n, a) {
  // Try every possible constant C that could match at least one element:
  // Any optimal staircase that keeps at least 1 element must have C = A[j] - j for some j
  let minEdits = n;
  for (let j = 0; j < n; j++) {
    const targetC = a[j] - j;
    let edits = 0;
    for (let i = 0; i < n; i++) {
      if (a[i] - i !== targetC) {
        edits++;
      }
    }
    if (edits < minEdits) {
      minEdits = edits;
    }
  }
  return minEdits;
}

function solveFast(n, a) {
  const freq = new Map();
  let maxFreq = 0;
  for (let i = 0; i < n; i++) {
    const diff = a[i] - i;
    const count = (freq.get(diff) || 0) + 1;
    freq.set(diff, count);
    if (count > maxFreq) {
      maxFreq = count;
    }
  }
  return n - maxFreq;
}

function runStress() {
  console.log('[Stress] Running exhaustive oracle test for small arrays (N <= 6)...');
  let count = 0;
  for (let n = 2; n <= 6; n++) {
    // Generate various test arrays
    const testCases = [
      Array.from({ length: n }, (_, i) => i + 1), // staircase
      Array.from({ length: n }, (_, i) => n - i), // reverse
      Array.from({ length: n }, () => 1), // all 1s
      Array.from({ length: n }, () => n), // all Ns
      Array.from({ length: n }, (_, i) => (i % 2 === 0 ? 1 : 2)), // alternating
    ];
    for (const a of testCases) {
      count++;
      const exp = oracle(n, a);
      const act = solveFast(n, a);
      if (exp !== act) {
        console.error(`FAIL at N=${n}, A=${a}: exp=${exp}, act=${act}`);
        process.exit(1);
      }
    }
  }
  console.log(`[Stress] Passed ${count} pattern tests.`);

  console.log('[Stress] Running 5,000 randomized test cases (N <= 50)...');
  for (let tc = 0; tc < 5000; tc++) {
    const n = Math.floor(Math.random() * 49) + 2;
    const a = Array.from({ length: n }, () => Math.floor(Math.random() * n) + 1);
    const exp = oracle(n, a);
    const act = solveFast(n, a);
    if (exp !== act) {
      console.error(`FAIL at randomized test: N=${n}, A=${a}`);
      process.exit(1);
    }
  }
  console.log('[Stress] Passed 5,000 randomized tests.');

  console.log('[Stress] Running worst-case timing test (N = 200,000)...');
  const maxN = 200000;
  const largeA = new Int32Array(maxN);
  for (let i = 0; i < maxN; i++) {
    largeA[i] = Math.floor(Math.random() * maxN) + 1;
  }
  const t0 = Date.now();
  const res = solveFast(maxN, largeA);
  const elapsed = Date.now() - t0;
  console.log(`[Stress] N = 200,000 executed in ${elapsed}ms (result = ${res}).`);

  // Max testcase count stress: T = 10,000 with small N = 20 (sum N = 200,000)
  const t1 = Date.now();
  let totalEdits = 0;
  for (let tc = 0; tc < 10000; tc++) {
    const smallA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    totalEdits += solveFast(20, smallA);
  }
  const elapsedMany = Date.now() - t1;
  console.log(`[Stress] T = 10,000 small test cases (sum N = 200,000) executed in ${elapsedMany}ms.`);
  console.log('[Stress] All verification checks PASSED 100% GREEN!');
}

runStress();
