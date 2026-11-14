const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    if (n <= 2n) {
      out.push('1');
    } else {
      const ans = 1n + (n - 1n) * (n - 2n);
      out.push(ans.toString());
    }
  }
  console.log(out.join('\n'));
}

solve();
