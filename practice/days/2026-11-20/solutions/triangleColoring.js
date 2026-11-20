const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const MOD = 998244353n;

  const numTriangles = n / 3;
  let ans = 1n;

  for (let i = 0; i < numTriangles; i++) {
    const w = [
      parseInt(input[ptr++], 10),
      parseInt(input[ptr++], 10),
      parseInt(input[ptr++], 10)
    ];
    w.sort((a, b) => a - b);
    let ways = 1n;
    if (w[0] === w[1] && w[1] === w[2]) {
      ways = 3n;
    } else if (w[0] === w[1]) {
      ways = 2n;
    }
    ans = (ans * ways) % MOD;
  }

  function modInverse(a, m) {
    let m0 = m;
    let y = 0n, x = 1n;
    while (a > 1n) {
      const q = a / m;
      let t = m;
      m = a % m;
      a = t;
      t = y;
      y = x - q * y;
      x = t;
    }
    if (x < 0n) x += m0;
    return x;
  }

  const k = BigInt(numTriangles / 2);
  const m = BigInt(numTriangles);
  let num = 1n;
  let den = 1n;
  for (let i = 0n; i < k; i++) {
    num = (num * (m - i)) % MOD;
    den = (den * (i + 1n)) % MOD;
  }
  const comb = (num * modInverse(den, MOD)) % MOD;

  ans = (ans * comb) % MOD;
  console.log(ans.toString());
}

solve();
