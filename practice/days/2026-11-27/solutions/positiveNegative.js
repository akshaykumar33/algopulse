const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').split(/\s+/).filter(Boolean);
let idx = 0;
const next = () => input[idx++];
const readInt = () => parseInt(next(), 10);
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const a = new Array(n);
    for (let i = 0; i < n; i++) a[i] = readInt();
    let ans = 0;
    if (n >= 3 && a[0] === -1 && a[n - 1] === -1) {
      const sz = 2 * n + 3;
      const bit = new Int32Array(sz + 1);
      const add = (i) => { for (i++; i <= sz; i += i & -i) bit[i]++; };
      const qry = (i) => { let r = 0; for (i++; i > 0; i -= i & -i) r += bit[i]; return r; };
      let p = 0;
      add(p + n + 1);
      for (let i = 1; i < n - 1; i++) {
        p += a[i];
        ans += qry(p + n + 1);
        add(p + n + 1);
      }
    }
    if (a[n - 1] === -1) {
      let p = 0;
      for (let r = 0; r < n - 1; r++) {
        p += a[r];
        if (p >= 0 && a[r + 1] === -1) ans++;
      }
    }
    if (a[0] === -1) {
      let p = 0;
      for (let l = n - 1; l >= 1; l--) {
        p += a[l];
        if (p >= 0 && a[l - 1] === -1) ans++;
      }
    }
    print(ans);
  }
}

solve();
printAll();
