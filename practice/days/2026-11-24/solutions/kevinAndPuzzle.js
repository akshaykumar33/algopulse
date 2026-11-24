const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const tVal = nextInt();
  if (tVal === null) return;
  const t = tVal;
  const MOD = 998244353;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const arr = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) arr[i] = nextInt();
    const dp0 = new Int32Array(n + 1);
    const dp1 = new Int32Array(n + 1);
    dp0[0] = 1;
    for (let i = 1; i <= n; i++) {
      dp1[i] = dp0[i - 1];
      let sum0 = 0;
      if (arr[i] === arr[i - 1]) {
        sum0 = (sum0 + dp0[i - 1]) % MOD;
      }
      if (i >= 2 && arr[i] === arr[i - 2] + 1) {
        sum0 = (sum0 + dp1[i - 1]) % MOD;
      }
      dp0[i] = sum0;
    }
    const ans = (dp0[n] + dp1[n]) % MOD;
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
