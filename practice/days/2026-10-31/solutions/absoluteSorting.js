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

    let minX = 0;
    let maxX = 1000000000;

    for (let i = 0; i < n - 1; i++) {
      if (a[i] < a[i + 1]) {
        const up = Math.floor((a[i] + a[i + 1]) / 2);
        if (up < maxX) maxX = up;
      } else if (a[i] > a[i + 1]) {
        const low = Math.floor((a[i] + a[i + 1] + 1) / 2);
        if (low > minX) minX = low;
      }
    }

    if (minX <= maxX) {
      out.push(minX);
    } else {
      out.push(-1);
    }
  }

  console.log(out.join('\n'));
}

solve();
