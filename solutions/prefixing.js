const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    let maxA = 0;
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
      if (a[i] > maxA) maxA = a[i];
    }
    const seen = new Set();
    const b = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      if (!seen.has(a[i])) {
        b[i] = a[i];
        seen.add(a[i]);
      } else {
        b[i] = maxA;
      }
    }
    out.push(b.join(' '));
  }
  console.log(out.join('\n'));
}
