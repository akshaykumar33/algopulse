const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = parseInt(tokens[ptr++], 10);
    let cur = n - 1;
    let jumps = 0;
    let impossible = false;
    while (cur > 0) {
      let mx = -1, mxIdx = -1;
      for (let i = 0; i < cur; i++) {
        if (a[i] >= mx) { mx = a[i]; mxIdx = i; }
      }
      if (mx < a[cur]) { impossible = true; break; }
      cur = mxIdx;
      jumps++;
    }
    out.push(impossible ? -1 : jumps);
  }
  console.log(out.join('\n'));
}
