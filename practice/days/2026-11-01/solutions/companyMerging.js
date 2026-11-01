const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) {
      pos++;
    }
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;

  const m = new Int32Array(n);
  const maxSal = new Int32Array(n);
  let globalMax = 0;

  for (let i = 0; i < n; i++) {
    const count = nextInt();
    m[i] = count;
    let localMax = 0;
    for (let j = 0; j < count; j++) {
      const sal = nextInt();
      if (sal > localMax) localMax = sal;
    }
    maxSal[i] = localMax;
    if (localMax > globalMax) globalMax = localMax;
  }

  let totalCost = 0n;
  const gMax = BigInt(globalMax);
  for (let i = 0; i < n; i++) {
    totalCost += (gMax - BigInt(maxSal[i])) * BigInt(m[i]);
  }

  console.log(totalCost.toString());
}

solve();
