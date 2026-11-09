const fs = require('fs');

function gcd(a, b) {
  while (b > 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = BigInt(tokens[ptr++]);
    const y = BigInt(tokens[ptr++]);
    const k = BigInt(tokens[ptr++]);
    const g = gcd(x, y);

    if (k >= 2n) {
      out.push((2n * g).toString());
    } else {
      const minVal = x < y ? x : y;
      out.push((g + minVal).toString());
    }
  }

  console.log(out.join('\n'));
}

solve();
