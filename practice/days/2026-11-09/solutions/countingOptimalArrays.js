const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const mod = 998244353n;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = BigInt(tokens[ptr++]);
    const m = BigInt(tokens[ptr++]);

    if (n === 1n) {
      out.push(((m + 1n) % mod).toString());
    } else {
      let p = 1n;
      while (p * 2n <= m) {
        p *= 2n;
      }
      const ans = (2n * (m - p + 1n)) % mod;
      out.push(ans.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();
