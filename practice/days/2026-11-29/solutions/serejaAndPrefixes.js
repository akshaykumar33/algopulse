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
  const m = readInt();
  const typ = new Array(m), p1 = new Array(m), p2 = new Array(m), st = new Array(m + 1);
  const arr = [];
  let len = 0;
  for (let i = 0; i < m; i++) {
    const q = readIntArray();
    typ[i] = q[0];
    st[i] = len;
    if (q[0] === 1) {
      p1[i] = q[1];
      len += 1;
      if (arr.length < 100000) arr.push(q[1]);
    } else {
      p1[i] = q[1];
      p2[i] = q[2];
      for (let r = 0; r < q[2] && arr.length < 100000; r++) {
        for (let j = 0; j < q[1] && arr.length < 100000; j++) arr.push(arr[j]);
      }
      len += q[1] * q[2];
    }
  }
  st[m] = len;
  readInt();
  const qs = readIntArray();
  const res = [];
  for (const x of qs) {
    const pos = x - 1;
    let lo = 0, hi = m - 1;
    while (lo < hi) {
      const md = (lo + hi + 1) >> 1;
      if (st[md] <= pos) lo = md; else hi = md - 1;
    }
    const idx = lo;
    if (typ[idx] === 1) res.push(p1[idx]);
    else res.push(arr[(pos - st[idx]) % p1[idx]]);
  }
  print(res.join(" "));
}

solve();
printAll();
