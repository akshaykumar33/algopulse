const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const L = new Int32Array(n).fill(m);
  const R = new Int32Array(n).fill(-1);
  let lastRow = -1;
  for (let i = 0; i < n; i++) {
    const row = tokens[ptr++];
    for (let j = 0; j < m; j++) {
      if (row[j] === 'W') {
        if (j < L[i]) L[i] = j;
        if (j > R[i]) R[i] = j;
        lastRow = i;
      }
    }
  }
  if (lastRow === -1) {
    console.log(0);
    return;
  }
  let pos = 0;
  let ans = 0;
  for (let i = 0; i <= lastRow; i++) {
    if ((i & 1) === 0) {
      let target = pos;
      if (R[i] > target) target = R[i];
      if (i < lastRow && R[i + 1] > target) target = R[i + 1];
      ans += target - pos;
      pos = target;
    } else {
      let target = pos;
      if (L[i] < target) target = L[i];
      if (i < lastRow && L[i + 1] < target) target = L[i + 1];
      ans += pos - target;
      pos = target;
    }
    if (i < lastRow) ans++;
  }
  console.log(ans);
}

solve();
