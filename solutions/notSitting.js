const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const total = n * m;
    const dists = new Int32Array(total);
    let idx = 0;

    for (let r = 0; r < n; r++) {
      const maxR = Math.max(r, n - 1 - r);
      for (let c = 0; c < m; c++) {
        dists[idx++] = maxR + Math.max(c, m - 1 - c);
      }
    }

    dists.sort();
    out.push(dists.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
