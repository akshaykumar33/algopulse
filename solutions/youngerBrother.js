const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    let xor = 0;
    for (let i = 0; i < n * m; i++) xor ^= parseInt(tokens[ptr++], 10);
    out.push(xor !== 0 ? 'Chef' : 'Brother');
  }
  console.log(out.join('\n'));
}
