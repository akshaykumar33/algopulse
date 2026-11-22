const fs = require('fs');
class MinHeap {
  constructor() {
    this.data = [];
  }
  push(val) {
    this.data.push(val);
    this.up(this.data.length - 1);
  }
  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this.down(0);
    }
    return top;
  }
  up(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[i] < this.data[p]) {
        const tmp = this.data[i];
        this.data[i] = this.data[p];
        this.data[p] = tmp;
        i = p;
      } else break;
    }
  }
  down(i) {
    const n = this.data.length;
    while ((i << 1) + 1 < n) {
      let l = (i << 1) + 1;
      let r = l + 1;
      let best = l;
      if (r < n && this.data[r] < this.data[l]) best = r;
      if (this.data[best] < this.data[i]) {
        const tmp = this.data[i];
        this.data[i] = this.data[best];
        this.data[best] = tmp;
        i = best;
      } else break;
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
    if (buf[pos] === 45) { sign = -1; pos++; }
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res * sign;
  }
  const n = nextInt();
  if (n === null) return;
  const heap = new MinHeap();
  let health = 0;
  let count = 0;
  for (let i = 0; i < n; i++) {
    const a = nextInt();
    health += a;
    count++;
    if (a < 0) heap.push(a);
    while (health < 0) {
      const worst = heap.pop();
      health -= worst;
      count--;
    }
  }
  console.log(count);
}
solve();