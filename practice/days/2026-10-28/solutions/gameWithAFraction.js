const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const p = BigInt(tokens[ptr++]);
    const q = BigInt(tokens[ptr++]);
    if (2n * q <= 3n * p && p < q) {
      out.push('Bob');
    } else {
      out.push('Alice');
    }
  }
  console.log(out.join('\n'));
}

solve();
