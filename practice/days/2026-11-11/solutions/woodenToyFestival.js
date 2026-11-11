const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }
    a.sort();

    let lo = 0;
    let hi = Math.floor((a[n - 1] - a[0] + 1) / 2);

    while (lo < hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      const limit = 2 * mid;
      let cnt = 1;
      let start = a[0];
      for (let i = 1; i < n; i++) {
        if (a[i] - start > limit) {
          cnt++;
          start = a[i];
          if (cnt > 3) break;
        }
      }
      if (cnt <= 3) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }

    out.push(lo);
  }

  console.log(out.join('\n'));
}

solve();
