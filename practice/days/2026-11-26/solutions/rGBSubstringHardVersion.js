'use strict';
const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextToken() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    const start = pos;
    while (pos < buf.length && buf[pos] > 32) pos++;
    return buf.toString('ascii', start, pos);
  }

  const qStr = nextToken();
  if (!qStr) return;
  let q = parseInt(qStr, 10);
  const out = [];

  const pat = [82, 71, 66];

  while (q--) {
    const n = parseInt(nextToken(), 10);
    const k = parseInt(nextToken(), 10);
    const s = nextToken();

    let minDiff = k;
    for (let c = 0; c < 3; c++) {
      let cur = 0;
      for (let i = 0; i < k; i++) {
        if (s.charCodeAt(i) !== pat[(i + c) % 3]) cur++;
      }
      if (cur < minDiff) minDiff = cur;

      for (let i = k; i < n; i++) {
        if (s.charCodeAt(i) !== pat[(i + c) % 3]) cur++;
        if (s.charCodeAt(i - k) !== pat[(i - k + c) % 3]) cur--;
        if (cur < minDiff) minDiff = cur;
      }
    }

    out.push(minDiff);
  }

  console.log(out.join('\n'));
}

solve();
