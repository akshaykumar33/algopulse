const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let sum = 0;
    let odd = 0;

    for (let i = 0; i < n; i++) {
      const a = parseInt(tokens[ptr++], 10);
      sum += a;
      if ((a & 1) === 1) {
        odd++;
      }
    }

    if ((sum & 1) === 0) {
      out.push(sum - Math.floor(odd / 2));
    } else {
      out.push(Math.floor(odd / 2));
    }
  }

  console.log(out.join('\n'));
}

solve();
