const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const a = new BigInt64Array(n);
  for (let i = 0; i < n; i++) a[i] = BigInt(tokens[ptr++]);
  const m = parseInt(tokens[ptr++], 10);
  let cur = 0n;
  const out = [];
  for (let i = 0; i < m; i++) {
    const w = parseInt(tokens[ptr++], 10);
    const h = BigInt(tokens[ptr++]);
    const base = a[w - 1] > cur ? a[w - 1] : cur;
    out.push(base.toString());
    cur = base + h;
  }
  console.log(out.join('\n'));
}

solve();
