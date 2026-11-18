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

  const tVal = nextInt();
  if (tVal === null) return;
  const t = tVal;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();

    let drops = 0;
    for (let i = 0; i < n - 1; i++) {
      if (a[i] > a[i + 1]) drops++;
    }

    if (drops === 0) {
      out.push('YES\n0');
    } else if (drops === 1 && a[n - 1] <= a[0]) {
      out.push('YES\n1');
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();
