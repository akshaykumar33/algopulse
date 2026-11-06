const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    const a = BigInt(input[ptr++]);

    if ((a & 1n) === 1n) {
      if ((n & 1n) === 1n) {
        out.push('Odd');
      } else {
        out.push('Even');
      }
    } else {
      if (n === 1n) {
        out.push('Even');
      } else {
        out.push('Impossible');
      }
    }
  }

  console.log(out.join('\n'));
}

solve();

