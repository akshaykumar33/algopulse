const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  const len = buf.length;
  let ptr = 0;

  function nextInt() {
    while (ptr < len && buf[ptr] <= 32) ptr++;
    if (ptr >= len) return null;
    let val = 0;
    while (ptr < len && buf[ptr] > 32) {
      val = val * 10 + (buf[ptr] - 48);
      ptr++;
    }
    return val;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    let p = 1;
    while (p * 2 <= n) p *= 2;
    out.push(Math.max(n - p + 1, Math.floor(p / 2)));
  }

  console.log(out.join('\n'));
}

solve();
