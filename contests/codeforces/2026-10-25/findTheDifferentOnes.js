const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) offset++;
    if (offset >= buffer.length) return null;
    let res = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      res = res * 10 + (buffer[offset] - 48);
      offset++;
    }
    return res;
  }

  const t = readInt();
  if (t === null) return;

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = readInt();
    if (n === null) break;

    const a = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) {
      a[i] = readInt();
    }

    const nxt = new Int32Array(n + 1);
    nxt[n] = 1e9;
    for (let i = n - 1; i >= 1; i--) {
      if (a[i] !== a[i + 1]) {
        nxt[i] = i + 1;
      } else {
        nxt[i] = nxt[i + 1];
      }
    }

    const q = readInt();
    for (let qi = 0; qi < q; qi++) {
      const l = readInt();
      const r = readInt();
      if (nxt[l] <= r) {
        out.push(`${l} ${nxt[l]}`);
      } else {
        out.push('-1 -1');
      }
    }
    out.push('');
  }

  console.log(out.join('\n').trim());
}

solve();
