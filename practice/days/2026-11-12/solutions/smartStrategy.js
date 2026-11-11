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
    const q = nextInt();
    let prod = 1;
    for (let i = 0; i < n; i++) {
      const d = nextInt();
      if (prod <= 1000000000) {
        prod = Math.min(1000000001, prod * d);
      }
    }
    const row = new Array(q);
    for (let i = 0; i < q; i++) {
      const x = nextInt();
      row[i] = Math.floor(x / prod);
    }
    out.push(row.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
