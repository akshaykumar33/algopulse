const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    const pos = Array.from({ length: n + 1 }, () => []);
    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      if (v <= n) pos[v].push(i);
    }
    let total = 0n;
    for (let v = 1; v <= n; v++) {
      const pArr = pos[v];
      if (pArr.length === 0) continue;
      let curL = -1, curR = -1;
      for (let i = 0; i < pArr.length; i++) {
        const p = pArr[i];
        const l = Math.max(0, p - v + 1);
        const r = Math.min(n - v, p);
        if (l > r) continue;
        if (curL === -1) {
          curL = l;
          curR = r;
        } else if (l <= curR + 1) {
          if (r > curR) curR = r;
        } else {
          total += BigInt(curR - curL + 1);
          curL = l;
          curR = r;
        }
      }
      if (curL !== -1) total += BigInt(curR - curL + 1);
    }
    out.push(total.toString());
  }
  console.log(out.join('\n'));
}
solve();