const fs = require('fs');

function solve() {
  const token = fs.readFileSync(0, 'utf-8').trim();
  if (!token) return;
  const n = parseInt(token, 10);

  function getMinAB(remA, remB) {
    let best = Infinity;
    const maxP1 = Math.ceil(remB / 2);
    for (let p1 = 0; p1 <= maxP1; p1++) {
      const needB = Math.max(0, remB - 2 * p1);
      const p2 = needB;
      const gotA = p1 + 2 * p2;
      const needA = Math.max(0, remA - gotA);
      const p3 = Math.ceil(needA / 3);
      const cost = p1 + p2 + p3;
      if (cost < best) best = cost;
    }
    return best;
  }

  let ans = Infinity;
  for (let x = 0; 2 * x <= n; x++) {
    const remC = n - 2 * x;
    for (let y = 0; y <= remC; y++) {
      const z = remC - y;
      const remB = Math.max(0, n - y);
      const remA = Math.max(0, n - z);
      const total = x + y + z + getMinAB(remA, remB);
      if (total < ans) ans = total;
    }
  }

  console.log(ans);
}

solve();
