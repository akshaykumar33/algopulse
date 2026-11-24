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
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = nextInt();
  a.sort();
  let i = 0;
  const half = Math.floor(n / 2);
  let j = half;
  let visible = n;
  while (i < half && j < n) {
    if (a[j] >= 2 * a[i]) {
      visible--;
      i++;
      j++;
    } else {
      j++;
    }
  }
  console.log(visible);
}

solve();
