const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let pos = 0;
  const t = parseInt(tokens[pos++], 10);
  const out = [];

  const fib = [0, 1];
  for (let i = 2; i < 60; i++) {
    fib.push((fib[i - 1] + fib[i - 2]) % 10);
  }

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(tokens[pos++]);
    let p = 1n;
    while ((p << 1n) <= n) {
      p <<= 1n;
    }
    const idx = Number((p - 1n) % 60n);
    out.push(fib[idx]);
  }

  console.log(out.join('\n'));
}

solve();
