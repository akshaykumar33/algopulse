const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const n = parseInt(input[idx++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(input[idx++], 10));
    const b = [];
    for (let i = 0; i < n; i++) b.push(parseInt(input[idx++], 10));

    const limits = new Set([0]);
    for (let i = 0; i < n; i++) limits.add(b[i]);

    let maxSat = 0;
    for (const L of limits) {
      let tastiness = 0;
      for (let i = 0; i < n; i++) {
        if (b[i] <= L && a[i] > 0) {
          tastiness += a[i];
        }
      }
      const sat = tastiness - L;
      if (sat > maxSat) maxSat = sat;
    }
    out.push(maxSat);
  }
  console.log(out.join('\n'));
}

solve();
