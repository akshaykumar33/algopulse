const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const MOD = 1000000007;
  const MAX = 1000001;
  const fact = new Int32Array(MAX + 1);
  fact[0] = 1;
  for (let i = 1; i <= MAX; i++) {
    fact[i] = (fact[i - 1] * i) % MOD;
  }
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const ans = (fact[n + 1] - 1 + MOD) % MOD;
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
