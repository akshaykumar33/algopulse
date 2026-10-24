const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf.charCodeAt(pos) <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf.charCodeAt(pos) >= 48 && buf.charCodeAt(pos) <= 57) {
      res = res * 10 + (buf.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    if (n % 2 !== 0) {
      out.push(-1);
    } else {
      const arr = [];
      for (let j = n; j >= 1; j--) {
        arr.push(j);
      }
      out.push(arr.join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
