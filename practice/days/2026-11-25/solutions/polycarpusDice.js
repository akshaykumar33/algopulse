'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tok[ptr++], 10);
  const A = parseInt(tok[ptr++], 10);
  const d = new Int32Array(n);
  let s = 0;
  for (let i = 0; i < n; i++) {
    d[i] = parseInt(tok[ptr++], 10);
    s += d[i];
  }
  const out = new Array(n);
  for (let i = 0; i < n; i++) {
    const l = Math.max(1, A - (s - d[i]));
    const r = Math.min(d[i], A - (n - 1));
    out[i] = d[i] - (r - l + 1);
  }
  console.log(out.join(' '));
}

solve();
