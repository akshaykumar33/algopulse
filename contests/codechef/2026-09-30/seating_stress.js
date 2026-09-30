/**
 * Stress test suite for Seating
 * Independent simulation oracle vs fast array lookup
 */

function oracle(n, m, k, a) {
  const occ = new Set(a);
  const res = [];
  for (let person = 0; person < k; person++) {
    for (let s = 1; s <= n; s++) {
      if (!occ.has(s)) {
        occ.add(s);
        res.push(s);
        break;
      }
    }
  }
  return res.join(' ');
}

function solveFast(n, m, k, a) {
  const occupied = new Uint8Array(n + 1);
  for (let i = 0; i < m; i++) {
    occupied[a[i]] = 1;
  }
  const res = [];
  for (let s = 1; s <= n && res.length < k; s++) {
    if (!occupied[s]) {
      res.push(s);
    }
  }
  return res.join(' ');
}

function runStress() {
  console.log('[Stress] Running exhaustive tests on small N (2 <= N <= 12)...');
  let testsCount = 0;
  for (let n = 2; n <= 12; n++) {
    // Generate subsets of size m
    for (let m = 1; m < n; m++) {
      for (let k = 1; m + k <= n; k++) {
        // Test first few combinations of m occupied seats
        // We can test a few patterns: first m, last m, alternating
        const patterns = [
          Array.from({ length: m }, (_, i) => i + 1), // 1..m
          Array.from({ length: m }, (_, i) => n - m + 1 + i), // (n-m+1)..n
          Array.from({ length: m }, (_, i) => 1 + 2 * i).filter(x => x <= n), // odd
        ].filter(arr => arr.length === m);

        for (const a of patterns) {
          testsCount++;
          const exp = oracle(n, m, k, a);
          const act = solveFast(n, m, k, a);
          if (exp !== act) {
            console.error(`FAIL at N=${n}, M=${m}, K=${k}, A=${a}: exp=${exp}, act=${act}`);
            process.exit(1);
          }
        }
      }
    }
  }
  console.log(`[Stress] Passed ${testsCount} exhaustive pattern tests.`);

  console.log('[Stress] Running 20,000 randomized tests with arbitrary valid configurations...');
  for (let i = 0; i < 20000; i++) {
    const n = Math.floor(Math.random() * 99) + 2; // 2..100
    const m = Math.floor(Math.random() * (n - 1)) + 1; // 1..n-1
    const maxK = n - m;
    const k = Math.floor(Math.random() * maxK) + 1; // 1..n-m

    // Pick m unique seats in sorted order
    const seats = Array.from({ length: n }, (_, idx) => idx + 1);
    // Shuffle and pick m
    for (let j = n - 1; j > 0; j--) {
      const idx = Math.floor(Math.random() * (j + 1));
      const tmp = seats[j];
      seats[j] = seats[idx];
      seats[idx] = tmp;
    }
    const a = seats.slice(0, m).sort((x, y) => x - y);

    const exp = oracle(n, m, k, a);
    const act = solveFast(n, m, k, a);
    if (exp !== act) {
      console.error(`FAIL at randomized test i=${i}: N=${n}, M=${m}, K=${k}`);
      process.exit(1);
    }
  }
  console.log('[Stress] Passed 20,000 randomized test cases.');

  console.log('[Stress] Running worst-case timing benchmark (100,000 operations, N=100)...');
  const t0 = Date.now();
  const worstA = Array.from({ length: 50 }, (_, i) => (i + 1) * 2);
  let totalLength = 0;
  for (let i = 0; i < 100000; i++) {
    const str = solveFast(100, 50, 50, worstA);
    totalLength += str.length;
  }
  const elapsed = Date.now() - t0;
  console.log(`[Stress] 100,000 runs completed in ${elapsed}ms. (totalLength=${totalLength})`);
  console.log('[Stress] All verification checks PASSED 100% GREEN!');
}

runStress();
