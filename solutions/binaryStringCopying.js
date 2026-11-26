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

function nextStr() {
  while (ptr < buf.length && buf[ptr] <= 32) ptr++;
  const start = ptr;
  while (ptr < buf.length && buf[ptr] > 32) ptr++;
  return buf.toString('ascii', start, ptr);
}

const out = [];

function solve() {
  const t = nextInt();
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const m = nextInt();
    const s = nextStr();
    const nl = new Int32Array(n);
    const pr = new Int32Array(n);
    let last0 = -1;
    for (let i = 0; i < n; i++) {
      if (s.charCodeAt(i) === 48) last0 = i;
      pr[i] = last0;
    }
    let next1 = n;
    for (let i = n - 1; i >= 0; i--) {
      if (s.charCodeAt(i) === 49) next1 = i;
      nl[i] = next1;
    }
    const vis = new Set();
    for (let i = 0; i < m; i++) {
      const l = nextInt() - 1;
      const r = nextInt() - 1;
      const a = nl[l];
      const b = pr[r];
      if (a >= b) {
        vis.add(-1);
      } else {
        vis.add(a * n + b);
      }
    }
    out.push(vis.size);
  }
}

solve();
console.log(out.join('\n'));
