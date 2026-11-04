const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = Math.abs(parseInt(input[ptr++], 10));
    const y = Math.abs(parseInt(input[ptr++], 10));

    if (x === y) {
      out.push(2 * x);
    } else if (y > x) {
      if ((y - x) % 2 === 1) {
        out.push(2 * y - 1);
      } else {
        out.push(2 * y);
      }
    } else {
      if ((x - y) % 2 === 1) {
        out.push(2 * x + 1);
      } else {
        out.push(2 * x);
      }
    }
  }

  console.log(out.join('\n'));
}

solve();

