'use strict';
const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const tVal = nextInt();
  if (tVal === null) return;
  let t = tVal;
  const out = [];

  while (t--) {
    const n = nextInt();
    const k = nextInt();
    const rem = n - (k - 3);
    const res = [];
    for (let i = 0; i < k - 3; i++) {
      res.push(1);
    }

    if (rem % 2 === 1) {
      res.push(1, (rem - 1) / 2, (rem - 1) / 2);
    } else if (rem % 4 === 0) {
      res.push(rem / 2, rem / 4, rem / 4);
    } else {
      res.push(2, (rem - 2) / 2, (rem - 2) / 2);
    }

    out.push(res.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
