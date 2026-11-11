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
    const m = parseInt(tokens[ptr++], 10);
    const lim = Math.min(m, 2 * n - 1);
    let best = -1;
    let bestA = n;
    let bestB = n;

    for (let g = n; g <= lim; g++) {
      const b = Math.floor(m / g) * g;
      const diff = b - g;
      if (diff > best) {
        best = diff;
        bestA = g;
        bestB = b;
      }
    }

    out.push(bestA + ' ' + bestB);
  }

  console.log(out.join('\n'));
}

solve();
