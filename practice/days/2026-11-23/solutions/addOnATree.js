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
  const deg = new Int32Array(n + 1);
  for (let i = 0; i < n - 1; i++) {
    const u = nextInt(), v = nextInt();
    deg[u]++;
    deg[v]++;
  }
  for (let i = 1; i <= n; i++) {
    if (deg[i] === 2) {
      console.log('NO');
      return;
    }
  }
  console.log('YES');
}

solve();
