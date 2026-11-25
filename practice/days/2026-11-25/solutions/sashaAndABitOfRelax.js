'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tok[ptr++], 10);
  const cnt = new Int32Array(1 << 21);
  cnt[0] = 1;
  let px = 0;
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    px ^= parseInt(tok[ptr++], 10);
    const key = (px << 1) | (i & 1);
    ans += cnt[key];
    cnt[key]++;
  }
  console.log(ans);
}

solve();
