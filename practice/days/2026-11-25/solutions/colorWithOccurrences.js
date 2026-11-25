const fs = require('fs');

function solve() {
  const data = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (data.length === 0 || data[0] === '') return;
  let ptr = 0;
  const q = parseInt(data[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < q; tc++) {
    const t = data[ptr++];
    const L = t.length;
    const n = parseInt(data[ptr++], 10);
    const s = [];
    for (let i = 0; i < n; i++) s.push(data[ptr++]);
    const intervals = [];
    for (let i = 0; i < n; i++) {
      const w = s[i];
      const wl = w.length;
      for (let pos = 0; pos <= L - wl; pos++) {
        if (t.startsWith(w, pos)) {
          intervals.push([pos, pos + wl - 1, i + 1, pos + 1]);
        }
      }
    }
    let covered = 0;
    const picked = [];
    let possible = true;
    while (covered < L) {
      let bestEnd = covered - 1;
      let bestItem = null;
      for (let i = 0; i < intervals.length; i++) {
        const iv = intervals[i];
        if (iv[0] <= covered && iv[1] > bestEnd) {
          bestEnd = iv[1];
          bestItem = iv;
        }
      }
      if (bestItem === null) {
        possible = false;
        break;
      }
      picked.push(bestItem[2] + ' ' + bestItem[3]);
      covered = bestEnd + 1;
    }
    if (!possible) {
      out.push('-1');
    } else {
      out.push(String(picked.length));
      for (let i = 0; i < picked.length; i++) out.push(picked[i]);
    }
  }
  console.log(out.join('\n'));
}

solve();
