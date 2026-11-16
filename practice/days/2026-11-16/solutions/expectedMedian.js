const fs = require('fs');

const MOD = 1000000007n;
const MAX = 200005;
const fact = new BigInt64Array(MAX);
const invFact = new BigInt64Array(MAX);

function modPow(base, exp) {
  let res = 1n;
  base = base % MOD;
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % MOD;
    base = (base * base) % MOD;
    exp >>= 1n;
  }
  return res;
}

fact[0] = 1n;
invFact[0] = 1n;
for (let i = 1; i < MAX; i++) {
  fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
}
invFact[MAX - 1] = modPow(fact[MAX - 1], MOD - 2n);
for (let i = MAX - 2; i >= 1; i--) {
  invFact[i] = (invFact[i + 1] * BigInt(i + 1)) % MOD;
}

function nCr(n, r) {
  if (r < 0 || r > n) return 0n;
  return (fact[n] * invFact[r] % MOD) * invFact[n - r] % MOD;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    let c1 = 0;
    for (let i = 0; i < n; i++) {
      if (parseInt(input[ptr++], 10) === 1) c1++;
    }
    const c0 = n - c1;
    const minOnes = Math.floor(k / 2) + 1;
    let ans = 0n;

    for (let ones = minOnes; ones <= Math.min(c1, k); ones++) {
      const zeros = k - ones;
      if (zeros <= c0 && zeros >= 0) {
        const ways = (nCr(c1, ones) * nCr(c0, zeros)) % MOD;
        ans = (ans + ways) % MOD;
      }
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
