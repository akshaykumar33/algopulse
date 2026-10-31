const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const K = parseInt(tokens[ptr++], 10);
    const w = [];
    for (let i = 0; i < n; i++) {
      w.push(parseInt(tokens[ptr++], 10));
    }

    w.sort((a, b) => a - b);
    const k = Math.min(K, n - K);

    let sum1 = 0;
    for (let i = 0; i < k; i++) sum1 += w[i];

    let sum2 = 0;
    for (let i = k; i < n; i++) sum2 += w[i];

    out.push(sum2 - sum1);
  }

  console.log(out.join('\n'));
}

solve();
