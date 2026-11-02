const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let mn = null;
    for (let i = 0; i < n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      if (mn === null || val < mn) {
        mn = val;
      }
    }
    let ans = BigInt(n - 1) * BigInt(mn);
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
