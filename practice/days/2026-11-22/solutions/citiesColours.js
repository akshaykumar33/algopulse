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
  for (let t = 0; t < T; t++) {
    const n = nextInt(), k = nextInt();
    const w = new Float64Array(n);
    const c = new Int32Array(n);
    let totalW = 0;
    for (let i = 0; i < n; i++) {
      w[i] = nextInt();
      if (i > 0) totalW += w[i];
    }
    for (let i = 0; i < n; i++) c[i] = nextInt();
    const best = new Map();
    const prefC = new Map();
    let dpPrev = 0;
    for (let i = 1; i < n; i++) {
      const col = c[i];
      const curW = w[i];
      const oldPref = prefC.get(col) || 0;
      const newPref = oldPref + curW;
      prefC.set(col, newPref);
      let dpCur = dpPrev;
      if (!best.has(col)) {
        best.set(col, dpPrev - 2 * oldPref);
      } else {
        best.set(col, Math.max(best.get(col), dpPrev - 2 * oldPref));
      }
      const option = best.get(col) + 2 * newPref - k;
      if (option > dpCur) dpCur = option;
      dpPrev = dpCur;
    }
    out.push(Math.round(dpPrev - totalW));
  }
  console.log(out.join('\n'));
}
solve();