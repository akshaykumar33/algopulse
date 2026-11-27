const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    let count = 0;
    for (let d = 1; d * d <= n; d++) {
      if (n % d === 0) {
        count++;
        if (d * d !== n) count++;
      }
    }
    out.push(count);
  }
  console.log(out.join('\n'));
}
