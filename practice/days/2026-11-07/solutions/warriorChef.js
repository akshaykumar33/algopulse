const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const h = parseInt(tokens[ptr++], 10);

    const a = new Int32Array(n);
    let sum = 0;
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
      sum += a[i];
    }

    if (h > sum) {
      out.push(0);
      continue;
    }

    a.sort();
    let remH = h;
    let ans = 0;

    for (let i = n - 1; i >= 0; i--) {
      if (remH - a[i] <= 0) {
        ans = a[i];
        break;
      }
      remH -= a[i];
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
