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
    const set = new Set();
    const res = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      let x = nextInt();
      while (set.has(x)) {
        set.delete(x);
        x *= 2;
      }
      set.add(x);
      res[i] = set.size;
    }
    out.push(res.join(' '));
  }
}

solve();
console.log(out.join('\n'));
