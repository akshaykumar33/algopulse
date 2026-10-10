const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input.length || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    if (n % 2 === 0) {
      out.push(-1);
    } else {
      const res = [];
      for (let i = 0; i < n; i++) {
        res.push((2 * i % n) + 1);
      }
      out.push(res.join(' '));
    }
  }
  console.log(out.join('\n'));
}

solve();
