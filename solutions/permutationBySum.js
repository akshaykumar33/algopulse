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
    const l = parseInt(tok[ptr++], 10);
    const r = parseInt(tok[ptr++], 10);
    const s = parseInt(tok[ptr++], 10);
    const m = r - l + 1;
    const minS = (m * (m + 1)) / 2;
    const maxS = (m * (2 * n - m + 1)) / 2;
    if (s < minS || s > maxS) {
      out.push('-1');
      continue;
    }
    const seg = new Array(m);
    for (let i = 0; i < m; i++) seg[i] = i + 1;
    let diff = s - minS;
    const gap = n - m;
    for (let i = m - 1; i >= 0 && diff > 0; i--) {
      const add = diff < gap ? diff : gap;
      seg[i] += add;
      diff -= add;
    }
    const used = new Uint8Array(n + 1);
    for (let i = 0; i < m; i++) used[seg[i]] = 1;
    const res = new Array(n);
    let si = 0;
    let u = 1;
    for (let i = 0; i < n; i++) {
      if (i >= l - 1 && i <= r - 1) {
        res[i] = seg[si++];
      } else {
        while (used[u]) u++;
        res[i] = u++;
      }
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
