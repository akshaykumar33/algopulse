const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf.charCodeAt(pos) <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf.charCodeAt(pos) >= 48 && buf.charCodeAt(pos) <= 57) {
      res = res * 10 + (buf.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const k = nextInt();
    const last = new Int32Array(k + 1);
    const max1 = new Int32Array(k + 1);
    const max2 = new Int32Array(k + 1);

    for (let i = 1; i <= n; i++) {
      const c = nextInt();
      const gap = i - last[c] - 1;
      last[c] = i;
      if (gap > max1[c]) {
        max2[c] = max1[c];
        max1[c] = gap;
      } else if (gap > max2[c]) {
        max2[c] = gap;
      }
    }

    for (let c = 1; c <= k; c++) {
      const gap = n + 1 - last[c] - 1;
      if (gap > max1[c]) {
        max2[c] = max1[c];
        max1[c] = gap;
      } else if (gap > max2[c]) {
        max2[c] = gap;
      }
    }

    let minAns = n;
    for (let c = 1; c <= k; c++) {
      const halved = Math.floor(max1[c] / 2);
      const cur = Math.max(max2[c], halved);
      if (cur < minAns) minAns = cur;
    }

    out.push(minAns);
  }

  console.log(out.join('\n'));
}

solve();
