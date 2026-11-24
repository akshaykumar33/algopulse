const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
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
  const tVal = nextBigInt();
  if (tVal === null) return;
  const t = Number(tVal);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = Number(nextBigInt());
    const s = nextBigInt();
    const a = new Array(n);
    for (let i = 0; i < n; i++) a[i] = nextBigInt();
    let dp0 = 0n;
    let dp1 = 0n;
    let prevY0 = a[0];
    let prevY1 = a[0];
    for (let i = 1; i < n - 1; i++) {
      let x0, y0, x1, y1;
      if (a[i] <= s) {
        x0 = 0n;
        y0 = a[i];
        x1 = a[i];
        y1 = 0n;
      } else {
        x0 = s;
        y0 = a[i] - s;
        x1 = a[i] - s;
        y1 = s;
      }
      const c00 = dp0 + prevY0 * x0;
      const c10 = dp1 + prevY1 * x0;
      const nextDp0 = c00 < c10 ? c00 : c10;
      const c01 = dp0 + prevY0 * x1;
      const c11 = dp1 + prevY1 * x1;
      const nextDp1 = c01 < c11 ? c01 : c11;
      dp0 = nextDp0;
      dp1 = nextDp1;
      prevY0 = y0;
      prevY1 = y1;
    }
    const end0 = dp0 + prevY0 * a[n - 1];
    const end1 = dp1 + prevY1 * a[n - 1];
    const ans = end0 < end1 ? end0 : end1;
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}

solve();
