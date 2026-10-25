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

    let ans = 0;
    const ttl = new Set();
    const cnt = new Set();

    for (let i = 0; i < n; i++) {
      const v = readInt();
      ttl.add(v);
      cnt.add(v);
      if (cnt.size === ttl.size) {
        ans++;
        cnt.clear();
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
