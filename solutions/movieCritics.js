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
  const k = nextInt();
  const b = [];
  for (let i = 0; i < n; i++) {
    const v = nextInt();
    if (b.length === 0 || b[b.length - 1] !== v) {
      b.push(v);
    }
  }
  const m = b.length;
  const save = new Int32Array(k + 1);
  for (let i = 0; i < m; i++) {
    const x = b[i];
    let gain = 0;
    if (i > 0 && i < m - 1) {
      if (b[i - 1] === b[i + 1]) gain = 2;
      else gain = 1;
    } else {
      gain = 1;
    }
    save[x] += gain;
  }
  let best = 1;
  let maxSave = -1;
  for (let i = 1; i <= k; i++) {
    if (save[i] > maxSave) {
      maxSave = save[i];
      best = i;
    }
  }
  console.log(best);
}

solve();
