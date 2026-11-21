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
  const a = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) a[i] = nextInt();
  const b = new Int32Array(n + 1).fill(-1);
  const empty = [];
  for (let i = 1; i <= n; i++) {
    if (a[i] > a[i - 1]) {
      b[i] = a[i - 1];
      for (let v = a[i - 1] + 1; v < a[i]; v++) {
        if (empty.length === 0) {
          console.log(-1);
          return;
        }
        b[empty.pop()] = v;
      }
    } else {
      empty.push(i);
    }
  }
  while (empty.length > 0) {
    b[empty.pop()] = 1000000;
  }
  const has = new Uint8Array(2000005);
  let mex = 0;
  for (let i = 1; i <= n; i++) {
    if (b[i] >= 0 && b[i] < has.length) has[b[i]] = 1;
    while (has[mex]) mex++;
    if (mex !== a[i]) {
      console.log(-1);
      return;
    }
  }
  const out = [];
  for (let i = 1; i <= n; i++) out.push(b[i]);
  console.log(out.join(' '));
}
solve();