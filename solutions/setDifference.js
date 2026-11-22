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
  const T = nextInt();
  if (T === null) return;
  const MOD = 1000000007n;
  const MAX = 100005;
  const pow2 = new BigInt64Array(MAX);
  pow2[0] = 1n;
  for (let i = 1; i < MAX; i++) pow2[i] = (pow2[i - 1] * 2n) % MOD;
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    const s = new Int32Array(n);
    for (let i = 0; i < n; i++) s[i] = nextInt();
    s.sort();
    let ans = 0n;
    for (let i = 0; i < n; i++) {
      const v = BigInt(s[i]);
      const add = pow2[i];
      const sub = pow2[n - 1 - i];
      const diff = (add - sub + MOD) % MOD;
      ans = (ans + v * diff) % MOD;
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}
solve();