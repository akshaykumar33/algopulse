const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = new Int32Array(n);
  const maxSal = new Int32Array(n);
  let globalMax = 0;

  for (let i = 0; i < n; i++) {
    const count = parseInt(tokens[ptr++], 10);
    m[i] = count;
    let localMax = 0;
    for (let j = 0; j < count; j++) {
      const sal = parseInt(tokens[ptr++], 10);
      if (sal > localMax) localMax = sal;
    }
    maxSal[i] = localMax;
    if (localMax > globalMax) globalMax = localMax;
  }

  let totalCost = 0n;
  const gMax = BigInt(globalMax);
  for (let i = 0; i < n; i++) {
    const diff = gMax - BigInt(maxSal[i]);
    totalCost += diff * BigInt(m[i]);
  }

  console.log(totalCost.toString());
}

solve();

