const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const res = [];
    for (let i = 0; i < n; i++) {
      let x = i, val = 0, p = 1;
      while (x > 0) {
        val += (x % 2) * p;
        p *= 3;
        x = Math.floor(x / 2);
      }
      res.push(val + 1);
    }
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}
