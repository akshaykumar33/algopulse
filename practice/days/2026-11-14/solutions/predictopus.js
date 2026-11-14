const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    let p = parseFloat(input[ptr++]);
    if (p < 0.5) p = 1 - p;
    const ans = 10000 * (1 + (1 - p) * (2 * p - 1));
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
