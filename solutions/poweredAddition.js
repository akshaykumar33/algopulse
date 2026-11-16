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
    return sign * res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    let maxVal = -Infinity;
    let maxDiff = 0;

    for (let i = 0; i < n; i++) {
      const a = nextInt();
      if (a > maxVal) {
        maxVal = a;
      } else {
        const diff = maxVal - a;
        if (diff > maxDiff) maxDiff = diff;
      }
    }

    if (maxDiff === 0) {
      out.push(0);
    } else {
      let bits = 0;
      while ((1n << BigInt(bits)) - 1n < BigInt(maxDiff)) {
        bits++;
      }
      out.push(bits);
    }
  }

  console.log(out.join('\n'));
}

solve();
