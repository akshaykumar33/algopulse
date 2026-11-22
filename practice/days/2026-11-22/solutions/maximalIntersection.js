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
  const n = nextInt();
  if (n === null) return;
  const l = new Int32Array(n);
  const r = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    l[i] = nextInt();
    r[i] = nextInt();
  }
  const prefL = new Int32Array(n);
  const prefR = new Int32Array(n);
  const suffL = new Int32Array(n);
  const suffR = new Int32Array(n);
  prefL[0] = l[0];
  prefR[0] = r[0];
  for (let i = 1; i < n; i++) {
    prefL[i] = Math.max(prefL[i - 1], l[i]);
    prefR[i] = Math.min(prefR[i - 1], r[i]);
  }
  suffL[n - 1] = l[n - 1];
  suffR[n - 1] = r[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    suffL[i] = Math.max(suffL[i + 1], l[i]);
    suffR[i] = Math.min(suffR[i + 1], r[i]);
  }
  let best = 0;
  for (let i = 0; i < n; i++) {
    let curL = -Infinity, curR = Infinity;
    if (i > 0) {
      curL = Math.max(curL, prefL[i - 1]);
      curR = Math.min(curR, prefR[i - 1]);
    }
    if (i < n - 1) {
      curL = Math.max(curL, suffL[i + 1]);
      curR = Math.min(curR, suffR[i + 1]);
    }
    const len = Math.max(0, curR - curL);
    if (len > best) best = len;
  }
  console.log(best);
}
solve();