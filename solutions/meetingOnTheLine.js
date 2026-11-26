'use strict';
const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sgn = 1;
    if (buf[pos] === 45) {
      sgn = -1;
      pos++;
    }
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res * sgn;
  }

  const tVal = nextInt();
  if (tVal === null) return;
  let t = tVal;
  const out = [];

  while (t--) {
    const n = nextInt();
    const x = new Int32Array(n);
    for (let i = 0; i < n; i++) x[i] = nextInt();
    let maxPlus = -Infinity;
    let minMinus = Infinity;
    for (let i = 0; i < n; i++) {
      const time = nextInt();
      const p = x[i] + time;
      const m = x[i] - time;
      if (p > maxPlus) maxPlus = p;
      if (m < minMinus) minMinus = m;
    }
    const ans = (maxPlus + minMinus) / 2;
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
