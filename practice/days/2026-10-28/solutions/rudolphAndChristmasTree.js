const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const d = parseFloat(input[ptr++]);
    const h = parseFloat(input[ptr++]);
    const y = [];
    for (let i = 0; i < n; i++) {
      y.push(parseFloat(input[ptr++]));
    }

    const singleArea = (d * h) / 2;
    let total = n * singleArea;

    for (let i = 0; i < n - 1; i++) {
      const diff = y[i + 1] - y[i];
      if (diff < h) {
        const overlapH = h - diff;
        const overlapArea = (d * overlapH * overlapH) / (2 * h);
        total -= overlapArea;
      }
    }
    out.push(total);
  }
  console.log(out.join('\n'));
}

solve();

