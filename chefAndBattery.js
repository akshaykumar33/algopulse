const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    let n = parseInt(input[ptr++], 10);
    let ops = 0;
    while (n !== 50) {
      if (n < 50) {
        n += 2;
      } else {
        n -= 3;
      }
      ops++;
    }
    out.push(ops);
  }

  console.log(out.join('\n'));
}

solve();
