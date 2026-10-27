const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Array(n);
    let zeroCount = 0;
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
      if (a[i] === 0) zeroCount++;
    }

    if (zeroCount === 1) {
      out.push('NO');
      continue;
    }

    out.push('YES');
    if (zeroCount === 0) {
      out.push('A'.repeat(n));
    } else {
      let seenZero = 0;
      const res = new Array(n);
      for (let i = 0; i < n; i++) {
        if (a[i] === 0) {
          if (seenZero === 0) {
            res[i] = 'A';
          } else if (seenZero === 1) {
            res[i] = 'B';
          } else {
            res[i] = 'A';
          }
          seenZero++;
        } else {
          res[i] = 'C';
        }
      }
      out.push(res.join(''));
    }
  }
  console.log(out.join('\n'));
}

solve();
