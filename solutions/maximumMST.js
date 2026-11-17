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
    const m = (n * (n - 1)) / 2;

    const w = new Float64Array(m);
    for (let i = 0; i < m; i++) {
      w[i] = readInt();
    }
    w.sort();

    let ans = 0n;
    let idx = m - 1;
    for (let v = n; v >= 2; v--) {
      idx -= (v - 2);
      ans += BigInt(Math.round(w[idx]));
      idx -= 1;
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
