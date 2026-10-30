const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const l = BigInt(input[ptr++]);
    const r = BigInt(input[ptr++]);
    const odds = ((r + 1n) / 2n) - (l / 2n);
    if (odds % 2n === 1n) {
      out.push('Odd');
    } else {
      out.push('Even');
    }
  }

  console.log(out.join('\n'));
}

solve();

