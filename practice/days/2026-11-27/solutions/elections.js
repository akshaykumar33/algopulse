const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const c = BigInt(tokens[ptr++]);
    const a = new Array(n);
    let maxVal = -1n;
    let maxIdx = -1;
    for (let i = 0; i < n; i++) {
      a[i] = BigInt(tokens[ptr++]);
      if (a[i] > maxVal) {
        maxVal = a[i];
        maxIdx = i;
      }
    }
    const pref = new Array(n);
    pref[0] = a[0];
    for (let i = 1; i < n; i++) pref[i] = pref[i - 1] + a[i];
    const res = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      if (i === 0) {
        if (a[0] + c >= maxVal) res[0] = 0;
        else res[0] = 1;
      } else {
        if (i === maxIdx && a[0] + c < maxVal) {
          res[i] = 0;
        } else {
          if (pref[i] + c >= maxVal) res[i] = i;
          else res[i] = i + 1;
        }
      }
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}
