const fs = require('fs');
const buf = fs.readFileSync(0);
let pos = 0;
const len = buf.length;

function nextInt() {
  while (pos < len && buf[pos] <= 32) pos++;
  if (pos >= len) return 0;
  let res = 0;
  while (pos < len && buf[pos] > 32) {
    res = res * 10 + (buf[pos] - 48);
    pos++;
  }
  return res;
}

function solve() {
  const t = nextInt();
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    let s1 = 0, s2 = 0;
    for (let i = 0; i < n; i++) {
      const x = nextInt();
      s2 |= (s1 & x);
      s1 |= x;
    }
    out.push(s2);
  }
  console.log(out.join('\n'));
}

solve();
