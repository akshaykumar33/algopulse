const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }
    a.sort();

    let ok = false;
    let hasTwo = false;
    let prev = -2;
    let i = 0;
    while (i < n) {
      let j = i;
      while (j < n && a[j] === a[i]) j++;
      const cnt = j - i;
      const d = a[i];
      if (cnt >= 4) {
        ok = true;
        break;
      }
      if (d !== prev + 1) {
        hasTwo = false;
      }
      if (cnt >= 2) {
        if (hasTwo) {
          ok = true;
          break;
        }
        hasTwo = true;
      }
      prev = d;
      i = j;
    }

    out.push(ok ? 'Yes' : 'No');
  }

  console.log(out.join('\n'));
}

solve();
