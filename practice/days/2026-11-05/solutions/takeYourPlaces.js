const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const ones = [];
    for (let i = 0; i < n; i++) {
      const x = parseInt(tokens[ptr++], 10);
      if (x % 2 !== 0) ones.push(i);
    }
    const c1 = ones.length;
    const c0 = n - c1;
    if (Math.abs(c0 - c1) > 1) {
      out.push(-1);
      continue;
    }
    function calc(start) {
      let cost = 0;
      let target = start;
      for (let i = 0; i < c1; i++) {
        cost += Math.abs(ones[i] - target);
        target += 2;
      }
      return cost;
    }
    let ans = Infinity;
    if (c1 === Math.ceil(n / 2)) ans = Math.min(ans, calc(0));
    if (c1 === Math.floor(n / 2)) ans = Math.min(ans, calc(1));
    out.push(ans === Infinity ? -1 : ans);
  }
  console.log(out.join('\n'));
}
solve();
