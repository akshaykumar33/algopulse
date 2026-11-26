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

  const n = nextInt();
  if (n === null) return;
  const m = nextInt();

  const x = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    x[i] = nextInt();
  }

  let ans = 0;
  for (let i = 0; i < m; i++) {
    const u = nextInt();
    const v = nextInt();
    const c = nextInt();
    const density = (x[u] + x[v]) / c;
    if (density > ans) ans = density;
  }

  console.log(ans.toFixed(15));
}

solve();
