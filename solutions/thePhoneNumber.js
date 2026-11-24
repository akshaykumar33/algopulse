const fs = require('fs');

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
  const n = nextInt();
  if (n === null) return;
  let b = Math.floor(Math.sqrt(n));
  if (b < 1) b = 1;
  const ans = [];
  for (let i = n; i > 0; i -= b) {
    const start = Math.max(1, i - b + 1);
    for (let j = start; j <= i; j++) {
      ans.push(j);
    }
  }
  console.log(ans.join(' '));
}

solve();
