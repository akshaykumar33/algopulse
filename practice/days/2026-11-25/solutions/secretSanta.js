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
    const a = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) a[i] = parseInt(tok[ptr++], 10);
    const b = new Int32Array(n + 1);
    const usedTarget = new Uint8Array(n + 1);
    const owner = new Int32Array(n + 1);
    let k = 0;
    for (let i = 1; i <= n; i++) {
      const target = a[i];
      if (!usedTarget[target]) {
        usedTarget[target] = 1;
        b[i] = target;
        owner[target] = i;
        k++;
      }
    }
    const unmatched = [];
    const unused = [];
    for (let i = 1; i <= n; i++) {
      if (b[i] === 0) unmatched.push(i);
      if (!usedTarget[i]) unused.push(i);
    }
    if (unmatched.length === 1 && unmatched[0] === unused[0]) {
      const w = unmatched[0];
      const p = owner[a[w]];
      b[w] = a[w];
      b[p] = w;
    } else if (unmatched.length > 0) {
      const inUnused = new Uint8Array(n + 1);
      for (let i = 0; i < unused.length; i++) inUnused[unused[i]] = 1;
      const inUnmatched = new Uint8Array(n + 1);
      for (let i = 0; i < unmatched.length; i++) inUnmatched[unmatched[i]] = 1;
      const both = [];
      const onlyU = [];
      const onlyV = [];
      for (let i = 0; i < unmatched.length; i++) {
        const u = unmatched[i];
        if (inUnused[u]) both.push(u);
        else onlyU.push(u);
      }
      for (let i = 0; i < unused.length; i++) {
        const v = unused[i];
        if (!inUnmatched[v]) onlyV.push(v);
      }
      if (both.length >= 2) {
        for (let i = 0; i < both.length; i++) {
          b[both[i]] = both[(i + 1) % both.length];
        }
        for (let i = 0; i < onlyU.length; i++) {
          b[onlyU[i]] = onlyV[i];
        }
      } else if (both.length === 1) {
        b[both[0]] = onlyV[0];
        b[onlyU[0]] = both[0];
        for (let i = 1; i < onlyU.length; i++) {
          b[onlyU[i]] = onlyV[i];
        }
      } else {
        for (let i = 0; i < onlyU.length; i++) {
          b[onlyU[i]] = onlyV[i];
        }
      }
    }
    out.push(String(k));
    const row = new Array(n);
    for (let i = 1; i <= n; i++) row[i - 1] = b[i];
    out.push(row.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
