const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let pos = 0;
  const t = parseInt(tokens[pos++], 10);
  const mod = 1000000007n;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const m = parseInt(tokens[pos++], 10);
    const n = parseInt(tokens[pos++], 10);

    let sumA = 0n;
    for (let i = 0; i < m; i++) {
      sumA = (sumA + BigInt(tokens[pos++])) % mod;
    }

    let sumB = 0n;
    for (let i = 0; i < m; i++) {
      sumB = (sumB + BigInt(tokens[pos++])) % mod;
    }

    let ca = 0n;
    let cb = 0n;
    if (n === 1) {
      ca = 1n;
      cb = 0n;
    } else if (n === 2) {
      ca = 0n;
      cb = 1n;
    } else {
      let f1 = 1n;
      let f2 = 1n;
      for (let i = 3; i < n; i++) {
        const nxt = (f1 + f2) % mod;
        f1 = f2;
        f2 = nxt;
      }
      ca = f1;
      cb = f2;
    }

    const bm = BigInt(m);
    const termA = (ca * sumA) % mod;
    const termB = (cb * sumB) % mod;
    const total = (bm * ((termA + termB) % mod)) % mod;
    out.push(total.toString());
  }

  console.log(out.join('\n'));
}

solve();
