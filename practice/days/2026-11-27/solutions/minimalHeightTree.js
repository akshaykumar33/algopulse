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
    let h = 0;
    let curLevel = 1;
    let nxtLevel = 0;
    let i = 1;
    while (i < n) {
      h++;
      nxtLevel = 0;
      let used = 0;
      while (used < curLevel && i < n) {
        used++;
        nxtLevel++;
        i++;
        while (i < n && a[i] > a[i - 1]) {
          nxtLevel++;
          i++;
        }
      }
      curLevel = nxtLevel;
    }
    out.push(h);
  }
  console.log(out.join('\n'));
}
