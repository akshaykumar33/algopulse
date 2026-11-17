const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let num = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      num = num * 10 + (buffer[offset] - 48);
      offset++;
    }
    return num;
  }

  const T = readInt();
  if (T === null) return;
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = readInt();
    const m = readInt();
    if (n === null) break;

    if (n === m) {
      const s = '01'.repeat(n + 1);
      out.push(s.length.toString());
      out.push(s);
    } else if (n > m) {
      let s = '010';
      for (let i = 0; i < m; i++) {
        s += '10';
      }
      for (let i = 0; i < n - m - 1; i++) {
        s += '010';
      }
      out.push(s.length.toString());
      out.push(s);
    } else {
      let s = '101';
      for (let i = 0; i < n; i++) {
        s += '01';
      }
      for (let i = 0; i < m - n - 1; i++) {
        s += '101';
      }
      out.push(s.length.toString());
      out.push(s);
    }
  }

  console.log(out.join('\n'));
}

solve();
