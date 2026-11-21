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
  let maxAns = 0;
  for (let i = 0; i < n; i++) {
    const k = nextInt();
    const a = nextInt();
    let req = k;
    if (a === 1) {
      req = k + 1;
    } else {
      let temp = a;
      while (temp > 1) {
        temp = Math.ceil(temp / 4);
        req++;
      }
    }
    if (req > maxAns) maxAns = req;
  }
  console.log(maxAns);
}
solve();
