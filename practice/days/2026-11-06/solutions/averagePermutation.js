const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    if (n === 3) {
      out.push('3 2 1');
    } else if (n === 4) {
      out.push('3 2 1 4');
    } else {
      const res = [n - 1, n - 3];
      for (let i = 1; i <= n - 4; i++) {
        res.push(i);
      }
      res.push(n - 2);
      res.push(n);
      out.push(res.join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();

