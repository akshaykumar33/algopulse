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

  const t = nextInt();
  if (t === null) return;

  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const a = new Int32Array(n);
    let total = 0;
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
      total += a[i];
    }

    let leftSum = 0;
    let ans = 0;
    for (let i = 0; i < n; i++) {
      if (a[i] === 0) {
        let rightSum = total - leftSum;
        if (leftSum === rightSum) ans += 2;
        else if (Math.abs(leftSum - rightSum) === 1) ans += 1;
      } else {
        leftSum += a[i];
      }
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
