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
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt(), p = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    const tL = new Int32Array(n).fill(1e9);
    const tR = new Int32Array(n).fill(1e9);
    let curMax = 0, hasVolcano = false;
    for (let i = 0; i < n; i++) {
      if (a[i] === 0) {
        hasVolcano = true;
        curMax = 0;
        tL[i] = 0;
      } else if (hasVolcano) {
        if (a[i] > curMax) curMax = a[i];
        tL[i] = Math.ceil(curMax / p);
      }
    }
    curMax = 0; hasVolcano = false;
    for (let i = n - 1; i >= 0; i--) {
      if (a[i] === 0) {
        hasVolcano = true;
        curMax = 0;
        tR[i] = 0;
      } else if (hasVolcano) {
        if (a[i] > curMax) curMax = a[i];
        tR[i] = Math.ceil(curMax / p);
      }
    }
    const ans = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      ans[i] = Math.min(tL[i], tR[i]);
    }
    out.push(Array.from(ans).join(' '));
  }
  console.log(out.join('\n'));
}
solve();