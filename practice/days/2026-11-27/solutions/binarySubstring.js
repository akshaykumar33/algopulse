const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    let c0 = 0, c1 = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '0') c0++; else c1++;
    }
    out.push(Math.min(c0, c1));
  }
  console.log(out.join('\n'));
}
