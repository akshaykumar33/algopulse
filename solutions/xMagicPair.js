const fs = require('fs');
function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextBigInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0n;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10n + BigInt(buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const tVal = nextBigInt();
  if (tVal === null) return;
  const T = Number(tVal);
  const out = [];
  for (let t = 0; t < T; t++) {
    let a = nextBigInt();
    let b = nextBigInt();
    const x = nextBigInt();
    if (a < b) { const tmp = a; a = b; b = tmp; }
    let ok = false;
    while (b > 0n) {
      if (x <= a && (a - x) % b === 0n) {
        ok = true;
        break;
      }
      const rem = a % b;
      a = b;
      b = rem;
    }
    out.push(ok ? 'YES' : 'NO');
  }
  console.log(out.join('\n'));
}
solve();