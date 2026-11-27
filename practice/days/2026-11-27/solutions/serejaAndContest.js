const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const k = BigInt(tokens[ptr++]);
  let sumPrev = 0n;
  let remainingCount = 0n;
  const out = [];
  for (let i = 1; i <= n; i++) {
    const a = BigInt(tokens[ptr++]);
    const score = sumPrev - remainingCount * BigInt(n - i) * a;
    if (score < k) {
      out.push(i);
    } else {
      sumPrev += a * remainingCount;
      remainingCount++;
    }
  }
  console.log(out.join('\n'));
}
