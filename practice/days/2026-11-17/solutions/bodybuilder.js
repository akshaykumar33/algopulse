const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readBigInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let num = 0n;
    while (offset < buffer.length && buffer[offset] > 32) {
      num = num * 10n + BigInt(buffer[offset] - 48);
      offset++;
    }
    return num;
  }

  const T_val = readBigInt();
  if (T_val === null) return;
  const T = Number(T_val);
  const out = [];

  for (let t = 0; t < T; t++) {
    const n_val = readBigInt();
    const r = readBigInt();
    if (n_val === null) break;
    const n = Number(n_val);

    const a = new Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = readBigInt();
    }
    const b = new Array(n);
    for (let i = 0; i < n; i++) {
      b[i] = readBigInt();
    }

    let cur = 0n;
    let maxTension = 0n;

    for (let i = 0; i < n; i++) {
      if (i > 0) {
        const elapsed = a[i] - a[i - 1];
        const dec = elapsed * r;
        if (cur > dec) {
          cur -= dec;
        } else {
          cur = 0n;
        }
      }
      cur += b[i];
      if (cur > maxTension) {
        maxTension = cur;
      }
    }

    out.push(maxTension.toString());
  }

  console.log(out.join('\n'));
}

solve();
