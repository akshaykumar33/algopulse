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
    const k = readInt();

    const freq = new Map();
    for (let i = 0; i < n; i++) {
      const x = readInt();
      freq.set(x, (freq.get(x) || 0) + 1);
    }

    const v = [];
    for (const [val, count] of freq.entries()) {
      if (count >= k) v.push(val);
    }

    if (v.length === 0) {
      out.push('-1');
      continue;
    }

    v.sort((a, b) => a - b);

    let bestL = v[0], bestR = v[0];
    let curL = v[0], curR = v[0];

    for (let i = 1; i < v.length; i++) {
      if (v[i] === v[i - 1] + 1) {
        curR = v[i];
      } else {
        if (curR - curL > bestR - bestL) {
          bestL = curL;
          bestR = curR;
        }
        curL = v[i];
        curR = v[i];
      }
    }
    if (curR - curL > bestR - bestL) {
      bestL = curL;
      bestR = curR;
    }

    out.push(`${bestL} ${bestR}`);
  }

  console.log(out.join('\n'));
}

solve();
