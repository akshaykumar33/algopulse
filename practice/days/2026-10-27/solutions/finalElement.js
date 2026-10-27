const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = n - 1;
    let ans = 0;
    for (let i = 0; i < n; i++) {
      const val = parseInt(tokens[ptr++], 10);
      if ((i & m) === i) {
        ans ^= val;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
