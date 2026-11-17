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

    const a = new Int32Array(n);
    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      const val = readInt();
      a[i] = val;
      b[i] = val;
    }
    b.sort();

    const used = new Uint8Array(n);
    let pPtr = 0;
    for (let i = 0; i < n; i++) {
      if (pPtr < n && a[i] === b[pPtr]) {
        used[i] = 1;
        pPtr++;
      }
    }

    let ok = true;
    let qPtr = pPtr;
    for (let i = 0; i < n; i++) {
      if (!used[i]) {
        if (qPtr < n && a[i] === b[qPtr]) {
          qPtr++;
        } else {
          ok = false;
          break;
        }
      }
    }

    if (ok && qPtr === n) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }

  console.log(out.join('\n'));
}

solve();
