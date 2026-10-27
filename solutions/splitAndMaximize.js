const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  const MOD = 998244353n;

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let sum = 0n;
    for (let i = 0; i < n; i++) {
      const val = BigInt(tokens[ptr++]);
      sum = (sum + val) % MOD;
    }
    const ans = (sum * ((sum - 1n + MOD) % MOD)) % MOD;
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
