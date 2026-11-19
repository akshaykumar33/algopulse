const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const q = parseInt(input[ptr++], 10);
  const MOD = 1000000007n;

  function power(base, exp) {
    let res = 1n;
    let b = base % MOD;
    let e = BigInt(exp);
    while (e > 0n) {
      if (e & 1n) res = (res * b) % MOD;
      b = (b * b) % MOD;
      e >>= 1n;
    }
    return res;
  }

  const p2n = power(2n, n);
  const p2np1 = power(2n, n + 1);

  let E = (p2np1 - 2n + MOD) % MOD;
  let B = p2n;
  let T = 1n;
  let L = BigInt(n + 1) % MOD;

  const out = [];

  for (let i = 0; i < q; i++) {
    const type = parseInt(input[ptr++], 10);
    if (type === 1) {
      const x = parseInt(input[ptr++], 10);
      if (x === 1 || x === 2) {
        E = (2n * E + L) % MOD;
        T = (2n * T) % MOD;
        B = (2n * B) % MOD;
      } else if (x === 3) {
        E = (2n * E + T) % MOD;
        L = (2n * L) % MOD;
        T = B;
      } else if (x === 4) {
        E = (2n * E + B) % MOD;
        L = (2n * L) % MOD;
        B = T;
      }
    } else if (type === 2) {
      out.push(E.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();
