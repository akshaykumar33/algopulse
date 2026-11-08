const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let p = -1;

    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) {
        p = i;
        break;
      }
    }

    if (p === -1) {
      out.push(-1);
    } else {
      const q = Math.floor(n / p);
      if (p !== q && p !== 1 && q !== 1) {
        out.push(p + ' ' + q + ' 1');
      } else {
        out.push(-1);
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
