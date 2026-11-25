'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tok[ptr++], 10);
  const m = parseInt(tok[ptr++], 10);
  const pts = new Array(n);
  for (let i = 0; i < n; i++) {
    pts[i] = [parseInt(tok[ptr++], 10), i];
  }
  pts.sort((a, b) => a[0] - b[0]);
  const ans = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    ans[pts[i][1]] = i & 1;
  }
  console.log(ans.join(' '));
}

solve();
