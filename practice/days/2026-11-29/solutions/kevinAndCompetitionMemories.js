const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const t = readInt();
  for (let tc = 0; tc < t; tc++) {
    const [n, m] = readIntArray();
    const a = readIntArray();
    const b = readIntArray();
    const me = a[0];
    const st = [];
    for (let i = 1; i < n; i++) if (a[i] > me) st.push(a[i]);
    st.sort((x, y) => x - y);
    const c = new Array(m);
    for (let j = 0; j < m; j++) {
      if (b[j] <= me) { c[j] = 0; continue; }
      let lo = 0, hi = st.length;
      while (lo < hi) {
        const md = (lo + hi) >> 1;
        if (st[md] >= b[j]) hi = md; else lo = md + 1;
      }
      c[j] = st.length - lo;
    }
    c.sort((x, y) => x - y);
    const res = new Array(m);
    for (let k = 1; k <= m; k++) {
      let s = 0;
      for (let i = k - 1; i < m; i += k) s += c[i] + 1;
      res[k - 1] = s;
    }
    print(res.join(" "));
  }
}

solve();
printAll();
