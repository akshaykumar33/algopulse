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
    a.sort();
    let ans = a[n - 2];
    if (a[n - 2] + a[n - 3] > a[n - 1]) {
      ans = a[n - 1];
    } else {
      const top = a[n - 1];
      for (let j = n - 2; j >= 0; j--) {
        for (let k = j - 1; k >= 0; k--) {
          const div = a[j] + a[k];
          if (div <= ans) break;
          const rem = top % div;
          if (rem > ans) ans = rem;
        }
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
