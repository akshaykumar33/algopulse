'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tok[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tok[ptr++], 10);
    const k = parseInt(tok[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(tok[ptr++], 10);
    let bestDiff = Infinity;
    let bestX = a[0];
    for (let i = 0; i + k < n; i++) {
      const diff = a[i + k] - a[i];
      if (diff < bestDiff) {
        bestDiff = diff;
        bestX = Math.floor((a[i] + a[i + k]) / 2);
      }
    }
    out.push(bestX);
  }
  console.log(out.join('\n'));
}

solve();
