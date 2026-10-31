const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const f = new Array(n);
    for (let j = 0; j < n; j++) {
      f[j] = parseInt(tokens[ptr++], 10);
    }
    const p = new Array(n);
    for (let j = 0; j < n; j++) {
      p[j] = parseInt(tokens[ptr++], 10);
    }
    const sum = new Array(m + 1).fill(0);
    const present = new Array(m + 1).fill(false);
    for (let j = 0; j < n; j++) {
      sum[f[j]] += p[j];
      present[f[j]] = true;
    }
    let minCost = Infinity;
    for (let j = 1; j <= m; j++) {
      if (present[j]) {
        if (sum[j] < minCost) {
          minCost = sum[j];
        }
      }
    }
    out.push(minCost);
  }
  console.log(out.join('\n'));
}
solve();
