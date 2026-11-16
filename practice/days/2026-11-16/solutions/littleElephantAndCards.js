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

  const t = nextInt();
  if (t === null) return;

  const MOD = 1000000007n;
  const C = Array.from({ length: 1005 }, () => new BigInt64Array(1005));
  for (let i = 0; i <= 1000; i++) {
    C[i][0] = 1n;
    for (let j = 1; j <= i; j++) {
      C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
    }
  }

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    if (n === null) break;
    for (let i = 0; i < n; i++) nextInt();

    let ans = 0n;
    const half = Math.floor(n / 2);
    for (let k = half + 1; k <= n; k++) {
      ans = (ans + C[n][k]) % MOD;
    }
    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
