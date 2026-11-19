const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = BigInt(input[ptr++]);
    const v = BigInt(input[ptr++]);
    const maxCost = ((n - 1n) * n) / 2n;
    let minCost;
    if (v >= n - 1n) {
      minCost = n - 1n;
    } else {
      const rem = n - v;
      minCost = v + ((rem * (rem + 1n)) / 2n) - 1n;
    }
    out.push(`${maxCost} ${minCost}`);
  }

  console.log(out.join('\n'));
}

solve();
