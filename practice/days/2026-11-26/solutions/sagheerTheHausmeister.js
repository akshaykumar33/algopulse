'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tok[ptr++], 10);
  const m = parseInt(tok[ptr++], 10);
  const rows = new Array(n);
  for (let i = 0; i < n; i++) rows[i] = tok[ptr++];

  const L = new Int32Array(n).fill(-1);
  const R = new Int32Array(n).fill(-1);
  let top = -1;
  for (let f = 0; f < n; f++) {
    const s = rows[n - 1 - f];
    for (let j = 1; j <= m; j++) {
      if (s[j] === '1') {
        if (L[f] === -1) L[f] = j;
        R[f] = j;
      }
    }
    if (L[f] !== -1) top = f;
  }

  if (top === -1) {
    console.log(0);
    return;
  }
  if (top === 0) {
    console.log(R[0]);
    return;
  }

  let dpL = L[0] === -1 ? 0 : 2 * R[0];
  let dpR = m + 1;
  for (let f = 1; f < top; f++) {
    let ndpL;
    let ndpR;
    if (L[f] === -1) {
      ndpL = Math.min(dpL + 1, dpR + 1 + m + 1);
      ndpR = Math.min(dpR + 1, dpL + 1 + m + 1);
    } else {
      ndpL = Math.min(dpL + 1 + 2 * R[f], dpR + 1 + m + 1);
      ndpR = Math.min(dpR + 1 + 2 * (m + 1 - L[f]), dpL + 1 + m + 1);
    }
    dpL = ndpL;
    dpR = ndpR;
  }

  const ans = Math.min(dpL + 1 + R[top], dpR + 1 + (m + 1 - L[top]));
  console.log(ans);
}

solve();
