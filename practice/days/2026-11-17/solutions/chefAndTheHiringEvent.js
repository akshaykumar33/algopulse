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
    const k = readBigInt();
    if (k === null) break;

    let val = k - 1n;
    if (val === 0n) {
      out.push('0');
      continue;
    }

    const digits = [];
    while (val > 0n) {
      const rem = val % 5n;
      digits.push((rem * 2n).toString());
      val /= 5n;
    }

    digits.reverse();
    out.push(digits.join(''));
  }

  console.log(out.join('\n'));
}

solve();
