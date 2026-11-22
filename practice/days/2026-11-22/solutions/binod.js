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
  function nextBigInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0n;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const T = nextInt();
  if (T === null) return;
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt(), q = nextInt();
    const pref = Array.from({ length: 60 }, () => new Int32Array(n + 1));
    for (let i = 1; i <= n; i++) {
      const v = nextBigInt();
      for (let k = 0; k < 60; k++) {
        pref[k][i] = pref[k][i - 1] + (Number((v >> BigInt(k)) & 1n));
      }
    }
    for (let i = 0; i < q; i++) {
      const k = nextInt();
      const l1 = nextInt(), r1 = nextInt(), l2 = nextInt(), r2 = nextInt();
      const ones1 = pref[k][r1] - pref[k][l1 - 1];
      const zeros1 = (r1 - l1 + 1) - ones1;
      const ones2 = pref[k][r2] - pref[k][l2 - 1];
      const zeros2 = (r2 - l2 + 1) - ones2;
      const ans = BigInt(ones1) * BigInt(zeros2) + BigInt(zeros1) * BigInt(ones2);
      out.push(ans.toString());
    }
  }
  console.log(out.join('\n'));
}
solve();