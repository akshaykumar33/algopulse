const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }

    function check(mid) {
      let l = a[0] - mid;
      let r = a[0] + mid;
      let cnt = 0;
      for (let i = 1; i < n; i++) {
        const curL = a[i] - mid;
        const curR = a[i] + mid;
        if (curL > l) l = curL;
        if (curR < r) r = curR;
        if (l <= r) continue;
        cnt++;
        l = curL;
        r = curR;
      }
      return cnt;
    }

    let lo = 0;
    let hi = 1000000000;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (check(mid) <= k) {
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
