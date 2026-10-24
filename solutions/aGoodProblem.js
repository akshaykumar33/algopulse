const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    const l = BigInt(input[ptr++]);
    const r = BigInt(input[ptr++]);
    const k = BigInt(input[ptr++]);

    if (n % 2n === 1n) {
      out.push(l.toString());
      continue;
    }

    if (n === 2n) {
      out.push('-1');
      continue;
    }

    let y = 1n;
    while (y <= l) {
      y <<= 1n;
    }

    if (y > r) {
      out.push('-1');
    } else {
      if (k <= n - 2n) {
        out.push(l.toString());
      } else {
        out.push(y.toString());
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
