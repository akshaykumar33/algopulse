const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = Number(input[ptr++]);
    const y = Number(input[ptr++]);

    let d = 1;
    let found = false;
    while (!found) {
      let sumSq = 0;
      for (let k = 1; k <= d; k++) {
        sumSq += k * k;
        const totalCoins = y * sumSq + (d - k) * y * (k * k);
        const cost = k * x;
        if (totalCoins - cost > 0) {
          found = true;
          break;
        }
      }
      if (found) {
        out.push(d);
        break;
      }
      d++;
    }
  }

  console.log(out.join('\n'));
}

solve();

