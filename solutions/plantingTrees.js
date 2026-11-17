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
    for (let i = 0; i < n; i++) {
      a[i] = readInt();
    }
    a.sort();

    let count = 0;
    let lastPlanted = -1;
    for (let i = 0; i < n; i++) {
      const hasLeft = (i > 0 && a[i - 1] === a[i] - 1) || (lastPlanted === a[i] - 1);
      const hasRight = (i < n - 1 && a[i + 1] === a[i] + 1);
      if (!hasLeft && !hasRight) {
        count++;
        lastPlanted = a[i] + 1;
      }
    }
    out.push(count);
  }

  console.log(out.join('\n'));
}

solve();
