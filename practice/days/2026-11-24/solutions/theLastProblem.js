const fs = require('fs');

function cell(x, y) {
  const sum = x + y;
  return Math.floor(((sum - 2) * (sum - 1)) / 2) + x;
}

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const T = nextInt();
  if (T === null) return;
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const x1 = nextInt();
    const y1 = nextInt();
    const x2 = nextInt();
    const y2 = nextInt();
    let sum = 0;
    for (let i = x1; i <= x2; i++) {
      sum += cell(i, y1);
    }
    for (let j = y1 + 1; j <= y2; j++) {
      sum += cell(x2, j);
    }
    out.push(sum);
  }
  console.log(out.join('\n'));
}

solve();
