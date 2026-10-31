const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
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
    const pos = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) {
      const val = readInt();
      pos[val] = i;
    }

    const ans = new Int32Array(n);
    for (let i = 1; i <= n; i++) {
      ans[i - 1] = pos[i] < n ? pos[i] + 1 : 1;
    }

    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
