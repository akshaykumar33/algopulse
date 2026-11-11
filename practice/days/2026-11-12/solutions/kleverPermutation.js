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
    const k = parseInt(tokens[ptr++], 10);
    const p = new Int32Array(n);
    let lo = 1;
    let hi = n;

    for (let r = 0; r < k; r++) {
      if ((r & 1) === 0) {
        for (let j = r; j < n; j += k) {
          p[j] = lo++;
        }
      } else {
        for (let j = r; j < n; j += k) {
          p[j] = hi--;
        }
      }
    }

    out.push(p.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
