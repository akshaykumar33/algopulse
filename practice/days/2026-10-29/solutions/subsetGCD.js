const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;

  const t = parseInt(input[0], 10);
  let ptr = 1;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);

    const g = Math.floor(n / k);
    const res = [];
    for (let i = 1; i <= k; i++) {
      res.push(i * g);
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();

