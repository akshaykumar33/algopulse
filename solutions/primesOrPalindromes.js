const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  const p = parseInt(tokens[0], 10);
  const q = parseInt(tokens[1], 10);
  const MAX = 2000000;
  const isP = new Uint8Array(MAX + 1).fill(1);
  isP[0] = isP[1] = 0;
  for (let i = 2; i * i <= MAX; i++) {
    if (isP[i]) {
      for (let j = i * i; j <= MAX; j += i) isP[j] = 0;
    }
  }

  function isPal(num) {
    let rev = 0, orig = num;
    while (num > 0) {
      rev = rev * 10 + (num % 10);
      num = Math.floor(num / 10);
    }
    return rev === orig;
  }

  let pi = 0, rub = 0;
  let ans = 1;
  for (let i = 1; i <= MAX; i++) {
    if (isP[i]) pi++;
    if (isPal(i)) rub++;
    if (BigInt(pi) * BigInt(q) <= BigInt(p) * BigInt(rub)) {
      ans = i;
    }
  }
  console.log(ans);
}
