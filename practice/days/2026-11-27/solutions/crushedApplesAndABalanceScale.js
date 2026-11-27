const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    let m = BigInt(tokens[ptr++]);
    let n = BigInt(tokens[ptr++]);
    if (n > m) {
      out.push('NO');
      continue;
    }
    if (m === n) {
      out.push('YES');
      continue;
    }
    let p2M = 1n;
    while (m % 2n === 0n) { m /= 2n; p2M *= 2n; }
    let p2N = 1n;
    while (n % 2n === 0n) { n /= 2n; p2N *= 2n; }
    if (p2N <= p2M) {
      out.push('YES');
    } else {
      out.push('NO');
    }
  }
  console.log(out.join('\n'));
}
