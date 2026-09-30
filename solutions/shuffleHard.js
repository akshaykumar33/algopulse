/**
 * Problem: Shuffle (Hard)
 * Platform: CodeChef
 * Language: JavaScript (Node.js)
 * Complexity: O(N) per testcase, O(sum N) total
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

    const q = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      q[i] = nextInt();
    }

    const L = n - k + 1;

    // 1. Suffix check: Q[L ... N - 1] must equal [L + 1, L + 2, ..., N]
    let possible = true;
    for (let j = L; j < n; j++) {
      if (q[j] !== j + 1) {
        possible = false;
        break;
      }
    }

    if (!possible) {
      out.push('0');
      continue;
    }

    // 2. Find position of value L in Q (must be in 0 ... L - 1)
    let posL = -1;
    for (let i = 0; i < L; i++) {
      if (q[i] === L) {
        posL = i;
        break;
      }
    }

    if (posL === -1) {
      out.push('0');
      continue;
    }

    // 3. Count prefix maximums up to posL
    let prefixMaxCount = 0;
    let curMax = 0;
    for (let i = 0; i <= posL; i++) {
      if (q[i] > curMax) {
        curMax = q[i];
        prefixMaxCount++;
      }
    }

    const E = prefixMaxCount - 1;
    const ways = (fact[k] * power(k, E)) % MOD;
    out.push(ways.toString());
  }

  console.log(out.join('\n'));
}

solve();
