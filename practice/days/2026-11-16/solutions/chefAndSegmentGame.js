const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextBigInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) pos++;
    return BigInt(input.slice(start, pos));
  }

  const tVal = nextBigInt();
  if (tVal === null) return;
  const t = Number(tVal);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const x = nextBigInt();
    const k = nextBigInt();
    if (x === null) break;

    let p = 1n;
    while ((p << 1n) <= k) {
      p <<= 1n;
    }

    const m = k - p;
    const num = (2n * m + 1n) * x;
    const den = 2n * p;

    const ans = Number(num) / Number(den);
    out.push(ans.toFixed(10));
  }

  console.log(out.join('\n'));
}

solve();
