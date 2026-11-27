const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    let c01 = 0, c10 = 0;
    for (let i = 0; i < s.length - 1; i++) {
      if (s[i] === '0' && s[i + 1] === '1') c01++;
      if (s[i] === '1' && s[i + 1] === '0') c10++;
    }
    out.push(c01 + ' ' + c10);
  }
  console.log(out.join('\n'));
}
