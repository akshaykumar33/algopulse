const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;

  const t = parseInt(input[0], 10);
  let ptr = 1;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    const r = BigInt(input[ptr++]);

    if (r < n) {
      const ans = (r * (r + 1n)) / 2n;
      out.push(ans.toString());
    } else {
      const ans = (n * (n - 1n)) / 2n + 1n;
      out.push(ans.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();
