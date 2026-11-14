const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);
    const diff = Math.abs(a - b);

    if (diff === 0) {
      out.push(0);
      continue;
    }

    let k = 0;
    let sum = 0;
    while (true) {
      k++;
      sum += k;
      if (sum >= diff && (sum - diff) % 2 === 0) {
        out.push(k);
        break;
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
