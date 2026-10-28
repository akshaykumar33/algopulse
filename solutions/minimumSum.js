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
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let g = BigInt(tokens[ptr++]);
    for (let i = 1; i < n; i++) {
      g = gcd(g, BigInt(tokens[ptr++]));
    }

    const ans = BigInt(n) * g;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();

