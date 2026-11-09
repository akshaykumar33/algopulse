const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  const t = parseInt(tokens[0], 10);
  const out = [];

  let idx = 1;
  for (let tc = 0; tc < t; tc++) {
    let n = BigInt(tokens[idx++]);
    let k = BigInt(tokens[idx++]);

    let step = 1n;
    while (true) {
      const count = (n + 1n) / 2n;
      if (k <= count) {
        out.push((step * (2n * k - 1n)).toString());
        break;
      }
      k -= count;
      n -= count;
      step *= 2n;
    }
  }

  console.log(out.join('\n'));
}

solve();
