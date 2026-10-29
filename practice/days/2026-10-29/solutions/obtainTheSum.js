const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;

  const t = parseInt(input[0], 10);
  let ptr = 1;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    const s = BigInt(input[ptr++]);

    const total = (n * (n + 1n)) / 2n;
    const x = total - s;

    if (x >= 1n && x <= n) {
      out.push(x.toString());
    } else {
      out.push('-1');
    }
  }

  console.log(out.join('\n'));
}

solve();

