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

  const nStr = nextToken();
  if (!nStr) return;
  const n = parseInt(nStr, 10);
  const freq = new Map();
  let ans = 0;

  for (let i = 0; i < n; i++) {
    const s = nextToken();
    let mask = 0;
    for (let j = 0; j < s.length; j++) {
      mask ^= 1 << (s.charCodeAt(j) - 97);
    }

    const c = freq.get(mask);
    if (c !== undefined) ans += c;

    for (let b = 0; b < 26; b++) {
      const cBit = freq.get(mask ^ (1 << b));
      if (cBit !== undefined) ans += cBit;
    }

    freq.set(mask, (c || 0) + 1);
  }

  console.log(ans);
}

solve();
