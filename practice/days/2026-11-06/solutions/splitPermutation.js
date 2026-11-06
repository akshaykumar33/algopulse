const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const res = [];
    if (n % 2 === 0) {
      for (let i = 1; i <= n / 2; i++) {
        res.push(i);
        res.push(n + 1 - i);
      }
    } else {
      for (let i = 1; i <= Math.floor(n / 2); i++) {
        res.push(i);
        res.push(n - i);
      }
      res.push(n);
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

