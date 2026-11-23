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
  const t = nextInt();
  if (t === null) return;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const a = nextInt();
    const b = nextInt();
    let ans = b - a;
    for (let a1 = a; a1 <= b; a1++) {
      const cur = (a1 - a) + 1 + (a1 | b) - b;
      if (cur < ans) ans = cur;
    }
    const maxB1 = b + ans;
    for (let b1 = b; b1 <= maxB1; b1++) {
      const cur = (b1 - b) + 1 + (a | b1) - b1;
      if (cur < ans) ans = cur;
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
