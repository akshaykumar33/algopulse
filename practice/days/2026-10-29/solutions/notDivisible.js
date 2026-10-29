const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const res = [];
    for (let i = 0; i < n; i++) {
      res.push((i & 1) === 0 ? '1' : '0');
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
