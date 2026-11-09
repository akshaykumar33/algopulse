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
    let cur = 0;
    for (let i = 0; i < n - 3; i++) {
      a[i] = i + 1;
      cur ^= a[i];
    }
    const v1 = 1 << 30;
    const v2 = 1 << 29;
    a[n - 3] = v1;
    a[n - 2] = v2;
    a[n - 1] = cur ^ v1 ^ v2;

    out.push(a.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
