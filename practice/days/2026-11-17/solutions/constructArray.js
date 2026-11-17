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
    if (n === null) break;

    if (n % 2 !== 0) {
      out.push('-1');
      continue;
    }

    const a = new Int32Array(n);
    let val = 1;
    for (let i = 0; i < n / 2; i++) {
      if (i % 2 === 0) {
        a[i] = val;
        a[n - 1 - i] = -val;
      } else {
        a[i] = -val;
        a[n - 1 - i] = val;
      }
      val++;
    }

    out.push(a.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
