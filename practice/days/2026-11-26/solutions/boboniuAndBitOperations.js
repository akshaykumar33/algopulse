const fs = require('fs');
const buf = fs.readFileSync(0);
let ptr = 0;

function nextInt() {
  while (ptr < buf.length && buf[ptr] <= 32) ptr++;
  let x = 0;
  while (ptr < buf.length && buf[ptr] > 32) {
    x = x * 10 + buf[ptr] - 48;
    ptr++;
  }
  return x;
}

function solve() {
  const n = nextInt();
  const m = nextInt();
  const a = new Int32Array(n);
  const b = new Int32Array(m);
  for (let i = 0; i < n; i++) a[i] = nextInt();
  for (let j = 0; j < m; j++) b[j] = nextInt();
  for (let ans = 0; ans < 512; ans++) {
    let ok = true;
    for (let i = 0; i < n; i++) {
      let found = false;
      const ai = a[i];
      for (let j = 0; j < m; j++) {
        if (((ai & b[j]) | ans) === ans) {
          found = true;
          break;
        }
      }
      if (!found) {
        ok = false;
        break;
      }
    }
    if (ok) {
      console.log(ans);
      return;
    }
  }
}

solve();
