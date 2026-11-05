const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const MOD = 1000000007n;
  const out = [];
  
  for (let i = 0; i < t; i++) {
    const n = BigInt(tokens[ptr++]);
    let base = 2n;
    let exp = n - 1n;
    let res = 1n;
    while (exp > 0n) {
      if (exp % 2n === 1n) {
        res = (res * base) % MOD;
      }
      base = (base * base) % MOD;
      exp /= 2n;
    }
    out.push(res.toString());
  }
  console.log(out.join('\n'));
}

solve();
