const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 5) return;
  const c = parseInt(input[0], 10);
  const d = parseInt(input[1], 10);
  const n = parseInt(input[2], 10);
  const m = parseInt(input[3], 10);
  const k = parseInt(input[4], 10);

  const rem = Math.max(0, n * m - k);
  if (rem === 0) {
    console.log(0);
    return;
  }

  let minCost = Infinity;
  const maxPacks = Math.ceil(rem / n);

  for (let x = 0; x <= maxPacks; x++) {
    const covered = x * n;
    const left = Math.max(0, rem - covered);
    const cost = x * c + left * d;
    if (cost < minCost) minCost = cost;
  }

  console.log(minCost);
}

solve();
