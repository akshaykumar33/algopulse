const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }
  const out = [];
  while (true) {
    const n = nextInt();
    if (n === null) break;
    const m = nextInt();
    const a = new Int32Array(n);
    let maxA = 0;
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
      if (a[i] > maxA) maxA = a[i];
    }
    const b = new Int32Array(m);
    for (let i = 0; i < m; i++) b[i] = nextInt();
    const c = new Int32Array(m);
    for (let i = 0; i < m; i++) c[i] = nextInt();

    const dp = new Int32Array(maxA + 1);
    dp.fill(1e9);
    dp[0] = 0;
    for (let w = 1; w <= maxA; w++) {
      for (let j = 0; j < m; j++) {
        if (w >= b[j]) {
          const cost = dp[w - b[j]] + c[j];
          if (cost < dp[w]) dp[w] = cost;
        }
      }
    }
    let total = 0;
    for (let i = 0; i < n; i++) {
      total += dp[a[i]];
    }
    out.push(total);
  }
  console.log(out.join('\n'));
}

solve();
