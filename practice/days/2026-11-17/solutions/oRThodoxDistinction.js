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
    const n_val = readBigInt();
    if (n_val === null) break;
    const n = Number(n_val);

    const a = new Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = readBigInt();
    }

    if (n > 60) {
      out.push('NO');
      continue;
    }

    const seen = new Set();
    let distinct = true;
    for (let i = 0; i < n && distinct; i++) {
      let cur = 0n;
      for (let j = i; j < n; j++) {
        cur |= a[j];
        if (seen.has(cur)) {
          distinct = false;
          break;
        }
        seen.add(cur);
      }
    }

    out.push(distinct ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
