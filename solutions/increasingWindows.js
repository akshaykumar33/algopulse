const fs = require('fs');
const MOD = 998244353n;
const MAX = 200005;

function power(base, exp) {
  let res = 1n;
  base = base % MOD;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * base) % MOD;
    base = (base * base) % MOD;
    exp /= 2n;
  }
  return res;
}

function modInverse(n) {
  return power(n, MOD - 2n);
}

const fact = new Array(MAX);
const invFact = new Array(MAX);
fact[0] = 1n;
invFact[0] = 1n;
for (let i = 1; i < MAX; i++) fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
invFact[MAX - 1] = modInverse(fact[MAX - 1]);
for (let i = MAX - 2; i >= 1; i--) invFact[i] = (invFact[i + 1] * BigInt(i + 1)) % MOD;

function nCr(n, r) {
  if (r < 0 || r > n) return 0n;
  return (((fact[n] * invFact[r]) % MOD) * invFact[n - r]) % MOD;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const req = n - k;
    let total = 0n;
    for (let b1 = 1; b1 <= n; b1++) {
      const waysA = (power(BigInt(b1), BigInt(k)) - power(BigInt(b1 - 1), BigInt(k)) + MOD) % MOD;
      const waysRest = nCr(n - b1, req);
      total = (total + waysA * waysRest) % MOD;
    }
    out.push(total.toString());
  }
  console.log(out.join('\n'));
}
solve();