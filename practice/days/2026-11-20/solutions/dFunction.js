const fs = require('fs');

function power(base, exp, mod) {
  let res = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp /= 2n;
  }
  return res;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const MOD = 1000000007n;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const l = BigInt(input[ptr++]);
    const r = BigInt(input[ptr++]);
    const k = BigInt(input[ptr++]);

    if (k >= 10n) {
      out.push(0);
      continue;
    }

    const b = (9n / k) + 1n;
    const ans = (power(b, r, MOD) - power(b, l, MOD) + MOD) % MOD;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
