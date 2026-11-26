'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tok[ptr++], 10);
  const m = parseInt(tok[ptr++], 10);
  const k = parseInt(tok[ptr++], 10);
  const g = new Uint8Array(n * m);
  for (let i = 0; i < n; i++) {
    const s = tok[ptr++];
    const base = i * m;
    for (let j = 0; j < m; j++) {
      if (s[j] === '*') g[base + j] = 1;
    }
  }

  let cnt = 0;
  for (let x = 1; 2 * x < n && 2 * x < m; x++) {
    const rLim = n - x;
    const cLim = m - x;
    for (let r = x; r < rLim; r++) {
      const base = r * m;
      const up = (r - x) * m;
      const dn = (r + x) * m;
      for (let c = x; c < cLim; c++) {
        if (g[base + c] && g[up + c] && g[dn + c] && g[base + c - x] && g[base + c + x]) {
          cnt++;
          if (cnt === k) {
            const out = [
              `${r + 1} ${c + 1}`,
              `${r - x + 1} ${c + 1}`,
              `${r + x + 1} ${c + 1}`,
              `${r + 1} ${c - x + 1}`,
              `${r + 1} ${c + x + 1}`
            ];
            console.log(out.join('\n'));
            return;
          }
        }
      }
    }
  }

  console.log(-1);
}

solve();
