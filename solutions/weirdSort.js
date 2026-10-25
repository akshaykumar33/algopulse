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
    const m = readInt();
    if (n === null || m === null) break;

    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = readInt();

    const allowed = new Uint8Array(n);
    for (let i = 0; i < m; i++) {
      const pos = readInt();
      allowed[pos - 1] = 1;
    }

    let i = 0;
    while (i < n) {
      if (allowed[i] === 0) {
        i++;
        continue;
      }
      let j = i;
      while (j < n && allowed[j] === 1) j++;
      const sub = [];
      for (let k = i; k <= j; k++) sub.push(a[k]);
      sub.sort((x, y) => x - y);
      for (let k = i; k <= j; k++) a[k] = sub[k - i];
      i = j + 1;
    }

    let ok = true;
    for (let k = 0; k < n - 1; k++) {
      if (a[k] > a[k + 1]) {
        ok = false;
        break;
      }
    }

    out.push(ok ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
