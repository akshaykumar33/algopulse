const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const MASK = 2147483647;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const cnt = new Map();
    let ans = 0;
    for (let i = 0; i < n; i++) {
      const x = parseInt(tokens[ptr++], 10);
      const comp = (MASK ^ x) >>> 0;
      const c = cnt.get(comp) || 0;
      if (c > 0) {
        if (c === 1) cnt.delete(comp);
        else cnt.set(comp, c - 1);
      } else {
        cnt.set(x, (cnt.get(x) || 0) + 1);
        ans++;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}
solve();
