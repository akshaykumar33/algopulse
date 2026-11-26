const fs = require('fs');

class MinHeap {
  constructor() {
    this.h = [];
  }
  push(v) {
    this.h.push(v);
    let i = this.h.length - 1;
    while (i > 0) {
      let p = (i - 1) >> 1;
      if (this.h[p] <= this.h[i]) break;
      let t = this.h[p];
      this.h[p] = this.h[i];
      this.h[i] = t;
      i = p;
    }
  }
  pop() {
    let top = this.h[0];
    let end = this.h.pop();
    if (this.h.length > 0) {
      this.h[0] = end;
      let i = 0;
      let n = this.h.length;
      while (true) {
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        let best = i;
        if (left < n && this.h[left] < this.h[best]) best = left;
        if (right < n && this.h[right] < this.h[best]) best = right;
        if (best === i) break;
        let t = this.h[i];
        this.h[i] = this.h[best];
        this.h[best] = t;
        i = best;
      }
    }
    return top;
  }
  size() {
    return this.h.length;
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

  const t = nextInt();
  if (t === null) return;

  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const p = new Int32Array(n);
    for (let i = 0; i < n; i++) p[i] = nextInt() - 1;

    const vis = new Uint8Array(n);
    const heap = new MinHeap();

    for (let i = 0; i < n; i++) {
      if (vis[i]) continue;
      let cur = i;
      let len = 0;
      while (!vis[cur]) {
        vis[cur] = 1;
        cur = p[cur];
        len++;
      }
      heap.push(len);
    }

    if (heap.size() <= 1) {
      out.push(0);
      continue;
    }

    let ans = 0;
    while (heap.size() > 1) {
      let a = heap.pop();
      let b = heap.pop();
      let sum = a + b;
      ans += sum;
      heap.push(sum);
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
