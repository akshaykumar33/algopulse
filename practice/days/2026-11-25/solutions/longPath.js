'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tok[ptr++], 10);
  const MOD = 1000000007;
  const pref = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    const p = parseInt(tok[ptr++], 10);
    let dp = (2 + pref[i - 1] - pref[p - 1]) % MOD;
    if (dp < 0) dp += MOD;
    pref[i] = (pref[i - 1] + dp) % MOD;
  }
  console.log(pref[n]);
}

solve();
