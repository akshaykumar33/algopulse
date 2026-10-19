const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const k = parseInt(input[ptr++], 10);
    const x = BigInt(input[ptr++]);
    const total = 1n << BigInt(k + 1);
    const targetA = 1n << BigInt(k);

    let a = x;
    let b = total - x;
    const ops = [];

    while (a !== targetA) {
      if (a < b) {
        ops.push(1);
        a = a * 2n;
        b = b - a / 2n;
      } else {
        ops.push(2);
        b = b * 2n;
        a = a - b / 2n;
      }
    }

    ops.reverse();
    out.push(ops.length);
    if (ops.length > 0) {
      out.push(ops.join(' '));
    } else {
      out.push('');
    }
  }

  console.log(out.join('\n'));
}

solve();
