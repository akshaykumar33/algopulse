const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    let yearLen = 0;
    for (let i = 0; i < n; i++) { a[i] = parseInt(tokens[ptr++], 10); yearLen += a[i]; }
    const yb = parseInt(tokens[ptr++], 10);
    const mb = parseInt(tokens[ptr++], 10);
    const db = parseInt(tokens[ptr++], 10);
    const yc = parseInt(tokens[ptr++], 10);
    const mc = parseInt(tokens[ptr++], 10);
    const dc = parseInt(tokens[ptr++], 10);
    function daysFromOrigin(y, m, d) {
      let days = BigInt(y - 1) * BigInt(yearLen);
      const leapYears = Math.floor((y - 1) / 4);
      days += BigInt(leapYears);
      for (let i = 0; i < m - 1; i++) days += BigInt(a[i]);
      days += BigInt(d);
      return days;
    }
    const d1 = daysFromOrigin(yb, mb, db);
    const d2 = daysFromOrigin(yc, mc, dc);
    out.push((d2 - d1 + 1n).toString());
  }
  console.log(out.join('\n'));
}
