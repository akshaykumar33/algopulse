const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let sign = 1;
    if (buffer[offset] === 45) {
      sign = -1;
      offset++;
    }
    let num = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      num = num * 10 + (buffer[offset] - 48);
      offset++;
    }
    return sign * num;
  }

  const n = readInt();
  if (n === null) return;

  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    const val = readInt();
    a[i] = val < 0 ? -val : val;
  }

  a.sort();

  let ans = 0;
  let r = 0;
  for (let l = 0; l < n; l++) {
    while (r < n && a[r] <= 2 * a[l]) {
      r++;
    }
    ans += (r - l - 1);
  }

  console.log(ans);
}

solve();
