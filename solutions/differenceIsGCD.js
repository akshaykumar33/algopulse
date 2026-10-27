const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const limit = Math.floor(n / 2);
    let sum = 0;

    let l = 1;
    while (l <= limit) {
      const v = Math.floor(n / l);
      const r = Math.min(limit, Math.floor(n / v));
      sum += (r - l + 1) * v;
      l = r + 1;
    }

    const ans = sum - limit;
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
