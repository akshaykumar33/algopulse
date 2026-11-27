const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  let L = BigInt(tokens[ptr++]);
  const c = new Array(32);
  for (let i = 0; i < n; i++) c[i] = BigInt(tokens[ptr++]);
  for (let i = 1; i < n; i++) {
    if (c[i] > 2n * c[i - 1]) c[i] = 2n * c[i - 1];
  }
  for (let i = n; i < 32; i++) {
    c[i] = 2n * c[i - 1];
  }
  let ans = 4000000000000000000n;
  let cur = 0n;
  for (let i = 30; i >= 0; i--) {
    const bit = (L >> BigInt(i)) & 1n;
    if (bit === 1n) {
      cur += c[i];
    } else {
      if (cur + c[i] < ans) ans = cur + c[i];
    }
  }
  if (cur < ans) ans = cur;
  console.log(ans.toString());
}
