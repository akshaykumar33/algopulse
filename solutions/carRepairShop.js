'use strict';
const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tok = raw.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tok[ptr++], 10);
  const segs = [];
  const out = [];
  for (let i = 0; i < n; i++) {
    const s = parseInt(tok[ptr++], 10);
    const d = parseInt(tok[ptr++], 10);
    const e = s + d - 1;
    let conflict = false;
    for (let j = 0; j < segs.length; j++) {
      if (s <= segs[j][1] && segs[j][0] <= e) {
        conflict = true;
        break;
      }
    }
    if (!conflict) {
      segs.push([s, e]);
      segs.sort((a, b) => a[0] - b[0]);
      out.push(s + ' ' + e);
    } else {
      let cand = 1;
      for (let j = 0; j < segs.length; j++) {
        if (cand + d - 1 < segs[j][0]) break;
        if (cand <= segs[j][1]) cand = segs[j][1] + 1;
      }
      const ce = cand + d - 1;
      segs.push([cand, ce]);
      segs.sort((a, b) => a[0] - b[0]);
      out.push(cand + ' ' + ce);
    }
  }
  console.log(out.join('\n'));
}

solve();
