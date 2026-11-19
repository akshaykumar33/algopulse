const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);
    const h = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      h[i] = parseInt(input[ptr++], 10);
    }
    const c = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      c[i] = parseInt(input[ptr++], 10);
    }

    const seen = new Uint8Array(m + 1);
    let distinct = 0;
    let maxH = 0;

    for (let i = n - 1; i >= 0; i--) {
      if (h[i] > maxH) {
        maxH = h[i];
        const color = c[i];
        if (seen[color] === 0) {
          seen[color] = 1;
          distinct++;
        }
      }
    }

    out.push(distinct);
  }

  console.log(out.join('\n'));
}

solve();
