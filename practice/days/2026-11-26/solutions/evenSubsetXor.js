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

  function popcount(x) {
    let c = 0;
    while (x > 0) {
      x &= x - 1;
      c++;
    }
    return c;
  }

  const list = [];
  for (let i = 1; list.length < 1005; i++) {
    if ((popcount(i) & 1) === 0) {
      list.push(i);
    }
  }

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    if (n === 1) {
      out.push(6);
    } else if (n === 2) {
      out.push('3 5');
    } else {
      out.push(list.slice(0, n).join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
