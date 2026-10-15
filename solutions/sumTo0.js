const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = parseInt(input[ptr++], 10);
    if (n === 1) {
      out.push('-1');
      continue;
    }

    const res = [];
    if (n % 2 === 0) {
      for (let j = 0; j < n / 2; j++) {
        res.push(1, -1);
      }
    } else {
      res.push(1, 2, -3);
      for (let j = 0; j < (n - 3) / 2; j++) {
        res.push(1, -1);
      }
    }
    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
