const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const MOD = 1000000007;
  const maxN = 300005;
  const dp = new Int32Array(maxN);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i < maxN; i++) {
    dp[i] = (dp[i - 1] + ((2 * (i - 1)) % MOD) * dp[i - 2]) % MOD;
  }
  const t = nextInt();
  if (t === null) return;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = nextInt();
    let rem = n;
    for (let i = 0; i < k; i++) {
      const r = nextInt(), c = nextInt();
      rem -= (r === c ? 1 : 2);
    }
    out.push(dp[rem]);
  }
  console.log(out.join('\n'));
}

solve();
