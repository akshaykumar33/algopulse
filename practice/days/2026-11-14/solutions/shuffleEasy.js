const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const MOD = 998244353n;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    for (let i = 0; i < n; i++) ptr++;

    let kFact = 1n;
    for (let i = 2; i <= k; i++) kFact = (kFact * BigInt(i)) % MOD;

    let kPow = 1n;
    let base = BigInt(k);
    let exp = BigInt(n - k);
    while (exp > 0n) {
      if (exp & 1n) kPow = (kPow * base) % MOD;
      base = (base * base) % MOD;
      exp >>= 1n;
    }

    const ans = (kFact * kPow) % MOD;
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
