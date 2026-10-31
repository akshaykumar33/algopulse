const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let odd = 0;
    let even = 0;
    for (let i = 0; i < n; i++) {
      const x = parseInt(tokens[ptr++], 10);
      if (x % 2 === 0) even++;
      else odd++;
    }

    const ans = BigInt(odd) * BigInt(even);
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
