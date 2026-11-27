const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const a = [];
    const b = [];
    for (let i = 0; i < n; i++) a.push(tokens[ptr++]);
    for (let i = 0; i < n; i++) b.push(tokens[ptr++]);
    let diff = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < a[i].length; j++) if (a[i][j] !== b[i][j]) diff++;
    }
    out.push(diff <= k ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}
