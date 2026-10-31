const fs = require('fs');

function gcd(a, b) {
  while (b > 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a, b) {
  if (a === 0n || b === 0n) return 0n;
  return (a / gcd(a, b)) * b;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const b = [];
    for (let i = 0; i < n; i++) {
      b.push(BigInt(tokens[ptr++]));
    }

    let x = 1n;
    for (let i = 0; i < n - 1; i++) {
      const g = gcd(b[i], b[i + 1]);
      const need = b[i] / g;
      x = lcm(x, need);
    }

    out.push(x.toString());
  }

  console.log(out.join('\n'));
}

solve();
