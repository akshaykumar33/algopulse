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

  function readString() {
    while (offset < buffer.length && buffer[offset] <= 32) offset++;
    if (offset >= buffer.length) return null;
    const start = offset;
    while (offset < buffer.length && buffer[offset] > 32) offset++;
    return buffer.toString('utf-8', start, offset);
  }

  const t = readInt();
  if (t === null) return;

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = readInt();
    if (n === null) break;

    const pref = new Float64Array(n + 1);
    for (let i = 0; i < n; i++) {
      pref[i + 1] = pref[i] + readInt();
    }

    const s = readString();
    let l = 0, r = n - 1;
    let ans = 0;

    while (l < r) {
      while (l < r && s[l] !== 'L') l++;
      while (l < r && s[r] !== 'R') r--;
      if (l < r) {
        ans += pref[r + 1] - pref[l];
        l++;
        r--;
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
