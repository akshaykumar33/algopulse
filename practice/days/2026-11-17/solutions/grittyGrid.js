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
    const m = readInt();
    const x = readInt();
    const y = readInt();
    if (n === null) break;

    const distPlusX = (n + m - 2 + x) % 2;
    const xPlusY = (x + y) % 2;

    if (distPlusX === 1 && xPlusY === 0) {
      out.push('No');
    } else {
      out.push('Yes');
    }
  }

  console.log(out.join('\n'));
}

solve();
