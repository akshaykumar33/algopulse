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
    for (let r = 0; r < k; r++) {
      const cnt = Math.floor((n - 1 - r) / k) + 1;
      const tmp = new Int32Array(cnt);
      for (let j = 0, p = r; j < cnt; j++, p += k) tmp[j] = a[p];
      tmp.sort();
      for (let j = 0, p = r; j < cnt; j++, p += k) a[p] = tmp[j];
    }
    let ok = true;
    for (let i = 1; i < n; i++) {
      if (a[i] < a[i - 1]) {
        ok = false;
        break;
      }
    }
    out.push(ok ? 'yes' : 'no');
  }
}

solve();
console.log(out.join('\n'));
