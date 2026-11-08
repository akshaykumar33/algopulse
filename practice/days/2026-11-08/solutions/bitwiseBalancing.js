const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const b = BigInt(input[ptr++]);
    const c = BigInt(input[ptr++]);
    const d = BigInt(input[ptr++]);

    let a = 0n;
    let ok = true;

    for (let i = 0n; i <= 61n; i++) {
      const B = (b >> i) & 1n;
      const C = (c >> i) & 1n;
      const D = (d >> i) & 1n;

      if (((0n | B) - (0n & C)) === D) {
      } else if (((1n | B) - (1n & C)) === D) {
        a |= (1n << i);
      } else {
        ok = false;
        break;
      }
    }

    if (ok && ((a | b) - (a & c) === d)) {
      out.push(a.toString());
    } else {
      out.push('-1');
    }
  }

  console.log(out.join('\n'));
}

solve();
