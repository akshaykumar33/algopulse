const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    const p = tokens[ptr++];
    let cS = 0, cP = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') cS++;
      if (p[i] === '1') cP++;
    }
    out.push(Math.min(cS, cP, Math.floor(n / 2)));
  }
  console.log(out.join('\n'));
}
