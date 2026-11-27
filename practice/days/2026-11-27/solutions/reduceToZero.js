const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    let x = BigInt(tokens[ptr++]);
    let y = BigInt(tokens[ptr++]);
    if (x === y) {
      out.push(x === 0n ? 0 : x);
      continue;
    }
    if (x === 0n || y === 0n) {
      out.push(-1);
      continue;
    }
    if (x > y) { const tmp = x; x = y; y = tmp; }
    let doubles = 0n;
    while (x * 2n <= y) {
      x *= 2n;
      doubles++;
    }
    if (x === y) {
      out.push((doubles + y).toString());
    } else {
      out.push((doubles + 1n + y).toString());
    }
  }
  console.log(out.join('\n'));
}
