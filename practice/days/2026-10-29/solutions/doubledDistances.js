const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(input[ptr++], 10);
    }
    a.sort();

    let ok = true;
    for (let i = 1; i < n - 1; i++) {
      const d1 = a[i] - a[i - 1];
      const d2 = a[i + 1] - a[i];
      if (d1 === 2 * d2 || d2 === 2 * d1) {
        continue;
      } else {
        ok = false;
        break;
      }
    }
    out.push(ok ? 'Yes' : 'No');
  }
  console.log(out.join('\n'));
}

solve();
