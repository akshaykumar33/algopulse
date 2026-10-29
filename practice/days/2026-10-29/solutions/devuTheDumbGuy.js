const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;

  const n = parseInt(input[0], 10);
  let x = BigInt(input[1]);

  const c = new Array(n);
  for (let i = 0; i < n; i++) {
    c[i] = BigInt(input[i + 2]);
  }

  c.sort((u, v) => (u < v ? -1 : u > v ? 1 : 0));

  let total = 0n;
  for (let i = 0; i < n; i++) {
    total += c[i] * x;
    if (x > 1n) {
      x--;
    }
  }

  console.log(total.toString());
}

solve();
