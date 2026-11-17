const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const MOD = 1000000007n;

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

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);

    let orAll = 0n;
    for (let i = 0; i < m; i++) {
      ptr += 2;
      orAll |= BigInt(tokens[ptr++]);
    }

    const p = power(2n, BigInt(n - 1));
    const ans = ((orAll % MOD) * p) % MOD;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
