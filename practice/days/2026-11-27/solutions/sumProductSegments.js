const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const x = BigInt(tokens[ptr++]);
    const y = BigInt(tokens[ptr++]);
    const l1 = x / 2n;
    const r1 = x - l1;
    let found = false;
    let l2 = 0n, r2 = 0n;
    for (let d = 1n; d * d <= y; d++) {
      if (y % d === 0n) {
        const d1 = d;
        const d2 = y / d;
        if (d2 < l1 || d1 > r1) {
          l2 = d1; r2 = d2;
          found = true;
          break;
        }
      }
    }
    if (found) {
      if (r2 < l1) {
        out.push(l2 + ' ' + r2);
        out.push(l1 + ' ' + r1);
      } else {
        out.push(l1 + ' ' + r1);
        out.push(l2 + ' ' + r2);
      }
    } else {
      out.push(-1);
    }
  }
  console.log(out.join('\n'));
}
