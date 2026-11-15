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

    const m = 1n << n;
    const ans = (m - 1n) * (m - 2n);
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
