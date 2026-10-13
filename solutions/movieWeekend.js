const fs = require('fs');

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!lines.length || !lines[0]) return;
  let idx = 0;
  const t = parseInt(lines[idx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(lines[idx++], 10);
    const l = lines[idx++].trim().split(/\s+/).map(Number);
    const r = lines[idx++].trim().split(/\s+/).map(Number);

    let bestIdx = 0;
    let bestProd = l[0] * r[0];
    let bestR = r[0];

    for (let i = 1; i < n; i++) {
      const prod = l[i] * r[i];
      if (prod > bestProd) {
        bestIdx = i;
        bestProd = prod;
        bestR = r[i];
      } else if (prod === bestProd) {
        if (r[i] > bestR) {
          bestIdx = i;
          bestR = r[i];
        }
      }
    }

    out.push((bestIdx + 1).toString());
  }

  console.log(out.join('\n'));
}

solve();
