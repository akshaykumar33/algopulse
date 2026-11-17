const MOD = 1000000007n;
const MAX = 10005;
const fact = new Array(MAX);
const invFact = new Array(MAX);
fact[0] = 1n;
for (let i = 1; i < MAX; i++) {
  fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
}

function power(base, exp) {
  let res = 1n;
  base = base % MOD;
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % MOD;
    base = (base * base) % MOD;
    exp >>= 1n;
  }
  return res;
}

invFact[MAX - 1] = power(fact[MAX - 1], MOD - 2n);
for (let i = MAX - 2; i >= 0; i--) {
  invFact[i] = (invFact[i + 1] * BigInt(i + 1)) % MOD;
}

function nCr(n, r) {
  if (r < 0 || r > n || n < 0 || n >= MAX) return 0n;
  return (fact[n] * invFact[r] % MOD) * invFact[n - r] % MOD;
}

class Solution {
  compute(n, k) {
    if (k <= 0 || k >= 2 * n - 2 || n < 2) return 0;
    const nMinus2 = n - 2;
    let ans = 0n;
    if (k % 2 === 0) {
      const m = Math.floor(k / 2);
      const c1 = nCr(nMinus2, m);
      const c2 = nCr(nMinus2, m - 1);
      ans = (2n * c1 % MOD) * c2 % MOD;
    } else {
      const m = Math.floor((k + 1) / 2);
      const c = nCr(nMinus2, m - 1);
      ans = (2n * c % MOD) * c % MOD;
    }
    return Number(ans);
  }
}

if (require.main === module) {
  const fs = require('fs');
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (input) {
    const tokens = input.split(/\s+/).map(Number);
    if (tokens.length > 0) {
      const sol = new Solution();
      let idx = 0;
      if (tokens.length % 2 === 1) {
        const T = tokens[idx++];
        for (let t = 0; t < T; t++) {
          if (idx + 1 < tokens.length) {
            console.log(sol.compute(tokens[idx], tokens[idx + 1]));
            idx += 2;
          }
        }
      } else {
        while (idx + 1 < tokens.length) {
          if (tokens[idx] === 0 && tokens[idx + 1] === 0) break;
          console.log(sol.compute(tokens[idx], tokens[idx + 1]));
          idx += 2;
        }
      }
    }
  }
}
