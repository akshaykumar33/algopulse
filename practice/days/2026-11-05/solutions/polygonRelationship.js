const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    ptr += 2 * n;

    let cur = n;
    let sum = 0;
    while (cur >= 3) {
      sum += cur;
      cur = Math.floor(cur / 2);
    }

    out.push(sum);
  }

  console.log(out.join('\n'));
}

solve();

