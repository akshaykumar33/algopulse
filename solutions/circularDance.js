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
  const a = new Int32Array(n + 1);
  const b = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    a[i] = nextInt();
    b[i] = nextInt();
  }
  if (n === 3) {
    console.log('1 2 3');
    return;
  }
  const res = new Int32Array(n);
  res[0] = 1;
  const u1 = a[1];
  const v1 = b[1];
  if (a[u1] === v1 || b[u1] === v1) {
    res[1] = u1;
  } else {
    res[1] = v1;
  }
  for (let i = 1; i < n - 1; i++) {
    const cur = res[i];
    const prev = res[i - 1];
    if (a[cur] === a[prev] || a[cur] === b[prev]) {
      res[i + 1] = a[cur];
    } else {
      res[i + 1] = b[cur];
    }
  }
  console.log(res.join(' '));
}

solve();
