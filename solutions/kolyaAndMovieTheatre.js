const fs = require('fs');

class MinHeap {
  constructor() {
    this.data = [];
  }
  push(val) {
    this.data.push(val);
    this._up(this.data.length - 1);
  }
  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._down(0);
    }
    return top;
  }
  size() {
    return this.data.length;
  }
  _up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[i] < this.data[p]) {
        const t = this.data[i];
        this.data[i] = this.data[p];
        this.data[p] = t;
        i = p;
      } else {
        break;
      }
    }
  }
  _down(i) {
    const len = this.data.length;
    while ((i << 1) + 1 < len) {
      let left = (i << 1) + 1;
      let right = left + 1;
      let best = left;
      if (right < len && this.data[right] < this.data[left]) best = right;
      if (this.data[best] < this.data[i]) {
        const t = this.data[i];
        this.data[i] = this.data[best];
        this.data[best] = t;
        i = best;
      } else {
        break;
      }
    }
  }
}

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let sign = 1;
    if (buf[pos] === 45) {
      sign = -1;
      pos++;
    }
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }
  const tVal = nextInt();
  if (tVal === null) return;
  const t = tVal;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const m = nextInt();
    const d = nextInt();
    const heap = new MinHeap();
    let sum = 0;
    let ans = 0;
    for (let i = 1; i <= n; i++) {
      const a = nextInt();
      if (a > 0) {
        heap.push(a);
        sum += a;
        if (heap.size() > m) {
          sum -= heap.pop();
        }
        const cand = sum - d * i;
        if (cand > ans) ans = cand;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
