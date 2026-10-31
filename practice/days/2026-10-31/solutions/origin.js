const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const n = BigInt(tokens[ptr++]);
    const full = n / 9n;
    const rem = n % 9n;
    const ans = full * 45n + (rem * (rem + 1n)) / 2n;
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
