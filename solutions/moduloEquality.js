const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;

  const n = Number(input[0]);
  const m = Number(input[1]);

  const a = new Int32Array(n);
  const b = new Int32Array(n);

  let ptr = 2;
  for (let i = 0; i < n; i++) a[i] = Number(input[ptr++]);
  for (let i = 0; i < n; i++) b[i] = Number(input[ptr++]);

  b.sort();

  let bestX = m;
  const c = new Int32Array(n);

  for (let j = 0; j < n; j++) {
    const x = (b[j] - a[0] + m) % m;
    if (x >= bestX) continue;

    for (let i = 0; i < n; i++) {
      c[i] = (a[i] + x) % m;
    }
    c.sort();

    let ok = true;
    for (let i = 0; i < n; i++) {
      if (c[i] !== b[i]) {
        ok = false;
        break;
      }
    }

    if (ok) {
      bestX = x;
    }
  }

  console.log(bestX);
}

solve();
