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

const out = [];

function solve() {
  const t = nextInt();
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    a.sort();
    let maxF = 1;
    let cur = 1;
    for (let i = 1; i < n; i++) {
      if (a[i] === a[i - 1]) {
        cur++;
      } else {
        if (cur > maxF) maxF = cur;
        cur = 1;
      }
    }
    if (cur > maxF) maxF = cur;
    let ans = 0;
    while ((1 << ans) < maxF) ans++;
    out.push(ans);
  }
}

solve();
console.log(out.join('\n'));
