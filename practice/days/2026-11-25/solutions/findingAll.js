const fs = require('fs');
const buf = fs.readFileSync(0);
let pos = 0;
const len = buf.length;

function nextInt() {
  while (pos < len && buf[pos] <= 32) pos++;
  if (pos >= len) return 0;
  let neg = false;
  if (buf[pos] === 45) {
    neg = true;
    pos++;
  }
  let res = 0;
  while (pos < len && buf[pos] > 32) {
    res = res * 10 + (buf[pos] - 48);
    pos++;
  }
  return neg ? -res : res;
}

function solve() {
  const t = nextInt();
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    let cNeg = 0, cPos = 0;
    for (let i = 0; i < n; i++) {
      const x = nextInt();
      if (x === -1) cNeg++;
      else if (x === 1) cPos++;
    }
    const minX = Math.max(-1, Math.min(1, cNeg) - cPos);
    const maxX = Math.min(1, (cPos === 0 ? 0 : -1) + cNeg);
    const res = [];
    for (let v = minX; v <= maxX; v++) res.push(v);
    out.push(res.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
