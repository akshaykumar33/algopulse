const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const a = new Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(input[ptr++], 10);
    }

    let ok = true;
    for (let i = 0; i < n - 2; i++) {
      if (a[i] < 0) {
        ok = false;
        break;
      }
      const k = a[i];
      if (k > 0) {
        a[i] = 0;
        a[i + 1] -= 2 * k;
        a[i + 2] -= k;
      }
    }

    if (ok && a[n - 2] === 0 && a[n - 1] === 0) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();
