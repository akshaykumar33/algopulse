const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1;
    if (buf[pos] === 45) {
      sign = -1;
      pos++;
    }
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }

  const T = nextInt();
  if (T === null) return;
  const out = [];

  for (let t = 0; t < T; t++) {
    const n = nextInt();
    let min1 = Infinity, min2 = Infinity;
    let max1 = -Infinity, max2 = -Infinity;

    for (let i = 0; i < n; i++) {
      const v = nextInt();
      if (v < min1) {
        min2 = min1;
        min1 = v;
      } else if (v < min2) {
        min2 = v;
      }

      if (v > max1) {
        max2 = max1;
        max1 = v;
      } else if (v > max2) {
        max2 = v;
      }
    }

    const cands = [
      [min1, min2],
      [max1, max2],
      [min1, max1]
    ];

    function f(x, y) {
      return BigInt(x) * BigInt(y) + BigInt(x) - BigInt(y);
    }

    let best = f(cands[0][0], cands[0][1]);
    for (const [x, y] of cands) {
      const v1 = f(x, y);
      const v2 = f(y, x);
      if (v1 > best) best = v1;
      if (v2 > best) best = v2;
    }
    out.push(best.toString());
  }
  console.log(out.join('\n'));
}

solve();
