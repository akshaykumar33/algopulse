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
    const m = nextInt();
    const k = nextInt();
    const x1 = n - m * k;
    const x2 = Math.floor(n / (m + 1));
    const x = x1 < x2 ? x1 : x2;
    const p = k > x ? k : x;
    const arr = new Int32Array(n);
    for (let i = 0; i < n; i++) arr[i] = i % p;
    out.push(arr.join(' '));
  }
}

solve();
console.log(out.join('\n'));
