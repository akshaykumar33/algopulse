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

  const x = nextInt();
  if (x === null) return;
  const y = nextInt();

  const sides = [y, y, y];
  let ans = 0;

  while (sides[0] < x) {
    sides[0] = Math.min(x, sides[1] + sides[2] - 1);
    ans++;
    sides.sort((a, b) => a - b);
  }

  console.log(ans);
}

solve();
