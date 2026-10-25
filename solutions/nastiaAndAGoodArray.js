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

    let mn = 2e9 + 7;
    let p = 1;

    for (let i = 1; i <= n; i++) {
      const v = readInt();
      if (v < mn) {
        mn = v;
        p = i;
      }
    }

    out.push(n - 1);
    for (let i = 1; i <= n; i++) {
      if (i === p) continue;
      out.push(`${i} ${p} ${mn + Math.abs(i - p)} ${mn}`);
    }
  }

  console.log(out.join('\n'));
}

solve();
