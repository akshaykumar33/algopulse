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
    for (let i = 1; i <= n; i++) {
      res.push(2 * i);
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();

