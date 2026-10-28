const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(tokens[ptr++], 10);
    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) b[i] = parseInt(tokens[ptr++], 10);
    const c = new Int32Array(n);
    for (let i = 0; i < n; i++) c[i] = parseInt(tokens[ptr++], 10);

    let cntAB = 0;
    for (let bs = 0; bs < n; bs++) {
      let ok = true;
      for (let p = 0; p < n; p++) {
        let idx = bs + p;
        if (idx >= n) idx -= n;
        if (a[p] >= b[idx]) {
          ok = false;
          break;
        }
      }
      if (ok) cntAB++;
    }

    let cntBC = 0;
    for (let cs = 0; cs < n; cs++) {
      let ok = true;
      for (let p = 0; p < n; p++) {
        let idx = cs + p;
        if (idx >= n) idx -= n;
        if (b[p] >= c[idx]) {
          ok = false;
          break;
        }
      }
      if (ok) cntBC++;
    }

    const ans = BigInt(n) * BigInt(cntAB) * BigInt(cntBC);
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
