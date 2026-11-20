const fs = require('fs');
const MOD = 1000000007n;

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
  for (let t = 0; t < T; t++) {
    const n = BigInt(input[ptr++]);
    const w = parseInt(input[ptr++], 10);
    let count = 0n;
    for (let d1 = 1; d1 <= 9; d1++) {
      const dN = d1 + w;
      if (dN >= 0 && dN <= 9) count++;
    }
    if (count === 0n || n < 2n) {
      out.push(0);
    } else {
      const ans = (count * pow(10n, n - 2n)) % MOD;
      out.push(ans.toString());
    }
  }
  console.log(out.join('\n'));
}
solve();