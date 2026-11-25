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
    const pref = new Int32Array((n + 1) * 32);
    for (let i = 1; i <= n; i++) {
      const base = i * 32;
      const prev = base - 32;
      for (let b = 0; b < 32; b++) {
        pref[base + b] = pref[prev + b];
      }
      const val = nextInt();
      pref[base + (32 - Math.clz32(val))]++;
    }
    const q = nextInt();
    for (let i = 0; i < q; i++) {
      const l = nextInt();
      const r = nextInt();
      const x = nextInt();
      const b = 32 - Math.clz32(x);
      const same = pref[r * 32 + b] - pref[(l - 1) * 32 + b];
      out.push(r - l + 1 - same);
    }
  }
}

solve();
console.log(out.join('\n'));
