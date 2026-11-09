const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);

  const pref = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
  for (let i = 1; i <= n; i++) {
    const row = input[1 + i];
    for (let j = 1; j <= m; j++) {
      pref[i][j] = (row.charCodeAt(j - 1) - 48) + pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1];
    }
  }

  const maxDim = Math.max(n, m);
  const isPrime = new Uint8Array(maxDim + 1);
  isPrime.fill(1);
  isPrime[0] = 0;
  isPrime[1] = 0;
  const primes = [];
  for (let i = 2; i <= maxDim; i++) {
    if (isPrime[i]) {
      primes.push(i);
      for (let j = i * 2; j <= maxDim; j += i) {
        isPrime[j] = 0;
      }
    }
  }

  let ans = 1000000000;
  for (let pi = 0; pi < primes.length; pi++) {
    const p = primes[pi];
    const p2 = p * p;
    let cur = 0;
    for (let r = 1; r <= n; r += p) {
      const r2 = Math.min(n, r + p - 1);
      for (let c = 1; c <= m; c += p) {
        const c2 = Math.min(m, c + p - 1);
        const ones = pref[r2][c2] - pref[r - 1][c2] - pref[r2][c - 1] + pref[r - 1][c - 1];
        cur += Math.min(ones, p2 - ones);
      }
    }
    if (cur < ans) ans = cur;
  }

  console.log(ans);
}

solve();
