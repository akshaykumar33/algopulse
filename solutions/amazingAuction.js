const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const k = parseInt(input[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(input[ptr++], 10));
    const c = [];
    for (let i = 0; i < n; i++) c.push(parseInt(input[ptr++], 10));
    const uniqueA = Array.from(new Set(a));
    let maxProfit = -Infinity;
    for (let u = 0; u < uniqueA.length; u++) {
      const x = uniqueA[u];
      const costs = [];
      for (let i = 0; i < n; i++) {
        if (a[i] >= x) costs.push(0);
        else costs.push((x - a[i]) * c[i]);
      }
      costs.sort((p, q) => p - q);
      let costSum = 0;
      for (let i = 0; i < k + 1; i++) costSum += costs[i];
      const profit = k * x - costSum;
      if (profit > maxProfit) maxProfit = profit;
    }
    out.push(maxProfit);
  }
  console.log(out.join('\n'));
}

solve();
