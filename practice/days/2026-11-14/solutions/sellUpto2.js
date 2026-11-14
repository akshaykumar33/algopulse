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
  const t = nextInt();
  if (t === null) return;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    let dp = new Float64Array(n + 2);
    dp.fill(-1);
    dp[0] = 0;
    for (let i = 0; i < n; i++) {
      const next = new Float64Array(n + 2);
      next.fill(-1);
      const price = a[i];
      for (let w = 0; w <= i; w++) {
        if (dp[w] < 0) continue;
        const have = w + 1;
        const maxSell = have < 2 ? have : 2;
        for (let s = 0; s <= maxSell; s++) {
          const rem = have - s;
          const val = dp[w] + s * price;
          if (val > next[rem]) next[rem] = val;
        }
      }
      dp = next;
    }
    let ans = 0;
    for (let w = 0; w <= n; w++) {
      if (dp[w] > ans) ans = dp[w];
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
