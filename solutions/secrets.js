const fs = require('fs');
const s = fs.readFileSync(0, 'utf-8').trim();
if (s) {
  let n = BigInt(s.split(/\s+/)[0]);
  let v = 1n;
  while (n % v === 0n) v *= 3n;
  console.log((n / v + 1n).toString());
}
