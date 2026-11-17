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
    const n = readBigInt();
    if (n === null) break;

    if (n === 1n) {
      out.push('2');
    } else if ((n & (n + 1n)) === 0n) {
      out.push((n / 2n).toString());
    } else {
      out.push('-1');
    }
  }

  console.log(out.join('\n'));
}

solve();
