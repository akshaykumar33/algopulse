const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  const len = buf.length;
  let ptr = 0;

  function nextInt() {
    while (ptr < len && buf[ptr] <= 32) ptr++;
    if (ptr >= len) return null;
    let sign = 1;
    if (buf[ptr] === 45) {
      sign = -1;
      ptr++;
    } else if (buf[ptr] === 43) {
      ptr++;
    }
    let val = 0;
    while (ptr < len && buf[ptr] > 32) {
      val = val * 10 + (buf[ptr] - 48);
      ptr++;
    }
    return val * sign;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    let diff = 0;
    for (let i = 1; i <= n; i++) {
      diff += nextInt() * i;
    }
    out.push(Math.abs(diff));
  }

  console.log(out.join('\n'));
}

solve();
