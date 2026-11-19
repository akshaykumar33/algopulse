const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  const n = Number(input[0]);
  const MOD = 998244353n;
  const bigN = BigInt(n);

  let totalPerNumber = 0n;

  for (let i = 0; i < n; i++) {
    const s = input[1 + i];
    const m = s.length;
    let pow = 1n;

    for (let p = 0; p < m; p++) {
      const d = BigInt(s.charCodeAt(m - 1 - p) - 48);
      const mult = (pow + pow * 10n) % MOD;
      totalPerNumber = (totalPerNumber + d * mult) % MOD;
      pow = (pow * 100n) % MOD;
    }
  }

  const ans = (totalPerNumber * bigN) % MOD;
  console.log(ans.toString());
}

solve();
