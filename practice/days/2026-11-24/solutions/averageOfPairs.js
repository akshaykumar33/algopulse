const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1;
    if (buf[pos] === 45) {
      sign = -1;
      pos++;
    }
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }
  const T = nextInt();
  if (T === null) return;
  const out = [];
  const freq = new Int32Array(2001);
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    freq.fill(0);
    let minVal = 2001;
    let maxVal = -1;
    for (let i = 0; i < n; i++) {
      const val = nextInt() + 1000;
      freq[val]++;
      if (val < minVal) minVal = val;
      if (val > maxVal) maxVal = val;
    }
    let ans = 0;
    for (let u = minVal; u <= maxVal; u++) {
      const cntU = freq[u];
      if (cntU === 0) continue;
      ans += Math.floor((cntU * (cntU - 1)) / 2);
      for (let v = u + 2; v <= maxVal; v += 2) {
        const cntV = freq[v];
        if (cntV === 0) continue;
        const mid = (u + v) >> 1;
        if (freq[mid] > 0) {
          ans += cntU * cntV;
        }
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
