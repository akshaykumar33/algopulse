const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(input[ptr++]);
    const m = parseInt(input[ptr++], 10);

    let sumQ = 0n;
    for (let i = 0; i < m; i++) {
      sumQ += BigInt(input[ptr++]);
    }

    const total = n * (n + 1n) / 2n;
    const ans = total - sumQ;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
