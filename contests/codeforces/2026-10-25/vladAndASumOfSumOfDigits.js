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

  const MAX = 200000;
  const pref = new Float64Array(MAX + 1);
  const digitSum = new Int32Array(MAX + 1);
  for (let i = 1; i <= MAX; i++) {
    digitSum[i] = digitSum[Math.floor(i / 10)] + (i % 10);
    pref[i] = pref[i - 1] + digitSum[i];
  }

  const t = readInt();
  if (t === null) return;

  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = readInt();
    if (n === null) break;
    out.push(pref[n]);
  }

  console.log(out.join('\n'));
}

solve();
