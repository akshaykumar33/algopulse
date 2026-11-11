const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const q = parseInt(tokens[ptr++], 10);
  const cache = new Map();
  const out = [];

  for (let tc = 0; tc < q; tc++) {
    const a = parseInt(tokens[ptr++], 10);
    let p = 1;
    while (p <= a) p *= 2;
    const full = p - 1;
    if (a < full) {
      out.push(full);
    } else {
      if (cache.has(a)) {
        out.push(cache.get(a));
      } else {
        let res = 1;
        for (let d = 2; d * d <= a; d++) {
          if (a % d === 0) {
            res = a / d;
            break;
          }
        }
        cache.set(a, res);
        out.push(res);
      }
    }
  }
  console.log(out.join('\n'));
}

solve();
