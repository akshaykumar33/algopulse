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
  const f = new Int32Array(200015);
  for (let i = 0; i < 10; i++) {
    f[i] = 1;
  }
  for (let i = 10; i <= 200010; i++) {
    const val = f[i - 9] + f[i - 10];
    f[i] = val >= MOD ? val - MOD : val;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    let n = nextInt();
    const m = nextInt();
    let ans = 0;
    while (n > 0) {
      const d = n % 10;
      ans += f[m + d];
      if (ans >= MOD) ans -= MOD;
      n = Math.floor(n / 10);
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
