const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    if ((n & 1n) === 1n) {
      const ans = (n + 1n) / 2n;
      out.push(ans.toString());
    } else {
      const ans = n - n / 4n;
      out.push(ans.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();

