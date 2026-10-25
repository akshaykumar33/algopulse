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

  const n = readInt();
  if (n === null) return;

  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = readInt();
  }

  a.sort();

  let cur = 1;
  for (let i = 0; i < n; i++) {
    if (a[i] >= cur) {
      cur++;
    }
  }

  console.log(cur);
}

solve();
