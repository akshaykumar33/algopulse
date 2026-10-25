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

  const n = readInt();
  const m = readInt();
  if (n === null || m === null) return;

  const firstR = new Int32Array(n).fill(m);
  const lastR = new Int32Array(n).fill(-1);
  const firstC = new Int32Array(m).fill(n);
  const lastC = new Int32Array(m).fill(-1);

  const grid = [];
  for (let i = 0; i < n; i++) {
    const row = new Uint8Array(m);
    for (let j = 0; j < m; j++) {
      const v = readInt();
      row[j] = v;
      if (v === 1) {
        if (j < firstR[i]) firstR[i] = j;
        if (j > lastR[i]) lastR[i] = j;
        if (i < firstC[j]) firstC[j] = i;
        if (i > lastC[j]) lastC[j] = i;
      }
    }
    grid.push(row);
  }

  let ans = 0;
  for (let i = 0; i < n; i++) {
    const row = grid[i];
    const fr = firstR[i];
    const lr = lastR[i];
    for (let j = 0; j < m; j++) {
      if (row[j] === 0) {
        if (fr < j) ans++;
        if (lr > j) ans++;
        if (firstC[j] < i) ans++;
        if (lastC[j] > i) ans++;
      }
    }
  }

  console.log(ans);
}

solve();
