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
    let c1 = 0, c2 = 0, c3 = 0;
    for (let i = 0; i < n; i++) {
      const r = nextInt() & 3;
      if (r === 1) c1++;
      else if (r === 2) c2++;
      else if (r === 3) c3++;
    }
    if ((c1 + 2 * c2 + 3 * c3) % 4 !== 0) {
      out.push(-1);
      continue;
    }
    let ans = 0;
    const p13 = c1 < c3 ? c1 : c3;
    ans += p13;
    c1 -= p13;
    c3 -= p13;
    ans += Math.floor(c2 / 2);
    c2 &= 1;
    let rem = c1 + c3;
    if (c2 === 1) {
      ans += 2;
      rem -= 2;
    }
    ans += 3 * Math.floor(rem / 4);
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
