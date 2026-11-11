const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    const nz = [];
    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      a[i] = v;
      if (v !== 0) nz.push(i + 1);
    }

    if (nz.length % 2 === 1) {
      out.push('-1');
      continue;
    }

    const segL = [];
    const segR = [];
    let cur = 1;

    for (let i = 0; i < nz.length; i += 2) {
      const l = nz[i];
      const r = nz[i + 1];
      if (cur < l) {
        segL.push(cur);
        segR.push(l - 1);
      }
      const wantMinus = a[l - 1] === a[r - 1] ? 1 : 0;
      if ((r - l) % 2 === wantMinus) {
        segL.push(l);
        segR.push(r);
      } else {
        segL.push(l);
        segR.push(l);
        segL.push(l + 1);
        segR.push(r);
      }
      cur = r + 1;
    }

    if (cur <= n) {
      segL.push(cur);
      segR.push(n);
    }

    out.push(segL.length);
    for (let i = 0; i < segL.length; i++) {
      out.push(segL[i] + ' ' + segR[i]);
    }
  }

  console.log(out.join('\n'));
}

solve();
