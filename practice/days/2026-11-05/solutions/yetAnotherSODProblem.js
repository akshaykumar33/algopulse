const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    const L = BigInt(tokens[ptr++]);
    const R = BigInt(tokens[ptr++]);
    
    const count3 = (n) => n / 3n;
    const ans = count3(R) - count3(L - 1n);
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
