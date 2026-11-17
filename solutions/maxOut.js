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

    let max1 = -1;
    let max2 = -1;
    for (let i = 0; i < n; i++) {
      const val = readInt();
      if (val > max1) {
        max2 = max1;
        max1 = val;
      } else if (val < max1 && val > max2) {
        max2 = val;
      }
    }

    out.push(max2 === -1 ? '0' : max2.toString());
  }

  console.log(out.join('\n'));
}

solve();
