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

  const n = nextInt();
  if (n === null) return;

  const p = new Int32Array(n + 1);
  const children = Array.from({ length: n + 1 }, () => []);
  for (let i = 2; i <= n; i++) {
    p[i] = nextInt();
    children[p[i]].push(i);
  }

  const s = new Float64Array(n + 1);
  for (let i = 1; i <= n; i++) {
    s[i] = nextInt();
  }

  for (let u = 2; u <= n; u++) {
    if (s[u] === -1) {
      const ch = children[u];
      if (ch.length === 0) {
        s[u] = s[p[u]];
      } else {
        let minVal = Infinity;
        for (let i = 0; i < ch.length; i++) {
          if (s[ch[i]] < minVal) minVal = s[ch[i]];
        }
        if (minVal < s[p[u]]) {
          console.log(-1);
          return;
        }
        s[u] = minVal;
      }
    }
  }

  let total = s[1];
  for (let u = 2; u <= n; u++) {
    const diff = s[u] - s[p[u]];
    if (diff < 0) {
      console.log(-1);
      return;
    }
    total += diff;
  }

  console.log(total);
}

solve();
