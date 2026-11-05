const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    let a = parseInt(tokens[ptr++], 10);
    let b = parseInt(tokens[ptr++], 10);
    const c = parseInt(tokens[ptr++], 10);

    let maxMoney = a * 100 + b;
    let best = 0;
    const vis = new Set();
    let k = 0;

    while (k < 10000) {
      const key = (a << 8) | b;
      if (vis.has(key)) break;
      vis.add(key);

      if (b < c) {
        if (a > 0) {
          a -= 1;
          b += 100;
        } else {
          break;
        }
      }

      b -= c;
      const nextA = b;
      const nextB = a;
      a = nextA;
      b = nextB;
      k++;

      const cur = a * 100 + b;
      if (cur > maxMoney) {
        maxMoney = cur;
        best = k;
      }
    }
    out.push(best);
  }

  console.log(out.join('\n'));
}

solve();
