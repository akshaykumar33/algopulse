/**
 * Problem: Shuffle (Easy)
 * Platform: CodeChef
 * Language: JavaScript (Node.js)
 * Complexity: O(1) per test case after O(MAX_N) precomputation
 */

const fs = require('fs');

const MOD = 998244353n;
const MAX_N = 200005;

// Precompute factorials modulo 998244353
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
    if (e & 1n) {
      res = (res * b) % MOD;
    }
    b = (b * b) % MOD;
    e >>= 1n;
  }
  return res;
}

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function nextInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let res = 0;
    while (offset < buffer.length && buffer[offset] >= 48 && buffer[offset] <= 57) {
      res = res * 10 + (buffer[offset] - 48);
      offset++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    if (n === null) break;
    const k = nextInt();

    // Consume the Q permutation (Q_1 ... Q_N)
    for (let i = 0; i < n; i++) {
      nextInt();
    }

    // Formula: K! * K^(N - K) mod 998244353
    const ways = (fact[k] * power(k, n - k)) % MOD;
    out.push(ways.toString());
  }

  console.log(out.join('\n'));
}

solve();
