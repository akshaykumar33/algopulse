const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const x = parseInt(tokens[ptr++], 10);
    let mn = 1e18;
    for (let i = 0; i < n; i++) {
      const a = parseInt(tokens[ptr++], 10);
      if (a < mn) mn = a;
    }
    const ans = Math.max(n, Math.floor((x + mn - 1) / mn));
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
