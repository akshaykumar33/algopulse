const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }

    a.sort();

    let maxKeep = 0;
    let r = 0;

    for (let l = 0; l < n - 1; l++) {
      while (r < n && a[r] < a[l] + a[l + 1]) {
        r++;
      }
      const keep = r - l;
      if (keep > maxKeep) maxKeep = keep;
    }

    out.push(n - maxKeep);
  }

  console.log(out.join('\n'));
}

solve();
