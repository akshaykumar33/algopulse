const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) {
      a.push(parseInt(tokens[ptr++], 10));
    }
    let minCost = Infinity;
    for (let i = 0; i < n - 1; i++) {
      const cost = a[i] + a[i + 1];
      if (cost < minCost) minCost = cost;
    }
    out.push(minCost);
  }

  console.log(out.join('\n'));
}

solve();
