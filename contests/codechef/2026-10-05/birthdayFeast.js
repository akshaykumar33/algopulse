const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let res = 0;
    while (offset < buffer.length && buffer[offset] >= 48 && buffer[offset] <= 57) {
      res = res * 10 + (buffer[offset] - 48);
      offset++;
    }
    return res;
  }

  const n = readInt();
  if (n === null) return;
  const m = readInt();

  const a = new Int32Array(n);
  let maxCap = 0;
  for (let i = 0; i < n; i++) {
    a[i] = readInt();
    if (a[i] > maxCap) {
      maxCap = a[i];
    }
  }

  const b = new Int32Array(m);
  for (let j = 0; j < m; j++) {
    b[j] = readInt();
  }

  const c = new Int32Array(m);
  for (let j = 0; j < m; j++) {
    c[j] = readInt();
  }

  const INF = 1e15;
  const dp = new Float64Array(maxCap + 1).fill(INF);
  dp[0] = 0;

  for (let j = 0; j < m; j++) {
    const cap = b[j];
    const cost = c[j];
    for (let w = cap; w <= maxCap; w++) {
      if (dp[w - cap] + cost < dp[w]) {
        dp[w] = dp[w - cap] + cost;
      }
    }
  }

  let totalCost = 0;
  for (let i = 0; i < n; i++) {
    totalCost += dp[a[i]];
  }

  console.log(totalCost);
}

solve();
