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
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = readInt();
    }

    if (a[0] === 1) {
      const path = [n + 1];
      for (let i = 1; i <= n; i++) path.push(i);
      out.push(path.join(' '));
    } else {
      let idx = -1;
      for (let i = 0; i < n - 1; i++) {
        if (a[i] === 0 && a[i + 1] === 1) {
          idx = i;
          break;
        }
      }
      if (idx !== -1) {
        const path = [];
        for (let i = 1; i <= idx + 1; i++) path.push(i);
        path.push(n + 1);
        for (let i = idx + 2; i <= n; i++) path.push(i);
        out.push(path.join(' '));
      } else if (a[n - 1] === 0) {
        const path = [];
        for (let i = 1; i <= n + 1; i++) path.push(i);
        out.push(path.join(' '));
      } else {
        out.push('-1');
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
