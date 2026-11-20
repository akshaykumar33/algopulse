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
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(input[ptr++], 10);

    const limit = Number(k % (3n * BigInt(n)));
    for (let i = 0; i < limit; i++) {
      const p = i % n;
      const q = n - 1 - p;
      a[p] ^= a[q];
    }
    if (n % 2 === 1 && k > BigInt(n >> 1)) {
      a[n >> 1] = 0;
    }
    out.push(Array.from(a).join(' '));
  }
  console.log(out.join('\n'));
}
solve();