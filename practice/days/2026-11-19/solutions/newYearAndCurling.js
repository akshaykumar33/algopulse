const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;

  const n = Number(input[0]);
  const r = Number(input[1]);

  const x = new Float64Array(n);
  const y = new Float64Array(n);

  const diam = 2 * r;
  const diamSq = diam * diam;

  for (let i = 0; i < n; i++) {
    x[i] = Number(input[2 + i]);
    let curY = r;

    for (let j = 0; j < i; j++) {
      const dx = Math.abs(x[i] - x[j]);
      if (dx <= diam) {
        const dy = Math.sqrt(diamSq - dx * dx);
        const candY = y[j] + dy;
        if (candY > curY) curY = candY;
      }
    }

    y[i] = curY;
  }

  const out = [];
  for (let i = 0; i < n; i++) {
    out.push(y[i].toFixed(10));
  }
  console.log(out.join(' '));
}

solve();
