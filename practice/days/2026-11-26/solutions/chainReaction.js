'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tok[ptr++], 10);
  const a = new Int32Array(n);
  const b = new Int32Array(n);
  const idx = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = parseInt(tok[ptr++], 10);
    b[i] = parseInt(tok[ptr++], 10);
    idx[i] = i;
  }

  idx.sort((i, j) => a[i] - a[j]);
  const pos = new Int32Array(n);
  const pwr = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    pos[i] = a[idx[i]];
    pwr[i] = b[idx[i]];
  }

  const dp = new Int32Array(n);
  let best = 0;
  for (let i = 0; i < n; i++) {
    const lim = pos[i] - pwr[i];
    let lo = 0;
    let hi = i - 1;
    let prev = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (pos[mid] < lim) {
        prev = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    dp[i] = 1 + (prev === -1 ? 0 : dp[prev]);
    if (dp[i] > best) best = dp[i];
  }

  console.log(n - best);
}

solve();
