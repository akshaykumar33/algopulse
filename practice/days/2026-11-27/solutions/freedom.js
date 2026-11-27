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
    let ans = 0n;
    const map = new Map();
    for (let i = 0; i < n; i++) {
      const v = a[i];
      if (v > 1 && (3 * v) % (v - 1) === 0) {
        const req = (3 * v) / (v - 1);
        ans += BigInt(map.get(req) || 0);
      }
      map.set(v, (map.get(v) || 0) + 1);
    }
    out.push(ans.toString());
  }
  console.log(out.join('\n'));
}
