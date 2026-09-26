const fs = require('fs');

const MOD = 1000000007;

// Independent naive O(n * submasks) DP oracle
function solveNaive(n, m, c) {
  const W = new Array(n + 1).fill(0);
  const C = new Array(n + 1).fill(0);

  const submasks = [];
  for (let x = 1; x <= m; x++) {
    if ((m & x) === x) submasks.push(x);
  }

  W[0] = 1;
  C[0] = 0;

  for (let i = 1; i <= n; i++) {
    let wSum = 0;
    let cSum = 0;
    for (const x of submasks) {
      if (i - x >= 0) {
        wSum = (wSum + W[i - x]) % MOD;
        cSum = (cSum + C[i - x] + Number((BigInt(W[i - x]) * BigInt(c[x - 1])) % BigInt(MOD))) % MOD;
      }
    }
    W[i] = wSum;
    C[i] = cSum;
  }

  return C[n];
}

// Fast O(k*n + m) solution
function solveFast(n, m, c) {
  const bits = [];
  for (let b = 0; b < 20; b++) {
    if ((m >> b) & 1) bits.push(1 << b);
  }
  const k = bits.length;
  const bitArr = new Int32Array(bits);

  const F = Array.from({ length: k + 1 }, () => new Int32Array(n + 1));
  const M = Array.from({ length: k + 1 }, () => new Int32Array(n + 1));

  F[0][0] = 1;
  M[0][0] = 1;
  for (let j = 1; j <= k; j++) {
    F[j][0] = 1;
    M[j][0] = 1;
  }

  for (let i = 1; i <= n; i++) {
    let w = 0;
    let u = 0;

    for (let j = 0; j < k; j++) {
      const prev = i - bitArr[j];
      if (prev >= 0) {
        w += F[j][prev];
        u += M[j][prev];
      }
    }
    w %= MOD;
    u = (u + w) % MOD;
    F[0][i] = w;
    M[0][i] = u;

    let fVal = w;
    let mVal = u;
    for (let j = 0; j < k; j++) {
      const prev = i - bitArr[j];
      if (prev >= 0) {
        fVal += F[j][prev];
        mVal += M[j][prev];
      }
      if (fVal >= MOD) fVal -= MOD;
      if (mVal >= MOD) mVal -= MOD;
      F[j + 1][i] = fVal;
      M[j + 1][i] = mVal;
    }
  }

  const U = M[0];
  let ans = 0;
  const limit = Math.min(n, m);
  for (let x = 1; x <= limit; x++) {
    if ((m & x) === x) {
      ans = (ans + Number((BigInt(c[x - 1]) * BigInt(U[n - x])) % BigInt(MOD))) % MOD;
    }
  }

  return ans;
}

console.log('=== Phase 1: Randomized Stress Fuzzing against Naive DP ===');
let passed = 0;
for (let trial = 0; trial < 500; trial++) {
  const n = Math.floor(Math.random() * 50) + 1;
  const m = Math.floor(Math.random() * 50) + 1;
  const c = [];
  for (let i = 0; i < m; i++) {
    c.push(Math.floor(Math.random() * 1000000) + 1);
  }

  const expected = solveNaive(n, m, c);
  const actual = solveFast(n, m, c);

  if (expected !== actual) {
    console.error(`MISMATCH on trial ${trial}: n=${n}, m=${m}: expected ${expected}, got ${actual}`);
    process.exit(1);
  }
  passed++;
}
console.log(`Passed all ${passed} randomized stress trials against Naive DP!`);

console.log('\n=== Phase 2: Moderate Scale Benchmark ===');
const nMed = 100000;
const mMed = 65535; // 16 bits
const cMed = new Int32Array(mMed);
for (let i = 0; i < mMed; i++) cMed[i] = i + 1;

const t0 = Date.now();
const resMed = solveFast(nMed, mMed, cMed);
const elapsedMed = Date.now() - t0;
console.log(`Executed N=${nMed}, m=${mMed} (16 bits) in ${elapsedMed}ms (ans=${resMed})`);
console.log('All stress tests successfully completed!');
