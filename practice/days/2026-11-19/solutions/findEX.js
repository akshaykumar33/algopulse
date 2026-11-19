const fs = require('fs');

function gcd(a, b) {
  while (b !== 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const a = BigInt(input[ptr++]);
    const b = BigInt(input[ptr++]);
    const c = BigInt(input[ptr++]);
    const d = BigInt(input[ptr++]);

    const r = a % b;
    if ((r + 1n) % b === (r + 1n) % d) {
      out.push('1');
    } else {
      const g = gcd(b, d);
      const lcm = (b / g) * d;
      const ans = lcm - r;
      out.push(ans.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();
