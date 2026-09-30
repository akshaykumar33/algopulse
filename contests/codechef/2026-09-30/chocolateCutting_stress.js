/**
 * Stress test suite for Chocolate Cutting
 * Exhaustive simulation oracle vs parity check
 */

function oracle(n, m) {
  // Try all possible cuts parallel to sides along grid lines
  // 1. Horizontal cuts: dividing into y x m and (n - y) x m
  for (let y = 1; y < n; y++) {
    const p1 = y * m;
    const p2 = (n - y) * m;
    if (p1 === p2) return 'Yes';
  }

  // 2. Vertical cuts: dividing into n x x and n x (m - x)
  for (let x = 1; x < m; x++) {
    const p1 = n * x;
    const p2 = n * (m - x);
    if (p1 === p2) return 'Yes';
  }

  return 'No';
}

function solveFast(n, m) {
  return (n % 2 === 0 || m % 2 === 0) ? 'Yes' : 'No';
}

function runStress() {
  console.log('[Stress] Running exhaustive oracle test for 1 <= N, M <= 100...');
  let totalTests = 0;
  for (let n = 1; n <= 100; n++) {
    for (let m = 1; m <= 100; m++) {
      totalTests++;
      const exp = oracle(n, m);
      const act = solveFast(n, m);
      if (exp !== act) {
        console.error(`FAIL at N=${n}, M=${m}: expected ${exp}, got ${act}`);
        process.exit(1);
      }
    }
  }
  console.log(`[Stress] Passed ${totalTests} exhaustive cases (1 <= N, M <= 100).`);

  console.log('[Stress] Running randomized large tests (values up to 10^9)...');
  const RANDOM_CASES = 50000;
  for (let i = 0; i < RANDOM_CASES; i++) {
    const n = Math.floor(Math.random() * 1e9) + 1;
    const m = Math.floor(Math.random() * 1e9) + 1;
    const act = solveFast(n, m);
    const exp = ((BigInt(n) * BigInt(m)) % 2n === 0n) ? 'Yes' : 'No';
    if (act !== exp) {
      console.error(`FAIL at N=${n}, M=${m}`);
      process.exit(1);
    }
  }
  console.log(`[Stress] Passed ${RANDOM_CASES} random large tests.`);

  console.log('[Stress] Running worst-case timing benchmark (200,000 queries)...');
  const t0 = Date.now();
  let yesCount = 0;
  for (let i = 0; i < 200000; i++) {
    if (solveFast(999999999, 1000000000) === 'Yes') {
      yesCount++;
    }
  }
  const elapsed = Date.now() - t0;
  console.log(`[Stress] 200,000 queries finished in ${elapsed}ms. (yesCount=${yesCount})`);
  console.log('[Stress] All verification checks PASSED 100% GREEN!');
}

runStress();
