const fs = require('fs');

function gcd(a, b) {
  while (b) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const [n, m] = input[lineIdx++].split(/\s+/).map(Number);
    const s = gcd(n, m);
    const ans = (n / s) * (m / s);
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
