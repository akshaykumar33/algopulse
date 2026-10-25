const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) offset++;
    if (offset >= buffer.length) return null;
    let res = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      res = res * 10 + (buffer[offset] - 48);
      offset++;
    }
    return res;
  }

  const t = readInt();
  if (t === null) return;

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = readInt();
    if (n === null) break;

    if (n === 1) {
      out.push('1');
    } else if (n % 2 === 1) {
      out.push('-1');
    } else {
      const p = [n];
      for (let k = 1; k < n; k++) {
        if (k % 2 === 1) {
          p.push(n - k);
        } else {
          p.push(k);
        }
      }
      out.push(p.join(' '));
    }
  }

  console.log(out.join('\n'));
}

solve();
