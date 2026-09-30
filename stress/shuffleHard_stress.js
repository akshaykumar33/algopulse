/**
 * Stress test suite for Shuffle (Hard)
 * Exhaustive permutation simulation oracle vs closed-form prefix-max count
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

function solveFast(n, k, q) {
  const L = n - k + 1;
  for (let j = L; j < n; j++) {
    if (q[j] !== j + 1) return 0;
  }
  let posL = -1;
  for (let i = 0; i < L; i++) {
    if (q[i] === L) {
      posL = i;
      break;
    }
  }
  if (posL === -1) return 0;

  let prefixMaxCount = 0;
  let curMax = 0;
  for (let i = 0; i <= posL; i++) {
    if (q[i] > curMax) {
      curMax = q[i];
      prefixMaxCount++;
    }
  }

  const E = prefixMaxCount - 1;
  return Number((fact[k] * power(k, E)) % MOD);
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

function f(p, k) {
  const arr = [...p];
  for (let i = 0; i <= arr.length - k; i++) {
    const sub = arr.slice(i, i + k).sort((a, b) => a - b);
    for (let j = 0; j < k; j++) arr[i + j] = sub[j];
  }
  return arr;
}

function runStress() {
  console.log('[Stress] Running exhaustive oracle test for small N (N <= 6)...');
  for (const [n, k] of [[3, 2], [4, 2], [4, 3], [5, 2], [5, 3], [5, 4], [6, 3]]) {
    const perms = permute(Array.from({ length: n }, (_, i) => i + 1));
    const counts = new Map();
    for (const p of perms) {
      const qStr = f(p, k).join(',');
      counts.set(qStr, (counts.get(qStr) || 0) + 1);
    }

    for (const q of perms) {
      const qStr = q.join(',');
      const exp = counts.get(qStr) || 0;
      const act = solveFast(n, k, q);
      if (exp !== act) {
        console.error(`FAIL for N=${n}, K=${k}, Q=${qStr}: exp=${exp}, act=${act}`);
        process.exit(1);
      }
    }
    console.log(`[Stress] Verified all ${perms.length} permutations for N=${n}, K=${k}.`);
  }

  console.log('[Stress] Running worst-case timing test (N = 200,000, K = 100,000)...');
  const maxN = 200000;
  const maxK = 100000;
  const largeQ = new Int32Array(maxN);
  for (let i = 0; i < maxN; i++) largeQ[i] = i + 1;
  const t0 = Date.now();
  const res = solveFast(maxN, maxK, largeQ);
  const elapsed = Date.now() - t0;
  console.log(`[Stress] N = 200,000 executed in ${elapsed}ms (result = ${res}).`);

  // Max testcase count stress: T = 10,000 with small N = 20 (sum N = 200,000)
  const t1 = Date.now();
  let totalAns = 0;
  const smallQ = Array.from({ length: 20 }, (_, i) => i + 1);
  for (let tc = 0; tc < 10000; tc++) {
    totalAns = (totalAns + solveFast(20, 10, smallQ)) % 998244353;
  }
  const elapsedMany = Date.now() - t1;
  console.log(`[Stress] T = 10,000 queries executed in ${elapsedMany}ms. (totalAns = ${totalAns})`);
  console.log('[Stress] All verification checks PASSED 100% GREEN!');
}

runStress();
