const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  let k = parseInt(input[ptr++], 10);
  const res = [];

  for (let i = 1; i <= n; i++) {
    if (k > 0) {
      res.push(2 * i);
      res.push(2 * i - 1);
      k--;
    } else {
      res.push(2 * i - 1);
      res.push(2 * i);
    }
  }

  console.log(res.join(' '));
}

solve();
