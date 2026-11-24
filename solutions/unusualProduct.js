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
  let cur = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const v = nextInt();
      if (i === j) cur ^= v;
    }
  }
  const q = nextInt();
  const out = [];
  for (let k = 0; k < q; k++) {
    const t = nextInt();
    if (t === 1 || t === 2) {
      nextInt();
      cur ^= 1;
    } else {
      out.push(cur);
    }
  }
  console.log(out.join(''));
}

solve();
