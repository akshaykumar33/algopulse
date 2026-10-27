const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const c = new Float64Array(n);
    const p = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      c[i] = parseFloat(tokens[ptr++]);
      p[i] = parseFloat(tokens[ptr++]);
    }

    let dp = 0;
    for (let i = n - 1; i >= 0; i--) {
      const take = c[i] + (1 - p[i] / 100) * dp;
      if (take > dp) {
        dp = take;
      }
    }
    out.push(dp.toFixed(10));
  }
  console.log(out.join('\n'));
}

solve();
