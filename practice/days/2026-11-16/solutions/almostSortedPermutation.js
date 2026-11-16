const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(input[ptr++], 10);
    }
    for (let i = 0; i < n - 1; i++) {
      if (a[i] > a[i + 1]) {
        const tmp = a[i];
        a[i] = a[i + 1];
        a[i + 1] = tmp;
        i++;
      }
    }
    let ok = true;
    for (let i = 0; i < n - 1; i++) {
      if (a[i] > a[i + 1]) {
        ok = false;
        break;
      }
    }
    out.push(ok ? "YES" : "NO");
  }
  console.log(out.join('\n'));
}

solve();
