'use strict';
const fs = require('fs');

function solve() {
  const stdinData = fs.readFileSync(0, 'utf-8').trim();
  const raw = stdinData ? stdinData : fs.readFileSync('input.txt', 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tok[ptr++], 10);
  const a = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) a[i] = parseInt(tok[ptr++], 10) + 1;
  const r1 = parseInt(tok[ptr++], 10);
  const c1 = parseInt(tok[ptr++], 10);
  const r2 = parseInt(tok[ptr++], 10);
  const c2 = parseInt(tok[ptr++], 10);

  let ans = Infinity;
  for (let k = 1; k <= n; k++) {
    const lo = Math.min(r1, r2, k);
    const hi = Math.max(r1, r2, k);
    let c = c1;
    for (let j = lo; j <= hi; j++) {
      if (a[j] < c) c = a[j];
    }
    const cost = Math.abs(r1 - k) + Math.abs(k - r2) + Math.abs(c - c2);
    if (cost < ans) ans = cost;
  }

  if (stdinData) {
    console.log(ans);
  } else {
    fs.writeFileSync('output.txt', String(ans) + '\n');
  }
}

solve();
