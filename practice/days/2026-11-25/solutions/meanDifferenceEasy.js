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
    const pref = new Float64Array(n + 1);
    for (let i = 0; i < n; i++) pref[i + 1] = pref[i] + a[i];
    let ans = 0;
    const mx = a[n - 1];
    const mn = a[0];
    for (let k = 0; k < n; k++) {
      const s1 = pref[k] + mx;
      const d1 = mx - Math.floor(s1 / (k + 1));
      if (d1 > ans) ans = d1;
      const s2 = mn + (pref[n] - pref[n - k]);
      const d2 = Math.floor(s2 / (k + 1)) - mn;
      if (d2 > ans) ans = d2;
    }
    out.push(ans);
  }
}

solve();
console.log(out.join('\n'));
