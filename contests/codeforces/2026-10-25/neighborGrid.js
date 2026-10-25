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

    let possible = true;
    const res = [];

    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < m; j++) {
        const val = readInt();
        let deg = 0;
        if (i > 0) deg++;
        if (i < n - 1) deg++;
        if (j > 0) deg++;
        if (j < m - 1) deg++;

        if (val > deg) {
          possible = false;
        }
        row.push(deg);
      }
      res.push(row.join(' '));
    }

    if (!possible) {
      out.push('NO');
    } else {
      out.push('YES');
      for (let i = 0; i < n; i++) {
        out.push(res[i]);
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
