const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);

    const arrs = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      let sum = 0n;
      for (let j = 0; j < m; j++) {
        const val = BigInt(input[ptr++]);
        row.push(val);
        sum += val;
      }
      arrs.push({ sum, row });
    }

    arrs.sort((a, b) => (b.sum > a.sum ? 1 : b.sum < a.sum ? -1 : 0));

    let total = 0n;
    let coeff = BigInt(n * m);

    for (let i = 0; i < n; i++) {
      const r = arrs[i].row;
      for (let j = 0; j < m; j++) {
        total += r[j] * coeff;
        coeff--;
      }
    }

    out.push(total.toString());
  }

  console.log(out.join('\n'));
}

solve();
