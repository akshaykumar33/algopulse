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
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = nextInt();
  a.sort().reverse();
  const sides = [];
  let i = 0;
  while (i < n - 1) {
    if (a[i] === a[i + 1] || a[i] - 1 === a[i + 1]) {
      sides.push(BigInt(a[i + 1]));
      i += 2;
    } else {
      i++;
    }
  }
  let ans = 0n;
  for (let j = 0; j + 1 < sides.length; j += 2) {
    ans += sides[j] * sides[j + 1];
  }
  console.log(ans.toString());
}
solve();