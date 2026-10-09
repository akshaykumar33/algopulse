const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = Number(input[ptr++]);
    }

    for (let i = 0; i < n - 1; i++) {
      if (a[i] === i + 2 && a[i + 1] === i + 1) {
        a[i] = i + 1;
        a[i + 1] = i + 2;
      }
    }

    let ok = true;
    for (let i = 0; i < n; i++) {
      if (a[i] !== i + 1) {
        ok = false;
        break;
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
