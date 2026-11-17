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

  const a = 1n << 33n;
  const b = 1n << 34n;
  const c = 1n << 35n;

  for (let t = 0; t < T; t++) {
    const n = readBigInt();
    if (n === null) break;

    if (n === 0n) {
      out.push('1 3 4 5');
    } else {
      const d = c + n;
      out.push(`${a} ${b} ${c} ${d}`);
    }
  }

  console.log(out.join('\n'));
}

solve();
