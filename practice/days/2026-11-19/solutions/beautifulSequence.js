const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  const MOD = 998244353;

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    let dp1 = 0;
    let dp2 = 0;
    let ans = 0;

    for (let i = 0; i < n; i++) {
      const x = Number(input[ptr++]);
      if (x === 1) {
        dp1 = (dp1 + 1) % MOD;
      } else if (x === 2) {
        dp2 = (dp2 * 2 + dp1) % MOD;
      } else if (x === 3) {
        ans = (ans + dp2) % MOD;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
