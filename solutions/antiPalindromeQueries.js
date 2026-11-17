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
    const q = readInt();
    if (n === null) break;

    const pref1 = new Int32Array(n + 1);
    const pref2 = new Int32Array(n + 1);
    const pref3 = new Int32Array(n + 1);

    for (let i = 1; i <= n; i++) {
      const val = readInt();
      pref1[i] = pref1[i - 1] + (val === 1 ? 1 : 0);
      pref2[i] = pref2[i - 1] + (val === 2 ? 1 : 0);
      pref3[i] = pref3[i - 1] + (val === 3 ? 1 : 0);
    }

    for (let j = 0; j < q; j++) {
      const l = readInt();
      const r = readInt();
      const len = r - l + 1;
      if (len % 2 !== 0) {
        out.push('No');
        continue;
      }
      const c1 = pref1[r] - pref1[l - 1];
      const c2 = pref2[r] - pref2[l - 1];
      const c3 = pref3[r] - pref3[l - 1];
      const maxC = Math.max(c1, c2, c3);
      if (maxC <= len / 2) {
        out.push('Yes');
      } else {
        out.push('No');
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
