const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  const MOD = 1000000007;
  const MAX = 1000005;
  const pow2 = new Int32Array(MAX);
  pow2[0] = 1;
  for (let i = 1; i < MAX; i++) {
    pow2[i] = (pow2[i - 1] * 2) % MOD;
  }

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const x = parseInt(input[ptr++], 10);
    const ans = Number((BigInt(x) * BigInt(pow2[n - 1])) % BigInt(MOD));
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
