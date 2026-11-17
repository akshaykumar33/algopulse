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
    const a = readBigInt();
    const y = readBigInt();
    const x = readBigInt();
    if (a === null) break;

    if (a < y) {
      out.push((a * x + 1n).toString());
    } else {
      out.push((y * x).toString());
    }
  }

  console.log(out.join('\n'));
}

solve();
