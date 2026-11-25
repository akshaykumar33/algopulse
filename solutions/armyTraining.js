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
    let total = 0;
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
      total += a[i];
    }
    a.sort();
    let atk = 0;
    let ans = 0;
    for (let k = 1; k < n; k++) {
      atk += a[n - k];
      const def = 1000 * (n - k) - (total - atk);
      const val = atk * def;
      if (val > ans) ans = val;
    }
    out.push(ans);
  }
}

solve();
console.log(out.join('\n'));
