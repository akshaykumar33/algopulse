const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let sum = 0n;
    for (let i = 0; i < n; i++) {
      sum += BigInt(tokens[ptr++]);
    }
    const rem = sum % BigInt(n);
    const ans = rem * (BigInt(n) - rem);
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
