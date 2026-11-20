const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const k = BigInt(input[ptr++]);
    const a = [];
    let sum = 0n;
    for (let i = 0; i < n; i++) {
      const v = BigInt(input[ptr++]);
      a.push(v);
      sum += v;
    }
    a.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));
    let l = a[0], r = a[1];
    for (let i = 0n; i < k; i++) {
      const avg = (l + r + 1n) / 2n;
      sum += avg;
      if (avg < r) {
        r = avg;
      } else {
        const rem = k - 1n - i;
        sum += rem * r;
        break;
      }
    }
    out.push(sum.toString());
  }
  console.log(out.join('\n'));
}
solve();