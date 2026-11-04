const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    if (n === 1n) {
      out.push('0');
    } else if (n === 2n) {
      out.push('4');
    } else if (n === 3n) {
      out.push('42');
    } else {
      const res = 2n * n * (n - 1n) + 5n * n * (n - 1n) * (n - 2n) + 2n * n * (n - 1n) * (n - 2n) * (n - 3n);
      out.push(res.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();
