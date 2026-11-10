const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let pos = 0;
  const t = parseInt(tokens[pos++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[pos++], 10);
    let maxVal = -1;
    let maxIdx = -1;
    const arr = new Int32Array(n);

    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[pos++], 10);
      arr[i] = v;
      if (v > maxVal) {
        maxVal = v;
        maxIdx = i;
      }
    }

    if (maxVal === 0) {
      out.push('-1');
      continue;
    }

    let i1 = -1;
    let i2 = -1;
    for (let i = 0; i < n; i++) {
      if (i === maxIdx) continue;
      if (i1 === -1) {
        i1 = i;
      } else if (i2 === -1) {
        i2 = i;
        break;
      }
    }

    const items = [
      { val: arr[maxIdx], idx: maxIdx + 1 },
      { val: arr[i1], idx: i1 + 1 },
      { val: arr[i2], idx: i2 + 1 }
    ];

    items.sort((x, y) => x.val - y.val);

    const a = items[0];
    const b = items[1];
    const c = items[2];

    out.push(b.idx + ' ' + c.idx + ' ' + a.idx);
  }

  console.log(out.join('\n'));
}

solve();
