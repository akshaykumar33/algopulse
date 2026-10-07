const fs = require('fs');

function gcd(a, b) {
  while (b !== 0n) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = BigInt(tokens[ptr++]);
    const y = BigInt(tokens[ptr++]);
    const k = BigInt(tokens[ptr++]);

    const g = gcd(x, y);
    const stepX = x / g;
    const stepY = y / g;

    if (stepX <= k && stepY <= k) {
      out.push('1');
    } else {
      out.push('2');
    }
  }

  console.log(out.join('\n'));
}

solve();
