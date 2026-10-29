const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    let x = parseInt(input[ptr++], 10);
    const y = parseInt(input[ptr++], 10);
    let k = parseInt(input[ptr++], 10);

    while (k > 0 && x > 1) {
      const d = y - (x % y);
      if (d > k) {
        x += k;
        k = 0;
        break;
      }
      x += d;
      k -= d;
      while (x % y === 0) {
        x = Math.floor(x / y);
      }
    }

    if (k > 0) {
      k %= (y - 1);
      x += k;
    }
    out.push(x.toString());
  }
  console.log(out.join('\n'));
}

solve();
