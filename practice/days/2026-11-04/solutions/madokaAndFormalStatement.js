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
    for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);
    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) b[i] = parseInt(input[ptr++], 10);

    let ok = true;
    for (let i = 0; i < n; i++) {
      if (a[i] > b[i]) {
        ok = false;
        break;
      }
      const next = (i + 1) % n;
      if (a[i] < b[i] && b[i] > b[next] + 1) {
        ok = false;
        break;
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();

