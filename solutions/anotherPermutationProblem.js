const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
  if (!input.length || !input[0]) return;
  let lineIdx = 0;
  const t = parseInt(input[lineIdx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (lineIdx >= input.length) break;
    const n = parseInt(input[lineIdx++], 10);
    let maxCost = 0;

    for (let k = 0; k <= n; k++) {
      let sum = 0;
      let maxProd = 0;

      for (let i = 1; i <= k; i++) {
        const prod = i * i;
        sum += prod;
        if (prod > maxProd) maxProd = prod;
      }

      for (let i = k + 1; i <= n; i++) {
        const val = n - (i - (k + 1));
        const prod = i * val;
        sum += prod;
        if (prod > maxProd) maxProd = prod;
      }

      const cost = sum - maxProd;
      if (cost > maxCost) maxCost = cost;
    }

    out.push(maxCost);
  }

  console.log(out.join('\n'));
}

solve();
