const fs = require('fs');

class MinHeap {
  constructor() {
    this.h = [];
  }
  push(val) {
    this.h.push(val);
    let i = this.h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.h[p] <= this.h[i]) break;
      const t = this.h[p];
      this.h[p] = this.h[i];
      this.h[i] = t;
      i = p;
    }
  }
  pop() {
    if (this.h.length === 0) return null;
    const res = this.h[0];
    const top = this.h.pop();
    if (this.h.length > 0) {
      this.h[0] = top;
      let i = 0;
      const len = this.h.length;
      while (true) {
        const l = (i << 1) + 1;
        const r = l + 1;
        let min = i;
        if (l < len && this.h[l] < this.h[min]) min = l;
        if (r < len && this.h[r] < this.h[min]) min = r;
        if (min === i) break;
        const t = this.h[i];
        this.h[i] = this.h[min];
        this.h[min] = t;
        i = min;
      }
    }
    return res;
  }
  peek() {
    return this.h[0];
  }
}

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }
  const T = nextInt();
  if (T === null) return;
  const out = [];
  for (let tc = 0; tc < T; tc++) {
    const n = nextInt();
    let maxVal = 0;
    const pq = new MinHeap();
    for (let i = 0; i < n; i++) {
      const x = nextInt();
      pq.push(x);
      if (x > maxVal) maxVal = x;
    }
    const initMax = maxVal;
    let ans = maxVal - pq.peek();
    while (true) {
      const minElem = pq.pop();
      const nextVal = minElem * 2;
      if (nextVal > 2 * initMax) break;
      pq.push(nextVal);
      if (nextVal > maxVal) maxVal = nextVal;
      const diff = maxVal - pq.peek();
      if (diff < ans) ans = diff;
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
