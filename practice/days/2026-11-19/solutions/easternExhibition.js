const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const x = new Float64Array(n);
    const y = new Float64Array(n);

    for (let i = 0; i < n; i++) {
      x[i] = Number(input[ptr++]);
      y[i] = Number(input[ptr++]);
    }

    if (n % 2 === 1) {
      out.push(1);
    } else {
      x.sort();
      y.sort();
      const mid = n >> 1;
      const xDiff = BigInt(Math.round(x[mid] - x[mid - 1] + 1));
      const yDiff = BigInt(Math.round(y[mid] - y[mid - 1] + 1));
      const ans = (xDiff * yDiff).toString();
      out.push(ans);
    }
  }

  console.log(out.join('\n'));
}

solve();
