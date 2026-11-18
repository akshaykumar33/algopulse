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

  const nVal = nextInt();
  if (nVal === null) return;
  const n = nVal;
  let x = nextInt();
  let y = nextInt();

  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = nextInt();
  a.sort();

  let ans = 0;
  for (let i = 0; i < n; i++) {
    const val = a[i];
    const needX = val >> 1;
    let rem = 0;

    if (x >= needX) {
      x -= needX;
      rem = val & 1;
    } else {
      rem = val - (x << 1);
      x = 0;
    }

    if (rem === 0) {
      ans++;
    } else if (rem === 1) {
      if (y > 0) {
        y--;
        ans++;
      } else if (x > 0) {
        x--;
        ans++;
      } else {
        break;
      }
    } else {
      if (y >= rem) {
        y -= rem;
        ans++;
      } else {
        break;
      }
    }
  }

  console.log(ans);
}

solve();
