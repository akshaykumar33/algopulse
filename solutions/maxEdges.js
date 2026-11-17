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
    const k = readBigInt();
    const l = readBigInt();
    if (n === null) break;

    let overlap = 0n;
    if (k + l > n) {
      overlap = k + l - n;
    }

    const uniqueSources = k - overlap;
    const uniqueSinks = l - overlap;
    const middle = n - uniqueSources - uniqueSinks - overlap;

    let ans = uniqueSources * uniqueSinks;
    ans += uniqueSources * middle;
    ans += middle * uniqueSinks;
    ans += (middle * (middle - 1n)) / 2n;

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
