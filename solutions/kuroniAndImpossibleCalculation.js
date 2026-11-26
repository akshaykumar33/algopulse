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
  if (n > m) {
    for (let i = 0; i < n; i++) nextInt();
    console.log(0);
    return;
  }
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = nextInt();
  let ans = 1 % m;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let d = a[i] - a[j];
      if (d < 0) d = -d;
      ans = (ans * (d % m)) % m;
      if (ans === 0) {
        console.log(0);
        return;
      }
    }
  }
  console.log(ans);
}

solve();
