const fs = require('fs');
const buf = fs.readFileSync(0);
let ptr = 0;

function nextBigInt() {
  while (ptr < buf.length && buf[ptr] <= 32) ptr++;
  let x = 0n;
  while (ptr < buf.length && buf[ptr] > 32) {
    x = x * 10n + BigInt(buf[ptr] - 48);
    ptr++;
  }
  return x;
}

const out = [];

function solve() {
  const t = Number(nextBigInt());
  for (let tc = 0; tc < t; tc++) {
    const x1 = nextBigInt();
    const y1 = nextBigInt();
    const x2 = nextBigInt();
    const y2 = nextBigInt();
    const ans = (x2 - x1) * (y2 - y1) + 1n;
    out.push(ans.toString());
  }
}

solve();
console.log(out.join('\n'));
