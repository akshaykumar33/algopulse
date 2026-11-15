const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    const k = BigInt(input[ptr++]);
    const l = BigInt(input[ptr++]);

    if (k + l > n) {
      const ans = (n - k) * (n - l);
      out.push(ans.toString());
    } else {
      const m = n - k - l;
      const ans = (m * (m - 1n)) / 2n + m * (k + l) + k * l;
      out.push(ans.toString());
    }
  }
  console.log(out.join('\n'));
}

solve();
