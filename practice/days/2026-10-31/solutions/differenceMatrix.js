const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const n2 = n * n;
    const vals = [];
    for (let i = 1; i <= n2; i += 2) vals.push(i);
    for (let i = 2; i <= n2; i += 2) vals.push(i);

    for (let r = 0; r < n; r++) {
      out.push(vals.slice(r * n, (r + 1) * n).join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
