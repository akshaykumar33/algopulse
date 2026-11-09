const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }
    const b = new Int32Array(n);
    let cur = 0;
    for (let i = 0; i < n; i++) {
      b[i] = parseInt(tokens[ptr++], 10);
      cur += b[i];
    }

    let maxProfit = cur;
    for (let i = 0; i < n; i++) {
      cur += a[i] - b[i];
      if (cur > maxProfit) {
        maxProfit = cur;
      }
    }

    out.push(maxProfit);
  }

  console.log(out.join('\n'));
}

solve();
