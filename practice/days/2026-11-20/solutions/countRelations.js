const fs = require('fs');
const MOD = 100000007n;

function pow(base, exp) {
  let res = 1n;
  base %= MOD;
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % MOD;
    base = (base * base) % MOD;
    exp >>= 1n;
  }
  return res;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  const inv2 = 50000004n;
  for (let t = 0; t < T; t++) {
    const n = BigInt(input[ptr++]);
    let r1 = (pow(3n, n) - pow(2n, n + 1n) + 1n) % MOD;
    if (r1 < 0n) r1 = (r1 + MOD) % MOD;
    r1 = (r1 * inv2) % MOD;

    let r2 = (pow(4n, n) - pow(3n, n + 1n) + 3n * pow(2n, n) - 1n) % MOD;
    if (r2 < 0n) r2 = (r2 + MOD) % MOD;
    r2 = (r2 * inv2) % MOD;

    out.push(r1.toString() + ' ' + r2.toString());
  }
  console.log(out.join('\n'));
}
solve();