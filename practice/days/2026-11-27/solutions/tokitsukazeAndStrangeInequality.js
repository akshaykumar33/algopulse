const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const p = new Int32Array(n + 1);
    for (let i = 1; i <= n; i++) p[i] = parseInt(tokens[ptr++], 10);
    const countLess = new Int32Array((n + 2) * (n + 2));
    for (let i = n; i >= 1; i--) {
      for (let v = 1; v <= n; v++) {
        countLess[i * (n + 2) + v] = countLess[(i + 1) * (n + 2) + v] + (p[i] < v ? 1 : 0);
      }
    }
    let total = 0n;
    for (let b = 1; b <= n; b++) {
      let countA = 0;
      for (let c = b + 1; c <= n; c++) {
        if (p[b] > p[c]) {
          const dCount = countLess[(c + 1) * (n + 2) + p[b]];
          total += BigInt(countA) * BigInt(dCount);
        }
        if (p[c] > p[b]) countA++;
      }
    }
    out.push(total.toString());
  }
  console.log(out.join('\n'));
}
