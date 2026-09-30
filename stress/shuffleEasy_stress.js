/**
 * Stress test suite for Shuffle (Easy)
 * Exhaustive permutation simulation oracle vs closed-form combinatorics
 */

const MOD = 998244353n;
const MAX_N = 200005;

const fact = new BigInt64Array(MAX_N + 1);
fact[0] = 1n;
for (let i = 1; i <= MAX_N; i++) {
  fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
}

function power(base, exp) {
  let res = 1n;
  let b = BigInt(base) % MOD;
  let e = BigInt(exp);
  while (e > 0n) {
    if (e & 1n) res = (res * b) % MOD;
    b = (b * b) % MOD;
    e >>= 1n;
  }
  return res;
}

function solveFast(n, k) {
  return Number((fact[k] * power(k, n - k)) % MOD);
}

function permute(arr) {
  if (arr.length <= 1) return [arr];
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = permute([...arr.slice(0, i), ...arr.slice(i + 1)]);
    for (const r of rest) res.push([arr[i], ...r]);
  }
  return res;
}

function simulateF(p, k) {
  const arr = [...p];
  const n = arr.length;
  for (let i = 0; i <= n - k; i++) {
    const sub = arr.slice(i, i + k).sort((a, b) => a - b);
    for (let j = 0; j < k; j++) arr[i + j] = sub[j];
  }
  return arr;
}

function oracle(n, k) {
  const perms = permute(Array.from({ length: n }, (_, i) => i + 1));
  let count = 0;
  for (const p of perms) {
    const res = simulateF(p, k);
    let ok = true;
    for (let i = 0; i < n; i++) {
      if (res[i] !== i + 1) {
        ok = false;
        break;
      }
    }
    if (ok) count++;
  }
  return count;
}

function runStress() {
  console.log('[Stress] Running exhaustive oracle test for 2 <= K <= N <= 7...');
  let totalPairs = 0;
  for (let n = 2; n <= 7; n++) {
    for (let k = 2; k <= n; k++) {
      totalPairs++;
      const exp = oracle(n, k);
      const act = solveFast(n, k);
      if (exp !== act) {
        console.error(`FAIL at N=${n}, K=${k}: expected ${exp}, got ${act}`);
        process.exit(1);
      }
    }
  }
  console.log(`[Stress] Passed ${totalPairs} exhaustive oracle tests (up to N=7, 7! = 5040 permutations each).`);

  console.log('[Stress] Running worst-case timing benchmark (T = 10,000 queries)...');
  const t0 = Date.now();
  let dummy = 0;
  for (let tc = 0; tc < 10000; tc++) {
    const n = 200000;
    const k = 100000;
    dummy = (dummy + solveFast(n, k)) % 998244353;
  }
  const elapsed = Date.now() - t0;
  console.log(`[Stress] 10,000 max-constraint queries finished in ${elapsed}ms. (dummy=${dummy})`);
  console.log('[Stress] All verification checks PASSED 100% GREEN!');
}

runStress();
