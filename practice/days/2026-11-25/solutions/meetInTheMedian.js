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
    const k = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) a[i] = nextInt();
    const sorted = new Int32Array(a);
    sorted.sort();
    const r = Math.floor(k / 2);
    let m = Math.floor((k - 1) / 2);
    const med = sorted[n - 1 - r];
    const res = [];
    for (let i = 0; i < n; i++) {
      if (a[i] >= med) {
        res.push(a[i]);
      } else if (m > 0) {
        res.push(a[i]);
        m--;
      }
    }
    out.push(String(med));
    out.push(res.join(' '));
  }
}

solve();
console.log(out.join('\n'));
