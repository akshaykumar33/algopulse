const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(tokens[ptr++]);
    const m = BigInt(tokens[ptr++]);

    if (n === 1n || m === 1n) {
      if ((n === 1n && m === 2n) || (n === 2n && m === 1n)) {
        out.push('Yes');
      } else {
        out.push('No');
      }
    } else {
      if (n % 2n === 0n || m % 2n === 0n) {
        out.push('Yes');
      } else {
        out.push('No');
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
