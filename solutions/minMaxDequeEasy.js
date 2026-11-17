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
    const q = readInt();
    if (n === null) break;

    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = readInt();
    }

    let current = Math.max(a[0], a[1]);
    for (let i = 2; i < n; i++) {
      if (i % 2 === 0) {
        current = Math.min(current, a[i]);
      } else {
        current = Math.max(current, a[i]);
      }
    }

    out.push(current.toString());
  }

  console.log(out.join('\n'));
}

solve();
