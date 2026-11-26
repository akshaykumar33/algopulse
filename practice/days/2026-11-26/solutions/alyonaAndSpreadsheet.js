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
  const n = nextInt();
  const m = nextInt();
  const prev = new Int32Array(m);
  const up = new Int32Array(m);
  const best = new Int32Array(n);
  for (let j = 0; j < m; j++) {
    prev[j] = nextInt();
    up[j] = 0;
  }
  best[0] = 0;
  for (let i = 1; i < n; i++) {
    let mn = i;
    for (let j = 0; j < m; j++) {
      const v = nextInt();
      if (v < prev[j]) up[j] = i;
      prev[j] = v;
      if (up[j] < mn) mn = up[j];
    }
    best[i] = mn;
  }
  const k = nextInt();
  for (let i = 0; i < k; i++) {
    const l = nextInt() - 1;
    const r = nextInt() - 1;
    out.push(best[r] <= l ? 'Yes' : 'No');
  }
}

solve();
console.log(out.join('\n'));
