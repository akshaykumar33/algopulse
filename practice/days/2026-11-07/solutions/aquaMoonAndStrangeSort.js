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
    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      a[i] = v;
      b[i] = v;
    }
    b.sort();

    const evenA = new Map();
    const oddA = new Map();
    const evenB = new Map();
    const oddB = new Map();

    for (let i = 0; i < n; i++) {
      if (i % 2 === 0) {
        evenA.set(a[i], (evenA.get(a[i]) || 0) + 1);
        evenB.set(b[i], (evenB.get(b[i]) || 0) + 1);
      } else {
        oddA.set(a[i], (oddA.get(a[i]) || 0) + 1);
        oddB.set(b[i], (oddB.get(b[i]) || 0) + 1);
      }
    }

    let ok = true;
    for (const [k, v] of evenA.entries()) {
      if ((evenB.get(k) || 0) !== v) {
        ok = false;
        break;
      }
    }
    if (ok) {
      for (const [k, v] of oddA.entries()) {
        if ((oddB.get(k) || 0) !== v) {
          ok = false;
          break;
        }
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
