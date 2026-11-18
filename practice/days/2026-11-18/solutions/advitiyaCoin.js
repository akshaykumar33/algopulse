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

  const tVal = nextInt();
  if (tVal === null) return;
  const t = tVal;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = nextInt();
    const p = new Int32Array(n);
    for (let i = 0; i < n; i++) p[i] = nextInt();

    let trades = 0;
    let i = 0;

    while (i < n) {
      let minVal = p[i];
      let maxVal = p[i];
      let found = false;

      for (let j = i + 1; j < n; j++) {
        if (p[j] - minVal > k || maxVal - p[j] > k) {
          trades++;
          i = j + 1;
          found = true;
          break;
        }
        if (p[j] < minVal) minVal = p[j];
        if (p[j] > maxVal) maxVal = p[j];
      }

      if (!found) break;
    }

    out.push(trades);
  }

  console.log(out.join('\n'));
}

solve();
