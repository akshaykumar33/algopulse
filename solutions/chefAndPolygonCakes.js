const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let ptr = 0;

function gcd(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

function solve() {
  if (!tokens[0]) return;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(tokens[ptr++]);
    const a = BigInt(tokens[ptr++]);
    const k = BigInt(tokens[ptr++]);
    const den = n * (n - 1n);
    const num = a * den + (k - 1n) * (360n * (n - 2n) - 2n * n * a);
    const g = gcd(num, den);
    out.push((num / g) + ' ' + (den / g));
  }
  console.log(out.join('\n'));
}

solve();
