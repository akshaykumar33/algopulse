const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const start = Math.floor(n / 2) + 1;
    const res = [];
    let cur = start;
    while (res.length < n) {
      res.push(cur);
      if (res.length < n) {
        res.push(2 * cur);
      }
      cur++;
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
