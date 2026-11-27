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
    a.sort((x, y) => x - y);
    let cur = a[0];
    let moves = 0n;
    for (let i = 1; i < n; i++) {
      if (a[i] <= cur) {
        cur++;
        moves += BigInt(cur - a[i]);
      } else {
        cur = a[i];
      }
    }
    out.push(moves.toString());
  }
  console.log(out.join('\n'));
}
