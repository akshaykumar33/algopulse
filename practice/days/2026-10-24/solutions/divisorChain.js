const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input.length || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (ptr >= input.length) break;
    let x = parseInt(input[ptr++], 10);
    const chain = [x];

    let bit = 0;
    while ((1 << (bit + 1)) <= x) {
      if ((x & (1 << bit)) !== 0) {
        x -= (1 << bit);
        chain.push(x);
      }
      bit++;
    }

    while (x > 1) {
      x >>= 1;
      chain.push(x);
    }

    out.push(chain.length);
    out.push(chain.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
