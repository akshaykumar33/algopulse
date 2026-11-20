const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = BigInt(input[ptr++]);
    const b = BigInt(input[ptr++]);
    const x0 = n / (2n * b);
    let best = 0n;
    for (let dx = -2n; dx <= 2n; dx++) {
      const x = x0 + dx;
      if (x >= 0n && x * b <= n) {
        const val = x * (n - x * b);
        if (val > best) best = val;
      }
    }
    out.push(best.toString());
  }
  console.log(out.join('\n'));
}
solve();