const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    let sA = 0, sB = 0;
    let remA = n, remB = n;
    let ans = 2 * n;
    for (let i = 0; i < 2 * n; i++) {
      if (i % 2 === 0) {
        remA--;
        if (s[i] === '1') sA++;
      } else {
        remB--;
        if (s[i] === '1') sB++;
      }
      if (sA > sB + remB) { ans = i + 1; break; }
      if (sB > sA + remA) { ans = i + 1; break; }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}
