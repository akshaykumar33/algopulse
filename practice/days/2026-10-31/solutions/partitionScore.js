const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseInt(tokens[ptr++], 10));
    }

    a.sort((x, y) => x - y);

    if (k === 1) {
      out.push(a[0] + a[n - 2] + 2 * a[n - 1]);
    } else {
      out.push(a[0] + a[n - 1] + a[n - 2] + a[n - k - 1]);
    }
  }

  console.log(out.join('\n'));
}

solve();
