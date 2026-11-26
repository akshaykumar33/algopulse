'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const n = parseInt(raw, 10);
  const MOD = 1000000007;

  let dp0 = 0;
  let dp1 = 0;

  for (let i = 1; i <= n; i++) {
    if (i % 2 === 1) {
      dp1 = (dp1 + dp0 + 1) % MOD;
    } else {
      dp0 = (dp0 + dp1 + 1) % MOD;
    }
  }

  const ans = (dp0 + dp1) % MOD;
  console.log(ans);
}

solve();
