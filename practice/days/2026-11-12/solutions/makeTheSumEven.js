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
    let parity = 0;
    let hasTwo = false;
    for (let i = 0; i < n; i++) {
      const a = nextInt();
      parity ^= a & 1;
      if (a === 2) hasTwo = true;
    }
    if (parity === 0) out.push(0);
    else if (hasTwo) out.push(1);
    else out.push(-1);
  }

  console.log(out.join('\n'));
}

solve();
